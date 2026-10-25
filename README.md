# Playlist Total Duration for YouTube

A Chrome / Edge extension (Manifest V3) that shows the total duration of the
current YouTube playlist right after the position counter, for example:

```
1 / 5 4:25:14
```

## Install (unpacked, for development)

1. Open `chrome://extensions` (Chrome) or `edge://extensions` (Edge).
2. Turn on **Developer mode**.
3. Click **Load unpacked** and select this folder.
4. Open a video that is part of a playlist (URL contains `list=`) on youtube.com.

After changing the code, click the reload icon on the extension card and refresh the YouTube tab.

## How it works

- The content script runs on `https://www.youtube.com/*`.
- It reads the duration of every item in the playlist side panel and sums them.
- It finds the visible `1 / 5` counter in the panel header and inserts the total after it.
- YouTube is a single-page app, so a `MutationObserver` and the `yt-navigate-finish`
  event keep the total up to date when you switch videos or playlists.

If YouTube changes its page structure, the selectors in `content.js` may need updating.

## Build a store package

```powershell
powershell -ExecutionPolicy Bypass -File tools\pack.ps1
```

This writes `dist/playlist-total-duration-<version>.zip` containing only `manifest.json`,
`content.js` and `icons/`. Bump `version` in `manifest.json` before each store update.

`tools\make-icons.ps1` regenerates the icons in `icons/`.

## Publishing

See [PUBLISHING.md](PUBLISHING.md) for Chrome Web Store and Edge Add-ons steps, and
[STORE_LISTING.md](STORE_LISTING.md) for the text to paste into the store forms.

## Privacy

The extension collects no data. See [PRIVACY.md](PRIVACY.md).
