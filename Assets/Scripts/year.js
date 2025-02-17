document.addEventListener('DOMContentLoaded', function() {
    var currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
    var yearData = "RXhjZXB0IHlvdSE=";
    var triggerEvent = new Date().getMilliseconds();

    if (triggerEvent % 5 === 0) {
        let yearMessage = atob(yearData);

        let yearContainer = document.createElement("div");
        yearContainer.id = "wrapper";

        let yearText = document.createElement("p");
        yearText.id = "meta-info";
        yearText.innerText = yearMessage;

        yearContainer.appendChild(yearText);
        let target = document.querySelector(".title-motto"); 
        if (target) target.appendChild(yearContainer);

        yearText.style.display = "block";
    }
});
