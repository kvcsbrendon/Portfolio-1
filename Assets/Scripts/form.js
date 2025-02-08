document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-us-form");
    const emailInput = document.getElementById("email");
    const confirmEmailInput = document.getElementById("email-confirmation");
    const phoneInputField = document.querySelector("#phone");
    const phoneRadio = document.getElementById("contact-phone");
    const emailRadio = document.getElementById("contact-email");
    const alertBox = document.querySelector(".alert-info");
    
    function getIp(callback) {
        fetch('https://ipinfo.io/json?token=2620d0b0460b0f', {
            headers: { 'Accept': 'application/json' }
        })
        .then((resp) => resp.json())
        .catch(() => ({ country: 'us' }))
        .then((resp) => callback(resp.country));
    }
    
    const phoneInput = window.intlTelInput(phoneInputField, {
        preferredCountries: ["uk"],
        initialCountry: "auto",
        geoIpLookup: getIp,
        separateDialCode: true,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });

    phoneInputField.addEventListener("countrychange", function () {
        phoneInputField.value = phoneInput.getNumber();
    });

    phoneInputField.addEventListener("focus", function () {
        if (phoneInputField.value.trim() === "") {
            phoneInputField.value = phoneInput.getNumber();
        }
    });

    function validatePhoneInput() {
        alertBox.innerHTML = ""
        if (phoneRadio.checked && !phoneInput.isValidNumber()) {
            alertBox.innerHTML = "❌ Please enter a valid phone number before submitting.";
            alertBox.style.display = "block";
            return false;
        }
        return true;
    }

    form.addEventListener("submit", function (event) {
        let email = emailInput.value.trim();
        let confirmEmail = confirmEmailInput ? confirmEmailInput.value.trim() : email;
        let emailPattern = /^[^\s@]+@aston\.ac\.uk$/;

        if (confirmEmailInput && email !== confirmEmail) {
            event.preventDefault();
            alertBox.innerHTML = "<br>❌ Emails do not match!";
            alertBox.style.display = "block";
            confirmEmailInput.focus();
            return false;
        }

        if (!emailPattern.test(email)) {
            event.preventDefault();
            alertBox.innerHTML = "<br>❌ Please enter a valid Aston University email (must end with @aston.ac.uk).";
            alertBox.style.display = "block";
            emailInput.focus();
            return false;
        }

        event.preventDefault();
        if (!validatePhoneInput()) {
            return false;
        }
        
        phoneInputField.value = phoneInput.getNumber();
        const formData = new FormData(this);
        
        fetch(this.action, {
            method: this.method,
            body: formData,
            headers: { "Accept": "application/json" }
        }).then(response => {
            if (response.ok) {
                alertBox.innerHTML = "<br>✅ Thank you! Your message has been sent. Refreshing...";
                alertBox.style.display = "block";
                alertBox.focus();
                setTimeout(() => { window.location.reload(); }, 2000);
            } else {
                alertBox.innerHTML = "<br>❌ Oops! Something went wrong. Please try again.";
                alertBox.style.display = "block";
            }
        }).catch(error => {
            alertBox.innerHTML = "<br>❌ There was a problem submitting your form.";
            alertBox.style.display = "block";
        });
    });
    
    phoneRadio.addEventListener("change", validatePhoneInput);
    emailRadio.addEventListener("change", validatePhoneInput);
});