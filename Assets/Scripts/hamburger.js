  document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const mainNav = document.getElementById("main-nav");
    
    hamburgerMenu.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });
  });
