<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Riddle extends Model
{

    public function user(){
        return $this->belongsTo('App\Models\User', "utente", "username");
    }

    public function comments(){
        return $this->hasMany('App\Models\Comment', "indovinello");
    }

}

?>