/**
 * MADHESH N - HUMANE PORTFOLIO LOGIC
 */

function copyEmail() {
  const email = 'madheshdeepak71@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    showToast('📧 Copied: madheshdeepak71@gmail.com');
  }).catch(() => {
    showToast('📧 Email: madheshdeepak71@gmail.com');
  });
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;

  toast.innerText = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}
