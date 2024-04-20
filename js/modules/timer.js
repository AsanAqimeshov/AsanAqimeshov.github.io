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

export default timer;
