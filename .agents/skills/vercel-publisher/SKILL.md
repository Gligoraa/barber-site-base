# 🚀 Vercel Publisher Skill

Automated deployment workflow for pushing site updates and new site clones directly to Vercel via GitHub Continuous Deployment (CD).

---

## 🎯 Goal
Synchronize local development changes with your production Vercel environment automatically without manual Git commands.

---

## 🛠️ Prerequisites
-   **GitHub Remote Connection**: The project must already be linked to `origin` (Done).
-   **Vercel GitHub Integration**: Vercel must be authorized to read the repo (Done).
-   **Main Branch Protection**: Ensure you are pushing to the branch that Vercel is monitoring (usually `main`).

---

## 🚀 Deployment Workflow

### 📋 Simple Update
To push current changes:
```powershell
py .agents/skills/vercel-publisher/scripts/publish_site.py --msg "Update pricing and service list"
```

### 📋 Full Scale Deployment (Multi-Site)
If you've added new shop clones, this script will stage all new folders, push them to the monorepo on GitHub, and trigger a build for the master template.

---

## 📂 Skill Resources

### scripts/publish_site.py
A Python script that:
1.  **Validates** Git status.
2.  **Stages** (`git add .`) all changes.
3.  **Commits** (`git commit -m`) with a descriptive message.
4.  **Pushes** (`git push origin main`) to GitHub, triggering the automatic Vercel Deployment.
5.  **Alerts** the user on success with a link to their `https://barber-site-base.vercel.app`.

---

## ⚠️ Guidelines
-   **Continuous Deployment (CD)**: Vercel builds automatically once GitHub receives the push. You do NOT need the Vercel CLI.
-   **Sensitive Data**: NEVER delete the `.gitignore`. It prevents you from accidentally leaking secrets or pushing `node_modules` to production.
-   **Build Failures**: If the site doesn't update, check your Vercel Dashboard for deployment error logs (usually due to a broken TypeScript type).
