'use strict';

const videoPreview = document.querySelector('.video-preview');
const videoPlayer = document.getElementById('video-player');
videoPreview.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const player = videoPlayer.content.querySelector('iframe').cloneNode(true);
  videoPreview.replaceWith(player);
  player.focus({preventScroll: true});
});

const figureDialog = document.getElementById('figure-dialog');
const dialogImage = document.getElementById('dialog-image');

if (figureDialog && typeof figureDialog.showModal === 'function') {
  document.querySelectorAll('.figure-link').forEach((link) => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const thumbnail = link.querySelector('img');
      document.getElementById('original-figure').href = link.href;
      dialogImage.src = link.href;
      dialogImage.alt = thumbnail.alt;
      dialogImage.width = thumbnail.naturalWidth;
      dialogImage.height = thumbnail.naturalHeight;
      figureDialog.showModal();
      const viewport = figureDialog.querySelector('.figure-dialog-image');
      viewport.scrollTo(0, 0);
    });
  });

  figureDialog.addEventListener('click', (event) => {
    const rect = figureDialog.getBoundingClientRect();
    if (event.target === figureDialog &&
        (event.clientX < rect.left || event.clientX > rect.right ||
         event.clientY < rect.top || event.clientY > rect.bottom)) {
      figureDialog.close();
    }
  });
}

const copyButton = document.getElementById('copy-citation');
const citation = document.getElementById('citation');
const copyStatus = document.getElementById('copy-status');

if (copyButton && citation && navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(citation.textContent);
      copyStatus.textContent = 'Citation copied.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(citation);
      selection.removeAllRanges();
      selection.addRange(range);
      copyStatus.textContent = 'Select and copy the highlighted citation with your keyboard.';
    }
  });
}

// Reserve the actual wrapped text and navigation heights before sizing the media.
const teaser = document.querySelector('.teaser');
if (teaser && 'ResizeObserver' in window) {
  const measured = new Map([
    [document.querySelector('.publication-header'), '--header-height'],
    [teaser.querySelector('.overview-description'), '--summary-height'],
    [teaser.querySelector('.section-links'), '--links-height'],
  ]);
  const observer = new ResizeObserver(entries => {
    for (const {target} of entries) {
      teaser.style.setProperty(measured.get(target), target.getBoundingClientRect().height + 'px');
    }
  });
  for (const element of measured.keys()) observer.observe(element, {box: 'border-box'});
}
