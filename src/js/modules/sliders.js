const sliders = (slides, direction, previos, next) => {
    let slideIndex = 1; //самый первый слайд
    const items = document.querySelectorAll(slides),
          prevBtn = document.querySelector(previos),
          nextBtn = document.querySelector(next);

    function showSlides(n) {
        if (n > items.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = items.length;
        }

        items.forEach(item => {
            item.classList("animated");
            item.style.display = 'none';
        });

        items[slideIndex - 1].style.display = 'block';
    }

    showSlides(slideIndex);
};

export default sliders;
