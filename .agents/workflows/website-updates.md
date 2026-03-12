---
description: Switch to, commit, and push changes to the feature/website-updates branch
---

// turbo-all

1. Switch to the `feature/website-updates` branch:
```bash
git checkout feature/website-updates
```

2. Check git status to see current changes:
```bash
git status --short
```

3. If there are changes, stage them:
```bash
git add -A
```

4. Ask the user for a commit message or generate one:
```bash
git commit -m "feat: website updates and refinements"
```

5. Push to the remote `feature/website-updates` branch:
```bash
git push origin feature/website-updates
```

6. Verify the push and current status:
```bash
git branch --show-current
```
