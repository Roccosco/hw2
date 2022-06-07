@extends('layouts.authorizedBase')

@section('titolo', 'Profilo')

@section('links')
    <link rel="stylesheet" href="styles/profilo.css"/>
    <script src="scripts/profilo.js" defer="true"></script>
@endsection

@section('nav')
            <div class="navbuttons">
                <a class="other" href="home">Home</a>
                <a class="button" href="indovinelli">Indovinelli</a>
            </div>
@endsection

@section('header')
    <h1>PROFILO</h1>
@endsection

@section('mainSections')
        <section class="main">
            <div class="userInfo">
                <h1> {{$user->username}} </h1>
                <div>
                    <h3>Nome: <span> {{$user->nome}}  </span></h3>
                    <h3>Email: <span> {{$user->email}}  </span></h3>
                    <h3>Data di nascita: <span> {{$user->dataNascita}}  </span></h3>
                    <div class="userAction">
                        <button id="modificaPassword">Modifica password</button>
                        <a class="disconnettiti" href="signout">Disconnettiti</a>
                    </div>
                </div>
            </div>
            <div class="containerImage">
                <img id="profileImage" src="
                @if($user->gifProfilo==null)
                img/profilo.png
                @else
                {{$user->gifProfilo}}
                @endif
                ">
            </div>
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
                <img src="img/okcheck.png" class="okcheck">
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
