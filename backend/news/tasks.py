from datetime import datetime, timedelta, timezone

import feedparser
from celery import shared_task
from dateutil import parser as dtparser

from .models import Article

BBC_RSS_URL = "https://feeds.bbci.co.uk/news/rss.xml"


@shared_task
def fetch_bbc():
    feed = feedparser.parse(BBC_RSS_URL)
    week_ago = datetime.now(timezone.utc) - timedelta(days=7)

    for entry in feed.entries:
        guid = entry.get("id") or entry.link
        pub = dtparser.parse(entry.published)
        if pub < week_ago:
            continue
        Article.objects.update_or_create(
            guid=guid,
            defaults={
                "title": entry.title,
                "link": entry.link,
                "description": entry.get("description", ""),
                "pub_date": pub,
            },
        )
    Article.objects.filter(pub_date__lt=week_ago).delete()
