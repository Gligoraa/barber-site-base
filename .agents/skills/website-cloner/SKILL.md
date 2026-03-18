# 🛠️ Website Cloner Skill

Automated deployment engine for cloning premium barbershop sites across multiple locations with minimal effort.

---

## 🎯 Goal
Turn a single high-quality "Website Template" into 50+ localized, branded barbershop sites by automating the data injection into `business-config.ts`.

---

## 🛠️ Prerequisites
-   **Terminal Access**: PowerShell or Bash.
-   **Base Template**: The `Website Template` folder must exist in the root directory.
-   **Node.js/NPM**: For building and deploying each clone.

---

## 🚀 Cloning Workflow

### 1. Data Collection
Collect the business data in a JSON format. The JSON should match the `BusinessConfig` structure in the template.

**Example Input (`clone_data.json`):**
```json
{
  "name": "Barber of Seville",
  "tagline": "Classic Italian Grooming",
  "theme": { "primaryColor": "emerald-500" },
  "contact": { "address": "456 Plaza Dr, Rijeka", "phone": "+385 51 999 000" }
}
```

### 2. Duplication & Customization
Use the `clone_business.py` script to automate the process.

**Command:**
```powershell
python .agents/skills/website-cloner/scripts/clone_business.py --input "examples/new_shop.json" --output_dir "clones/barber-seville"
```

### 3. Core Customization Pillars
The cloner focuses on:
-   **Brand Identity**: Dynamic Logo & Name updates.
-   **Visual Language**: Color scheme swapping (CSS variables).
-   **Service Menu**: Automated price list generation.
-   **Staff Integration**: Injecting real local talent profiles.
-   **Social Proof**: Custom testimonials per location.

---

## 📂 Skill Resources

### scripts/clone_business.py
A Python script that:
1.  Recursively copies the `Website Template`.
2.  Parses the input JSON.
3.  Regex-replaces the `businessData` object in `src/config/business-config.ts`.
4.  Logs the creation status.

### examples/template_input.json
A full-schema JSON file for rapid "fill-in-the-blanks" setup.

---

## ⚠️ Guidelines
-   **Image Assets**: Ensure all Unsplash/External URLs are valid before cloning.
-   **Favicons**: Manually replace `public/favicon.ico` in each clone if true branding is required.
-   **Color Schemes**: Use Tailwind-compatible color classes to ensure the theme swaps correctly.
