import json
import re
import sys
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone

import requests

FEED_URL = "https://simonmyway.com/feed.xml"


def fetch_feed():
    response = requests.get(FEED_URL)
    response.raise_for_status()
    return response.text


def parse_feed(feed_xml):
    root = ET.fromstring(feed_xml)
    # Define namespaces
    ns = {
        "atom": "http://www.w3.org/2005/Atom",
        "content": "http://purl.org/rss/1.0/modules/content/",
    }

    entries = []
    for entry in root.findall(".//atom:entry", ns):
        # Check for content tag with type='html'
        content = None
        content_tag = entry.find(".//atom:content[@type='html']", ns)
        if content_tag is not None:
            # Convert the XML element to a string representation
            content = ET.tostring(
                content_tag, encoding="unicode", method="html", default_namespace=None
            )
            # Remove namespace prefixes like 'ns0:' from HTML tags
            content = re.sub(r"<ns\d+:", "<", content)
            content = re.sub(r"</ns\d+:", "</", content)

        entry_data = {
            "title": entry.find("atom:title", ns).text,
            "link": entry.find("atom:link", ns).get("href"),
            "updated": entry.find("atom:updated", ns).text,
            "content": content,
        }
        entries.append(entry_data)

    return entries


def is_from_yesterday(date_str):
    """Check if the date is from yesterday."""
    # Parse the date string and convert to UTC datetime
    date = datetime.fromisoformat(date_str.replace("Z", "+00:00"))

    # Get yesterday's date in UTC
    yesterday = datetime.now(timezone.utc) - timedelta(days=2)
    yesterday_start = yesterday.replace(hour=0, minute=0, second=0, microsecond=0)
    yesterday_end = yesterday.replace(hour=23, minute=59, second=59, microsecond=999999)

    return yesterday_start <= date <= yesterday_end


def main():
    try:
        # Fetch and parse feed
        feed_xml = fetch_feed()
        entries = parse_feed(feed_xml)

        # Filter entries from yesterday
        yesterday_entries = [
            entry for entry in entries if is_from_yesterday(entry["updated"])
        ]

        if yesterday_entries:
            print("new_entries=true")
            print("entries<<EOF")
            print(json.dumps(yesterday_entries))
            print("EOF")
        else:
            print("new_entries=false")

    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
