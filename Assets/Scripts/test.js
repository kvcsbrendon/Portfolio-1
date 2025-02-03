document.getElementById("subscribe-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email-input").value;
    const url = "https://script.google.com/macros/s/AKfycbxowPv05i1W8WzN5xg6nBbaRar45dn8dlaFO_tJ7j8md4k-f8tm25zuV4T4PwH_r101/exec"; // Use your updated URL

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
