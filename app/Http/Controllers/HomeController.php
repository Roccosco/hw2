<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Session;
use Illuminate\Routing\Controller;

class HomeController extends Controller{
    
    public function index(){

        if(session('username') != null) {
            return view("home");
        }
        else {
            return redirect('login');
        }
    }

}

?>