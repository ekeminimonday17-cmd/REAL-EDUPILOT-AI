# REAL-EDUPILOT-AI Deployment Guide

## Vercel Deployment

### Step 1: Connect GitHub Repository
1. Go to https://vercel.com/new
2. Select "Import Git Repository"
3. Search for "REAL-EDUPILOT-AI"
4. Click Import

### Step 2: Configure Environment Variables
Add these environment variables in Vercel project settings:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 3: Deploy
```bash
git push origin main
```
Vercel will automatically build and deploy.

---

## Netlify Deployment

### Step 1: Connect Repository
1. Go to https://app.netlify.com
2. Click "New site from Git"
3. Connect GitHub and select "REAL-EDUPILOT-AI"

### Step 2: Build Settings
- Build command: `npm run build`
- Publish directory: `dist`

### Step 3: Environment Variables
Add in Site settings → Build & Deploy → Environment:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 4: Deploy
Click "Deploy site"

---

## Supabase Setup

### 1. Create Supabase Project
- Go to https://supabase.com
- Click "New Project"
- Create a new organization and project

### 2. Run Database Schema
- Go to SQL Editor in Supabase Dashboard
- Create new query
- Copy content from `database.sql`
- Run the query

### 3. Enable Authentication
- Go to Authentication
- Click "Providers"
- Enable "Email"
- Copy API URL and Anon Key

### 4. Setup RLS Policies
All RLS policies are included in `database.sql`

---

## Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
ENV VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]
```

### Build and Run
```bash
docker build -t edupilot-ai .
docker run -p 3000:3000 -e VITE_SUPABASE_URL=xxx -e VITE_SUPABASE_ANON_KEY=xxx edupilot-ai
```

---

## AWS Deployment

### Using AWS Amplify
1. Go to AWS Amplify Console
2. Select "New app" → "Host web app"
3. Choose GitHub and select repository
4. Add environment variables
5. Deploy

### Using AWS S3 + CloudFront
1. Build: `npm run build`
2. Upload `dist` folder to S3
3. Create CloudFront distribution
4. Point to S3 bucket

---

## Google Cloud Deployment

### Using Cloud Run
```bash
# Build Docker image
docker build -t edupilot-ai .

# Push to Google Container Registry
docker tag edupilot-ai gcr.io/[PROJECT-ID]/edupilot-ai
docker push gcr.io/[PROJECT-ID]/edupilot-ai

# Deploy
gcloud run deploy edupilot-ai \
  --image gcr.io/[PROJECT-ID]/edupilot-ai \
  --set-env-vars VITE_SUPABASE_URL=xxx,VITE_SUPABASE_ANON_KEY=xxx
```

---

## Performance Optimization

### 1. Code Splitting
Already configured in `vite.config.ts` with manual chunks

### 2. Image Optimization
- Use WebP format
- Compress images
- Lazy load images

### 3. Bundle Analysis
```bash
npm install --save-dev rollup-plugin-visualizer
```

### 4. Caching Strategy
- Cache CSS/JS files
- Use service workers
- Implement proper cache headers

---

## Monitoring & Analytics

### 1. Sentry Setup (Error Tracking)
```bash
npm install @sentry/react
```

### 2. Google Analytics
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### 3. LogRocket
```bash
npm install logrocket
```

---

## CI/CD Pipeline

### GitHub Actions (`.github/workflows/deploy.yml`)
```yaml
name: Deploy
on: [push]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Post-Deployment Checklist

- [ ] Test all pages and features
- [ ] Verify authentication works
- [ ] Check database connections
- [ ] Test payment flow
- [ ] Verify email notifications
- [ ] Check performance (Lighthouse)
- [ ] Test on mobile devices
- [ ] Setup SSL/HTTPS
- [ ] Configure custom domain
- [ ] Setup backups
- [ ] Monitor errors
- [ ] Setup uptime monitoring

---

## Troubleshooting

### Build Fails
- Check Node version: `node --version` (should be 18+)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check environment variables

### Database Connection Issues
- Verify Supabase URL and key
- Check RLS policies
- Verify table permissions

### Slow Loading
- Run Lighthouse audit
- Check bundle size: `npm run build`
- Enable caching
- Use CDN

---

**Your Real-Edupilot-AI is now ready for production deployment!** 🚀
