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

module.exports = tabs;