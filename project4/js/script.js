
document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            let href = this.getAttribute('href').substring(1);

            const scrollTarget = document.getElementById(href);

            const topOffset = 0;
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;

            window.scrollBy ({
                top: offsetPosition,
                behavior: 'smooth',
            });
        });
    });

    // function smoothVerticalScroll (e, time, where) {
    //     let eTop = e.getBoundingClientRect().top;
    //     let eAmt = eTop / 100;
    //     let curTime = 0;
    //     while (curTime <= time) {
    //         window.setTimeout(smoothB, curTime, eAmt, where);
    //         curTime += time / 100;
    //     }
    // }

    // function smoothB (eAmt, where) {
    //     if (where == 'center' || where == '')
    //         window.scrollBy(0, eAmt / 2);
    //     if (where == 'top')
    //         window.scrollBy(0, eAmt);
    // }

    // document.querySelectorAll('a[href^="#"]').forEach(link => {
    //     link.addEventListener('click', () => smoothVerticalScroll (link, 1500, 'center'));
    // });

    const burger = document.querySelectorAll('.hamburger');
    const menu = document.querySelector('.menu');
    const backdrop = document.querySelector('.backdrop');
    const menuLink = document.querySelectorAll('.menu__link');

    menuLink.forEach(item => {
        item.addEventListener('click', () => {
            if (menu.classList.contains('show')) {
                menu.classList.remove('show');
                backdrop.style.display = 'none';
                burger.forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    });

    burger.forEach(item => {
        item.addEventListener('click', (e) => {
            if (item === e.target) {
                item.classList.toggle('active');
                menu.classList.toggle('show');
                backdrop.style.display = 'block';
            }
        });
    });

    //Select

    // const select = new Select('#select', {
    //     placeholder: 'Выберите услугу',
    //     data: [
    //         {id: '1', value: 'Мужская стрижка'},
    //         {id: '2', value: 'Стрижка бороды'},
    //         {id: '3', value: 'Оформление бороды'},
    //         {id: '4', value: 'Тонирование'},
    //         {id: '5', value: 'Детская стрижка'},
    //         {id: '6', value: 'Мужская укладка'}
    //     ],
    // });

    // const select2 = new Select('#select2', {
    //     placeholder: 'Выберите мастера',
    //     data: [
    //         {id: '1', value: 'Мастер Максим'},
    //         {id: '2', value: 'Мастер Иван'},
    //         {id: '3', value: 'Мастер Руслан'},
    //     ],
    // });

    document.querySelectorAll('.select').forEach(select => {
        let currentSelect = select.querySelector('.select__current'),
            arrow = select.querySelector('.svg-icon'),
            selectList = select.querySelector('.select__list'),
            selectInput = select.querySelector('.select__input'),
            selectItem = select.querySelectorAll('.select__item');

        currentSelect.addEventListener('click', (e) => {
            e.preventDefault();
            selectList.classList.toggle('select__list-show');
            arrow.classList.toggle('up');
        });

        function selectListHide () {
            selectList.classList.remove('select__list-show');
        }

        selectItem.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                let itemValue = item.getAttribute('data-value');

                let itemText = item.textContent;

                selectInput.value = itemValue;

                currentSelect.textContent = itemText;

                selectListHide();
            });
        });

        document.addEventListener('mouseup', (e) => {
            if (!select.contains(e.target)) {
                selectListHide();
            }
            arrow.classList.remove('up');
        });
    });

    backdrop.addEventListener('click', () => {
        if (menu.classList.contains('show')) {
            burger.forEach(item => {
                item.classList.remove('active');
            });
            menu.classList.remove('show');
            backdrop.style.display = 'none';
        }
    });

    const swiper1 = new Swiper('.swiper-1', {
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 20,
        loop: true,
        speed: 600,
        navigation: {
            prevEl: '.button-prev',
            nextEl: '.button-next',
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
            },
        }
    });

    const swiper2 = new Swiper('.swiper-2', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        loop: true,
        speed: 700,
        navigation: {
            prevEl: '.button-prev-2',
            nextEl: '.button-next-2',
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
            },
        }
    });

    const swiper3 = new Swiper ('.swiper-3', {
        slidesPerView: 1,
        loop: true,
        speed: 700,
        centeredSlides: true,
        navigation: {
            prevEl: '.button-prev-3',
            nextEl: '.button-next-3',
        },
    });

    $(function(){
        $("#datepicker").datepicker({
            minDate: new Date(),
            minHours: 9,
            maxHours: 18,
            minutesStep: 30
        });
    });

    const showInMap = document.querySelector('.btn__location'),
          hover = document.querySelector('.location__info');


    showInMap.addEventListener('click', () => {
        hover.style.display = 'none';
    });

    //Form

    const formMain = document.querySelector('.choose__form');
    const button = document.querySelector('.choose__btn');
    const modal = document.querySelector('.modal');
    const close = document.querySelector('.modal__close');
    const head = document.querySelector('.modal__title');
    const text = document.querySelector('.modal__text');

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === close) {
            modal.classList.remove('show');
        }
    });

    const postData = async (url, data) => {
        const response = await fetch(url, {
            method: "POST",
            body: data
        });

        if (!response.ok) {
            throw new Error ('Something went wrong');
        }
        return await response.text();
    };

    function bindPostData (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(form);

            postData('mailer/smart.php', formData)
            .then((response) => {
                console.log('Hello');
                console.log(response);
                modal.classList.add('show');
            })
            .catch((err) => {
                console.log(err);
                modal.classList.add('show');
                head.textContent = 'Something went wrong';
                text.style.display = 'none';
            })
            .finally(() => {
                form.reset();
            });
        });
    }

    bindPostData(formMain);
});