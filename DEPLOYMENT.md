# Deployment Troubleshooting Guide

## 404 Error After Deployment - Solutions

### Issue
Getting "404: NOT_FOUND" error after deploying to Vercel, Netlify, or other platforms.

### Root Causes & Fixes

#### 1. **Vercel Deployment**

**Fix A - Root Directory:**
- Go to Vercel Project Settings
- Navigate to "Build & Development Settings"
- Set Root Directory to: `interview-assassin`
- Redeploy

**Fix B - Framework Preset:**
- Ensure Framework Preset is set to "Next.js"
- Build Command: `npm run build`
- Output Directory: Leave as default (`.next`)
- Install Command: `npm install`

**Fix C - Node Version:**
- Go to Environment Variables
- Add: `NODE_VERSION` = `20.x`
- Redeploy

#### 2. **Netlify Deployment**

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 3. **General Platform Issues**

**Check Build Logs:**
- Look for any errors during build
- Ensure all dependencies are installed
- Check if API routes are being generated

**Common Issues:**

1. **Wrong directory deployed:**
   - Solution: Make sure you're in the `interview-assassin` folder when deploying
   - Or set root directory in platform settings

2. **Missing dependencies:**
   - Solution: Run `npm install` before deploying
   - Ensure package.json is in the deployed directory

3. **Environment Variables:**
   - Our app doesn't need any (removed Gemini API)
   - But if you added any, ensure they're set in platform

4. **Build output not used:**
   - Solution: Platform should use `.next` folder
   - Don't set custom output directory

#### 4. **Manual Deployment Steps**

**For Vercel (Recommended):**
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to project
cd interview-assassin

# Deploy
vercel

# Follow prompts, select Next.js framework
```

**For Netlify:**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Navigate to project
cd interview-assassin

# Build
npm run build

# Deploy
netlify deploy --prod --dir=.next
```

#### 5. **Verify Local Build**

Before deploying, ensure it works locally:

```bash
# Build production version
npm run build

# Start production server
npm start

# Test at http://localhost:3000
```

If it works locally but not on deployment:
- Issue is with platform configuration
- Check platform-specific logs
- Verify correct directory structure

#### 6. **Quick Checklist**

- [ ] Project builds successfully locally (`npm run build`)
- [ ] All files are committed to Git
- [ ] `package.json` is in root of deployed folder
- [ ] `next.config.ts` exists without errors
- [ ] `.next` folder is NOT in `.gitignore` for static exports
- [ ] Framework preset is "Next.js" in platform settings
- [ ] Node version is 18.x or 20.x
- [ ] Root directory points to correct folder

#### 7. **Platform-Specific URLs**

After successful deployment, you should see:
- Homepage: `https://your-domain.vercel.app/`
- Interview page: `https://your-domain.vercel.app/interview?role=frontend-developer&difficulty=medium`

If you get 404 on the homepage, the issue is deployment configuration.
If you get 404 only on `/interview` page, check if routing is working.

#### 8. **Last Resort - Redeploy from Scratch**

1. Delete the deployment from platform
2. Ensure local build works: `npm run build && npm start`
3. Commit all changes to Git
4. Create new deployment
5. Select framework: Next.js
6. Deploy from `interview-assassin` directory
7. Wait for build to complete

### Contact Platform Support

If none of these work:
- Check platform status page
- Contact support with build logs
- Share error ID from screenshot

---

## Success Indicators

When deployment is successful, you should see:
✅ Build completed without errors
✅ Routes generated: /, /interview, /api/generate-question, /api/evaluate-answer
✅ Homepage loads with role selection
✅ Interview page works when accessed with proper query params
✅ No console errors in browser
