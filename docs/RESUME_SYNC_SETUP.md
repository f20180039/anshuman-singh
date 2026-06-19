# Resume Auto-Sync Setup Guide

This document explains how the automated resume sync system works and how to set it up.

## Overview

The portfolio automatically syncs the latest resume PDF from the `latex-resume-builder` repository, maintaining up to 10 timestamped backups.

## How It Works

### Automatic Sync Methods

1. **Manual Trigger** (Primary - Recommended)
   - Go to GitHub Actions in this repo
   - Select "Sync Resume from LaTeX Builder"
   - Click "Run workflow"
   - Use this whenever you update your resume

2. **Webhook Trigger** (Optional - Advanced)
   - Automatically triggers when latex-resume-builder's main branch updates
   - Requires setup in the latex-resume-builder repo (see below)

3. **Scheduled Sync** (Fallback)
   - Runs every Monday at 9 AM UTC
   - Catches any missed updates

### What Gets Synced

- **Source**: Latest PDF from `latex-resume-builder` (releases or main branch)
- **Destination**: `src/assets/AnshumanSingh-FE-Resume.pdf`
- **Backups**: Stored in `public/resumes/backups/` with format `AnshumanSingh-FE-YYYY-MM-DD-HH.pdf`
- **Retention**: Keeps only the 10 most recent backups

## Setup Instructions

### Step 1: Manual Trigger (Works Out of the Box)

The workflow is already configured! To sync manually:

1. Make a change to your resume in `latex-resume-builder`
2. Go to: `https://github.com/f20180039/my-portfolio/actions`
3. Click "Sync Resume from LaTeX Builder"
4. Click "Run workflow" → "Run workflow"

That's it! The workflow will:
- Download the latest PDF
- Check if it's different from current
- Create a timestamped backup
- Update the main resume file
- Commit changes automatically

### Step 2: Webhook Setup (Optional)

For automatic triggering when latex-resume-builder updates:

#### A. Create Personal Access Token (PAT)

1. Go to: https://github.com/settings/tokens/new
2. Name: `Portfolio Resume Sync`
3. Expiration: `No expiration` (or 1 year)
4. Scopes: ✅ Check `repo` (full control)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)

#### B. Add Token to latex-resume-builder

1. Go to: https://github.com/f20180039/latex-resume-builder/settings/secrets/actions
2. Click "New repository secret"
3. Name: `PORTFOLIO_SYNC_TOKEN`
4. Value: Paste the PAT you copied
5. Click "Add secret"

#### C. Create Workflow in latex-resume-builder

Create `.github/workflows/notify-portfolio.yml`:

```yaml
name: Notify Portfolio on Resume Update

on:
  push:
    branches: [main]
    paths:
      - '**.pdf'
      - '**.tex'

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger portfolio resume sync
        run: |
          curl -X POST \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer ${{ secrets.PORTFOLIO_SYNC_TOKEN }}" \
            https://api.github.com/repos/f20180039/my-portfolio/dispatches \
            -d '{"event_type":"resume_updated"}'

          echo "✅ Portfolio sync triggered successfully"
```

Now, whenever you push changes to `latex-resume-builder`, the portfolio will automatically sync!

## Verification

### Check Sync Status

1. Go to: https://github.com/f20180039/my-portfolio/actions
2. Look for "Sync Resume from LaTeX Builder" runs
3. Green checkmark = success, Red X = failed

### View Backups

Backups are stored in `public/resumes/backups/` and accessible at:
- `https://yourdomain.com/resumes/backups/AnshumanSingh-FE-2026-06-20-15.pdf`

List backups:
```bash
ls -lh public/resumes/backups/
```

### Force Sync

To force a sync even if the resume hasn't changed:

1. Go to Actions → "Sync Resume from LaTeX Builder"
2. Click "Run workflow"
3. Set "Force sync even if unchanged" to `true`
4. Click "Run workflow"

## Troubleshooting

### Problem: "No PDF found in latest release"

**Solution**: Make sure your latex-resume-builder repo has:
- A release with a PDF attachment, OR
- A PDF file in the main branch at the root

### Problem: Workflow fails with "Permission denied"

**Solution**: 
1. Go to repo Settings → Actions → General
2. Under "Workflow permissions", select "Read and write permissions"
3. Click "Save"

### Problem: Resume not updating on website

**Solution**: The workflow commits to the repo, but you need to deploy:
- If using GitHub Pages: Push to master/main triggers auto-deploy
- If using Vercel/Netlify: Should auto-deploy on commit
- Manual deploy: Run your deploy workflow

### Problem: Too many backups

**Solution**: The workflow automatically keeps only 10 backups. If you want to change this:
- Edit `.github/workflows/sync-resume.yml`
- Find the line `tail -n +11` (this keeps 10)
- Change to `tail -n +21` (keeps 20), etc.

## Maintenance

### View All Backups

```bash
cd public/resumes/backups
ls -lth AnshumanSingh-FE-*.pdf
```

### Manually Add Backup

```bash
TIMESTAMP=$(date -u +"%Y-%m-%d-%H")
cp src/assets/AnshumanSingh-FE-Resume.pdf "public/resumes/backups/AnshumanSingh-FE-${TIMESTAMP}.pdf"
```

### Restore from Backup

```bash
# List backups with dates
ls -lh public/resumes/backups/

# Restore specific backup
cp public/resumes/backups/AnshumanSingh-FE-2026-06-15-10.pdf src/assets/AnshumanSingh-FE-Resume.pdf

# Commit the restoration
git add src/assets/AnshumanSingh-FE-Resume.pdf
git commit -m "chore: restore resume from backup (2026-06-15)"
git push
```

## Security Notes

- ✅ PAT is stored as a GitHub Secret (encrypted)
- ✅ PAT has minimal scope (only `repo` access)
- ✅ Workflow uses `[skip ci]` to prevent circular triggers
- ✅ PDF validation ensures only valid files are committed
- ✅ GitHub Actions bot makes commits (not your personal account)

## Cost

**FREE!** Everything uses:
- GitHub Actions free tier (2000 minutes/month)
- GitHub Pages/standard repo storage
- No external services required

Estimated usage per sync: ~1 minute = ~52 minutes/year (2.6% of free tier)

## Summary

- 🚀 **Zero maintenance** - Set up once, works forever
- 🔄 **Automatic sync** - Manual trigger or webhook
- 💾 **10 backups** - Always have history
- 🆓 **Free** - Uses GitHub's free tier
- 🔒 **Secure** - Encrypted secrets, validated PDFs
- 📊 **Monitored** - Action logs and summaries

Your resume is always up-to-date! 🎉
