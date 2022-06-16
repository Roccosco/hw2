@extends('layouts.authorizedBase')

@section('titolo', 'Home')

@section('links')
    @parent

    <link rel="stylesheet" href="{{ url('styles/indovinelliManager.css') }}"/>
    <script src="{{ url('scripts/indovinelliManager.js') }}" defer="true"></script>
    <script src="{{ url('scripts/indovinello.js') }}" defer="true"></script>
@endsection

@section('nav')
    <div class="navbuttons">
        <a class="other" href="{{ url('home') }}">Home</a>
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
    <section id="mainSection" data-id="{{ $indovinelloId }}">
        <div id="container">
                
        </div>
    </section>
@endsection
