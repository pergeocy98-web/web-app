# Admin — Gestion des salariés (Fix Prisma)

## Déploiement Vercel
1) Add New → Project → Upload → **glissez le CONTENU du zip** (pas le dossier parent).
2) Settings → Environment Variables :
   - `DATABASE_URL` = `file:./dev.db`
3) Build & Development Settings → Build Command :
```
npx prisma db push && npm run seed && npm run build
```
4) Redeploy → Visit.
