<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    
    protected $primaryKey = "";
    protected $autoIncrement = false;
    protected $keyType = "string";

    public function riddles(){
        return $this->hasMany('App\Models\Riddle', "utente", "username");
    }

    public function comments(){
        return $this->hasMany('App\Models\Comment', "utente", "username");
    }

    public function commentSmiles(){
        return $this->belongsToMany('App\Models\Comment', "smiles", "utente", "commento", 'username', 'id');
    }

}

?>