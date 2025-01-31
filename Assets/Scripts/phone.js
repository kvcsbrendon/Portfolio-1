const phoneInputField = document.querySelector("#phone");

// Function to get the user's country based on IP
function getIp(callback) {
    fetch('https://ipinfo.io/json?token=2620d0b0460b0f', { 
        headers: { 'Accept': 'application/json' } 
    })
    .then((resp) => resp.json())
    .catch(() => ({ country: 'us' })) // Default to US if IP lookup fails
    .then((resp) => callback(resp.country));
}

// Initialize intlTelInput with proper settings
const phoneInput = window.intlTelInput(phoneInputField, {
    preferredCountries: ["uk"],
    initialCountry: "auto",
    geoIpLookup: getIp,
    separateDialCode: true, // Ensures the country code is displayed separately
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

// **Ensure country code is added when selecting a country**
phoneInputField.addEventListener("countrychange", function () {
    phoneInputField.value = phoneInput.getNumber();
});

// **Ensure the input field starts with the country code when clicked**
phoneInputField.addEventListener("focus", function () {
    if (phoneInputField.value.trim() === "") {
        phoneInputField.value = phoneInput.getNumber();
    }
});

// **Handle form submission without redirection**
document.getElementById("contact-us-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Stop default form submission

    // Update the phone input with the full number before sending
    phoneInputField.value = phoneInput.getNumber();

    // Get form data
    const formData = new FormData(this);

    // Send the form data to Formspree
    fetch(this.action, {
        method: this.method,
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    }).then(response => {
        if (response.ok) {
            // Show success message
            document.querySelector(".alert-info").style.display = "block";
            document.querySelector(".alert-info").innerHTML = "✅ Thank you! Your message has been sent.";

            // Clear form fields after submission
            this.reset();

            // Reset the phone input field separately
            phoneInputField.value = "";
            phoneInput.setCountry(""); // **Fix: Use empty string instead of "auto"**

        } else {
            // Handle form submission errors
            document.querySelector(".alert-info").style.display = "block";
            document.querySelector(".alert-info").innerHTML = "❌ Oops! Something went wrong. Please try again.";
        }
    }).catch(error => {
        // Handle network errors
        document.querySelector(".alert-info").style.display = "block";
        document.querySelector(".alert-info").innerHTML = "❌ There was a problem submitting your form.";
    });
});

// **Reset form when the page is loaded (prevents old data appearing when going back)**
window.addEventListener("pageshow", function () {
    document.getElementById("contact-us-form").reset(); // Clear form on page load
    phoneInputField.value = ""; // Clear phone field
    phoneInput.setCountry(""); // **Fix applied here**
});
