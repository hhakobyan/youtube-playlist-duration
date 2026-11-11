// Shared by the content script and the settings popup.
// Each key is one feature toggle stored in chrome.storage.sync.
const DEFAULT_SETTINGS = {
  playlistDuration: true,
  mediaKeyControls: true,
};

// Attribute on <html> that tells the page-world script (media-keys.js) whether its feature is on.
const MEDIA_KEY_CONTROLS_ATTR = 'data-ptd-media-key-controls';
