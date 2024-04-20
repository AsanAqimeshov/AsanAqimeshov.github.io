/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    // Calculator

    const result = document.querySelector('.calculating__result span');
    
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards(){
    class Menu{
        constructor(src,alt,title,descr,price,parentSelector,...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.classes = classes; //массив болады так как в аргументе рест оператор
            this.price = price;
            this.transfer = 27; 
            this.parent = document.querySelector(parentSelector);
            this.converter();
        }
        converter(){
            this.price = this.price*this.transfer;
        }
        render(){
            const element = document.createElement('div');
            if(this.classes == 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            }
            else{this.classes.forEach(addClass=>element.classList.add(addClass));}
            

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);      
        }
     }

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({src,alt,title,descr,price}) => {      //серверден келген массивтың ішіндегі обьекттын свойстволарын диструктуризируем
                new Menu(src,alt,title,descr,price, ".menu .container").render();   //сюда ставиться свойства тех обьектов
            });
        });

    async function getResource(url) {
        let res = await fetch(url);
        if (!res.ok) {              //если ответ от промиса - НЕ ОК (то есть если что то не так)
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

//     axios.get('http://localhost:3000/menu',)        //axios лучше тем что при необходимости сам преобразует из json формата, и проверки статуса
//     .then(data => {                                 //по типу !res.ok уже заложен внутри и многие другие возможности...
//         data.data.forEach(({src,alt,title,descr,price}) => {
//             new Menu(src,alt,title,descr,price, ".menu .container").render();
//         });
//     })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function forms(){
    //Формы

    const form = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    form.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url,data)=>{//минус fetch-a в том что промис который запускается с помошью него-не прейдет в состояние отклонено(rejected) изза ответа HTTP которая считается ошибкой(404 и т.д)
        let res = await fetch (url,{
                method:'POST',          //даже если форма не отправился промис отработает нормально (все равно отработает resolve), единственный что поменяется в ошибку - это статус
                headers:{               //он выкинет ошибку толко тогда - когда что то помешал сделать запрос(например нет сети)
                    'Content-Type':'application/json'
                },
                body:data
            });
        return await res.json();
    };

    
    

    function bindPostData(form){
        form.addEventListener('submit',(e)=>{
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display:block;
                margin:0 auto;
            `;
            
            form.insertAdjacentElement('afterend', statusMessage);      //для того чтобы в форме который на странице - спиннер был под формой

            // const request = new XMLHttpRequest();
            // request.open('POST','server.php')

            


            // request.setRequestHeader('Content-type','application/json')     // request.setRequestHeader('Content-type','multipart/form-data'); - обычный заголовок

            const formData = new FormData(form);  //надо бакендщика в каком формате отправлять(FormData, JSON)? При использований FormData надо проверить наличие атрибута name в форме

            const json = JSON.stringify(Object.fromEntries(formData.entries()));          

            // const t = {a:0,b:'p'};
            // console.log(JSON.stringify(Object.entries(t)))
            // console.log(Object.entries(t))
            // console.log(t)

            postData('http://localhost:3000/requests',json)
            .then(data=>{
                console.log(data)
                showThanks(message.success);
                statusMessage.remove();    //исчезает сообщение
            }).catch(()=>{
                showThanks(message.failure);
            }).finally(()=>{
                form.reset();                                   //очищаем данные в форме
            });
                
            // request.addEventListener('load',()=>{
            //     if(request.status ===200){              //если запрос успешно выполнен
            //         console.log(request.response)
            //         showThanks(message.success);
            //         form.reset();                                   //очищаем данные в форме
            //         statusMessage.remove();    //исчезает сообщение
            //     }
            //     else{
            //         showThanks(message.failure);
            //     }
            // })



        })
    }
    // postData(form);
    function showThanks (message){
        const modalDialog = document.querySelector('.modal__dialog');
        modalDialog.style.display = 'none';         //надо просто скрыть, если удалим содержимое то потом использовать форму уже не сможем
        openDisplay();
        
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class = 'modal__content'>
                <div data-close class="modal__close">×</div>        <!--сюда навешать событие не получится , т.к появился это динамический-->
                <div class = 'modal__title'>${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);   //тут размещаем в модалку наш созданный thanksModal
        setTimeout(()=>{
            thanksModal.remove();
            modalDialog.style.display = 'block';
            closeDisplay();
        },4000)

    }

    fetch('http://localhost:3000/menu')
    .then(data =>data.json())
    .then(res => console.log(res));

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal(){
    //Modal-окно
    const modalBtn = document.querySelectorAll('[data-modal]');
    const modalBlock = document.querySelector('.modal');
    // const modalClose = document.querySelector('[data-close]');
    function openDisplay(){
        modalBlock.style.display = 'block';
        modalBlock.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';    //запрет на скролл страницы
        clearInterval(timerForModel);
    }
    modalBtn.forEach(el=>el.addEventListener('click',openDisplay));

    function closeDisplay(){
        modalBlock.style.display = 'none';
        document.body.style.overflow = '';
    }

    // modalClose.addEventListener('click',closeDisplay);

    modalBlock.addEventListener('click', (event)=>{
        if(modalBlock===event.target || event.target.getAttribute('data-close') == ''){
            closeDisplay();
        }
    });

    const timerForModel = setTimeout(openDisplay,1000);     

 

    // window.addEventListener('scroll',()=>{
    //     if(window.pageYOffset+document.documentElement.clientHeight >=document.documentElement.scrollHeight){
    //         openDisplay();
    //         window.removeEventListener('scroll',()=>{
    //             if(window.pageYOffset+document.documentElement.clientHeight >=document.documentElement.scrollHeight){
    //                 openDisplay();
    //             }
    //         });
    //     }
    // });

    function modalInScroll(){
        if(window.pageYOffset+document.documentElement.clientHeight >=document.documentElement.scrollHeight){
            openDisplay();
            window.removeEventListener('scroll',modalInScroll);
        }
    }

    window.addEventListener('scroll',modalInScroll);

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
    // Slider

    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.offer__slider-inner');

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent =  `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent =  slideIndex;
    }
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; // Если хотите - добавьте в стили, но иногда у нас нет доступа к стилям
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == (deleteNotDigits(width) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent =  `0${slideIndex}`;
            } else {
                current.textContent =  slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[slideIndex-1].style.opacity = 1;
        });
    });

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(){
    const tabs = document.querySelectorAll('.tabheader__item');         //менюшкадагы разделдар
    const tabsContent = document.querySelectorAll('.tabcontent');       //сурет турган жер
    const tabsParent = document.querySelector('.tabheader__items');     //общий блок менюшек

    function hideTabContent  (){
        tabsContent.forEach(item=>{         //суреттер блогында турган әр эдементтерді өшіре тұрдық
            item.style.display='none';
        });
        tabs.forEach(item =>{
            item.classList.remove('tabheader__item_active');    //менюдегі әр разделдың активносттігін өшіріп шықтық
        });
    }
    function showTabContent(i = 0){                 //поумолчанию 0 турады деген сөз (es6-стандарт)
        tabsContent[i].style.display ='block';      //опроеделенный суретті көрсеттік
        tabs[i].classList.add('tabheader__item_active');        //және соответствующий меню разделына активность костык
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click',(e)=>{      
        const target = e.target;
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((el,i)=>{
                if (target == el){
                    hideTabContent();       //сперва скрываем все элементы 
                    showTabContent(i);      // потом показываем именно тот который нам нужен
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(){
    const deadline = '2024-05-27';
    function getData(input){
        const dt = Date.parse(input)-Date.parse(new Date);
        const day = Math.floor(dt/(1000*60*60*24));
        const hours = Math.floor(dt/(1000*60*60)%24);
        const minuts = Math.floor(dt/(1000*60)%60);
        const sec = Math.floor(dt/(1000)%60);
        return {dt,day,hours,minuts,sec};
    }
    function zero(num){
        if(num>0 && num<10){
            return `0${num}`;
        }else return num;
    }
    function setTime(selector){
        const time = document.querySelector(selector);
        const day = time.querySelector('#days');
        const hours = time.querySelector('#hours');
        const minutes = time.querySelector('#minutes');
        const sec = time.querySelector('#seconds');
        update();
        setInterval(update,1000);
        function update(){
            const date = getData(deadline);
            day.textContent = zero(date.day);
            hours.textContent = zero(date.hours);
            minutes.textContent = zero(date.minuts);
            sec.textContent = zero(date.sec);
            if(date.dt==0){clearInterval();}
        }
    }
    setTime('.timer',getData(deadline));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded',()=>{
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
    const modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
    const timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
    const cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
    const calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
    const forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
    const slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slider();
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map