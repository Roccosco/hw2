<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Support\Facades\Session;
use Illuminate\Routing\Controller;

class NotificheController extends Controller{
    
    public static function addNotificaCommento($commentoID){
        if(session('username')==null)
            return 0;

        $username = session('username');

        $commento=Comment::with(['riddle' => function ($query) {
            $query->select('id', 'utente', 'titolo');
        }])
        ->where('id', $commentoID)->first();

        if($commento->riddle->utente == $username)
            return;

        $notifica = new Notification();
        $notifica->destinatario = $commento->riddle->utente;
        $notifica->indovinelloID=$commento->riddle->id;
        $notifica->testo=$username." ha commentato il tuo indovinello: ".$commento->riddle->titolo;
        $notifica->letta=false;
        $notifica->save();
    }

    public function getNotifiche(){
        if(session('username') == null)
            return;
            
        $username = session('username');

        $query = Notification::where('destinatario', $username);

        if(request('minTimeStamp') != null){
            $minTimeStamp = request('minTimeStamp');
            $minDate = date('Y-m-d H:i:s', $minTimeStamp);

            $query = $query
                ->where('letta', false)
                ->orWhere('created_at', '<', $minDate);
            
        }

        $notifiche = $query->orderBy('letta')->orderby('created_at', 'DESC')->limit(10)->get();
        
        return $notifiche;
    }

    public function readNotifica(){
        if(session('username') == null)
            return 0;

        $notifica = request('notifica');
        
        if(Notification::where('_id', $notifica)->update(['letta' => true]))
            return 1;
        
        return 0;
    }
}

?>