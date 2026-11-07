#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"
[[ "$(git branch --show-current)" == astro-migration ]] || { echo 'Source branch must be astro-migration' >&2; exit 1; }
[[ -z "$(git status --porcelain --untracked-files=no)" ]] || { echo 'Tracked changes must be committed' >&2; exit 1; }
git fetch origin astro-migration gh-pages
commit="$(git rev-parse HEAD)"
[[ "$commit" == "$(git rev-parse origin/astro-migration)" ]] || { echo 'Source commit must be pushed' >&2; exit 1; }
lock_dir="$(git rev-parse --git-common-dir)/static-deploy.lock"
mkdir "$lock_dir" || { echo 'Another static deploy holds the lock' >&2; exit 1; }
tmp_dir="$(mktemp -d)"
release_worktree="$tmp_dir/published"
cleanup() {
  git -C "$repo_root" worktree remove --force "$release_worktree" 2>/dev/null || true
  rm -rf "$tmp_dir"
  rmdir "$lock_dir"
}
trap cleanup EXIT
export RELEASE_STARTED="$(date +%s)"
mkdir "$tmp_dir/source"
git archive HEAD | tar -x -C "$tmp_dir/source"
cd "$tmp_dir/source"
npm ci
build_started="$(date +%s)"
npm run build
export RELEASE_BUILD_SECONDS=$(( $(date +%s) - build_started ))
npm run verify:seasonal
GITHUB_SHA="$commit" node scripts/release-passport.mjs write dist
for file in CNAME index.html novogodniy-korporativ/index.html privacy/index.html consent/index.html sitemap.xml; do
  [[ -f "dist/$file" ]] || { echo "Missing release asset $file" >&2; exit 1; }
done
cd "$repo_root"
git worktree add --detach "$release_worktree" origin/gh-pages
upload_started="$(date +%s)"
rsync -a --delete --exclude=.git "$tmp_dir/source/dist/" "$release_worktree/"
git -C "$release_worktree" add --all
if ! git -C "$release_worktree" diff --cached --quiet; then
  git -C "$release_worktree" commit -m "Publish corporate site $commit"
  git -C "$release_worktree" push origin HEAD:gh-pages
fi
export RELEASE_UPLOAD_SECONDS=$(( $(date +%s) - upload_started ))
node scripts/release-passport.mjs verify https://corp.timurgromov.ru/ "$commit"
