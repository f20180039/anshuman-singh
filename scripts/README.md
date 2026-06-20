# Scripts

## sync-resume-local.sh

A local testing script for the resume sync workflow. This allows you to test the resume synchronization logic from the GitHub Actions workflow locally without having to commit and push changes.

### Features

- ✅ Fetches the latest resume PDF from `latex-resume-builder` repository
- ✅ Validates PDF integrity (file type and size)
- ✅ Compares file hashes to detect changes
- ✅ Creates timestamped backups (keeps last 10)
- ✅ Updates the main resume file
- ✅ Optional git commit and push
- ✅ Dry-run mode for safe testing
- ✅ Cross-platform support (macOS and Linux)
- ✅ Colored output for better readability

### Prerequisites

Required tools:
- `curl` - for downloading files
- `jq` - for parsing JSON from GitHub API
- `git` - for version control operations
- `sha256sum` or `shasum` - for file hash comparison

Install `jq` if needed:
```bash
# macOS
brew install jq

# Ubuntu/Debian
sudo apt-get install jq
```

### Usage

```bash
# Normal sync (fetch, update, commit, and push)
./scripts/sync-resume-local.sh

# Preview what would happen without making changes
./scripts/sync-resume-local.sh --dry-run

# Update files but don't commit to git
./scripts/sync-resume-local.sh --no-commit

# Force sync even if resume hasn't changed
./scripts/sync-resume-local.sh --force

# Combine flags
./scripts/sync-resume-local.sh --force --no-commit
./scripts/sync-resume-local.sh --force --dry-run
```

### Flags

| Flag | Description |
|------|-------------|
| `--force` | Force sync even if the resume hash is unchanged |
| `--dry-run` | Preview changes without making them (no files modified) |
| `--no-commit` | Update files but skip git commit and push operations |
| `--help` | Show usage information |

### How It Works

1. **Fetch PDF**: Tries to download from GitHub releases, falls back to main branch
2. **Validate**: Checks that the downloaded file is a valid PDF and meets size requirements
3. **Compare**: Calculates SHA256 hash and compares with existing resume
4. **Backup**: Creates timestamped backup of current resume (only if it exists)
5. **Update**: Copies new resume to `src/assets/AnshumanSingh-FE-Resume.pdf`
6. **Cleanup**: Removes old backups, keeping only the 10 most recent
7. **Commit**: (Optional) Commits and pushes changes to git

### Example Workflow

**Testing before pushing workflow changes:**
```bash
# 1. Make changes to .github/workflows/sync-resume.yml
# 2. Test locally first
./scripts/sync-resume-local.sh --dry-run

# 3. If dry-run looks good, update files without committing
./scripts/sync-resume-local.sh --no-commit

# 4. Review the changes
git diff src/assets/AnshumanSingh-FE-Resume.pdf
ls -la public/resumes/backups/

# 5. If satisfied, commit manually or run full sync
./scripts/sync-resume-local.sh
```

**Force sync to test backup/cleanup logic:**
```bash
# Run multiple times to create backups
./scripts/sync-resume-local.sh --force --no-commit
./scripts/sync-resume-local.sh --force --no-commit
# ... repeat >10 times

# Verify only 10 most recent backups are kept
ls -ltr public/resumes/backups/
```

### Configuration

Edit these variables at the top of the script if needed:

```bash
REPO_OWNER="f20180039"
REPO_NAME="latex-resume-builder"
PDF_NAME="Anshuman_Singh_4FE.pdf"
RESUME_PATH="src/assets/AnshumanSingh-FE-Resume.pdf"
BACKUP_DIR="public/resumes/backups"
```

### Troubleshooting

**"jq is required but not installed"**
- Install `jq` using your package manager (see Prerequisites)

**"PDF not found in releases or main branch"**
- Check that the PDF exists in the latex-resume-builder repo
- Verify the PDF_NAME matches exactly (case-sensitive)
- Check your internet connection

**"Downloaded file is not a valid PDF"**
- The downloaded file may be corrupted
- GitHub may be rate-limiting your requests
- Try again in a few minutes

**"No changes to commit"**
- The script correctly detected no changes were made
- This is normal if the resume hasn't been updated

### Related Files

- `.github/workflows/sync-resume.yml` - Automated GitHub Actions workflow
- `src/assets/AnshumanSingh-FE-Resume.pdf` - Main resume file
- `public/resumes/backups/` - Timestamped backup directory
