    import tabs from'./modules/tabs';
    import modal from'./modules/modal';
    import timer from'./modules/timer';
    import cards from'./modules/cards';
    import calc from'./modules/calc';
    import forms from'./modules/forms';
    import slider from'./modules/slider';
    import { openDisplay } from './modules/modal';

window.addEventListener('DOMContentLoaded',()=>{
    const timerForModel = setTimeout(()=>openDisplay('.modal',timerForModel),1000);     

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items','tabheader__item_active');
    modal('[data-modal]','.modal', timerForModel);
    timer('.timer','2024-05-01');
    cards();
    calc();
    forms('form',timerForModel);
    slider();
});