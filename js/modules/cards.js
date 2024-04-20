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

export default cards;