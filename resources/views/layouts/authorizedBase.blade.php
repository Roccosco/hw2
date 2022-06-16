@extends('layouts.base')

@section('links')
    <script src="{{ url('scripts/time.js') }}" defer="true"></script>
    <script src="{{ url('scripts/notifiche.js') }}" defer="true"></script>
@endsection

@section('main')

    <main>
            <nav>
                <div>
                    <img class="logo" src="{{ url('img/LogoBeige.png') }}">
                </div>

                @yield('nav')
            </nav>

            <header>
                @section('header')
                @show
            </header>

            @yield('mainSections')
        </main>

        <footer>
            <div>
                <p>Riddler</p>
                <p>	Rocco Mattia Di Mauro - <?php echo date("Y"); ?></p>
            </div>
        </footer>

@endsection
