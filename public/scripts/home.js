let visualizzazione="hotTopics";

let indovinelliID = [];
let minSorrisiIndovinello = null;
let minTimeStamp = null;

function fetchIndovinelli(){
    const news = visualizzazione==="hotTopics" ? "": "&new=1";
    const minSorrisi = minTimeStamp===null ? "" : "&minSorrisi=" + minSorrisiIndovinello + "&minTimeStamp=" + minTimeStamp;
    fetch("api/getIndovinelli?"+news+minSorrisi).then((risposta) => 
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
                if(visualizzazione==="hotTopics"){
                    if( minSorrisiIndovinello===null || indovinello.sorrisi < minSorrisiIndovinello){
                        minSorrisiIndovinello=indovinello.sorrisi;
                        minTimeStamp = toTimeStamp(indovinello.created_at);
                    }
                    else if(indovinello.sorrisi == minSorrisiIndovinello)
                        if(minTimeStamp === null || toTimeStamp(indovinello.created_at) < minTimeStamp){
                            minTimeStamp = toTimeStamp(indovinello.created_at);
                        }
                }
                else{
                    if(minTimeStamp === null || toTimeStamp(indovinello.created_at) < minTimeStamp){
                        minTimeStamp = toTimeStamp(indovinello.created_at);
                    }
                }

            }
    });
}

function removeAllIndovinelli(){
    document.querySelector('#container').innerHTML="";

    indovinelli = {};
    indovinelliID = [];
    minSorrisiIndovinello = null;
    minTimeStamp = null;
}

function hotTopicClicked(){
    if(visualizzazione=="hotTopics")
        return;

    visualizzazione="hotTopics";
    removeAllIndovinelli();
    fetchIndovinelli();

    document.querySelector("#hotTopics").classList.add('optionSelected');
    document.querySelector("#news").classList.remove('optionSelected');
}
function newsClicked(){
    if(visualizzazione=="news")
        return;

    visualizzazione="news";
    removeAllIndovinelli();
    fetchIndovinelli();

    document.querySelector("#hotTopics").classList.remove('optionSelected');
    document.querySelector("#news").classList.add('optionSelected');
}

fetchIndovinelli();

document.querySelector("#newPost").addEventListener('click', fetchIndovinelli);

document.querySelector("#hotTopics").addEventListener('click', hotTopicClicked);
document.querySelector("#news").addEventListener('click', newsClicked);