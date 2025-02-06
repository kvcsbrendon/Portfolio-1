document.addEventListener("DOMContentLoaded", function () {
  let backToTopBtn = document.getElementById("backToTopBtn");

  if (backToTopBtn) {
      window.addEventListener("scroll", toggleBackToTopButton);
      backToTopBtn.addEventListener("click", function (e) {
          e.preventDefault();
          scrollToTop();
      });
  }
});

function toggleBackToTopButton() {
  let backToTopBtn = document.getElementById("backToTopBtn");

  if (window.pageYOffset > 100) {
      backToTopBtn.classList.add("show");
  } else {
      backToTopBtn.classList.remove("show");
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

