<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Session;
use Illuminate\Routing\Controller;

class RegisterController extends Controller{
    
    public function index(){
        if(session('username') != null) {
            return redirect("home");
        }
        else {
            return view('signup');
        }
    }
    
    public function signup(){
        $erroreArray = ['signup'=> ' Controlla i campi!'];
        $errore=false;

        $nome= request('nome');
        $username= request('username');
        $password = request('password');
        $confirm = request('conferma');
        $passwordhash = password_hash($password, PASSWORD_DEFAULT);
        $email = request('email');
        $dataNascita = request('dataNascita');
        $sesso = request('sesso');

        if($sesso!="M" && $sesso!="F"){
            $errore=true;
            $erroreArray['signup'] = "Il sesso può essere M o F";
        }
            
        if (strlen($password) < 8 || !preg_match('/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/', $password)){
            $errore = true;
            $erroreArray['signup'] = "La password non è conforme";
        }
        if (strcmp($password, $confirm)){
            $errore = true;
            $erroreArray['signup'] = "Le due password non sono uguali";
        }

        if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $username)){
            $errore=true;
            $erroreArray['signup'] = "L'username non è conforme";
        }
        else{
            $user = User::where('username', $username)->first();
            if ($user){
                $errore = true;
                $erroreArray['signup'] = "L'username scelto esiste già";
            }
        }
        
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            $errore = true;
            $erroreArray['signup'] = "Email non conforme";
        }
        else{
            $user = User::where('email', $email)->first();
            if ($user){
                $errore = true;
                $erroreArray['signup'] = "Email già inserita";
            }
        }

        $dateTimestamp = strtotime($dataNascita);
        if(!$dateTimestamp || $dateTimestamp < strtotime("1900-01-01") || $dateTimestamp > strtotime(date("Y-m-d"))){
            $errore = true;
            $erroreArray['signup'] = "Data di nascita non valida";
        }

        if(!$errore) {
            $utente = new User();
            $utente->username = $username;
            $utente->password = $passwordhash;
            $utente->email = $email;
            $utente->nome = $nome;
            $utente->dataNascita = $dataNascita;
            $utente->sesso = $sesso;
            $utente->gifProfilo = null;
            $utente->save();

            Session::put('username', $username);
            return redirect('home');
        }
        
        if($errore)
            return redirect('signup')->withInput()->withErrors($erroreArray);
    }

    public function checkUsername(){
        $username= request('username');

        $exists = User::where('username', $username)->exists();
        if($exists)
            return 0;
        return 1;
    }

    public function checkEmail(){
        $email= request('email');

        $exists = User::where('email', $email)->exists();
        if($exists)
            return 0;
        return 1;
    }

}

?>