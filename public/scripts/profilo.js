let more=false;
let page=0;
let query;

let gifConferma=null;
let gifLastSrc="";

let indovinelliID = [];
let minTimeStamp = null;

const view=document.querySelector('.main').dataset.view;

function fetchIndovinelli(){
    const minSorrisi = minTimeStamp===null ? "" : "&minTimeStamp=" + minTimeStamp;
    const utente=document.querySelector('.main').dataset.utente;
    fetch(baseUrl+"/api/getIndovinelli?utente="+utente+minSorrisi).then((risposta) => 
    {
        if(risposta.ok)
            return risposta.json();
    }).then((json)=>{
        for(const indovinello of json)
            if(!indovinelliID.includes(indovinello.id)){
                indovinello.sorrisi = parseInt(indovinello.sorrisi);

                indovinelli[indovinello.id] = {};
                indovinelli[indovinello.id].commentiID = [];
                indovinelli[indovinello.id].minSorrisi = null;
                indovinelli[indovinello.id].minTimeStamp = null;
                indovinelli[indovinello.id].commentiVisualizzati = 0;
                indovinelli[indovinello.id].indovinello = indovinello;

                createIndovinello(indovinello);
                indovinelliID.push(indovinello.id);
                
                if(minTimeStamp === null || toTimeStamp(indovinello.created_at) < minTimeStamp){
                    minTimeStamp = toTimeStamp(indovinello.created_at);
                }
            }
    });
}

function fetchGiphy(q, page){
    let url=baseUrl+"/api/giphyAPI?q="+encodeURIComponent(q)+"&page="+page;
    fetch(url).then((risposta) => 
    {
        if(risposta.ok)
            return risposta.json();
    }).then((json)=>{
        deleteMore();

        if(page==0)
            deleteGif();
            
        for(const gif of json)
            createGif(gif);

        addMore();
    });
}

function deleteGif(){
    document.querySelector('#containerGif').innerHTML="";
}

function resetQueryGif(){
    document.querySelector('#textGiphy').value ="";
}

function deleteMore(){
    if(more === true){
        more=false;
        const a = document.querySelector('#moreGiphy');
        a.parentNode.removeChild(a);
    }
}

function addMore(){
    more=true;

    const a = document.createElement('a');
    a.id="moreGiphy";
    a.classList.add('caricaAltro');
    a.innerText="Carica altro";
    a.addEventListener('click', morePressed);
    document.querySelector('#containerGif').appendChild(a);
    document.querySelector('#containerGif').classList.add('scroll');
}

function morePressed(){
    fetchGiphy(query, ++page);
}

function createGif(gif){

    const div = document.createElement('div');
    div.classList.add("gifFrame");

    const img = document.createElement('img');
    img.classList.add('gifGiphy');
    img.src=gif;
    img.dataset.url=gif;
    img.addEventListener('click', gifSelected);
    div.appendChild(img);

    document.querySelector('#containerGif').appendChild(div);
}

function gifSelected(event){
    if(gifConferma!=null){
        gifConferma.src=gifLastSrc;
        gifConferma.addEventListener('click', gifSelected);
        gifConferma.removeEventListener('click', gifConfirmed);
        gifConferma.parentNode.querySelector("p").remove();
    }

    gifConferma=event.currentTarget;
    gifLastSrc=event.currentTarget.src;

    event.currentTarget.src=baseUrl+"/img/okcheck.png";

    const p = document.createElement('p');
    p.classList.add('confirmMessage');
    p.innerText='Clicca per confermare';
    event.currentTarget.parentNode.appendChild(p);

    event.currentTarget.removeEventListener('click', gifSelected);
    event.currentTarget.addEventListener('click', gifConfirmed);
}

function gifConfirmed(event){
    gifConferma = null;

    const formData = new FormData();
    const url=event.currentTarget.dataset.url;
    formData.append('url', url);

    fetch(baseUrl+"/api/modifyProfileImage", {method: 'post', body: formData}).then((risposta) => 
    {
        if(risposta.ok)
            return risposta.text();
    }).then((text)=>{
        if(text=='1'){
            document.querySelector('#profileImage').src=url;
            deleteGif();
            resetQueryGif();
            closeModaleGiphy();
        }
    });
}

