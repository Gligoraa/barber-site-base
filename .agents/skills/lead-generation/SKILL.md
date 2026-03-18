---
name: Local Business Lead Generation
description: Scrape contact details (email, phone, website, social media) for local businesses using Apify Google Maps scrapers. Covers the full workflow from search query design to data export.
---

# Local Business Lead Generation via Apify

## Overview

This skill documents a complete workflow for generating B2B leads for **local businesses** (e.g., barber shops, hair salons, restaurants, dentists) in any city/country using Apify's Google Maps scrapers. It extracts structured contact information including phone numbers, emails, websites, and social media profiles.

## Prerequisites

- An [Apify](https://apify.com) account with API token
- Apify MCP server configured (see [resources/mcp_setup.md](resources/mcp_setup.md))
- Budget: typically $0.50–$3.00 per city depending on business density

## Workflow Steps

### Step 1: Design Search Queries

**Critical**: Always search in **both English AND the local language** to maximize coverage. Many small businesses only appear under local-language searches.

Refer to [resources/search_queries_template.md](resources/search_queries_template.md) for query templates by industry.

**Example for barber shops in Croatia:**
```
English: "barber shop", "hair salon", "beauty salon"
Croatian: "brijačnica", "frizerski salon", "frizer", "muški frizer", "ženski frizer"
```

### Step 2: Run Google Maps Email Extractor (Primary Scraper)

**Actor**: `lukaskrivka/google-maps-with-contact-details`

This is the **recommended primary actor** because it:
1. Scrapes Google Maps listings (name, address, phone, website, rating)
2. Automatically crawls each business's website for emails and social links
3. Has built-in contact enrichment (enabled by default)

**Cost**: ~$0.0075 per place on FREE tier ($0.005 base + $0.0025 contact enrichment)

**Input configuration:**
```json
{
  "searchStringsArray": ["<search terms>"],
  "locationQuery": "<City, Country>",
  "countryCode": "<2-letter ISO code>",
  "language": "<language code>",
  "maxCrawledPlacesPerSearch": 50,
  "scrapeContacts": true,
  "scrapePlaceDetailPage": false,
  "maxReviews": 0,
  "maxImages": 0,
  "maxQuestions": 0,
  "skipClosedPlaces": false
}
```

**Key parameters explained:**
| Parameter | Recommendation | Why |
|-----------|---------------|-----|
| `maxCrawledPlacesPerSearch` | 50 for small cities, 200 for large | Rijeka-sized cities have 20-60 results per query |
| `scrapeContacts` | `true` (always) | This crawls websites for emails — the whole point |
| `scrapePlaceDetailPage` | `false` (unless you need hours/reviews) | Adds cost and slows down significantly |
| `skipClosedPlaces` | `false` for complete data, `true` for outreach | Depends on your goal |
| `language` | Match `countryCode` language | Croatian → `hr`, German → `de`, etc. |

**MCP tool call:**
```
mcp_apify_call-actor(
  actor: "lukaskrivka/google-maps-with-contact-details",
  input: { <config above> }
)
```

### Step 3: Review Results & Assess Email Coverage

After the scrape completes, evaluate what you got:

**Typical results for small European cities (pop. 50k-200k):**
| Metric | Typical Range |
|--------|--------------|
| Total unique businesses | 30–100 |
| With phone number | 85–95% |
| With email | 5–30% |
| With website | 30–60% |
| With Facebook | 20–40% |
| With Instagram | 10–25% |

**Why email coverage is low**: Most small local businesses (especially in Southern/Eastern Europe) don't publish email addresses. They rely on phone calls, Facebook messages, and Instagram DMs for customer communication.

### Step 4: Enrich Missing Contacts (Optional)

#### 4a. Deep Website Crawl

**Actor**: `vdrmota/contact-info-scraper`

For businesses that have a website but no email was found, run their URLs through this actor for a deeper crawl.

```json
{
  "startUrls": [
    { "url": "https://example-salon.hr" },
    { "url": "https://another-salon.hr" }
  ],
  "maxDepth": 3
}
```

#### 4b. Google Search for Emails

**Actor**: `apify/rag-web-browser`

Search Google for emails that might appear on directory sites:
```
"<business name>" "<city>" email OR @gmail.com OR @yahoo.com
```

#### 4c. Instagram Bio Scraping

Many businesses put their email in their Instagram bio. If you found Instagram profiles in Step 2, scrape them for bio info.

### Step 5: Deduplicate & Clean Data

After running multiple search queries, you'll have overlapping results. Clean up by:

1. **Deduplicate** by `placeId` (Google's unique identifier) — this is the most reliable key
2. **Merge records** — combine data from multiple scrape runs
3. **Standardize phone numbers** — ensure consistent format (e.g., `+385 XX XXX XXXX` for Croatia)
4. **Classify lead quality:**
   - 🔥 **Hot**: Has email + phone + website
   - 🟡 **Warm**: Has phone + social media
   - 🔵 **Cold**: Has phone only
   - ⚪ **Minimal**: Social media only

### Step 6: Export Data

Export the final dataset from Apify as CSV, JSON, or Excel:

```
mcp_apify_get-actor-output(
  datasetId: "<dataset-id>",
  fields: "title,phone,emails,website,facebooks,instagrams,address,totalScore,reviewsCount",
  limit: 100,
  offset: 0
)
```

## Cost Calculator

See [resources/cost_calculator.md](resources/cost_calculator.md) for detailed pricing breakdowns.

**Quick reference (FREE tier):**
| What | Cost per unit |
|------|--------------|
| Base scrape per place | $0.005 |
| Contact enrichment per place | $0.0025 |
| Filter applied per place | $0.0015 |
| Actor start | $0.00005 |

**Example**: 50 places with contact enrichment = 50 × ($0.005 + $0.0025) = **$0.375**

## Important Notes

### GDPR Compliance (EU countries)
- ✅ Scraping publicly available **business** contact information is generally fine for B2B outreach
- ❌ Do NOT scrape personal employee data (e.g., individual emails from LinkedIn)
- ✅ Stick to contact details that the business itself has published
- ⚠️ Always provide an opt-out mechanism in your outreach

### Google Maps Limitations
- Google Maps shows max ~120 results per search area
- Use multiple search terms and zoom levels to maximize coverage
- Some businesses appear under unexpected categories
- Results vary between languages — always search in local language

### Actor Selection Guide
| Actor | Best for | Cost |
|-------|----------|------|
| `lukaskrivka/google-maps-with-contact-details` | Primary scraping + email extraction | ~$0.0075/place |
| `compass/crawler-google-places` | Large-scale scraping, more filters | ~$0.004/place |
| `vdrmota/contact-info-scraper` | Deep website crawling for contacts | ~$0.01/URL |
| `apify/rag-web-browser` | Google search for specific info | ~$0.01/query |
