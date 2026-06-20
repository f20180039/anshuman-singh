#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_OWNER="f20180039"
REPO_NAME="latex-resume-builder"
PDF_NAME="Anshuman_Singh_4FE.pdf"
RESUME_PATH="src/assets/AnshumanSingh-FE-Resume.pdf"
BACKUP_DIR="public/resumes/backups"

# Parse command-line flags
FORCE_SYNC=false
DRY_RUN=false
NO_COMMIT=false

for arg in "$@"; do
  case $arg in
    --force)
      FORCE_SYNC=true
      shift
      ;;
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --no-commit)
      NO_COMMIT=true
      shift
      ;;
    --help)
      echo "Usage: $0 [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --force      Force sync even if resume unchanged"
      echo "  --dry-run    Preview changes without making them"
      echo "  --no-commit  Update files but skip git operations"
      echo "  --help       Show this help message"
      echo ""
      echo "Examples:"
      echo "  $0                          # Normal sync"
      echo "  $0 --dry-run                # Preview changes"
      echo "  $0 --force --no-commit      # Force update without commit"
      exit 0
      ;;
    *)
      echo -e "${RED}❌ Unknown option: $arg${NC}"
      echo "Use --help for usage information"
      exit 1
      ;;
  esac
done

# Check dependencies
echo -e "${BLUE}🔍 Checking dependencies...${NC}"
command -v curl >/dev/null 2>&1 || { echo -e "${RED}❌ curl is required but not installed${NC}"; exit 1; }
command -v jq >/dev/null 2>&1 || { echo -e "${RED}❌ jq is required but not installed${NC}"; exit 1; }
command -v git >/dev/null 2>&1 || { echo -e "${RED}❌ git is required but not installed${NC}"; exit 1; }

# Check for sha256sum or shasum
if command -v sha256sum >/dev/null 2>&1; then
  HASH_CMD="sha256sum"
elif command -v shasum >/dev/null 2>&1; then
  HASH_CMD="shasum -a 256"
else
  echo -e "${RED}❌ sha256sum or shasum is required but not installed${NC}"
  exit 1
fi

echo -e "${GREEN}✅ All dependencies satisfied${NC}"
echo ""

# Change to project root (script directory parent)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

echo -e "${BLUE}📂 Working directory: $PROJECT_ROOT${NC}"
echo ""

# Step 1: Fetch PDF
echo -e "${BLUE}🔍 Fetching latest resume from ${REPO_OWNER}/${REPO_NAME}...${NC}"

LATEST_RELEASE=$(curl -s "https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest")
RELEASE_MESSAGE=$(echo "$LATEST_RELEASE" | jq -r '.message // empty')

if [ "$RELEASE_MESSAGE" = "Not Found" ] || [ -z "$LATEST_RELEASE" ]; then
  echo -e "${YELLOW}⚠️  No releases found, checking main branch...${NC}"
  RESUME_URL=""
else
  RESUME_URL=$(echo "$LATEST_RELEASE" | jq -r ".assets[]? | select(.name == \"$PDF_NAME\") | .browser_download_url")
fi

if [ -z "$RESUME_URL" ] || [ "$RESUME_URL" = "null" ]; then
  echo -e "${YELLOW}⚠️  Trying direct download from main branch...${NC}"

  RESUME_URL="https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${PDF_NAME}"

  if ! curl -f -s -I "$RESUME_URL" > /dev/null; then
    echo -e "${RED}❌ PDF '${PDF_NAME}' not found in releases or main branch${NC}"
    exit 1
  fi

  echo -e "${GREEN}✅ Found PDF in main branch${NC}"
else
  echo -e "${GREEN}✅ Found PDF in latest release${NC}"
fi

echo -e "${BLUE}📥 Downloading from: $RESUME_URL${NC}"

if [ "$DRY_RUN" = true ]; then
  echo -e "${YELLOW}[DRY RUN] Would download PDF to /tmp/new-resume.pdf${NC}"
else
  curl -L "$RESUME_URL" -o /tmp/new-resume.pdf
fi

# Step 2: Validate PDF
if [ "$DRY_RUN" = false ]; then
  echo -e "${BLUE}🔍 Validating downloaded file...${NC}"

  if ! file /tmp/new-resume.pdf | grep -q "PDF"; then
    echo -e "${RED}❌ Downloaded file is not a valid PDF${NC}"
    exit 1
  fi

  # Get file size (cross-platform)
  if [[ "$OSTYPE" == "darwin"* ]]; then
    FILE_SIZE=$(stat -f%z /tmp/new-resume.pdf)
  else
    FILE_SIZE=$(stat -c%s /tmp/new-resume.pdf)
  fi

  if [ "$FILE_SIZE" -lt 10000 ]; then
    echo -e "${RED}❌ Downloaded PDF is too small ($FILE_SIZE bytes)${NC}"
    exit 1
  fi

  echo -e "${GREEN}✅ Downloaded PDF is valid ($FILE_SIZE bytes)${NC}"
