# Store listing text

Copy these into the Chrome Web Store and Microsoft Edge Add-ons submission forms.

## Name
Playlist Duration & Controls for YouTube

## Short description / summary (max 132 characters)
Shows the total YouTube playlist length (e.g. 1 / 5 4:25:14) and the player controls when you play/pause with earphones.

## Detailed description
Two small improvements to the YouTube watch page, each with its own on/off switch:

1. Playlist total duration
See how long a playlist will take to watch. The total length is shown right after the
playlist position counter in the playlist panel.
Example: 1 / 5 4:25:14

2. Controls on media keys
When you pause or play with earphone buttons, a headset, or your keyboard's media keys,
YouTube normally changes playback silently. This extension shows the player controls and
the play/pause icon, just like when you press the spacebar, so you can see where you are.

Settings
Click the extension icon to turn each feature on or off. Changes apply immediately.

Privacy
This extension collects no data and makes no network requests. Your two on/off settings
are saved with your browser's extension storage so they follow your profile.

This extension is not affiliated with or endorsed by YouTube or Google.

## Category
Chrome: Productivity (or "Tools")
Edge: Productivity

## Language
English

## Single purpose (Chrome "Privacy practices" tab)
Improve the information and feedback shown by the YouTube watch-page player: display the
total playlist duration and show the player controls when playback is toggled with media keys.

## Permission justification
- `storage`: saves the user's on/off choice for each of the two features.
- Host access to https://www.youtube.com/* (content scripts): needed to read the playlist
  durations shown on the page, insert the total next to the position counter, and show the
  player controls when playback is toggled with media keys.

## Remote code
No, I am not using remote code. (All code is packaged in the extension.)

## Data usage
Select none of the data types. Certify that:
- data is not sold to third parties,
- data is not used for purposes unrelated to the single purpose,
- data is not used to determine creditworthiness or for lending.

## Privacy policy URL
https://github.com/hhakobyan/youtube-playlist-duration/blob/main/PRIVACY.md

## Assets you still need
- Store icon 128x128: `icons/icon128.png` (included)
- Screenshots, 1280x800 or 640x400 (PNG/JPEG): ideally one of a playlist page showing the
  total, one of the paused player with controls visible, and one of the settings popup
- Chrome (optional): small promo tile 440x280
- Edge (optional): store logo 300x300; screenshots up to 1280x800
