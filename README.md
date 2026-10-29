# A White Rose for You 🤍🌹
*A little world created just to celebrate Deepanshi's birthday.*

A mobile-first, interactive digital gift website designed with white roses, gentle moonlight, delicate butterflies, floating petals, and heartfelt sincerity.

---

## 🌟 Features

1. **The Secret Garden (Opening Gate)**
   - Glowing white rosebud in the center of a midnight starfield.
   - Falling white rose petals and ambient moonlight.
   - Optional sound toggle & "Skip Intro" option.
   - Smooth blooming transition into the main celebration.

2. **Birthday Celebration & Interactive Wish**
   - Personalized greeting for **Deepanshi** (`30 October 2026`).
   - Interactive birthday cake with a candle that she can tap to blow out with gentle breeze sound and soft confetti.
   - Sincere friendship reassurance message.

3. **The 8 White Roses Garden**
   - Eight interactive roses with gentle hover & tap animations.
   - Each rose holds a thoughtful message (Happiness, Friendship, Trust, Loyalty, Little Moments, Wishes, A Little Reminder, A Final White Rose).
   - "Discover the Roses: X/8" discovery tracker.
   - Unlocks a special celebration once all 8 roses are opened.

4. **Personal Digital Letter**
   - Formatted on an ivory parchment card against midnight navy depth.
   - Typewriter animation with an instant "Show Full Letter" button.
   - "Read It Again 🤍" replay control.
   - Sincere, mature, and respectful tone with zero pressure.

5. **Personal Photo Gallery (Memories & Moments)**
   - Embedded with the two uploaded photographs of Deepanshi and friend:
     - `/public/assets/aistudio/image_258b6a10.png`
     - `/public/assets/aistudio/image_e73c4c34.png`
   - Lightbox modal with zoom, previous/next controls, and captions.
   - In-browser local photo uploader so you can add or change photos anytime.
   - Safe CSS fallbacks if any image is ever missing.

6. **One Tiny Birthday Game (Friendship Quiz)**
   - 3 lighthearted, playful questions.
   - Warm feedback for each answer.
   - Celebration prize: "One more reason to smile today."

7. **The Final Rose Bloom & Replay**
   - Solitary white rosebud that blooms on command.
   - Shower of white petals, radiant glow, and the touching closing message.
   - Smooth restart option to replay the experience without page reloads.

8. **Non-Technical Navigation & Creator Contact**
   - Built specifically for non-technical users with simple "Page X of 7" indicators, clear "Next Page" and "Back" buttons on every page, and a quick dropdown menu.
   - Dedicated "Ask Me" button with creator contact details (`22nikhilpandey@gmail.com`) in case Deepanshi has any doubts or questions.

---

## ⚙️ How to Customize

All settings, text, names, dates, and messages are centralized in one single file:
**`/src/config/birthdayConfig.ts`**

### 1. Changing Name or Date
Open `/src/config/birthdayConfig.ts` and modify:
```typescript
FRIEND_NAME: "Deepanshi",
CREATOR_NAME: "Your Friend",
BIRTHDAY_DATE: "30 October 2026",
```

### 2. Changing or Adding Photos
The uploaded photos are placed in `/public/assets/aistudio/`. You can replace those files or update the paths in `BIRTHDAY_CONFIG.GALLERY.photos`.

### 3. Modifying Letter Text
Edit `BIRTHDAY_CONFIG.LETTER.paragraphs` in `/src/config/birthdayConfig.ts`.

---

## 🚀 How to Run Locally

```bash
# Install dependencies
npm install

# Start the local development server
npm run dev
```

Visit `http://localhost:3000` in your mobile or desktop browser.

---

## 📦 How to Deploy

To publish the website to Netlify, Vercel, or GitHub Pages:

```bash
# Build production bundle
npm run build
```
This generates the static website files inside the `dist/` directory, ready to deploy to any free static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).
