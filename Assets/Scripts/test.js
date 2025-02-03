document.getElementById("subscribe-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email-input").value;
    const url = "https://script.google.com/macros/s/AKfycbzF-hayYLt1sX9oVi2Enf0O4Emr9s74EDnv7_7b6haRoGX6rK4Jzn3Wh6HwYmnOdQX9/exec"; // Use the new script URL

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert("Subscription successful!");
        } else {
            alert("Error: " + data.message);
        }
    })
    .catch(error => console.error("Error:", error));
});
