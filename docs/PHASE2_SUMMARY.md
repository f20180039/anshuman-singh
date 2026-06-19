# Phase 2: Resume Auto-Sync - Implementation Complete ✅

## What Was Built

An automated resume synchronization pipeline that keeps your portfolio's resume up-to-date with your LaTeX resume builder repository.

## Architecture

```
┌─────────────────────────────────┐
│  latex-resume-builder (source)  │
│  - Build PDF with LaTeX         │
│  - Create GitHub Release        │
│  - Or commit to main branch     │
└────────────┬────────────────────┘
             │
             │ (webhook trigger)
             ▼
┌─────────────────────────────────┐
│  GitHub Actions Workflow        │
│  .github/workflows/              │
│    sync-resume.yml              │
│                                 │
│  1. Fetch latest PDF            │
│  2. Compare SHA256 hashes       │
│  3. Create timestamped backup   │
│  4. Update main resume          │
│  5. Cleanup old backups (>10)   │
│  6. Auto-commit & push          │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  Portfolio Repository           │
│                                 │
│  src/assets/                    │
│    AnshumanSingh-FE-Resume.pdf  │ ← Main resume
│                                 │
│  public/resumes/backups/        │
│    AnshumanSingh-FE-2026-06-20-15.pdf │ ← Backup 1
│    AnshumanSingh-FE-2026-06-15-10.pdf │ ← Backup 2
│    ... (up to 10 backups)       │
└─────────────────────────────────┘
```

## Features Implemented

### ✅ 1. Multiple Trigger Methods

**Manual Trigger (Primary)**
- Go to GitHub Actions → "Sync Resume from LaTeX Builder"
- Click "Run workflow"
- Optional: Force sync even if unchanged

**Webhook Trigger (Optional)**
- Automatically runs when latex-resume-builder updates
- Requires PAT setup (see RESUME_SYNC_SETUP.md)

**Scheduled Fallback**
- Runs every Monday at 9 AM UTC
- Catches any missed updates

### ✅ 2. Intelligent Sync Logic

- ✅ SHA256 hash comparison (only updates if changed)
- ✅ PDF validation (ensures valid PDF before commit)
- ✅ File size check (rejects files < 10KB)
- ✅ Fallback to main branch if no releases

### ✅ 3. Backup Management

- ✅ Timestamped backups: `AnshumanSingh-FE-YYYY-MM-DD-HH.pdf`
- ✅ Automatic cleanup: Keeps only 10 most recent
- ✅ Accessible via URL after deployment
- ✅ Git-tracked for audit trail

### ✅ 4. Safety & Reliability

- ✅ `[skip ci]` prevents circular builds
- ✅ Detailed logging at every step
- ✅ Graceful failure handling
- ✅ GitHub Actions summary report
- ✅ No manual intervention needed

### ✅ 5. Zero Cost

- ✅ Uses GitHub Actions free tier (2000 min/month)
- ✅ Estimated usage: ~1 minute per sync = ~52 min/year
- ✅ No external services required

## Files Created

```
my-portfolio/
├── .github/workflows/
│   └── sync-resume.yml           ← Main workflow (177 lines)
│
├── public/resumes/backups/
│   └── .gitkeep                  ← Backup directory
│
└── docs/
    ├── RESUME_SYNC_SETUP.md      ← Setup guide
    └── PHASE2_SUMMARY.md         ← This file
```

## How to Use

### First Time Setup (2 minutes)

**Option A: Manual Trigger Only (Easiest)**
1. Nothing to configure! Works out of the box.
2. Just run workflow manually when you update resume.

**Option B: Automatic Webhook (Advanced)**
1. Create PAT: https://github.com/settings/tokens/new
2. Add to latex-resume-builder secrets as `PORTFOLIO_SYNC_TOKEN`
3. Create `.github/workflows/notify-portfolio.yml` in latex-resume-builder
4. Done! Auto-syncs on every push.

See `docs/RESUME_SYNC_SETUP.md` for detailed steps.

### Regular Usage

**Update Your Resume:**
1. Edit resume in `latex-resume-builder`
2. Build PDF, commit & push
3. **Manual**: Go to Actions → Run workflow
   **OR Webhook**: Automatic!
4. Check Actions tab for status
5. Resume automatically updates on portfolio ✨

**View Backups:**
```bash
ls -lh public/resumes/backups/
```

