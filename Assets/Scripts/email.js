document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("contact-us-form").addEventListener("submit", function(event) {
        let email = document.getElementById("email").value;
        let confirmEmail = document.getElementById("email-confirmation").value;
        let errorMessage = document.getElementById("error-message");
        
        if (email !== confirmEmail) {
            event.preventDefault(); // Prevent form submission
            errorMessage.style.display = "block";
        } else {
            errorMessage.style.display = "none";
        }
    });
});