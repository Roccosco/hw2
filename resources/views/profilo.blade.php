@extends('layouts.authorizedBase')

@section('titolo', 'Profilo')

@section('links')
    @parent
    <link rel="stylesheet" href="{{ url('styles/profilo.css') }}"/>
    <link rel="stylesheet" href="{{ url('styles/indovinelliManager.css') }}"/>
    <script src="{{ url('scripts/indovinelliManager.js') }}" defer="true"></script>
    <script src="{{ url('scripts/profilo.js') }}" defer="true"></script>
@endsection

@section('nav')
            <div class="navbuttons">
                <a class="other" href="{{ url('home') }}">Home</a>
                
                <div id="navbuttons">
                    <div id="notificheOpen">
                            <span class="material-symbols-outlined">
                                notifications
                            </span>
                            <div id="numNotifiche" class="hidden"></div>

                            <div id="notificheContainer" class="hidden">
                            </div>
                        </div>
                        <a class="button" href="{{ url('indovinelli') }}">Indovinelli</a>

                </div>
            </div>
@endsection

@section('header')
    <h1>PROFILO</h1>
@endsection

@section('mainSections')
        <section class="main" data-utente="{{ $user->username }}" data-view={{isset($view)}}>
            <div class="userInfo">
                <h1> {{$user->username}} </h1>
                <div>
                    <h3>Nome: <span> {{$user->nome}}  </span></h3>
                    <h3>Email: <span> {{$user->email}}  </span></h3>
                    <h3>Data di nascita: <span> {{$user->dataNascita}}  </span></h3>
                    @if(!isset($view))
                        <div class="userAction">
                            <button id="modificaPassword">Modifica password</button>
                            <a class="disconnettiti" href="{{ url('signout') }}">Disconnettiti</a>
                        </div>
                    @endif
                </div>
            </div>
            <div class="containerImage">
                <img id="profileImage" src="
                @if($user->gifProfilo==null)
                {{ url('img/profilo.png') }}
                @else
                {{$user->gifProfilo}}
                @endif
                ">
            </div>
        </section>

        <section>
            <div id="container">
                
            </div>
            <p id="newPost" class="caricaAltro">Carica altro</p>
        </section>

        <section id="modalGiphy" class="modal hidden">
            <div class="modal-content">
                <button class="closeModale">
                    <span>X</span>
                </button>

                <h2>Modifica icona</h2>

                <div>
                    <input id="textGiphy" type="text" placeholder="Cerca...">
                    <button id="cercaGiphy">Cerca</button>
                </div>

                <div id="containerGif">

                </div>
            </div>
        </section>

        <section id="modalConferma" class="modal hidden">
            <div class="modal-content">
                <img src="{{ url('img/okcheck.png') }}" class="okcheck">
                <p>Tutto fatto!</p>
                <button class="close">
                    Ok
                </button>
            </div>
        </section>

        <section id="modalPassword" class="modal hidden">
            <div class="modal-content">
                <button class="closeModale">
                    <span>X</span>
                </button>

                <h2>Modifica password</h2>

                <div id="oldPasswordContent" class="passwordContent">
                    <input id="oldPassword" class="passwordText" type="password" placeholder="Vecchia password">
                    <div class="divError">
                        La password è errata
                    </div>
                </div>
                <div class="passwordContent">
                    <input id="newPassword" class="passwordText" type="password" placeholder="Nuova password">
                    <div class="divError">
                        La password deve contenere almeno 8 caratteri
                    </div>
                </div>
                <div class="passwordContent">
                    <input id="confirmPassword" class="passwordText" type="password" placeholder="Conferma nuova password">
                    <div class="divError">
                        Le due password non coincidono
                    </div>
                </div>

                <button id="sendNewPassword">
                    Modifica
                </button>
            </div>
        </section>
@endsection
