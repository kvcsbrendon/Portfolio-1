document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("subscribe-form");
    const emailInput = document.getElementById("email-input");
    const submitButton = document.getElementById("subscribe-btn");

    if (!form || !emailInput || !submitButton) {
        console.error("🔴 Error: Form, input, or button not found in the DOM.");
        return;
    }

    console.log("✅ Form elements found. Script running correctly.");

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

        // Disable submit button to prevent multiple submissions
        submitButton.disabled = true;
        submitButton.innerText = "Submitting...";

        // Prepare form data
        const formData = JSON.stringify({ email: email });

        // Send form data using Fetch API (AJAX)
        fetch("https://script.google.com/macros/s/AKfycbz8t6mLWzPpBwNNcN0IlXj0Q3owyytPIt5foydhBU_Z1Ub3ioZclHvoDeOKHJIc8Ibg/exec", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                successMessage.textContent = "✅ You have successfully subscribed!";
                successMessage.style.display = "block";
                emailInput.value = ""; // Clear input field

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
        })
        .finally(() => {
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerText = "Subscribe";
            }, 5000); // Re-enable the button after 5 seconds
        });
    });
});