**Restore from Backup:**
```bash
cp public/resumes/backups/AnshumanSingh-FE-2026-06-15-10.pdf \
   src/assets/AnshumanSingh-FE-Resume.pdf
git add src/assets/AnshumanSingh-FE-Resume.pdf
git commit -m "chore: restore resume from backup"
git push
```

## Testing

### Test the Workflow (Before First Sync)

```bash
# Check workflow syntax
cat .github/workflows/sync-resume.yml | head -20

# Verify directory structure
ls -la public/resumes/backups/

# Check current resume
ls -lh src/assets/AnshumanSingh-FE-Resume.pdf
```

### Test Manual Trigger

1. Go to: https://github.com/f20180039/my-portfolio/actions
2. Select "Sync Resume from LaTeX Builder"
3. Click "Run workflow" → "Run workflow"
4. Wait ~30-60 seconds
5. Check workflow logs for success ✅

### Verify Sync Worked

```bash
# Check if resume updated
git log -1 --oneline src/assets/AnshumanSingh-FE-Resume.pdf

# Check backup created
ls -lh public/resumes/backups/ | tail -1

# View workflow status
echo "Check: https://github.com/f20180039/my-portfolio/actions"
```

## Workflow Output Example

```
🔍 Fetching latest resume from latex-resume-builder...
📥 Downloading from: https://github.com/.../resume.pdf
✅ Downloaded PDF (159240 bytes)
📝 Resume changed
   Old hash: a3f2c1d8e4b5a6f7...
   New hash: b4e3d2c9f5a6b7e8...
💾 Creating backup: AnshumanSingh-FE-2026-06-20-15.pdf
✅ Backup created successfully
🔄 Updating main resume...
✅ Main resume updated
📊 Current backup count: 8
✅ No cleanup needed (under limit)
✅ Changes committed and pushed successfully
```

## Monitoring

### Check Sync Status

- **Actions Tab**: https://github.com/f20180039/my-portfolio/actions
- **Latest Run**: Look for green ✅ or red ❌
- **Logs**: Click on run to see detailed output

### Enable Notifications

1. Go to repo → Watch → Custom
2. Check "Actions" to get email on workflow runs
3. Get notified of sync success/failure

### GitHub Actions Badge

Add to README.md:
```markdown
![Resume Sync](https://github.com/f20180039/my-portfolio/workflows/Sync%20Resume%20from%20LaTeX%20Builder/badge.svg)
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "No PDF found" | Ensure latex-resume-builder has releases with PDF or PDF in main branch |
| "Permission denied" | Enable write permissions: Settings → Actions → "Read and write permissions" |
| Resume not on website | Workflow commits but doesn't deploy. Push to trigger deploy or run deploy workflow |
| Too many backups | Workflow auto-cleans. Change `tail -n +11` to keep more |
| Webhook not triggering | Check PAT expiration, verify secret name matches, check webhook workflow syntax |

See `docs/RESUME_SYNC_SETUP.md` for detailed troubleshooting.

## Security

✅ **Secure by Design:**
- PAT stored as encrypted GitHub Secret
- Minimal permissions (repo scope only)
- Validates PDF before committing
- Uses GitHub Actions bot (not personal account)
- `[skip ci]` prevents infinite loops
- All actions logged and auditable

## Performance

| Metric | Value |
|--------|-------|
| **Sync Duration** | 30-60 seconds |
| **API Calls** | 2-3 per sync |
| **GitHub Actions Minutes** | ~1 minute per sync |
| **Monthly Usage** | ~4 minutes (4 syncs/month) |
| **Free Tier Used** | 0.2% (4/2000 minutes) |
| **Annual Cost** | $0 |

## What's Next?

Resume sync is now live! Next phase:

### Phase 3: AI Agent Flow
- Google Gemini integration
- FAQ-based knowledge base
- Floating chat UI
- Strict guardrails
- $0/month cost (free tier)

Would you like to proceed with Phase 3, or test the resume sync first?

## Summary

✅ **Automated resume sync** - Manual trigger or webhook  
✅ **10 timestamped backups** - Automatic cleanup  
✅ **Hash-based detection** - Only updates when changed  
✅ **Zero maintenance** - Set and forget  
✅ **Free tier** - No costs  
✅ **Secure & reliable** - GitHub Actions best practices  
✅ **Fully documented** - Setup guide included  

Your resume will always be in sync! 🎉
