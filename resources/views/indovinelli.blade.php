@extends('layouts.authorizedBase')

@section('titolo', 'Indovinelli')

@section('links')
    <link rel="stylesheet" href="styles/indovinelli.css"/>
    <script src="scripts/time.js" defer="true"></script>
    <script src="scripts/indovinelli.js" defer="true"></script>
@endsection

@section('header')
    <h1>I MIEI INDOVINELLI</h1>
@endsection

@section('nav')
<div class="navbuttons">
                <a class="other" href="home">Home</a>
                <div id="navbuttons" > 
                    <a class="button" href="profilo">Profilo</a>
                </div>
            </div>
@endsection

@section('mainSections')
        <section>
            <div id="container">
                <button id="showModal">
                    <span>+</span>
                </button>
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
