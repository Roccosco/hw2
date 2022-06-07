@extends('layouts.authorizedBase')

@section('titolo', 'Home')

@section('links')
    <link rel="stylesheet" href="styles/home.css"/>
    <script src="scripts/time.js" defer="true"></script>
    <script src="scripts/home.js" defer="true"></script>
@endsection

@section('nav')
    <div class="navbuttons">
        <a class="other" href="indovinelli">Indovinelli</a>
        <div id="navbuttons" > 
            <a class="button" href="profilo">Profilo</a>
        </div>
    </div>
@endsection

@section('mainSections')
    <section>
        <div id="container">
                
        </div>
        <p id="newPost" class="caricaAltro">Carica altro</p>
    </section>
@endsection
