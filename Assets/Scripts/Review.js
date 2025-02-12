document.addEventListener("DOMContentLoaded", function () {
    const reviewsContainer = document.querySelector(".reviews-container");
    const reviewForm = document.querySelector(".review-form");

    if (!reviewsContainer) return;

    const stars = document.querySelectorAll(".star");
    const reviewerName = document.getElementById("reviewer-name");
    const reviewText = document.getElementById("review-text");
    const submitButton = document.getElementById("submit-review");

    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener("click", function () {
            selectedRating = parseInt(this.getAttribute("data-value"));
            stars.forEach((s, index) => {
                s.innerHTML = index < selectedRating 
                    ? '<i class="bi bi-star-fill"></i>' 
                    : '<i class="bi bi-star"></i>';
            });
        });
    });

    submitButton.addEventListener("click", function () {
        const name = reviewerName.value.trim();
        const review = reviewText.value.trim();

        if (!name || !review || selectedRating === 0) {
            alert("Please fill in all fields and select a rating!");
            return;
        }

        const newReview = document.createElement("div");
        newReview.classList.add("review");

        let starsHTML = "";
        for (let i = 0; i < selectedRating; i++) {
            starsHTML += '<i class="bi bi-star-fill"></i>';
        }
        for (let i = selectedRating; i < 5; i++) {
            starsHTML += '<i class="bi bi-star"></i>';
        }

        newReview.innerHTML = `
            <div class="stars">${starsHTML}</div>
            <p>"${review}"</p>
            <span class="reviewer">- ${name}</span>
        `;

        reviewsContainer.insertBefore(newReview, reviewForm);
        newReview.scrollIntoView({ behavior: "smooth", block: "start" });

        reviewerName.value = "";
        reviewText.value = "";
        selectedRating = 0;
        stars.forEach(s => {
            s.innerHTML = '<i class="bi bi-star"></i>';
        });
    });
});
