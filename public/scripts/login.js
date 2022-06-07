// Riferimento al form
const form = document.forms['login'];
// Aggiungi listener
form.addEventListener('submit', onFormSubmit);

const divError = document.querySelector('.divError').parentNode;
function onFormSubmit(event){
    const username=document.querySelector("#username").value;
    const password =document.querySelector("#password").value;

    if (username.length == 0 || password.length == 0) {
        divError.classList.add('error');
        event.preventDefault();
    }
}