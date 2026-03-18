---
name: ui-ux-pro-max
description: UI/UX design intelligence with searchable database
---

# ui-ux-pro-max

Comprehensive design guide for web and mobile applications. Contains 67 styles, 96 color palettes, 57 font pairings, 99 UX guidelines, and 25 chart types across 13 technology stacks. Searchable database with priority-based recommendations.

## When to Apply

当任务涉及 **UI 结构、视觉设计决策、交互模式或用户体验质量控制** 时，应使用此 Skill。

### Must Use

在以下情况必须调用此 Skill：

- 设计新的页面（Landing Page、Dashboard、Admin、SaaS、Mobile App）
- 创建或重构 UI 组件（按钮、弹窗、表单、表格、图表等）
- 选择配色方案、字体系统、间距规范或布局体系
- 审查 UI 代码的用户体验、可访问性或视觉一致性
- 实现导航结构、动效或响应式行为
- 做产品层级的设计决策（风格、信息层级、品牌表达）
- 提升界面的感知质量、清晰度或可用性

---

## Prerequisites

Check if Python is installed:

```bash
python3 --version || python --version
```

If Python is not installed, install it based on user's OS:

**Windows:**
```powershell
winget install Python.Python.3.12
```

---

## How to Use This Skill

Follow this workflow:

### Step 1: Analyze User Requirements

Extract key information from user request:
- **Product type**: Entertainment, Tool, Productivity, or hybrid
- **Target audience**: C-end consumer users
- **Style keywords**: playful, vibrant, minimal, dark mode, content-first, immersive, etc.
- **Stack**: React Native (this project's only tech stack)

### Step 2: Generate Design System (REQUIRED)

**Always start with `--design-system`** to get comprehensive recommendations with reasoning:

```bash
python .agents/skills/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project Name"]
```

### Step 3: Supplement with Detailed Searches

```bash
python .agents/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

| Need | Domain | Example |
|------|--------|---------|
| Product type | `product` | `--domain product "fintech social"` |
| Styles | `style` | `--domain style "glassmorphism dark"` |
| Colors | `color` | `--domain color "vibrant neon"` |
| Fonts | `typography` | `--domain typography "playful modern"` |
| UX Tips | `ux` | `--domain ux "accessibility"` |
| Stack | `--stack` | `--stack react-native` |

---

## Search Reference

| Domain | Examples |
|--------|----------|
| `product` | SaaS, e-commerce, portfolio |
| `style` | glassmorphism, minimalism, brutalism |
| `typography` | elegant, playful, modern |
| `color` | healthcare, beauty, fintech |
| `ux` | animation, accessibility, z-index |

---

## 🎨 Professional UI Standards & Checklist

### Icons & Visuals
- **Vector-Only Assets**: Use Phospor Icons or Heroicons. No emojis for UI controls.
- **Stable State**: Consistent tap feedback without layout shifts.
- **Minimum Tap Area**: 44x44pt for iOS / 48x48dp for Android.

### Light/Dark Mode
- **Text Contrast**: Primary text ≥ 4.5:1, Secondary text ≥ 3.0:1.
- **Token Based**: Never use hardcoded hex. Map to theme tokens.

### Layout
- **Safe Areas**: Respect notches and gesture bars.
- **Rhythm**: Use 4/8dp baseline spacing grid.

---
*For complete rule deep-dive, run* `python .agents/skills/ui-ux-pro-max/scripts/search.py --domain ux`
