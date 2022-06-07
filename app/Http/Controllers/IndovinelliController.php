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
        else if(request('utente') != null){
            $utente = request('utente');
            if(request('minSorrisi') != null && request('maxTimeStamp') != null){
                $minSorrisi = request('minSorrisi');
                $maxTimeStamp = request('maxTimeStamp');

                //AND (I.Sorrisi<".$minSorrisi." OR (I.Sorrisi=".$minSorrisi." AND I.Data>'".$maxDate."'))
                $indovinelli = $query
                    ->where('utente', $utente)
                    ->where('stato', 'ACCETTATO')
                    ->where(function ($query) use ($minSorrisi, $maxTimeStamp) {
                        $query->where('sorrisi', '<', $minSorrisi)
                            ->orWhere(function ($query2) use($minSorrisi, $maxTimeStamp){
                                $query2->where('sorrisi', $minSorrisi)
                                ->where('created_at', '>', $maxTimeStamp);
                            }
                        );
                    })
                    ->orderBy('sorrisi', 'DESC')->orderby('created_at')->limit(10)->get();
    
                return $indovinelli;
            }
            else{
                $indovinelli = $query
                    ->where('utente', $utente)
                    ->where('stato', 'ACCETTATO')
                    ->orderBy('sorrisi', 'DESC')->orderby('created_at')->limit(10)->get();

                return $indovinelli;
            }
        }
        else {
            if(request('minSorrisi') != null && request('maxTimeStamp') != null){
                $minSorrisi = request('minSorrisi');
                $maxTimeStamp = request('maxTimeStamp');

                $indovinelli = $query
                    ->where('utente', 'not like', $username)
                    ->where('stato', 'ACCETTATO')
                    ->where(function ($query) use ($minSorrisi, $maxTimeStamp) {
                        $query->where('sorrisi', '<', $minSorrisi)
                            ->orWhere(function ($query2) use($minSorrisi, $maxTimeStamp){
                                $query2->where('sorrisi', $minSorrisi)
                                ->where('created_at', '>', $maxTimeStamp);
                            }
                        );
                    })
                    ->orderBy('sorrisi', 'DESC')->orderby('created_at')->limit(10)->get();
    
                return $indovinelli;
            }
            else{
                $indovinelli = $query
                    ->where('utente', 'not like', $username)
                    ->where('stato', 'ACCETTATO')
                    ->orderBy('sorrisi', 'DESC')->orderby('created_at')->limit(10)->get();

                return $indovinelli;
            }
        }
    }

}

?>