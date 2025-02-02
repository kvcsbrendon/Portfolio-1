document.addEventListener("DOMContentLoaded", function () {
    const datePicker = document.getElementById('datePicker');
    const slotsContainer = document.getElementById('slotsContainer');
    const selectedSlotInput = document.getElementById('selectedSlot');
    const timeLabel = document.getElementById('timeLabel');

    if (!timeLabel) {
        console.error("Error: #timeLabel not found in the DOM!");
        return;
    }

    if (!datePicker) {
        console.error("Error: #datePicker not found in the DOM!");
        return;
    }

    const availableSlots = {
        "09:00 AM": true,
        "10:00 AM": true,
        "11:00 AM": false,
        "01:00 PM": true,
        "02:00 PM": true,
        "03:00 PM": false,
        "04:00 PM": true
    };

    datePicker.addEventListener('change', function () {
        slotsContainer.innerHTML = "";
        slotsContainer.style.display = 'block';
        timeLabel.classList.remove('hidden'); // This is where the error was happening

        for (const [time, isAvailable] of Object.entries(availableSlots)) {
            const slot = document.createElement('div');
            slot.textContent = time;
            slot.classList.add('slot');

            if (!isAvailable) {
                slot.classList.add('unavailable');
            } else {
                slot.addEventListener('click', function () {
                    document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
                    slot.classList.add('selected');
                    selectedSlotInput.value = time;
                });
            }

            slotsContainer.appendChild(slot);
        }
    });
});
