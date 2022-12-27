const sliders = (slides, direction, previos, next, paused = false, time) => {
    let slideIndex = 1; //самый первый слайд


    const items = document.querySelectorAll(slides);


    function showSlides(n) {
        if (n > items.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = items.length;
        }

        items.forEach(item => {
            item.classList.add("animated");
            item.style.display = 'none';
        });

        items[slideIndex - 1].style.display = 'block';// items[slideIndex - 1] --> текущий слайд
    }

    showSlides(slideIndex);//инициализация 

    function plusSlides(n) { //вперёд и назад +1 или -1
        showSlides(slideIndex += n);
    }

    try { //если селекторы кнопок не были переданны, то этот блок кода не сработает и не сломает всю остальную логику в скриптах 
        const prevBtn = document.querySelector(previos),
              nextBtn = document.querySelector(next);
             
        prevBtn.addEventListener('click', () => {
            plusSlides(-1);
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        });
        
        nextBtn.addEventListener('click', () => {
            plusSlides(1);
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        });  
    } catch(e){}

    function activateAnimation(time) {
        if (direction === 'vertical') {
            paused = setInterval(function() {
                plusSlides(1);
                items[slideIndex - 1].classList.add('slideInDown');
            }, time);
        } else {
            paused = setInterval(function() {
                plusSlides(1);
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            }, time);
        }
    }

    activateAnimation(time);

    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation(time);
    });
};


export default sliders;
