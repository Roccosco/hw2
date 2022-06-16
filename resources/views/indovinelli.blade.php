@extends('layouts.authorizedBase')

@section('titolo', 'Indovinelli')

@section('links')
    @parent
    <link rel="stylesheet" href="{{ url('styles/indovinelli.css') }}"/>
    <script src="{{ url('scripts/indovinelli.js') }}" defer="true"></script>
@endsection

@section('header')
    <h1>I MIEI INDOVINELLI</h1>
@endsection

@section('nav')
<div class="navbuttons">
                <a class="other" href="{{ url('home') }}">Home</a>
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
        <section>
            <div id="container">
                <button id="showModal">
                    <span>+</span>
                </button>
                <div id='noIndovinelli' class='hidden'>Non hai ancora postato indovinelli</div>
            </div>
        </section>

        <section id="modalIndovinelli" class="modal hidden">
            <div class="modal-content">
                <button class="closeModale">
                    <span>X</span>
                </button>

                <h2>Aggiungi un indovinello</h2>

                <input id="titolo" class="newIndovinelloText" type="text" placeholder="Titolo">
                <textarea class="newIndovinelloText newTesto" type="text" placeholder="Indovinello"></textarea>
                <input id="soluzione" class="newIndovinelloText" type="text" placeholder="Soluzione proposta">

                <button id="newIndovinelloButton">
                    Aggiungi
                </button>
            </div>
        </section>

@endsection
