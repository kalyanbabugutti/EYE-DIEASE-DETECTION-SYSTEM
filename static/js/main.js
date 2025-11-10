/* global fetch, FileReader */

const links = document.querySelectorAll('a[data-target]');
const sections = document.querySelectorAll('main .section');
const navLinks = document.querySelectorAll('.nav-links a');

const uploader = document.getElementById('image-uploader');
const preview = document.getElementById('preview-container');
const previewImg = document.getElementById('preview-image');
const predictBtn = document.getElementById('predict-button');
const downloadBtn = document.getElementById('download-gradcam');
const loading = document.getElementById('loading');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result-text');
const resultDesc = document.getElementById('result-desc');
const gradcamImg = document.getElementById('gradcam-image');

// ---------------- NAVIGATION ----------------
function showPage(id) {
  sections.forEach(s => s.classList.add('hidden'));
  const active = document.getElementById(id);
  if (active) active.classList.remove('hidden');

  navLinks.forEach(l => l.classList.remove('active-link'));
  const activeLink = document.querySelector(`a[data-target="${id}"]`);
  if (activeLink) activeLink.classList.add('active-link');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}
links.forEach(l => {
  l.addEventListener('click', (e) => {
    e.preventDefault();
    showPage(l.getAttribute('data-target'));
  });
});
document.addEventListener('DOMContentLoaded', () => showPage('page-home'));

// ---------------- UPLOAD / PREVIEW ----------------
uploader.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    previewImg.src = ev.target.result;
    preview.classList.remove('hidden');
    predictBtn.classList.remove('hidden');
    downloadBtn.classList.add('hidden');
    resultContainer.classList.add('hidden');
  };
  reader.readAsDataURL(file);
});

// ---------------- PREDICT / API CALL ----------------
predictBtn.addEventListener('click', async () => {
  const file = uploader.files[0];
  if (!file) return alert('Please upload an image first!');

  const formData = new FormData();
  formData.append('file', file);

  loading.classList.remove('hidden');
  predictBtn.disabled = true;
  resultContainer.classList.add('hidden');

  try {
    const resp = await fetch('/predict', { method: 'POST', body: formData });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Server error: ${resp.status} ${text}`);
    }
    const data = await resp.json();

    // Show results
    resultText.textContent = `Predicted: ${data.disease} — ${data.confidence}%`;
    resultDesc.textContent = data.description || '';
    // Grad-CAM path returned from backend (like /static/uploads/<name>_gradcam.jpg)
    gradcamImg.src = data.gradcam_path + `?t=${Date.now()}`; // cache-bust
    gradcamImg.onload = () => {
      resultContainer.classList.remove('hidden');
      downloadBtn.classList.remove('hidden');
    };
    gradcamImg.onerror = () => {
      // If image load fails, still show text
      resultContainer.classList.remove('hidden');
      downloadBtn.classList.add('hidden');
    };

  } catch (err) {
    console.error(err);
    alert('Prediction failed. Check backend server (console for details).');
  } finally {
    loading.classList.add('hidden');
    predictBtn.disabled = false;
  }
});

// ---------------- DOWNLOAD GRADCAM ----------------
downloadBtn.addEventListener('click', () => {
  if (!gradcamImg.src) return;
  // Create anchor and download
  const a = document.createElement('a');
  a.href = gradcamImg.src;
  a.download = 'gradcam.jpg';
  document.body.appendChild(a);
  a.click();
  a.remove();
});
