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

async function getResource(url) {
    let res = await fetch(url);
    if (!res.ok) {              //если ответ от промиса - НЕ ОК (то есть если что то не так)
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
}

export {postData};
export {getResource};