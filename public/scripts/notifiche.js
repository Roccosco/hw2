let notificheID = [];
let minTimeStampNotifiche = null;
let notificaAperta = false;

const notificheContainer = document.querySelector('#notificheContainer');
const numNotifiche = document.querySelector('#numNotifiche');

function fetchNotifiche() {
    const timeStamp = minTimeStampNotifiche===null ? "" : "&minTimeStamp=" + minTimeStampNotifiche;
    fetch(baseUrl+"/api/getNotifiche?"+timeStamp).then((risposta) => 
    {
        if(risposta.ok)
            return risposta.json();
    }).then((json)=>{
        let nonLette=0;

        if(json.length==0)
            noNotifiche();

        for(let notifica of json){
            if(!notificheID.includes(notifica['_id'])){
                notificheID.push(notifica['_id']);

                if(!notifica.letta)
                    nonLette++;

                createNotifica(notifica);

                if(minTimeStampNotifiche === null || toTimeStamp(notifica.created_at) < minTimeStampNotifiche)
                    minTimeStampNotifiche = toTimeStamp(notifica.created_at);
            }
        }
        
        if(nonLette>0){
            numNotifiche.classList.remove('hidden');
            numNotifiche.innerText=nonLette;
        }
    });
}

function noNotifiche(){
    const msg = document.createElement('p');
    msg.innerText="Nessuna notifica";
    msg.classList.add('centered');
    notificheContainer.appendChild(msg);
}

function createNotifica(notifica){
    const notificaFrame = document.createElement('div');
    notificaFrame.classList.add('notificaFrame');
    if(notifica.letta)
        notificaFrame.classList.add('notificaLetta');
    notificaFrame.addEventListener('click', readNotifica);
    notificaFrame.dataset.id=notifica['_id'];
    notificaFrame.dataset.indovinelloID = notifica.indovinelloID;

    const messaggio = document.createElement('span');
    messaggio.classList.add('notificaMessaggio');
    messaggio.innerText = notifica.testo;
    notificaFrame.appendChild(messaggio);

    notificheContainer.appendChild(notificaFrame);
}

fetchNotifiche();

document.querySelector('#notificheOpen').addEventListener('click', clickOpenNotifiche)

function clickOpenNotifiche(e){
    if(notificaAperta)
        notificheContainer.classList.remove('hidden');
    else
        notificheContainer.classList.add('hidden');

    notificaAperta=!notificaAperta;
}

function readNotifica(event){
    const notificaID= event.currentTarget.dataset.id;

    const formData = new FormData();
    formData.append('notifica', notificaID);

    fetch(baseUrl+"/api/readNotifica", {method: 'post', body: formData});

    window.location.href = baseUrl+"/indovinello/"+event.currentTarget.dataset.indovinelloID;
}
