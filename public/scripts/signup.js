const errori = {};

function checkName(currentTarget) {    
    if (currentTarget.value.length == 0) {
        currentTarget.parentNode.classList.add('error');
        errori[currentTarget.name] = 1;
    } else {
        currentTarget.parentNode.classList.remove('error');
        errori[currentTarget.name] = 0;
    }
    switchButton();
}

function checkNameEvent(event){
    checkName(event.currentTarget);
}

function checkUsername(currentTarget) {    
    if(!/^[a-zA-Z0-9_]{1,64}$/.test(currentTarget.value)) {
        currentTarget.parentNode.querySelector('.divError').innerText="Inserisci solo lettere, numeri e underscore. Max. 64";
        currentTarget.parentNode.classList.add('error');
        errori[currentTarget.name] = 1;
        switchButton();
    } else {
        const apiUrl="api/checkUsername?username="+encodeURIComponent(currentTarget.value);
        fetch(apiUrl).then((risposta) => 
        {
            if(risposta.ok)
                return risposta.text();
        }).then((text)=>{
            if(text=='1'){
                currentTarget.parentNode.classList.remove('error');
                errori[currentTarget.name] = 0;
            }
            else{
                currentTarget.parentNode.querySelector('.divError').innerText="Username già in uso";
                currentTarget.parentNode.classList.add('error');
                errori[currentTarget.name] = 1;
            }
            switchButton();
        });
    }
}

function checkUsernameEvent(event){
   checkUsername(event.currentTarget);
}

function checkPassword(currentTarget, conferma){
    if(currentTarget.value.length < 8) {
        currentTarget.parentNode.querySelector('.divError').innerText="La password deve contenere almeno 8 caratteri";
        currentTarget.parentNode.classList.add('error');
        errori[currentTarget.name] = 1;
    }
    else if(!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(currentTarget.value)){
        currentTarget.parentNode.querySelector('.divError').innerText="La password deve contenere almeno un numero e un carattere";
        currentTarget.parentNode.classList.add('error');
        errori[currentTarget.name] = 1;
    }
    else{
        currentTarget.parentNode.classList.remove('error');
        errori[currentTarget.name] = 0;
    }

    if(conferma.value.length>0)
        checkConferma(conferma, currentTarget);

    switchButton();
}

function checkPasswordEvent(event){
    checkPassword(event.currentTarget, conferma);
}

function checkConferma(currentTarget, password){
    if(currentTarget.value !== password.value){
        currentTarget.parentNode.classList.add('error');
        errori[currentTarget.name] = 1;
    }
    else{
        currentTarget.parentNode.classList.remove('error');
        errori[currentTarget.name] = 0;
    }
    switchButton();
}

function checkConfermaEvent(event){
    checkConferma(event.currentTarget, password);   
}

function checkEmail(currentTarget){
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(currentTarget.value).toLowerCase())) {
        currentTarget.parentNode.querySelector('.divError').innerText="Email non valida";
        currentTarget.parentNode.classList.add('error');
        errori[currentTarget.name] = 1;
        switchButton();
    } else {
        const apiUrl="api/checkEmail?email="+encodeURIComponent(currentTarget.value);
        fetch(apiUrl).then((risposta) => 
        {
            if(risposta.ok)
                return risposta.text();
        }).then((text)=>{
            if(text=='1'){
                currentTarget.parentNode.classList.remove('error');
                errori[currentTarget.name] = 0;
            }
            else{
                currentTarget.parentNode.querySelector('.divError').innerText="Email già in uso";
                currentTarget.parentNode.classList.add('error');
                errori[currentTarget.name] = 1;
            }
            switchButton();
        });
    }
}

function checkEmailEvent(event){
    checkEmail(event.currentTarget);
}

function checkDataNascita(currentTarget){
    const date = new Date(currentTarget.value);

    if(isNaN(date.getTime()) || date >= new Date()){
        currentTarget.parentNode.classList.add('error');
        errori[currentTarget.name] = 1;
    }
    else{
        currentTarget.parentNode.classList.remove('error');
        errori[currentTarget.name] = 0;
    }

    switchButton();
}

function checkDataNascitaEvent(event){
    checkDataNascita(event.currentTarget);   
}

function switchButton() {
    const button= document.querySelector('#signupButton');

    if(Object.keys(errori).length < 6){
        button.disabled=true;
        return;
    }

    for(let errore in errori)
        if(errori[errore] == 1){
            button.disabled = true;
            return;
        }

    button.disabled=false;
}

function getIndovinelli(){
    fetch("api/getIndovinelliPreview").then((risposta) => 
    {
        if(risposta.ok)
            return risposta.json();
    }).then((json)=>{
        nIndovinelli = json.length;
        for(const indovinello of json)
            createIndovinello(indovinello);

        showSlides(indexSlide);
    });
}

function createIndovinello(indovinello){
    const indovinelloContainer = document.createElement('div');
    indovinelloContainer.classList.add('slide');

    const titolo = document.createElement('h2');
    titolo.classList.add('indovinelloTitle');
    titolo.innerText = indovinello.titolo;
    indovinelloContainer.appendChild(titolo);

    const indovinellop = document.createElement('p');
    indovinellop.classList.add('indovinelloTesto');
    indovinellop.innerText = indovinello.descrizione;
    indovinelloContainer.appendChild(indovinellop);

    document.querySelector('#slideshow-container').appendChild(indovinelloContainer);
}

function showSlides() {
    let slides = document.querySelectorAll(".slide");

    for (let i = 0; i < slides.length; i++)
      slides[i].classList.add("hidden");

    slides[Math.abs(indexSlide % nIndovinelli)].classList.remove("hidden");
}  

function nextSlide(){
    indexSlide++;
    showSlides();
}
function prevSlide(){
    indexSlide--
    showSlides();
}

const nome = document.querySelector('#nome');
nome.addEventListener('blur', checkNameEvent);
if(nome.value.length>0)
    checkName(nome);
const username = document.querySelector('#username');
username.addEventListener('blur', checkUsernameEvent);
if(username.value.length>0)
    checkUsername(username);
const password=document.querySelector('#password');
const conferma=document.querySelector('#conferma');
password.addEventListener('blur', checkPasswordEvent);
if(password.value.length>0)
    checkPassword(password, conferma);
conferma.addEventListener('blur', checkConfermaEvent);
if(conferma.value.length>0)
    checkConferma(conferma, password);
const email=document.querySelector('#email');
email.addEventListener('blur', checkEmailEvent);
if(email.value.length>0)
    checkEmail(email);
const dataNascita=document.querySelector('#dataNascita');
dataNascita.addEventListener('blur', checkDataNascitaEvent);
if(dataNascita.value.length>0)
    checkDataNascita(dataNascita);

let nIndovinelli;
let indexSlide=0;
document.querySelector('.prev').addEventListener('click', prevSlide);
document.querySelector('.next').addEventListener('click', nextSlide);
getIndovinelli();