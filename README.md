# Playlist Duration & Controls for YouTube

A Chrome / Edge extension (Manifest V3) with two features, each with an on/off switch
in the toolbar popup:

1. **Playlist total duration**: shows the total length of the current playlist right after
   the position counter, for example:

   ```
   1 / 5 4:25:14
   ```

2. **Controls on media keys**: when you pause or play with earphone buttons or media keys,
   shows the player controls and the play/pause icon, like the spacebar does.

## Install (unpacked, for development)

1. Open `chrome://extensions` (Chrome) or `edge://extensions` (Edge).
2. Turn on **Developer mode**.
3. Click **Load unpacked** and select this folder.
4. Open a video that is part of a playlist (URL contains `list=`) on youtube.com.

After changing the code, click the reload icon on the extension card and refresh the YouTube tab.
Requires Chrome / Edge 111 or newer.

## Settings

Click the extension's toolbar icon (or **Extension options** on the details page) to toggle
each feature. Settings are stored in `chrome.storage.sync` and apply to open tabs immediately.

## How it works

| File | Runs in | Purpose |
| --- | --- | --- |
| `settings.js` | content script + popup | Default settings and shared constants |
| `content.js` | isolated content script | Playlist total; loads settings and publishes the media-key toggle as an attribute on `<html>` |
| `media-keys.js` | page (`world: "MAIN"`) | Shows controls on media-key play/pause |
| `popup.html`, `popup.js` | toolbar popup / options | The two toggles |

**Playlist total**: reads the duration of every item in the playlist side panel, sums them,
and inserts the total after the visible `1 / 5` counter. A `MutationObserver` and the
`yt-navigate-finish` event keep it up to date as YouTube navigates without page loads.

**Controls on media keys**: media keys go through the browser's Media Session handler, which
toggles the video without YouTube's on-screen feedback. `media-keys.js` listens for the video's
`play` / `pause` events and calls the player's own `wakeUpControls()` and `showPlaybackIcon()`.
Those methods are only visible from the page's JavaScript world, hence `world: "MAIN"`.
Play/pause within 600 ms of keyboard, mouse or touch input is skipped (YouTube already shows
feedback), as are autoplay of a new video and the pause at the end of a video.

If YouTube changes its page structure or player API, the selectors in `content.js` or the
method names in `media-keys.js` may need updating.

## Build a store package

```powershell
powershell -ExecutionPolicy Bypass -File tools\pack.ps1
```

This writes `dist/playlist-total-duration-<version>.zip` containing only the runtime files.
Bump `version` in `manifest.json` before each store update.

`tools\make-icons.ps1` regenerates the icons in `icons/`.

## Publishing

See [PUBLISHING.md](PUBLISHING.md) for Chrome Web Store and Edge Add-ons steps, and
[STORE_LISTING.md](STORE_LISTING.md) for the text to paste into the store forms.

## Privacy

The extension collects no data. See [PRIVACY.md](PRIVACY.md).
