@extends('layouts.authorizedBase')

@section('titolo', 'Home')

@section('links')
    @parent

    <link rel="stylesheet" href="{{ url('styles/home.css') }}"/>
    <link rel="stylesheet" href="{{ url('styles/indovinelliManager.css') }}"/>
    <script src="{{ url('scripts/indovinelliManager.js') }}" defer="true"></script>
    <script src="{{ url('scripts/home.js') }}" defer="true"></script>
@endsection

@section('nav')
    <div class="navbuttons">
        <a class="other" href="{{ url('indovinelli') }}">Indovinelli</a>
        <div id="navbuttons" > 
            <div id="notificheOpen">
                <span class="material-symbols-outlined">
                    notifications
                </span>
                <div id="numNotifiche" class="hidden"></div>

                <div id="notificheContainer" class="hidden">
                </div>
            </div>
            <a class="button" href="{{ url('profilo') }}">Profilo</a>
        </div>
    </div>
@endsection

@section('mainSections')
    <section class="options">
        <button id='hotTopics' class="optionSelected">Hot topics</button>
        <button id='news'>Novità</button>
    </section>

    <section>
        <div id="container">
                
        </div>
        <p id="newPost" class="caricaAltro">Carica altro</p>
    </section>
@endsection
