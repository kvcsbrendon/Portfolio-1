document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".tags-container .tag");
    const recipes = document.querySelectorAll(".recipe");
    const clearButton = document.getElementById("show-all");
    const searchInput = document.getElementById("mySearch");
    const noResultsMessage = document.createElement("p");
    noResultsMessage.id = "no-results";
    noResultsMessage.textContent = "No recipes found.";
    noResultsMessage.style.display = "none";
    noResultsMessage.style.textAlign = "center";
    noResultsMessage.style.fontSize = "18px";
    noResultsMessage.style.color = "#888";
    document.querySelector(".recipes-container").appendChild(noResultsMessage);

    let selectedTags = new Set();

    // Event listener for checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            const tagName = this.dataset.category;

            // Toggle tag selection
            if (this.checked) {
                selectedTags.add(tagName);
            } else {
                selectedTags.delete(tagName);
            }

            filterRecipes(); // Call filtering function
        });
    });

    // Event listener for search input
    searchInput.addEventListener("keyup", function () {
        filterRecipes();
    });

    // Clear all filters
    clearButton.addEventListener("click", function () {
        selectedTags.clear();
        checkboxes.forEach(checkbox => (checkbox.checked = false));
        searchInput.value = ""; // Clear search bar
        filterRecipes();
    });

    // Main function to filter recipes
    function filterRecipes() {
        let searchFilter = searchInput.value.toUpperCase();
        let recipesFound = false; // Track if any recipe matches

        recipes.forEach(recipe => {
            const foodTags = recipe.dataset.tags.split(",");
            const titleElement = recipe.getElementsByClassName("food-title")[0];
            const titleText = titleElement ? titleElement.textContent || titleElement.innerText : "";

            // Check if search filter matches food title
            const matchesSearch = titleText.toUpperCase().includes(searchFilter);

            // Check if recipe matches all selected tags
            const matchesAllTags = [...selectedTags].every(tag => foodTags.includes(tag));

            // Show or hide the recipe based on both conditions
            if ((selectedTags.size === 0 || matchesAllTags) && matchesSearch) {
                recipe.style.display = "block";
                recipesFound = true; // A recipe was found
            } else {
                recipe.style.display = "none";
            }
        });

        // Show "No Results Found" if no recipes match
        noResultsMessage.style.display = recipesFound ? "none" : "block";
    }
});