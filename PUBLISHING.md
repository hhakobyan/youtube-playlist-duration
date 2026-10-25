# Publishing to the Chrome Web Store and Microsoft Edge Add-ons

Both stores accept the same zip. Build it first:

```powershell
powershell -ExecutionPolicy Bypass -File tools\pack.ps1
```

Upload `dist/playlist-total-duration-<version>.zip`. All listing text is in
[STORE_LISTING.md](STORE_LISTING.md).

Before submitting, take at least one screenshot (1280x800 or 640x400) of a YouTube
playlist page showing the total, e.g. `1 / 5 4:25:14`.

---

## Chrome Web Store

1. **Register a developer account** at https://chrome.google.com/webstore/devconsole
   - Sign in with a Google account, accept the developer agreement, pay the one-time
     US$5 registration fee.
   - Verify your contact email (Account tab) — publishing is blocked until it is verified.
2. **New item** → upload the zip.
3. **Store listing** tab: description, category, language, icon (`icons/icon128.png`),
   screenshot(s), optional 440x280 promo tile.
4. **Privacy practices** tab:
   - Single purpose: paste from STORE_LISTING.md.
   - Permission justification: host access to `https://www.youtube.com/*`.
   - Remote code: **No**.
   - Data usage: check nothing collected; tick all three certifications.
   - Privacy policy URL: `https://github.com/hhakobyan/youtube-playlist-duration/blob/main/PRIVACY.md`
5. **Distribution** tab: Public, all regions (or choose).
6. **Submit for review.** Review usually takes from a few days to a few weeks.
   Small extensions with no permissions tend to be quick.

## Microsoft Edge Add-ons

1. **Register** at https://partner.microsoft.com/dashboard/microsoftedge/overview
   (free). Sign in with a Microsoft account and complete the developer profile.
2. **Create new extension** → upload the same zip.
3. **Availability**: Public, markets of your choice.
4. **Properties**: category (Productivity), privacy policy URL (same as above),
   website URL (the GitHub repo), support contact.
5. **Store listings** → English: description, short description, store logo
   (300x300 recommended, `icons/icon128.png` is accepted as minimum), screenshot(s).
6. **Submission options**: notes for certification, e.g. "Open any YouTube video that is
   part of a playlist; the total duration appears after the 1 / N counter in the playlist panel."
7. **Publish.** Certification usually takes up to 7 business days.

## Updating later

1. Bump `version` in `manifest.json` (e.g. `1.0.1`); the stores reject a repeated version.
2. Rebuild with `tools\pack.ps1`.
3. Chrome: item → Package → **Upload new package** → Submit for review.
   Edge: extension → **Update** → upload → Publish.

## Common rejection reasons to avoid

- Using "YouTube" as the first word of the name or the YouTube logo in the icon
  (trademark). The name here is "Playlist Total Duration for YouTube" for that reason.
- Missing or vague single-purpose / permission justification.
- Screenshots that don't show the extension working.
