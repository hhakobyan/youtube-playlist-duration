// Runs in the page's own JavaScript world (manifest "world": "MAIN") because the player's
// wakeUpControls() / showPlaybackIcon() methods are not visible to isolated content scripts.
//
// Play/pause from earphones or media keys goes through the browser's Media Session handler,
// which toggles the video without YouTube's usual on-screen feedback. When that happens,
// show the control bar and the centre play/pause icon, as the spacebar does.
(() => {
  const ATTR = 'data-ptd-media-key-controls';
  const USER_INPUT_WINDOW_MS = 600;
  let lastUserInput = 0;

  // Keyboard, mouse and touch input already produce YouTube's own feedback, so remember when
  // it happened and leave those play/pause events alone. Media keys are excluded on purpose.
  const markUserInput = (event) => {
    if (event.type === 'keydown' && event.key && event.key.startsWith('Media')) return;
    lastUserInput = performance.now();
  };
  for (const type of ['keydown', 'pointerdown', 'touchstart']) {
    document.addEventListener(type, markUserInput, true);
  }

  function showFeedback(video) {
    const player = video.closest('#movie_player');
    if (!player) return;

    if (typeof player.wakeUpControls === 'function') {
      player.wakeUpControls();
    } else {
      // Fallback: a mouse move over the player also reveals the controls.
      const rect = player.getBoundingClientRect();
      player.dispatchEvent(new MouseEvent('mousemove', {
        bubbles: true,
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
      }));
    }
    if (typeof player.showPlaybackIcon === 'function') {
      player.showPlaybackIcon();
    }
  }

  // Media events don't bubble, but a capturing listener on document still sees them.
  const onPlayPause = (event) => {
    const video = event.target;
    if (!(video instanceof HTMLVideoElement)) return;
    if (document.documentElement.getAttribute(ATTR) !== 'on') return;
    if (performance.now() - lastUserInput < USER_INPUT_WINDOW_MS) return;
    // Skip autoplay of a new video and the pause at the end of a video.
    if (event.type === 'play' && video.currentTime < 1) return;
    if (event.type === 'pause' && video.ended) return;
    showFeedback(video);
  };
  document.addEventListener('play', onPlayPause, true);
  document.addEventListener('pause', onPlayPause, true);
})();
