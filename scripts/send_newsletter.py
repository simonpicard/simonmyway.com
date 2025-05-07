import json
import logging
import os
import sys

from mailchimp_marketing import Client  # type: ignore
from mailchimp_marketing.api_client import ApiClientError  # type: ignore

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s", stream=sys.stderr)
logger = logging.getLogger(__name__)


def setup_mailchimp() -> Client:
    client = Client()
    client.set_config({
        "api_key": os.environ["MAILCHIMP_API_KEY"],
        "server": os.environ["MAILCHIMP_SERVER_PREFIX"],
    })
    return client


def create_campaign(client: Client, title: str) -> str:
    try:
        campaign = client.campaigns.create({
            "type": "regular",
            "recipients": {"list_id": os.environ["MAILCHIMP_LIST_ID"]},
            "settings": {
                "subject_line": f"{title}",
                "title": f"[GH-CD] Blog Post: {title}",
                "from_name": "Simon Myway",
                "reply_to": "simon@ourway.be",
                "auto_footer": True,
            },
        })
        return campaign["id"]
    except ApiClientError as e:
        logger.error(f"Error creating campaign: {e!s}")
        logger.error(f"Error details: {e.__dict__}")
        sys.exit(1)


def format_content(content: str) -> str:
    """Format the HTML content for email."""
    font_family = (
        "'Open Sans', -apple-system, BlinkMacSystemFont, 'avenir next', "
        "avenir, helvetica, 'helvetica neue', ubuntu, roboto, noto, "
        "'segoe ui', arial, sans-serif"
    )
    return f"""
    <div style="font-family: {font_family}; line-height: 1.6; color: #333;">
        {content}
    </div>
    """


def set_campaign_content(client: Client, campaign_id: str, link: str, content: str) -> None:
    try:
        font_family = (
            "'Open Sans', -apple-system, BlinkMacSystemFont, 'avenir next', "
            "avenir, helvetica, 'helvetica neue', ubuntu, roboto, noto, "
            "'segoe ui', arial, sans-serif"
        )
        email_content = f"""
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <p style="font-size: 16px; margin-bottom: 30px;
                font-family: {font_family};">
                Hi, Simon here. I've just published a new blog post.
                You can read it
                <a href="{link}" style="color: #3498db;">on my blog</a>
                or continue reading below:
            </p>
            <div style="border-top: 1px solid #eee; padding-top: 20px;">
                {format_content(content)}
            </div>
        </div>
        """

        client.campaigns.set_content(campaign_id, {"html": email_content})
    except ApiClientError as e:
        logger.error(f"Error setting campaign content: {e!s}")
        logger.error(f"Error details: {e.__dict__}")
        sys.exit(1)


def send_campaign(client: Client, campaign_id: str) -> None:
    try:
        client.campaigns.send(campaign_id)
    except ApiClientError as e:
        logger.error(f"Error sending campaign: {e!s}")
        logger.error(f"Error details: {e.__dict__}")
        sys.exit(1)


def main() -> None:
    try:
        # Get entries from environment
        entries = json.loads(os.environ["ENTRIES"])

        # Setup Mailchimp client
        client = setup_mailchimp()

        # Process each entry
        for entry in entries:
            title = entry["title"]
            link = entry["link"]
            content = entry["content"]

            # Create and send campaign
            campaign_id = create_campaign(client, title)
            set_campaign_content(client, campaign_id, link, content)
            send_campaign(client, campaign_id)

            logger.info(f"Newsletter sent for post: {title}")

    except Exception as e:
        logger.error(f"Error: {e!s}")
        logger.error(f"Error type: {type(e)}")
        logger.error(f"Error details: {e.__dict__}")
        sys.exit(1)


if __name__ == "__main__":
    main()
