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

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            const tagName = this.dataset.category;

            if (this.checked) {
                selectedTags.add(tagName);
            } else {
                selectedTags.delete(tagName);
            }

            filterRecipes();
        });
    });

    searchInput.addEventListener("keyup", function () {
        filterRecipes();
    });

    clearButton.addEventListener("click", function () {
        selectedTags.clear();
        checkboxes.forEach(checkbox => (checkbox.checked = false));
        searchInput.value = "";
        filterRecipes();
    });

    function filterRecipes() {
        let searchFilter = searchInput.value.toUpperCase();
        let recipesFound = false;

        recipes.forEach(recipe => {
            const foodTags = recipe.dataset.tags.split(",");
            const titleElement = recipe.getElementsByClassName("food-title")[0];
            const titleText = titleElement ? titleElement.textContent || titleElement.innerText : "";

            const matchesSearch = titleText.toUpperCase().includes(searchFilter);

            const matchesAllTags = [...selectedTags].every(tag => foodTags.includes(tag));

            if ((selectedTags.size === 0 || matchesAllTags) && matchesSearch) {
                recipe.style.display = "block";
                recipesFound = true;
            } else {
                recipe.style.display = "none";
            }
        });

        noResultsMessage.style.display = recipesFound ? "none" : "block";
    }
});