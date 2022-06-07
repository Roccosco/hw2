@extends('layouts.base')

@section('main')

    <main>
            <nav>
                <div>
                    <img class="logo" src="img/LogoBeige.png">
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
