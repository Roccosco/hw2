function getStringTimeAgo(data){
    const diffTime = Math.abs(Date.now() - Date.parse(data));
    if(diffTime<1000*10)
        return "Ora";
    else if(diffTime<1000*60*60)
        return Math.ceil(diffTime / (1000 * 60)) + " minuti fa";
    else if(diffTime<1000*60*60*24)
        return Math.ceil(diffTime / (1000 * 60 * 60)) + " ore fa";
    else if(diffTime<1000*60*60*24*365)
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + " giorni fa";
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365))+ " anni fa"; 
}