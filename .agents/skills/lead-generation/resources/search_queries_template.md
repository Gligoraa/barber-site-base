# Search Query Templates by Industry & Language

## How to Use

1. Pick your target industry from the tables below
2. Copy ALL queries for that industry (both English + local language)
3. Use them as the `searchStringsArray` in Apify actor input
4. Always set `locationQuery` to your target city

> **Rule of thumb**: Use 5-10 search terms per industry to maximize coverage.
> Diminishing returns kick in after ~8 terms for a single city.

---

## 🇭🇷 Croatia (Croatian / Hrvatski)

### Barber Shops & Hair Salons
| Query | Language | Notes |
|-------|----------|-------|
| `barber shop` | EN | Catches English-named shops |
| `hair salon` | EN | General term |
| `beauty salon` | EN | May include nail/beauty salons |
| `brijačnica` | HR | Barber shop (male-focused) |
| `frizerski salon` | HR | Hair salon (general) |
| `frizer` | HR | Hairdresser |
| `muški frizer` | HR | Men's hairdresser |
| `ženski frizer` | HR | Women's hairdresser |
| `kozmetički salon` | HR | Beauty salon |

### Restaurants & Cafes
| Query | Language | Notes |
|-------|----------|-------|
| `restaurant` | EN | — |
| `restoran` | HR | Restaurant |
| `kafić` | HR | Cafe/coffee bar |
| `pizzeria` | HR | Pizza place |
| `konoba` | HR | Traditional Croatian tavern |
| `bistro` | HR | Bistro |

### Dental Clinics
| Query | Language | Notes |
|-------|----------|-------|
| `dentist` | EN | — |
| `stomatolog` | HR | Dentist |
| `zubni liječnik` | HR | Dental doctor |
| `dentalna ordinacija` | HR | Dental office |
| `stomatološka ordinacija` | HR | Dental practice |

### Auto Repair / Mechanics
| Query | Language | Notes |
|-------|----------|-------|
| `auto repair` | EN | — |
| `autoservis` | HR | Auto service |
| `automehaničar` | HR | Auto mechanic |
| `vulkanizer` | HR | Tire shop |
| `autoelektričar` | HR | Auto electrician |

---

## 🇩🇪 Germany (German / Deutsch)

### Barber Shops & Hair Salons
| Query | Language | Notes |
|-------|----------|-------|
| `barber shop` | EN | — |
| `Friseur` | DE | Hairdresser |
| `Friseursalon` | DE | Hair salon |
| `Herrenfriseur` | DE | Men's barber |
| `Damenfriseur` | DE | Women's hairdresser |
| `Barbershop` | DE | German uses the English loanword |

---

## 🇮🇹 Italy (Italian / Italiano)

### Barber Shops & Hair Salons
| Query | Language | Notes |
|-------|----------|-------|
| `barber shop` | EN | — |
| `barbiere` | IT | Barber |
| `parrucchiere` | IT | Hairdresser |
| `salone di bellezza` | IT | Beauty salon |
| `acconciatore` | IT | Hair stylist |

---

## 🇪🇸 Spain (Spanish / Español)

### Barber Shops & Hair Salons
| Query | Language | Notes |
|-------|----------|-------|
| `barber shop` | EN | — |
| `barbería` | ES | Barber shop |
| `peluquería` | ES | Hair salon |
| `salón de belleza` | ES | Beauty salon |
| `estilista` | ES | Stylist |

---

## 🇫🇷 France (French / Français)

### Barber Shops & Hair Salons
| Query | Language | Notes |
|-------|----------|-------|
| `barber shop` | EN | — |
| `coiffeur` | FR | Hairdresser |
| `salon de coiffure` | FR | Hair salon |
| `barbier` | FR | Barber |
| `salon de beauté` | FR | Beauty salon |

---

## Adding New Languages

When targeting a new country:

1. Use Google Translate for the basic terms
2. **Verify** by searching Google Maps in that language — do results appear?
3. Check which **Google Maps category** local businesses use (the `categoryName` field in results)
4. Add both formal and colloquial terms
5. Include diminutives and abbreviations common in that language
