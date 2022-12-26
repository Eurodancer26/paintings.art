const modals = () => {
    let btnPressed = false;

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const triggers = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              present = document.querySelector('.fixed-gift'),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();
    
        triggers.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                btnPressed = true;

                if (destroy) {
                    item.remove(); 
                }

                windows.forEach(window => {
                    window.style.display = 'none';
                    window.classList.add('animated', 'fadeIn');
                    if (window.style.display == 'none') {
                        present.style.display = 'inline';
                    }
                });
                
                openModal();
            });
        });
    
        modal.addEventListener('click', (e) => {
            if (e.target == modal) {
                closeModal();
            }
        });

        close.addEventListener('click', closeModal);


        function openModal() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
            present.style.display = 'inline';
            if (modal.style.display == 'block') {
                present.style.display = 'none';
            }
            
        }
        
        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            windows.forEach(window => {
                window.style.display = 'none';
                if (window.style.display == 'none') {
                    present.style.display = 'inline';
                }
            });
            document.body.style.marginRight = `0px`;

        }
    }

    function showModalByTime(modalSelector, time, presentSelector, destroy = false) {
        setTimeout(function() {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = "block";// true
                }
            });

            if (!display) {//false
                document.querySelector(modalSelector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
                document.querySelector(modalSelector).classList.add('animated', 'fadeIn');
                if (document.querySelector(modalSelector).style.display == 'block') {
                    document.querySelector(presentSelector).style.display = 'none'; 
                } 

            }
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight + 1 >= scrollHeight)) {
                document.querySelector(selector).click();
            }//для работы и встарых новых браузерах
            // if (!btnPreset && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) { 
            //     document.querySelector(selector).click();
            //     console.log('click');
            // }//в новых
        });
    }

    showModalByTime('.popup-consultation', 3000, '.fixed-gift', true);
    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
};

export default modals;