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
export default modal;