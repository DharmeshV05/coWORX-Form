---
description: Merge the feature/website-updates branch into main
---

// turbo-all

1. Switch to the `main` branch:
```bash
git checkout main
```

2. Pull the latest changes from remote `main`:
```bash
git pull origin main
```

3. Merge the `feature/website-updates` branch into `main`:
```bash
git merge feature/website-updates
```

4. If there are merge conflicts, they must be resolved before proceeding.

5. Push the merged changes to the remote `main` branch:
```bash
git push origin main
```

6. Confirm the merge was successful:
```bash
git status
```
