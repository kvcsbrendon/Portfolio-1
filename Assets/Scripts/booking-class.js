document.addEventListener("DOMContentLoaded", function () {
    const datePicker = document.getElementById('date-Picker');
    const slotsContainer = document.getElementById('slotsContainer');
    const selectedSlotInput = document.getElementById('selectedSlot');
    const timeLabel = document.getElementById('time-label');

    const availableSlots = {
        "09:00 AM": true,
        "10:00 AM": true,
        "11:00 AM": false,
        "01:00 PM": true,
        "02:00 PM": true,
        "03:00 PM": false,
        "04:00 PM": true
    };

    function setMinDate() {
        const today = new Date();
        today.setDate(today.getDate() + 2);
        
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const minDate = `${year}-${month}-${day}`;
        
        datePicker.setAttribute('min', minDate);
    }

    setMinDate();


    datePicker.addEventListener('change', function () {
        slotsContainer.innerHTML = "";
        slotsContainer.style.display = 'block';
        timeLabel.classList.remove('hidden');

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
