<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Support\Facades\Session;
use Illuminate\Routing\Controller;

class ProfiloController extends Controller{
    
    public function index(){
        if(session('username') != null) {
            return view("profilo")->with('user', User::where('username', session('username'))->first());
        }
        else {
            return redirect('login');
        }
    }

    public function indexUsername($username){
        if(session('username') != null) {
            $user=User::where('username', $username)->first();
            if($user)
                return view("profilo")->with('user', $user)->with('view', true);
            else
                return redirect('home');
        }
        else {
            return redirect('login');
        }
    }

    public function giphyAPI(){
        if(request("q") == null)
            die("Errore");
    
        $searchContent=request('q');
        $page=request('page');
        $offset = $page*20;

        $url = "https://api.giphy.com/v1/gifs/search?q=".urlencode($searchContent)."&limit=20&offset=".$offset."&api_key=".env('GIPHY_APIKEY');
        
        $curl=curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $data=curl_exec($curl);
        curl_close($curl);
    
        $json = json_decode($data, true);
        $newJson = array();
        foreach ($json['data'] as $gif)
            $newJson[] = $gif['images']['original']['url'];

        return $newJson;
    }

    public function modifyProfileImage(){
        if(session('username') == null || request('url') == null)
            return 0;

        $fatto = User::where('username', session('username'))->update(['gifProfilo' => request('url')]);

        if($fatto)
            return 1;
        
        return 0;
    }

    public function modifyPassword(){
        if(session('username') == null || request('oldPassword') == null || request('newPassword') == null)
            return 0;

        $old = request('oldPassword');
        $new = request('newPassword');

        if (strlen($new) < 8 || !preg_match('/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/', $new))
            return 0;

        $user=User::where('username', session('username'))->first(['password']);
        if(password_verify($old, $user->password)) {
            $hash = password_hash($new, PASSWORD_DEFAULT);

            $fatto = User::where('username', session('username'))->update(['password' => $hash]);

            if($fatto)
                return 1;

            return 0;
        }
    }
}

?>