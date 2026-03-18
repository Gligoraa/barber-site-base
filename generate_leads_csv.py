import json, csv, os

def clean_json_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read().strip()
    if content.startswith('```json'):
        content = content[7:]
    if content.endswith('```'):
        content = content[:-3]
    return json.loads(content.strip())

# Source files
file1 = r'C:\Users\mateg\.gemini\antigravity\brain\d5232893-060e-4926-839b-6a534bd8d00f\.system_generated\steps\129\output.txt'
file2 = r'C:\Users\mateg\.gemini\antigravity\brain\d5232893-060e-4926-839b-6a534bd8d00f\.system_generated\steps\132\output.txt'

try:
    batch1 = clean_json_file(file1)
    batch2 = clean_json_file(file2)
    all_items = batch1 + batch2
except Exception as e:
    print(f"Error loading files: {e}")
    sys.exit(1)

# Deduplicate by placeId
seen = set()
unique = []
for item in all_items:
    pid = item.get('placeId', '')
    if pid and pid not in seen:
        seen.add(pid)
        unique.append(item)
    elif not pid:
        unique.append(item)

# Sort by reviewsCount descending
unique.sort(key=lambda x: x.get('reviewsCount') or 0, reverse=True)

# Output path
output_path = r'd:\barbers anti\rijeka_leads.csv'

# Write CSV with correct encoding for Excel (utf-8-sig)
with open(output_path, 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow([
        'Business Name', 'Category', 'Phone', 'Email', 'Website',
        'Facebook', 'Instagram', 'Address', 'City', 'Postal Code',
        'Rating', 'Reviews', 'Lead Quality', 'Google Maps URL'
    ])
    
    for item in unique:
        emails = item.get('emails', []) or []
        # Filter out irrelevant emails (from directory sites, not the business)
        irrelevant = ['fininfo', 'novatv', 'mojkvart', 'idoneus', 'mysite.ru', 'yahoo.com', 'gmail.com'] # Be careful with gmail, some small shops use it
        # Actually some shops DO use gmail/yahoo. Let's only filter directory sites.
        directory_sites = ['fininfo.hr', 'novatv.hr', 'mojkvart.hr', 'idoneus.hr', 'mysite.ru']
        business_emails = [e for e in emails if not any(site in e for site in directory_sites)]
        email_str = '; '.join(business_emails) if business_emails else ''
        
        website = item.get('website', '') or ''
        if 'facebook.com' in website or 'instagram.com' in website:
            website_clean = ''
        else:
            website_clean = website
        
        facebooks = item.get('facebooks', []) or []
        fb_str = '; '.join(facebooks) if facebooks else ''
        if not fb_str and 'facebook.com' in (item.get('website', '') or ''):
            fb_str = item.get('website', '')
        
        instagrams = item.get('instagrams', []) or []
        ig_str = '; '.join(instagrams) if instagrams else ''
        if not ig_str and 'instagram.com' in (item.get('website', '') or ''):
            ig_str = item.get('website', '')
        
        phone = item.get('phone', '') or ''
        
        # Classify lead quality
        if email_str and phone and website_clean:
            quality = 'HOT'
        elif phone and (fb_str or ig_str or website_clean):
            quality = 'WARM'
        elif phone:
            quality = 'COLD'
        else:
            quality = 'MINIMAL'
        
        url = item.get('url', '') or ''
        
        writer.writerow([
            item.get('title', ''),
            item.get('categoryName', ''),
            phone,
            email_str,
            website_clean,
            fb_str,
            ig_str,
            item.get('address', ''),
            item.get('city', ''),
            item.get('postalCode', ''),
            item.get('totalScore', ''),
            item.get('reviewsCount', ''),
            quality,
            url
        ])

print(f"CSV generated: {output_path}")
print(f"Total raw items processed: {len(all_items)}")
print(f"Unique businesses found: {len(unique)}")

# Quick stats print
hot = sum(1 for i in unique if email_str and phone and website_clean) # Wrong logic here, need to check current row
# Re-calculating correctly for stats
stat_hot = 0
stat_phone = 0
stat_email = 0
for item in unique:
    if item.get('phone'): stat_phone += 1
    # Check emails again for stats
    emails = item.get('emails', []) or []
    directory_sites = ['fininfo.hr', 'novatv.hr', 'mojkvart.hr', 'idoneus.hr', 'mysite.ru']
    business_emails = [e for e in emails if not any(site in e for site in directory_sites)]
    if business_emails: stat_email += 1
    
    website = item.get('website', '') or ''
    website_clean = website if 'facebook.com' not in website and 'instagram.com' not in website else ''
    if business_emails and item.get('phone') and website_clean: stat_hot += 1

print(f"\n- Total leads: {len(unique)}")
print(f"- Hot leads (Email + Phone + Web): {stat_hot}")
print(f"- Total with Phone: {stat_phone}")
print(f"- Total with business Email: {stat_email}")
