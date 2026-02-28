---
description: Deploy the project to Vercel
---

1. First, ensure there are no build errors:
```bash
npm run build
```

2. Stage and commit any pending changes:
```bash
git add -A
git commit -m "Prepare for deployment"
```

3. Push to main branch (Vercel auto-deploys from main):
```bash
git push origin main
```

4. Check Vercel dashboard for deployment status at https://vercel.com

**Note:** The `data/inquiries.json` file is NOT persistent on Vercel. For production use, consider migrating to a database (Supabase, Vercel Postgres, etc.).
