function tabs(tabSelector,tabContent,tabParent,activTab){
    const tabs = document.querySelectorAll(tabSelector);         //менюшкадагы разделдар
    const tabsContent = document.querySelectorAll(tabContent);       //сурет турган жер
    const tabsParent = document.querySelector(tabParent);     //общий блок менюшек

    function hideTabContent  (){
        tabsContent.forEach(item=>{         //суреттер блогында турган әр эдементтерді өшіре тұрдық
            item.style.display='none';
        });
        tabs.forEach(item =>{
            item.classList.remove(activTab);    //менюдегі әр разделдың активносттігін өшіріп шықтық
        });
    }
    function showTabContent(i = 0){                 //поумолчанию 0 турады деген сөз (es6-стандарт)
        tabsContent[i].style.display ='block';      //опроеделенный суретті көрсеттік
        tabs[i].classList.add(activTab);        //және соответствующий меню разделына активность костык
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click',(e)=>{      
        const target = e.target;
        if(target && target.classList.contains(tabSelector.slice(1))){
            tabs.forEach((el,i)=>{
                if (target == el){
                    hideTabContent();       //сперва скрываем все элементы 
                    showTabContent(i);      // потом показываем именно тот который нам нужен
                }
            });
        }
    });
}

export default tabs;