function searchGif(){
    const q = document.querySelector('#textGiphy').value;
    if(q.length>0){
        page=0;
        query = q;
        fetchGiphy(query,0);
    }
}

function showModaleGiphy(){
    modaleGiphy.classList.remove('hidden');
    document.body.classList.add('no-scroll');
}

function closeModaleGiphy(event){
    modaleGiphy.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    deleteGif();
    resetQueryGif();
}

function showModalePassword(){
    modalePassword.classList.remove('hidden');
    document.body.classList.add('no-scroll');
}

function closeModalePassword(){
    modalePassword.classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

function showModaleConferma(){
    modaleConferma.classList.remove('hidden');
    document.body.classList.add('no-scroll');
}

function closeModaleConferma(){
    modaleConferma.classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

fetchIndovinelli();
document.querySelector("#newPost").addEventListener('click', fetchIndovinelli);

const modaleGiphy = document.querySelector('#modalGiphy');
const modalePassword = document.querySelector('#modalPassword');
const modaleConferma = document.querySelector('#modalConferma');

if(!view){
    
    document.querySelector('#profileImage').addEventListener('click', showModaleGiphy);
    document.querySelector('#modalGiphy .closeModale').addEventListener('click', closeModaleGiphy);
    document.querySelector('#cercaGiphy').addEventListener('click', searchGif);

    document.querySelector('#modificaPassword').addEventListener('click', showModalePassword);
    document.querySelector('#modalPassword .closeModale').addEventListener('click', closeModalePassword);

    document.querySelector('#modalConferma .close').addEventListener('click', closeModaleConferma);

    document.querySelector('#textGiphy').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') 
            searchGif(e);
    });

    const passwordElement = document.querySelector('#newPassword');
    const confermaElement = document.querySelector('#confirmPassword'); 
    passwordElement.addEventListener('blur', checkPasswordEvent);
    confermaElement.addEventListener('blur', checkConfermaEvent);
    document.querySelector('#sendNewPassword').addEventListener('click', modificaPassword);
}

function checkPasswordEvent(event){
    const input = event.currentTarget;

    if(input.value.length < 8) {
        input.parentNode.querySelector('.divError').innerText="La password deve contenere almeno 8 caratteri";
        input.parentNode.classList.add('error');
        return false;
    }
    else if(!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(input.value)){
        input.parentNode.querySelector('.divError').innerText="La password deve contenere almeno un numero e un carattere";
        input.parentNode.classList.add('error');
        return false;
    }
    else
        input.parentNode.classList.remove('error');

    return true;
}

function checkPassword(password){
    if(password.length < 8) 
        return false;
    else if(!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(password))
        return false;

    return true;
}

function checkConfermaEvent(event){
    const input = event.currentTarget;
    const password = document.querySelector('#newPassword').value;

    if(checkConferma(password, input.value)) {
        input.parentNode.classList.remove('error');
        return true;
    }
    else{
        input.parentNode.classList.add('error');
        return false;
    }
    
}

function checkConferma(password, conferma){
    if(conferma !== password)
        return false;

    return true;
}

function modificaPassword(event){
    const oldPassword = document.querySelector('#oldPassword');
    const password = document.querySelector('#newPassword');
    const conferma = document.querySelector('#confirmPassword');
    
    if(!checkPassword(password.value) || !checkConferma(password.value, conferma.value))
        return;

    const formData = new FormData();
    formData.append('oldPassword', oldPassword.value);
    formData.append('newPassword', conferma.value);

    fetch("api/modifyPassword", {method: 'post', body: formData}).then((risposta) => 
    {
        if(risposta.ok)
            return risposta.text();
    }).then((text)=>{
        if(text=='0')
            document.querySelector("#oldPasswordContent").classList.add('error');
        else{
            closeModalePassword();

            oldPassword.value="";
            password.value="";
            conferma.value="";

            showModaleConferma();
        }
    });
}