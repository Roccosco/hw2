let indovinelli = {};
let indovinelliID = [];
let minSorrisiIndovinello = null;
let maxTimeStamp = null;

function fetchIndovinelli(){
    minSorrisi = minSorrisiIndovinello===null ? "" : "&minSorrisi=" + minSorrisiIndovinello + "&maxTimeStamp=" + maxTimeStamp;
    fetch("api/getIndovinelli?"+minSorrisi).then((risposta) => 
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
                indovinelli[indovinello.id].maximeStamp = null;

                createIndovinello(indovinello);
                indovinelliID.push(indovinello.id);
                if( minSorrisiIndovinello===null || indovinello.sorrisi < minSorrisiIndovinello){
                    minSorrisiIndovinello=indovinello.sorrisi;
                    maxTimeStamp = toTimeStamp(indovinello.created_at);
                }
                else if(indovinello.sorrisi == minSorrisiIndovinello)
                    if(maxTimeStamp === null || toTimeStamp(indovinello.created_at) > maxTimeStamp){
                        maxTimeStamp = toTimeStamp(indovinello.created_at);
                    }

            }
    });
}

function createIndovinello(indovinello){
    const indovinelloContainer = document.createElement('div');
    indovinelloContainer.classList.add('indovinelloContainer');

    const titolo = document.createElement('h2');
    titolo.classList.add('indovinelloTitle');
    titolo.innerText = indovinello.titolo;
    indovinelloContainer.appendChild(titolo);

    const indovinellop = document.createElement('p');
    indovinellop.classList.add('indovinelloTesto');
    indovinellop.innerText = indovinello.descrizione;
    indovinelloContainer.appendChild(indovinellop);
    
    const divIndovinelloDettagli = document.createElement('div');
    divIndovinelloDettagli.classList.add('indovinelloDettagli');
    indovinelloContainer.appendChild(divIndovinelloDettagli);

    const divDettagli = document.createElement('div');
    divIndovinelloDettagli.appendChild(divDettagli);

    const spanTime = document.createElement('span');
    spanTime.innerText = getStringTimeAgo(indovinello.created_at);
    divDettagli.appendChild(spanTime);

    const spanSorrisiIcon = document.createElement('span');
    spanSorrisiIcon.classList.add('material-symbols-outlined');
    spanSorrisiIcon.innerText="sentiment_satisfied";
    divDettagli.appendChild(spanSorrisiIcon);
    const spanSorrisi = document.createElement('span');
    spanSorrisi.classList.add("nSorrisi");
    spanSorrisi.innerText = indovinello.sorrisi;
    divDettagli.appendChild(spanSorrisi);

    const spanCommentiIcon = document.createElement('span');
    spanCommentiIcon.classList.add('material-symbols-outlined');
    spanCommentiIcon.innerText="chat";
    divDettagli.appendChild(spanCommentiIcon);
    const spanCommenti = document.createElement('span');
    spanCommenti.classList.add("nCommenti");
    spanCommenti.innerText = indovinello.nCommenti;
    divDettagli.appendChild(spanCommenti);

    const divAuthor = document.createElement('div');
    divAuthor.classList.add('indovinelloAuthor');
    divIndovinelloDettagli.appendChild(divAuthor);

    const imgAuthor = document.createElement('img');
    imgAuthor.classList.add('indovinelloImage');
    if(indovinello.user.gifProfilo === null)
        imgAuthor.src="img/profilo.png";
    else
        imgAuthor.src=indovinello.user.gifProfilo;
    divAuthor.appendChild(imgAuthor);

    const pAuthor = document.createElement('p');
    pAuthor.classList.add('authorName');
    pAuthor.innerText = indovinello.utente;
    divAuthor.appendChild(pAuthor);

    const separatore = document.createElement('div');
    separatore.classList.add('separatore');
    indovinelloContainer.appendChild(separatore);

    const commentiContainer = document.createElement('div');
    commentiContainer.classList.add('commentiContainer');
    indovinelloContainer.appendChild(commentiContainer);

    const mostraRisposte = document.createElement('a');
    mostraRisposte.classList.add('caricaAltro');
    mostraRisposte.dataset.indovinelloID = indovinello.id;
    mostraRisposte.innerText="Mostra risposte";
    mostraRisposte.addEventListener('click', mostraCommenti);
    indovinelloContainer.appendChild(mostraRisposte);

    const commenta = document.createElement('div');
    commenta.classList.add('commenta');
    indovinelloContainer.appendChild(commenta);

    const commentaText = document.createElement('textarea');
    commentaText.classList.add('commentaText');
    commentaText.dataset.indovinelloID = indovinello.id;
    commentaText.type="text";
    commentaText.placeholder="Commenta...";
    commentaText.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addCommento(e);
        }
    });
    commenta.appendChild(commentaText);

    const commentaButton = document.createElement('button');
    commentaButton.classList.add('commentaButton');
    commentaButton.dataset.indovinelloID = indovinello.id;
    commentaButton.innerText="Commenta";
    commentaButton.addEventListener('click', addCommento);
    commenta.appendChild(commentaButton);

    indovinelloContainer.classList.add('indovinelloContainer');

    document.querySelector('#container').appendChild(indovinelloContainer);
}

