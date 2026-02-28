---
description: Stage, commit, and push all changes to GitHub
---

// turbo-all

1. Check git status to see what files have changed:
```bash
git status --short
```

2. Stage all changes:
```bash
git add -A
```

3. Ask the user for a commit message. If they don't provide one, generate a descriptive commit message based on the changed files.

4. Commit the changes:
```bash
git commit -m "<commit message>"
```

5. Push to the remote `main` branch:
```bash
git push origin main
```

6. Confirm the push was successful and provide a summary of what was pushed.
