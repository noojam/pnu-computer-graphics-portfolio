// data-image-viewer 버튼 안의 이미지를 확대합니다.
// 이미지를 바꿀 때는 HTML의 img만 수정하면 됩니다.
const imageViewer = document.querySelector('.image-viewer');
const viewerImage = imageViewer.querySelector('.viewer-image');
const viewerTitle = imageViewer.querySelector('#viewer-title');
const viewerCaption = imageViewer.querySelector('.viewer-caption');
let imageOpener = null;

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('button[data-image-viewer]');
  if (!trigger) return;
  const source = trigger.querySelector('img');
  if (!source) return;

  const project = trigger.closest('.project, .featured-preview');
  const title = project?.querySelector('h3, .preview-caption strong');
  const caption = trigger.closest('figure')?.querySelector('figcaption')
    || project?.querySelector('.preview-caption > span');

  imageOpener = trigger;
  viewerImage.src = source.currentSrc || source.src;
  viewerImage.alt = source.alt;
  viewerTitle.textContent = title?.textContent.trim() || '프로젝트 이미지';
  viewerCaption.textContent = caption?.textContent.trim() || '';
  viewerCaption.hidden = !viewerCaption.textContent;
  imageViewer.showModal();
  document.documentElement.classList.add('image-viewer-open');
});

imageViewer.querySelector('.viewer-close').addEventListener('click', () => {
  imageViewer.close();
});

// 이미지 주변의 빈 공간을 눌러도 닫힙니다.
imageViewer.addEventListener('click', (event) => {
  if (event.target === imageViewer || event.target.classList.contains('viewer-stage')) {
    imageViewer.close();
  }
});

// Esc로 닫을 때도 스크롤과 키보드 초점을 복원합니다.
imageViewer.addEventListener('close', () => {
  document.documentElement.classList.remove('image-viewer-open');
  imageOpener?.focus({ preventScroll: true });
});