function addCommento(event){
    const target = event.currentTarget;
    const indovinelloID = target.dataset.indovinelloID;
    const testoCommento = target.parentNode.querySelector('.commentaText');

    const formData = new FormData();
    formData.append('testo', testoCommento.value);
    formData.append('indovinello', indovinelloID);

    if(!checkCommento(testoCommento.value)){
        return;
    }

    fetch("api/addCommento", {method: 'post', body: formData}).then((risposta) => 
    {
        if(risposta.ok)
            return risposta.json();
    }).then((json)=>{
        console.log(json);

        createCommento(target.parentNode.parentNode.querySelector('.commentiContainer'), json);
        indovinelli[indovinelloID].commentiID.push(json.id);

        testoCommento.value="";

        const nCommenti =  target.closest('.indovinelloContainer').querySelector('.nCommenti');
        nCommenti.innerText= parseInt(nCommenti.innerText) + 1;
    });
}

function mostraCommenti(event){

    const target = event.currentTarget;
    const indovinelloID = target.dataset.indovinelloID;

    minSorrisi = indovinelli[indovinelloID].minSorrisi===null ? "" : "&minSorrisi=" + indovinelli[indovinelloID].minSorrisi + "&maxTimeStamp=" + indovinelli[indovinelloID].maxTimeStamp;
    fetch("api/getCommenti?indovinello="+ indovinelloID + minSorrisi).then((risposta) => 
    {
        if(risposta.ok)
            return risposta.json();
    }).then((json)=>{
        console.log(json);

        for(const commento of json){
            if(!indovinelli[indovinelloID].commentiID.includes(commento.id)){
                commento.sorrisi = parseInt(commento.sorrisi);

                createCommento(target.parentNode.querySelector('.commentiContainer'), commento);
                indovinelli[indovinelloID].commentiID.push(commento.id);

                if(indovinelli[indovinelloID].minSorrisi===null || commento.sorrisi < indovinelli[indovinelloID].minSorrisi){
                    indovinelli[indovinelloID].minSorrisi = commento.sorrisi;
                    indovinelli[indovinelloID].maxTimeStamp = toTimeStamp(commento.created_at);
                }
                else if(commento.sorrisi == indovinelli[indovinelloID].minSorrisi)
                    if(indovinelli[indovinelloID].maxTimeStamp === null || toTimeStamp(commento.created_at) > indovinelli[indovinelloID].maxTimeStamp){
                        indovinelli[indovinelloID].maxTimeStamp = toTimeStamp(commento.created_at);
                    }

            }
        }
    });

    event.currentTarget.innerText = "Mostra altro";
}

