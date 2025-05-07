from datetime import UTC, datetime, timedelta
import json
import logging
import re
import sys
from typing import cast
import xml.etree.ElementTree as ET

import requests

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s", stream=sys.stderr)
logger = logging.getLogger(__name__)

FEED_URL = "https://simonmyway.com/feed.xml"


def fetch_feed() -> str:
    response = requests.get(FEED_URL)
    response.raise_for_status()
    return response.text


def parse_feed(feed_xml: str) -> list[dict[str, str | None]]:
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
            content = ET.tostring(content_tag, encoding="unicode", method="html", default_namespace=None)
            # Remove namespace prefixes like 'ns0:' from HTML tags
            content = re.sub(r"<ns\d+:", "<", content)
            content = re.sub(r"</ns\d+:", "</", content)

        title_elem = entry.find("atom:title", ns)
        link_elem = entry.find("atom:link", ns)
        updated_elem = entry.find("atom:updated", ns)

        if all(elem is not None for elem in [title_elem, link_elem, updated_elem]):
            title_elem = cast(ET.Element, title_elem)
            link_elem = cast(ET.Element, link_elem)
            updated_elem = cast(ET.Element, updated_elem)

            entry_data = {
                "title": title_elem.text,
                "link": link_elem.get("href"),
                "updated": updated_elem.text,
                "content": content,
            }
            entries.append(entry_data)

    return entries


def is_from_yesterday(date_str: str) -> bool:
    """Check if the date is from yesterday."""
    # Parse the date string and convert to UTC datetime
    date = datetime.fromisoformat(date_str.replace("Z", "+00:00"))

    # Get yesterday's date in UTC
    yesterday = datetime.now(UTC) - timedelta(days=4)  # TODO
    yesterday_start = yesterday.replace(hour=0, minute=0, second=0, microsecond=0)
    yesterday_end = yesterday.replace(hour=23, minute=59, second=59, microsecond=999999)

    return yesterday_start <= date <= yesterday_end


def main() -> None:
    try:
        # Fetch and parse feed
        feed_xml = fetch_feed()
        entries = parse_feed(feed_xml)

        # Filter entries from yesterday
        yesterday_entries = [
            entry for entry in entries if entry["updated"] is not None and is_from_yesterday(entry["updated"])
        ]

        if yesterday_entries:
            print("new_entries=true")  # noqa: T201
            print("entries<<EOF")  # noqa: T201
            print(json.dumps(yesterday_entries))  # noqa: T201
            print("EOF")  # noqa: T201
        else:
            print("new_entries=false")  # noqa: T201

    except Exception as e:
        logger.error(f"Error: {e!s}")
        sys.exit(1)


if __name__ == "__main__":
    main()
