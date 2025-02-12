document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot'); 
    const totalSlides = slides.length;
    let interval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        if (dots.length) {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    }

    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    const sliderContainer = document.querySelector('.slider-container');

    function startAutoSlide() {
        if (window.innerWidth > 768) {
            interval = setInterval(nextSlide, 3000);
        }
        else {
            interval = setInterval(nextSlide, 5000);
        }
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }
    

    if (sliderContainer) {
        sliderContainer.addEventListener('mouseover', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }

    let touchStartX = 0, touchStartY = 0;
    let touchEndX = 0, touchEndY = 0;

    function handleSwipe() {
        let deltaX = touchEndX - touchStartX;
        let deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) { 
            if (deltaX < 0) nextSlide();
            if (deltaX > 0) prevSlide();
        }
    }

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    showSlide(currentIndex);
});
