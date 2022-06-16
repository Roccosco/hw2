function fetchIndovinello(){
    const id = document.querySelector('#mainSection').dataset.id;

    fetch(baseUrl+"/api/getIndovinello?id="+id).then((risposta) => 
    {
        if(risposta.ok)
            return risposta.json();
    }).then((json)=>{
        json.sorrisi = parseInt(json.sorrisi);
        indovinelli[json.id] = {};
        indovinelli[json.id].commentiID = [];
        indovinelli[json.id].minSorrisi = null;
        indovinelli[json.id].minTimeStamp = null;
        indovinelli[json.id].commentiVisualizzati = 0;
        indovinelli[json.id].indovinello = json;

        createIndovinello(json);
    });
}

fetchIndovinello();
