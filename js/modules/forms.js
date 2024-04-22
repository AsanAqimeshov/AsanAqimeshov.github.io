import {closeDisplay, openDisplay } from "./modal";
import { postData } from "../services/services";
function forms(formSelector, timerForModel){
    //Формы

    const form = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    form.forEach(item => {
        bindPostData(item);
    });

   
    
    

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
        openDisplay('.modal', timerForModel);
        
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
            closeDisplay('.modal');
        },4000)

    }

    fetch('http://localhost:3000/menu')
    .then(data =>data.json())
    .then(res => console.log(res));

}
export default forms;