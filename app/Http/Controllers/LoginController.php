<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Routing\Controller;

class LoginController extends Controller{
    
    public function index(){
        if(session('username') != null) {
            return redirect("home");
        }
        else {
            return view('login');
        }
    }

    public function checkLogin(){
        $username = request('username');
        $password = request('password');

        $user = User::where('username', $username)->first();
        if($user && password_verify($password, $user->password )) {
            Session::put('username', $user->username);
            return redirect('home');
        }
        else{
            return redirect('login')->withInput()->withErrors(['login'=> 'Username o Password errati!']);
        }
    }

    public function signout() {
        Session::flush();
        return redirect('login');
    }

}

?>