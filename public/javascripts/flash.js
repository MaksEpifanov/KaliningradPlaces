const alert = document.querySelector(".alert");
if (alert) {
  setTimeout(() => {
    alert.classList.add("visually-hidden");
  }, 5000);
}