function createCommento(commentiContainer, commento){
    const commentiFrame = document.createElement('div');
    commentiFrame.classList.add('commentiFrame');

    const commentoDiv = document.createElement('div');
    commentoDiv.classList.add('commento');
    commentiFrame.appendChild(commentoDiv);

    const imgAuthor = document.createElement('img');
    imgAuthor.classList.add('commentoImage');
    if(commento.user.gifProfilo === null)
        imgAuthor.src="img/profilo.png";
    else
        imgAuthor.src=commento.user.gifProfilo;
    commentoDiv.appendChild(imgAuthor);

    const commentoInfo = document.createElement('div');
    commentoInfo.classList.add('commentoInfo');
    commentoDiv.appendChild(commentoInfo);

    const usernameStrong = document.createElement('strong');
    usernameStrong.classList.add('commentoUsername');
    usernameStrong.innerText = commento.utente;
    commentoInfo.appendChild(usernameStrong);

    const pCommento = document.createElement('p');
    pCommento.innerText = commento.testo;
    commentoInfo.appendChild(pCommento);

    const pData = document.createElement('p');
    pData.classList.add('data');
    pData.innerText = getStringTimeAgo(commento.created_at);
    commentoInfo.appendChild(pData);

    const commentoSorrisi = document.createElement('div');
    commentoSorrisi.classList.add('commentoSorrisi');
    commentiFrame.appendChild(commentoSorrisi);

    const imgSorriso = document.createElement('img');
    imgSorriso.classList.add('sorriso');
    imgSorriso.dataset.commentoID= commento.id;
    if(commento.messoSorriso=='1'){
        imgSorriso.src="img/sorriso.png";
        imgSorriso.addEventListener('click', deleteSorriso);
    }
    else{
        imgSorriso.src="img/sorrisoNo.png";
        imgSorriso.addEventListener('click', addSorriso);
    }
    commentoSorrisi.appendChild(imgSorriso);

    const nlike = document.createElement('p');
    nlike.classList.add('nlike');
    nlike.innerText = commento.sorrisi;
    commentoSorrisi.appendChild(nlike);

    commentiContainer.appendChild(commentiFrame);

}

function addSorriso(event){
    const img=event.currentTarget;
    const commentoID=img.dataset.commentoID;

    const formData = new FormData();
    formData.append('commento', commentoID);

    fetch("api/addSorriso", {method: 'post', body: formData}).then((risposta) => 
    {
        if(risposta.ok)
            return risposta.json();
    }).then((json)=>{
        console.log(json);
        if(json.errore!== true){
            img.src="img/sorriso.png";
            img.removeEventListener("click", addSorriso);
            img.addEventListener('click', deleteSorriso);

            img.parentNode.querySelector('.nlike').innerText=json.sorrisiCommento;

            img.closest('.indovinelloContainer').querySelector('.nSorrisi').innerText=json.sorrisiIndovinello;
        }
    });
}

function deleteSorriso(event){
    const img=event.currentTarget;
    const commentoID=img.dataset.commentoID;

    const formData = new FormData();
    formData.append('commento', commentoID);

    fetch("api/deleteSorriso", {method: 'post', body: formData}).then((risposta) => 
    {
        if(risposta.ok)
            return risposta.json();
    }).then((json)=>{
        console.log(json);
        if(json.errore!== true){
            img.src="img/sorrisoNo.png";
            img.removeEventListener("click", deleteSorriso);
            img.addEventListener('click', addSorriso);

            img.parentNode.querySelector('.nlike').innerText=json.sorrisiCommento;
            img.closest('.indovinelloContainer').querySelector('.nSorrisi').innerText=json.sorrisiIndovinello;
        }
    });
}

function checkCommento(commento){
    if(commento.length>0)
        return true;
    return false;
}

function toTimeStamp(dateString){
    let date = Date.parse(dateString);
    return date/1000;
}

fetchIndovinelli();

document.querySelector("#newPost").addEventListener('click', fetchIndovinelli);