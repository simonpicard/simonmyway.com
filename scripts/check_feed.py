from datetime import date, datetime
import json
import logging
import os
import re
import sys
from typing import cast
import xml.etree.ElementTree as ET
from zoneinfo import ZoneInfo

import requests

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s", stream=sys.stderr)
logger = logging.getLogger(__name__)

FEED_URLS = {
    "en": "https://simonmyway.com/en/feed.xml",
    "fr": "https://simonmyway.com/fr/feed.xml",
}

# "Today" is counted in Brussels time, so a run just after midnight in Belgium
# (still the previous day in UTC) looks for the right posts.
BRUSSELS = ZoneInfo("Europe/Brussels")


def fetch_feed(url: str) -> str:
    response = requests.get(url)
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


def target_date() -> date:
    """Publication date to send: NEWSLETTER_DATE (YYYY-MM-DD) if set, else today in Brussels."""
    override = os.environ.get("NEWSLETTER_DATE", "").strip()
    if override:
        return date.fromisoformat(override)
    return datetime.now(BRUSSELS).date()


def is_published_on(date_str: str, day: date) -> bool:
    """Feed dates are the post's date at midnight UTC, so their UTC date is the post's date."""
    return datetime.fromisoformat(date_str.replace("Z", "+00:00")).date() == day


def collect_entries(day: date) -> list[dict[str, str | None]]:
    """Fetch both language feeds and return entries published on `day`, tagged by language."""
    entries: list[dict[str, str | None]] = []
    for lang, url in FEED_URLS.items():
        for entry in parse_feed(fetch_feed(url)):
            if entry["updated"] is not None and is_published_on(entry["updated"], day):
                entry["lang"] = lang
                entries.append(entry)
    return entries


def emit_github_output(entries: list[dict[str, str | None]]) -> None:
    """Print entries in the key<<EOF format the GitHub Actions workflow parses."""
    if entries:
        print("new_entries=true")  # ruff:ignore[print]
        print("entries<<EOF")  # ruff:ignore[print]
        print(json.dumps(entries))  # ruff:ignore[print]
        print("EOF")  # ruff:ignore[print]
    else:
        print("new_entries=false")  # ruff:ignore[print]


def main() -> None:
    try:
        day = target_date()
        logger.info(f"Looking for posts published on {day.isoformat()}")
        emit_github_output(collect_entries(day))
    except Exception as e:
        logger.error(f"Error: {e!s}")
        sys.exit(1)


if __name__ == "__main__":
    main()
