(() => {
  const BADGE_ID = 'yt-playlist-total-duration';
  const COUNTER_RE = /^\s*\d+\s*\/\s*\d+\s*$/;
  const TIME_RE = /^\d{1,2}(:\d{1,2}){1,2}$/;

  // "4:25" -> 265, "1:02:03" -> 3723
  function parseDuration(text) {
    const value = text.trim();
    if (!TIME_RE.test(value)) return null;
    return value.split(':').reduce((total, part) => total * 60 + Number(part), 0);
  }

  // 15904 -> "4:25:04", 265 -> "4:25"
  function formatDuration(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  function getPlaylistPanel() {
    return document.querySelector('ytd-playlist-panel-renderer');
  }

  // The time overlay renders the duration more than once (new badge + legacy #text),
  // so read individual leaf elements rather than the overlay's combined text.
  const TIME_SELECTORS = [
    'ytd-thumbnail-overlay-time-status-renderer .ytBadgeShapeText',
    'ytd-thumbnail-overlay-time-status-renderer #text',
    'badge-shape .ytBadgeShapeText',
  ].join(', ');

  function getItemSeconds(item) {
    for (const el of item.querySelectorAll(TIME_SELECTORS)) {
      const seconds = parseDuration(el.textContent);
      if (seconds !== null) return seconds;
    }
    return null;
  }

  function computeTotalSeconds(panel) {
    let total = 0;
    let counted = 0;
    panel.querySelectorAll('ytd-playlist-panel-video-renderer').forEach((item) => {
      const seconds = getItemSeconds(item);
      if (seconds !== null) {
        total += seconds;
        counted += 1;
      }
    });
    return counted > 0 ? total : null;
  }

  // Finds the visible "1 / 5" position counter inside the playlist header.
  // YouTube renders a hidden duplicate counter next to it, so skip elements without layout boxes.
  function findCounter(panel) {
    const root = panel.querySelector('.index-message-wrapper, .header, #header') || panel;
    const matches = [...root.querySelectorAll('*')].filter(
      (el) => el.id !== BADGE_ID && COUNTER_RE.test(el.textContent) && el.getClientRects().length > 0
    );
    // Descendants come after their ancestors, so the last match is the innermost element.
    return matches.length ? matches[matches.length - 1] : null;
  }

  function update() {
    const panel = getPlaylistPanel();
    if (!panel) return;

    const totalSeconds = computeTotalSeconds(panel);
    const counter = findCounter(panel);
    if (totalSeconds === null || !counter) return;

    const label = formatDuration(totalSeconds);
    let badge = document.getElementById(BADGE_ID);

    if (!badge) {
      badge = document.createElement('span');
      badge.id = BADGE_ID;
      badge.title = 'Total playlist duration';
      badge.style.marginLeft = '8px';
      badge.style.fontVariantNumeric = 'tabular-nums';
      badge.style.opacity = '0.8';
    }

    // Only touch the DOM when something changed, so our own mutations don't re-trigger the observer.
    if (badge.textContent !== label) {
      badge.textContent = label;
    }
    if (!badge.isConnected || badge.previousElementSibling !== counter) {
      counter.insertAdjacentElement('afterend', badge);
    }
  }

  let timer = null;
  function scheduleUpdate() {
    clearTimeout(timer);
    timer = setTimeout(update, 250);
  }

  // YouTube is a single-page app, so the panel is rendered and replaced without page loads.
  const observer = new MutationObserver(scheduleUpdate);
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('yt-navigate-finish', scheduleUpdate);
  scheduleUpdate();
})();
