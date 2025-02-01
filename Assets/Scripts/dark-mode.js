document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("mode-toggle");
    const modeIcon = document.getElementById("mode-icon");

    // Check localStorage for saved mode
    if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark-mode");
      modeIcon.className = "bi bi-sun";
    }

    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) {
        modeIcon.className = "bi bi-sun";
        localStorage.setItem("darkMode", "enabled");
      } else {
        modeIcon.className = "bi bi-moon";
        localStorage.setItem("darkMode", "disabled");
      }
    });
  });