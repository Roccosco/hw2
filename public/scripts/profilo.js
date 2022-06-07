let more=false;
let page=0;
let query;

function fetchGiphy(q, page){
    let url="api/giphyAPI?q="+encodeURIComponent(q)+"&page="+page;
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
    event.currentTarget.src="img/okcheck.png";

    const p = document.createElement('p');
    p.classList.add('confirmMessage');
    p.innerText='Clicca per confermare';
    event.currentTarget.parentNode.appendChild(p);

    event.currentTarget.removeEventListener('click', gifSelected);
    event.currentTarget.addEventListener('click', gifConfirmed);
}

function gifConfirmed(event){
    const formData = new FormData();
    const url=event.currentTarget.dataset.url;
    formData.append('url', url);

    fetch("api/modifyProfileImage", {method: 'post', body: formData}).then((risposta) => 
    {
        if(risposta.ok)
            return risposta.text();
    }).then((text)=>{
        if(text=='1'){
            document.querySelector('#profileImage').src=url;
            deleteGif();
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

const modaleGiphy = document.querySelector('#modalGiphy');
const modalePassword = document.querySelector('#modalPassword');
const modaleConferma = document.querySelector('#modalConferma');
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

document.querySelector('#newPassword').addEventListener('blur', checkPasswordEvent);
document.querySelector('#confirmPassword').addEventListener('blur', checkConfermaEvent);
document.querySelector('#sendNewPassword').addEventListener('click', modificaPassword);

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
    const oldPassword = document.querySelector('#oldPassword').value;
    const password = document.querySelector('#newPassword').value;
    const conferma = document.querySelector('#confirmPassword').value;
    
    if(!checkPassword(password) || !checkConferma(password, conferma))
        return;

    const formData = new FormData();
    formData.append('oldPassword', oldPassword);
    formData.append('newPassword', conferma);

    fetch("api/modifyPassword", {method: 'post', body: formData}).then((risposta) => 
    {
        if(risposta.ok)
            return risposta.text();
    }).then((text)=>{
        if(text=='0')
            document.querySelector("#oldPasswordContent").classList.add('error');
        else{
            closeModalePassword();
            showModaleConferma();
        }
    });
}