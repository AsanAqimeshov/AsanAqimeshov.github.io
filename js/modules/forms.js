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
module.exports = forms;