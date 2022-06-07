const errori = {};

function checkName(event){
    const input=event.currentTarget;
    
    if (input.value.length == 0) {
        input.parentNode.classList.add('error');
        errori[input.name] = 1;
    } else {
        input.parentNode.classList.remove('error');
        errori[input.name] = 0;
    }
    switchButton();
}

function checkUsername(event){
    const input = event.currentTarget;

    if(!/^[a-zA-Z0-9_]{1,64}$/.test(input.value)) {
        input.parentNode.querySelector('.divError').innerText="Inserisci solo lettere, numeri e underscore. Max. 64";
        input.parentNode.classList.add('error');
        errori[input.name] = 1;
    } else {
        const apiUrl="api/checkUsername?username="+encodeURIComponent(input.value);
        fetch(apiUrl).then((risposta) => 
        {
            if(risposta.ok)
                return risposta.text();
        }).then((text)=>{
            if(text=='1'){
                input.parentNode.classList.remove('error');
                errori[input.name] = 0;
            }
            else{
                input.parentNode.querySelector('.divError').innerText="Username già in uso";
                input.parentNode.classList.add('error');
                errori[input.name] = 1;
            }
            switchButton();
        });
    }
    switchButton();
}

function checkPassword(event){
    const input = event.currentTarget;

    if(input.value.length < 8) {
        input.parentNode.querySelector('.divError').innerText="La password deve contenere almeno 8 caratteri";
        input.parentNode.classList.add('error');
        errori[input.name] = 1;
    }
    else if(!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(input.value)){
        input.parentNode.querySelector('.divError').innerText="La password deve contenere almeno un numero e un carattere";
        input.parentNode.classList.add('error');
        errori[input.name] = 1;
    }
    else{
        input.parentNode.classList.remove('error');
        errori[input.name] = 0;
    }
    switchButton();
}

function checkConferma(event){
    const input = event.currentTarget;
    const password = document.querySelector('#password').value;

    if(input.value !== password){
        input.parentNode.classList.add('error');
        errori[input.name] = 1;
    }
    else{
        input.parentNode.classList.remove('error');
        errori[input.name] = 0;
    }
    switchButton();
}

function checkEmail(event){
    const input = event.currentTarget;

    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(input.value).toLowerCase())) {
        input.parentNode.querySelector('.divError').innerText="Email non valida";
        input.parentNode.classList.add('error');
        errori[input.name] = 1;
    } else {
        const apiUrl="api/checkEmail?email="+encodeURIComponent(input.value);
        fetch(apiUrl).then((risposta) => 
        {
            if(risposta.ok)
                return risposta.text();
        }).then((text)=>{
            if(text=='1'){
                input.parentNode.classList.remove('error');
                errori[input.name] = 0;
            }
            else{
                input.parentNode.querySelector('.divError').innerText="Email già in uso";
                input.parentNode.classList.add('error');
                errori[input.name] = 1;
            }
            switchButton();
        });
    }
    switchButton();
}

function dataNascita(event){
    const input = event.currentTarget;
    const date = new Date(input.value);

    if(isNaN(date.getTime()) || date >= new Date()){
        input.parentNode.classList.add('error');
        errori[input.name] = 1;
    }
    else{
        input.parentNode.classList.remove('error');
        errori[input.name] = 0;
    }

    switchButton();
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

document.querySelector('#nome').addEventListener('blur', checkName);
document.querySelector('#username').addEventListener('blur', checkUsername);
document.querySelector('#password').addEventListener('blur', checkPassword);
document.querySelector('#conferma').addEventListener('blur', checkConferma);
document.querySelector('#email').addEventListener('blur', checkEmail);
document.querySelector('#dataNascita').addEventListener('blur', dataNascita);

let nIndovinelli;
let indexSlide=0;
document.querySelector('.prev').addEventListener('click', prevSlide);
document.querySelector('.next').addEventListener('click', nextSlide);
getIndovinelli();