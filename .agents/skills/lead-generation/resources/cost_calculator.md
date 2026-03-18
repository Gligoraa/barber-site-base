# Apify Lead Generation Cost Calculator

## Actor Pricing (FREE Tier)

### Google Maps Email Extractor (`lukaskrivka/google-maps-with-contact-details`)

| Component | Cost per place | When charged |
|-----------|---------------|--------------|
| **Base scrape** | $0.005 | Always |
| **Contact enrichment** | $0.0025 | When `scrapeContacts: true` (default) |
| **Filter applied** | $0.0015 per filter | Per category/star/website filter |
| **Place detail page** | $0.003 | When `scrapePlaceDetailPage: true` |
| **Business leads enrichment** | $0.10 per lead | When `maximumLeadsEnrichmentRecords > 0` |
| **Social media enrichment** | $0.10 per profile | When social media enrichment enabled |
| **Review scraped** | $0.0005 | Per individual review |
| **Actor start** | $0.00005 | Each run (negligible) |

### Google Maps Scraper (`compass/crawler-google-places`)

| Component | Cost per place | When charged |
|-----------|---------------|--------------|
| **Base scrape** | $0.004 | Always |
| **Contact enrichment** | $0.002 | When `scrapeContacts: true` |
| **Filter applied** | $0.001 per filter | Per filter used |
| **Place detail page** | $0.002 | When `scrapePlaceDetailPage: true` |
| **Actor start** | $0.00005 | Each run |

### Contact Details Scraper (`vdrmota/contact-info-scraper`)
- ~$0.01 per URL crawled (platform compute cost)

---

## Budget Scenarios

### Tight Budget: $0.20
- **Best approach**: Google Maps Email Extractor with 2 search terms, 10 places each
- **Expected yield**: ~20 unique businesses
- **Good for**: Testing/validation, very small towns

### Standard Budget: $1.00
- **Best approach**: Email Extractor with 5 search terms, 50 places each
- **Expected yield**: ~50–80 unique businesses (after dedup)
- **Good for**: Small to medium cities (pop. 50k–200k)

### Full Coverage: $3.00
- **Best approach**: Email Extractor with 9 search terms, 200 places each + deep enrichment
- **Expected yield**: ~80–150 unique businesses
- **Good for**: Large cities, comprehensive market research

### Multi-City Campaign: $10.00
- **Best approach**: Run standard budget across 5–10 cities
- **Expected yield**: ~300–500 unique businesses
- **Good for**: Regional campaigns, franchise prospecting

---

## Cost Formula

```
Total Cost = (places_scraped × $0.005)
           + (places_scraped × $0.0025)  [if contact enrichment on]
           + (places_scraped × $0.0015 × num_filters)  [if filters used]
           + $0.00005  [actor start, negligible]
```

**Quick estimate**: With contact enrichment and no filters:
```
Cost ≈ places_scraped × $0.0075
```

| Places | Cost |
|--------|------|
| 10 | $0.075 |
| 20 | $0.15 |
| 50 | $0.375 |
| 100 | $0.75 |
| 200 | $1.50 |
| 500 | $3.75 |
| 1,000 | $7.50 |

---

## Free Tier Limits

Apify FREE plan includes **$5/month** in platform credits. This is separate from pay-per-event Actor charges. The Google Maps scrapers use pay-per-event pricing, so:

- You are charged per scraped place, NOT for compute time
- $5 credit is more than enough for most single-city campaigns
- Monitor usage at [console.apify.com/billing](https://console.apify.com/billing)
