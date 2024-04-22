function openDisplay(modalSelector, timerForModel){
    const modalBlock = document.querySelector(modalSelector);
    modalBlock.style.display = 'block';
    modalBlock.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';    //запрет на скролл страницы
    console.log(timerForModel)      //для себя проверять как работает второй аргумент
    if(timerForModel){
        clearInterval(timerForModel);
    }
}

function closeDisplay(modalSelector){
    const modalBlock = document.querySelector(modalSelector);
    modalBlock.style.display = 'none';
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, timerForModel){
    //Modal-окно
    const modalBtn = document.querySelectorAll(triggerSelector);
    const modalBlock = document.querySelector(modalSelector);
    // const modalClose = document.querySelector('[data-close]');
    

    modalBtn.forEach(el=>el.addEventListener('click',()=>openDisplay(modalSelector, timerForModel)));  //когда в аргументе ненужно сразу вызывать но нужно передать аргумент то можем обернуть в коллбак

   

    // modalClose.addEventListener('click',closeDisplay);

    //сюда еще нужно написать при нажатий на место вне модуля модуль закрывается

    modalBlock.addEventListener('click', (event)=>{
        if(modalBlock===event.target || event.target.getAttribute('data-close') == ''){
            closeDisplay(modalSelector);
        }
    });


 

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
            openDisplay(modalSelector, timerForModel);
            window.removeEventListener('scroll',modalInScroll);
        }
    }

    window.addEventListener('scroll',modalInScroll);

}
export default modal;
export {closeDisplay};  //экспортируем их в модуль forms - так как их там тоже используем
export {openDisplay};   //там мы их принимаем(импортируем)