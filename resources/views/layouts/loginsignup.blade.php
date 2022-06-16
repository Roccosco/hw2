@extends('layouts.base')

@section('links')
<link rel="stylesheet" href="{{ url('styles/loginSignup.css') }}"/>
@endsection

@section('main')

    <section id="main">
        @yield('mainSection')
    </section>

@endsection
