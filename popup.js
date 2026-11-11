const inputs = document.querySelectorAll('input[data-setting]');

chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
  for (const input of inputs) {
    input.checked = Boolean(settings[input.dataset.setting]);
  }
});

for (const input of inputs) {
  input.addEventListener('change', () => {
    chrome.storage.sync.set({ [input.dataset.setting]: input.checked });
  });
}
