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
    errorMessage.classList.add("form-message", "error-message");
    errorMessage.style.display = "none";
    form.insertBefore(errorMessage, form.children[1]);

    // Create and insert the success message below the form
    const successMessage = document.createElement("p");
    successMessage.id = "email-success";
    successMessage.classList.add("form-message", "success-message");
    successMessage.style.display = "none";
    form.appendChild(successMessage);

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

        // Prepare form data
        let formData = new FormData(form);

        // Send form data using Fetch API (AJAX)
        fetch("https://formspree.io/f/xyzkjjye", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                successMessage.textContent = "✅ You have successfully subscribed!";
                successMessage.style.display = "block";
                emailInput.value = ""; // Clear input

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 5000);
            } else {
                errorMessage.innerHTML = "❌ Subscription failed. Please try again later.";
                errorMessage.style.display = "block";
            }
        })
        .catch(() => {
            errorMessage.innerHTML = "❌ Error! Please try again.";
            errorMessage.style.display = "block";
        });
    });
});
