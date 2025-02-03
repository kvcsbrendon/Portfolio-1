document.getElementById("subscribe-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email-input").value;
    const url = "https://script.google.com/macros/s/AKfycbz8t6mLWzPpBwNNcN0IlXj0Q3owyytPIt5foydhBU_Z1Ub3ioZclHvoDeOKHJIc8Ibg/exec"; // Replace with your new deployed script URL

    fetch(url, {
        method: "POST",
        redirect: "follow", // Fix redirect issues
        headers: {
            "Content-Type": "text/plain;charset=utf-8", // Ensure compatibility
        },
        body: JSON.stringify({ email: email }) // Send JSON payload
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
