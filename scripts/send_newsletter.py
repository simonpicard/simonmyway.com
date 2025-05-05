import json
import os
import sys

from mailchimp_marketing import Client
from mailchimp_marketing.api_client import ApiClientError


def setup_mailchimp():
    client = Client()
    client.set_config(
        {
            "api_key": os.environ["MAILCHIMP_API_KEY"],
            "server": os.environ["MAILCHIMP_SERVER_PREFIX"],
        }
    )
    return client


def create_campaign(client, title):
    try:
        campaign = client.campaigns.create(
            {
                "type": "regular",
                "recipients": {"list_id": os.environ["MAILCHIMP_LIST_ID"]},
                "settings": {
                    "subject_line": f"New Blog Post: {title}",
                    "title": f"Blog Post: {title}",
                    "from_name": "Simon Myway",
                    "reply_to": "simon@ourway.be",
                    "auto_footer": True,
                },
            }
        )
        return campaign["id"]
    except ApiClientError as e:
        print(f"Error creating campaign: {str(e)}", file=sys.stderr)
        sys.exit(1)


def format_content(content):
    """Format the HTML content for email."""
    return f"""
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        {content}
    </div>
    """


def set_campaign_content(client, campaign_id, title, link, content):
    try:
        email_content = f"""
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2c3e50; margin-bottom: 20px;">
                New Blog Post: {title}
            </h1>
            
            <p style="font-size: 16px; margin-bottom: 30px;">
                I've just published a new blog post. You can read it 
                <a href="{link}" style="color: #3498db;">on my blog</a> 
                or continue reading below.
            </p>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px;">
                {format_content(content)}
            </div>
        </div>
        """

        client.campaigns.set_content(campaign_id, {"html": email_content})
    except ApiClientError as e:
        print(f"Error setting campaign content: {str(e)}", file=sys.stderr)
        sys.exit(1)


def send_campaign(client, campaign_id):
    try:
        client.campaigns.send(campaign_id)
    except ApiClientError as e:
        print(f"Error sending campaign: {str(e)}", file=sys.stderr)
        sys.exit(1)


def main():
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
            set_campaign_content(client, campaign_id, title, link, content)
            send_campaign(client, campaign_id)

            print(f"Newsletter sent for post: {title}")

    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
