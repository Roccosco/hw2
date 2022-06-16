<?php

namespace App\Http\Controllers;

use App\Models\Riddle;
use App\Models\User;
use Illuminate\Support\Facades\Session;
use Illuminate\Routing\Controller;

class IndovinelliController extends Controller{
    
    public function index(){
        if(session('username') != null) {
            return view("indovinelli");
        }
        else {
            return redirect('login');
        }
    }

    public function indexID($id){
        if(session('username') != null) {
            $indovinello=Riddle::where('id', $id)->first();
            if($indovinello)
                return view("indovinello")->with('indovinelloId', $id);
            else
                return redirect('home');
        }
        else
            return redirect('login');
    }

    public function addIndovinello(){
            
        if(session('username')==null)
            return 0;

        $username = session('username');

        $descrizione = request('descrizione');
        $titolo = request('titolo');
        $soluzione = request('soluzione', '');

        $indovinello = new Riddle();
        $indovinello->utente = $username;
        $indovinello->titolo = $titolo;
        $indovinello->descrizione = $descrizione;
        $indovinello->soluzione = $soluzione;
        $indovinello->stato = 'ACCETTATO';
        $indovinello->sorrisi = 0;
        $indovinello->nCommenti = 0;
        $indovinello->save();
        
        return $indovinello;
    }

    public function getPreview(){
        return Riddle::where('stato', 'ACCETTATO')->orderBy('sorrisi', 'DESC')->limit(10)->get(['titolo', 'descrizione']);
    }

    public function getIndovinello(){
        if(session('username') == null)
            return;
        
        if(request('id', -1) === -1)
            return;

        $id=request('id');

        return Riddle::with(['user' => function ($query) {
            $query->select('username', 'gifProfilo');
        }])
        ->where('id', $id)->first();
    }

    public function getIndovinelli(){
        if(session('username') == null)
            return;
            
        $username = session('username');

        $query = Riddle::with(['user' => function ($query) {
            $query->select('username', 'gifProfilo');
        }]);

        if(request('lista', 0) != 0) {
            
            $indovinelli = $query->where('utente', $username)->orderBy('stato')->get();

            return $indovinelli;
        }
        else {
            if(request('utente') != null){
                $utente = request('utente');
                if(request('minTimeStamp') != null){
                    $minTimeStamp = request('minTimeStamp');
                    $minDate = date('Y-m-d H:i:s', $minTimeStamp);

                    return $query
                        ->where('utente', $utente)
                        ->where('stato', 'ACCETTATO')
                        ->where('created_at', '<', $minDate)
                        ->orderby('created_at', 'DESC')->limit(10)->get();

                }
                else
                    return $query
                        ->where('utente', $utente)
                        ->where('stato', 'ACCETTATO')
                        ->orderby('created_at', 'DESC')->limit(10)->get();
            }
            else {
                if(request('minSorrisi') != null && request('minTimeStamp') != null){
                    $minSorrisi = request('minSorrisi');
                    $minTimeStamp = request('minTimeStamp');
                    $minDate = date('Y-m-d H:i:s', $minTimeStamp);

                    $query = $query
                        ->where('utente', 'not like', $username)
                        ->where('stato', 'ACCETTATO');

                    if(request('new', 0) == 0)
                        $query = $query
                            ->where(function ($query) use ($minSorrisi, $minDate) {
                                $query->where('sorrisi', '<', $minSorrisi)
                                    ->orWhere(function ($query2) use($minSorrisi, $minDate){
                                        $query2->where('sorrisi', $minSorrisi)
                                        ->where('created_at', '<', $minDate);
                                    }
                                );
                            });
                    else
                        $query = $query->where('created_at', '<', $minDate);
                }
                else
                    $query = $query
                        ->where('utente', 'not like', $username)
                        ->where('stato', 'ACCETTATO');
            }

            $indovinelli = array();
            
            if(request('new', 0) != 0)
                $indovinelli = $query->orderby('created_at', 'DESC')->limit(10)->get();
            else
                $indovinelli = $query->orderBy('sorrisi', 'DESC')->orderby('created_at', 'DESC')->limit(10)->get();

            return $indovinelli;
        }
    }

}

?>