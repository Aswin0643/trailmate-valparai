# TrailMate – Valparai & Athirappilly PWA

A mobile-first trip checklist with an installable PWA shell, offline checklist persistence, route links and an online OpenStreetMap preview.

## What works offline
- App shell (HTML/CSS/JS) is cached by the service worker after the first successful visit.
- Visited-stop checklist is stored in browser local storage.
- Trip progress is calculated locally.
- Export checklist JSON.

## What does NOT work offline yet
- The embedded OpenStreetMap preview and Google Maps navigation links need internet.
- This project does not bundle map tiles or provide offline turn-by-turn navigation.
- Do not bulk-download public OpenStreetMap standard tiles. For real offline mapping, use a properly licensed regional MBTiles/PMTiles package and a compatible offline renderer/provider, respecting its terms and attribution.

## Deploy to Firebase Hosting

1. Install Node.js LTS.
2. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
3. Sign in:
   ```bash
   firebase login
   ```
4. Create a Firebase project at https://console.firebase.google.com/ .
5. In this project folder, copy `.firebaserc.example` to `.firebaserc` and replace `YOUR_FIREBASE_PROJECT_ID` with your actual project ID.
6. Deploy:
   ```bash
   firebase deploy --only hosting
   ```
7. Firebase prints your public HTTPS hosting URL.

Alternative project selection without editing `.firebaserc`:
```bash
firebase use --add
firebase deploy --only hosting
```

## Install on Android
1. Open the deployed HTTPS URL in Chrome.
2. Wait for the first page load while online.
3. Use Chrome menu → Add to Home screen / Install app.
4. Open it once online to cache the app shell. Then test airplane mode.

## Before relying on it on the trip
- Test offline mode at home.
- Download the area in the official Google Maps app separately.
- Confirm forest road access for motorcycles, checkpoint hours, weather and waterfall access with local authorities.
- The suggested route stops are planning labels, not verified coordinates or a guarantee of road access.