fi

echo ""

# Step 3: Compare hashes
echo -e "${BLUE}🔍 Comparing file hashes...${NC}"

if [ "$DRY_RUN" = false ]; then
  NEW_HASH=$($HASH_CMD /tmp/new-resume.pdf | awk '{print $1}')
else
  NEW_HASH="[dry-run-hash]"
fi

if [ -f "$RESUME_PATH" ]; then
  OLD_HASH=$($HASH_CMD "$RESUME_PATH" | awk '{print $1}')

  echo -e "   Old hash: ${OLD_HASH:0:16}..."
  echo -e "   New hash: ${NEW_HASH:0:16}..."

  if [ "$NEW_HASH" = "$OLD_HASH" ] && [ "$FORCE_SYNC" = false ]; then
    echo -e "${GREEN}ℹ️  Resume unchanged (hash: ${NEW_HASH:0:8}...)${NC}"
    echo ""
    echo -e "${YELLOW}💡 Use --force to sync anyway${NC}"
    exit 0
  fi

  echo -e "${GREEN}📝 Resume changed!${NC}"
else
  echo -e "${GREEN}📝 First time sync - no existing resume${NC}"
fi

echo ""

# Step 4: Create backup
if [ -f "$RESUME_PATH" ]; then
  echo -e "${BLUE}💾 Creating backup...${NC}"

  TIMESTAMP=$(date -u +"%Y-%m-%d-%H")
  BACKUP_NAME="AnshumanSingh-FE-${TIMESTAMP}.pdf"

  if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}[DRY RUN] Would create backup: ${BACKUP_DIR}/${BACKUP_NAME}${NC}"
  else
    mkdir -p "$BACKUP_DIR"
    cp "$RESUME_PATH" "${BACKUP_DIR}/${BACKUP_NAME}"
    echo -e "${GREEN}✅ Backup created: ${BACKUP_NAME}${NC}"
  fi
else
  echo -e "${BLUE}ℹ️  No existing resume to backup${NC}"
fi

echo ""

# Step 5: Update main resume
echo -e "${BLUE}🔄 Updating main resume...${NC}"

if [ "$DRY_RUN" = true ]; then
  echo -e "${YELLOW}[DRY RUN] Would copy /tmp/new-resume.pdf to ${RESUME_PATH}${NC}"
else
  cp /tmp/new-resume.pdf "$RESUME_PATH"
  echo -e "${GREEN}✅ Main resume updated${NC}"
fi

echo ""

# Step 6: Cleanup old backups
echo -e "${BLUE}🗑️  Cleaning up old backups (keeping last 10)...${NC}"

if [ "$DRY_RUN" = false ]; then
  if [ -d "$BACKUP_DIR" ]; then
    cd "$BACKUP_DIR"

    BACKUP_COUNT=$(ls -1 AnshumanSingh-FE-*.pdf 2>/dev/null | wc -l | tr -d ' ')
    echo -e "   Current backup count: $BACKUP_COUNT"

    if [ "$BACKUP_COUNT" -gt 10 ]; then
      ls -t AnshumanSingh-FE-*.pdf | tail -n +11 | xargs rm -f
      REMAINING=$(ls -1 AnshumanSingh-FE-*.pdf 2>/dev/null | wc -l | tr -d ' ')
      echo -e "${GREEN}✅ Cleaned up old backups. Remaining: $REMAINING${NC}"
    else
      echo -e "${GREEN}✅ No cleanup needed (under limit)${NC}"
    fi

    cd "$PROJECT_ROOT"
  fi
else
  echo -e "${YELLOW}[DRY RUN] Would cleanup old backups${NC}"
fi

echo ""

# Step 7: Git operations
if [ "$NO_COMMIT" = true ] || [ "$DRY_RUN" = true ]; then
  if [ "$NO_COMMIT" = true ]; then
    echo -e "${YELLOW}⏭️  Skipping git operations (--no-commit)${NC}"
  else
    echo -e "${YELLOW}[DRY RUN] Would commit and push changes${NC}"
  fi
else
  echo -e "${BLUE}📝 Committing changes...${NC}"

  git add "$RESUME_PATH" "$BACKUP_DIR/"

  # Check if there are changes to commit
  if git diff --staged --quiet; then
    echo -e "${YELLOW}ℹ️  No changes to commit${NC}"
  else
    TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M UTC")
    COMMIT_MSG="chore: sync resume from latex-resume-builder

Updated: ${TIMESTAMP}
Trigger: manual (local script)"

    git commit -m "$COMMIT_MSG"
    echo -e "${GREEN}✅ Changes committed${NC}"

    echo ""
    echo -e "${BLUE}📤 Pushing to remote...${NC}"
    git push
    echo -e "${GREEN}✅ Changes pushed successfully${NC}"
  fi
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Resume sync complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
