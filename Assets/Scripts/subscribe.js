document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("subscribe-form");
  const emailInput = document.getElementById("email-input");

  // Check if form and input exist before running
  if (!form || !emailInput) {
      console.error("🔴 Error: The form or email input was not found in the DOM.");
      return;
  }

  console.log("✅ Form and email input found. Script running correctly.");

  // Create and insert the error message below the input field
  const errorMessage = document.createElement("p");
  errorMessage.id = "email-error";
  errorMessage.classList.add("form-message", "error-message"); // Add CSS classes
  errorMessage.style.display = "none"; // Hidden initially
  form.insertBefore(errorMessage, form.children[1]); // Insert error message after input field

  // Create and insert the success message below the form
  const successMessage = document.createElement("p");
  successMessage.id = "email-success";
  successMessage.classList.add("form-message", "success-message"); // Add CSS classes
  successMessage.style.display = "none"; // Hidden initially
  form.appendChild(successMessage); // Insert success message below the form

  // Handle form submission
  form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent page reload

      const email = emailInput.value.trim();
      const emailPattern = /^[^\s@]+@aston\.ac\.uk$/; // Only allow Aston University emails

      // Validate email
      if (!emailPattern.test(email)) {
          errorMessage.innerHTML = "❌ Please enter a valid Aston University email <br> (must end with @aston.ac.uk).";
          errorMessage.style.display = "block"; // Show error message
          successMessage.style.display = "none"; // Hide success message
          return;
      }

      // Hide error message if email is valid
      errorMessage.style.display = "none";

      // Show success message
      successMessage.textContent = "✅ You have successfully subscribed!";
      successMessage.style.display = "block";

      // Clear input field after submission
      emailInput.value = "";

      // Hide success message after 5 seconds
      setTimeout(() => {
          successMessage.style.display = "none";
      }, 5000);
  });
});
