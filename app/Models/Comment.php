<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{

    public function user(){
        return $this->belongsTo('App\Models\User', "utente", "username");
    }

    public function riddle(){
        return $this->belongsTo('App\Models\Riddle', "indovinello");
    }
    
    public function userSmiles(){
        return $this->belongsToMany('App\Models\User', "smiles", "commento", "utente", 'id', 'username');
    }

}

?>