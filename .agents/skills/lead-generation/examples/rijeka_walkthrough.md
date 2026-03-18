# Example: Scraping Barber Shops in Rijeka, Croatia

## Overview
- **Target**: Hair salons and barber shops in Rijeka, Croatia
- **Date**: March 2026
- **Budget used**: ~$0.15
- **Results**: 20 unique businesses

## Actor Configuration Used

```json
{
  "actor": "lukaskrivka/google-maps-with-contact-details",
  "input": {
    "searchStringsArray": ["barber shop", "frizerski salon"],
    "locationQuery": "Rijeka, Croatia",
    "countryCode": "hr",
    "language": "hr",
    "maxCrawledPlacesPerSearch": 10,
    "scrapeContacts": true,
    "scrapePlaceDetailPage": false,
    "maxReviews": 0,
    "maxImages": 0,
    "maxQuestions": 0,
    "skipClosedPlaces": false
  }
}
```

## Results Breakdown

| Metric | Value |
|--------|-------|
| Total businesses | 20 |
| Barber shops (Brijačnica) | 8 |
| Hair salons (Frizerski salon) | 12 |
| With phone | 18 (90%) |
| With email | 1 (5%) |
| With website | 5 (25%) |
| With Facebook | 7 (35%) |
| With Instagram | 4 (20%) |

## Lead Quality Distribution

| Quality | Count | Criteria |
|---------|-------|----------|
| 🔥 Hot | 1 | Email + phone + website |
| 🟡 Warm | 10 | Phone + social OR website |
| 🔵 Cold | 7 | Phone only |
| ⚪ Minimal | 2 | No phone, no digital presence |

## Key Learnings

1. **Only 2 search terms were used** — using all 9 would likely yield 40-80 businesses
2. **Email is rare** — only 1 business (Gentlemen's shop) had an email on their website
3. **Facebook is the most common social presence** for Croatian businesses
4. **Phone coverage is excellent** (90%) — phone outreach is the most viable channel
5. **Croatian search terms** (`frizerski salon`) found different results than English (`barber shop`)

## Output File

See [rijeka_barbershops_output.json](rijeka_barbershops_output.json) for the cleaned, classified data.
