<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Riddle;
use App\Models\User;
use Illuminate\Support\Facades\Session;
use Illuminate\Routing\Controller;

class CommentiController extends Controller{
    
    public function index(){
        if(session('username') != null) {
            return view("home");
        }
        else {
            return redirect('login');
        }
    }

    public function addCommento(){
            
        if(session('username')==null)
            return 0;

        $username = session('username');

        $indovinello = request('indovinello');
        $testo = request('testo');

        $commento = new Comment();
        $commento->utente = $username;
        $commento->indovinello = $indovinello;
        $commento->testo = $testo;
        $commento->sorrisi = 0;
        $commento->save();
        
        return array(
            'id' => $commento->id,
            'utente' => $commento->utente,
            'user' => ['gifProfilo' => $commento->user->gifProfilo],
            'indovinello' => $commento->indovinello,
            'testo' => $commento->testo,
            'created_at' => $commento->created_at,
            'sorrisi' => 0
        );
    }

    public function getCommenti(){
        if(session('username') == null)
            return;
            
        $username = session('username');
        $indovinello = request("indovinello");

        $query = Comment::with(['user' => function ($query) {
            $query->select('username', 'gifProfilo');
        }, 'userSmiles' => function (){}]);

        if(request('minSorrisi') != null && request('maxTimeStamp') != null){
            $minSorrisi = request('minSorrisi');
            $maxTimeStamp = request('maxTimeStamp');

            $commenti = $query
                ->where('indovinello', $indovinello)
                ->where(function ($query) use ($minSorrisi, $maxTimeStamp) {
                    $query->where('sorrisi', '<', $minSorrisi)
                        ->orWhere(function ($query2) use($minSorrisi, $maxTimeStamp){
                            $query2->where('sorrisi', $minSorrisi)
                            ->where('created_at', '>', $maxTimeStamp);
                        }
                    );
                })
                ->orderBy('sorrisi', 'DESC')->orderby('created_at')->limit(10)->get();

        }
        else{
            $commenti = $query
                ->where('indovinello', $indovinello)
                ->orderBy('sorrisi', 'DESC')->orderby('created_at')->limit(10)->get();

        }

        $array = [];
        foreach($commenti as $commento)
            $array[] = array(
                'id' => $commento->id,
                'utente' => $commento->utente,
                'user' => ['gifProfilo' => $commento->user->gifProfilo],
                'indovinello' => $commento->indovinello,
                'testo' => $commento->testo,
                'created_at' => $commento->created_at,
                'sorrisi' => $commento->sorrisi,
                'messoSorriso' => $this->findSorriso($commento->userSmiles, $username)
            );
        
        return $array;
    }

    private function findSorriso ($array, $utente){
        foreach ($array as $item )
            if ($item['username'] == $utente) 
                return true;

        return false;
    }

    public function addSorriso(){
        if(session('username') == null)
            return array(
                        "errore" => true
                    );
        
        $username = session('username');
        $commentoID = request("commento");

        $commento = Comment::where('id', $commentoID)->first();
        $commento->userSmiles()->attach($username);
        $commento = $commento->fresh();

        $indovinello = Riddle::where('id', $commento->indovinello)->first();

        return array(
            "sorrisiIndovinello" => $indovinello->sorrisi,
            "sorrisiCommento" => $commento->sorrisi, 
            "errore" => false
        );
    }

    public function deleteSorriso(){
        if(session('username') == null)
            return array(
                        "errore" => true
                    );

        $username = session('username');

        $commentoID = request('commento');

        $commento = Comment::where('id', $commentoID)->first();
        $commento->userSmiles()->detach($username);
        $commento = $commento->fresh();

        $indovinello = Riddle::where('id', $commento->indovinello)->first();

        return array(
            "sorrisiIndovinello" => $indovinello->sorrisi,
            "sorrisiCommento" => $commento->sorrisi, 
            "errore" => false
        );

    }
}

?>