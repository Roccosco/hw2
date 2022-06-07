@extends('layouts.loginsignup')

@section('titolo', 'Login')

@section('links')
@parent
<script src="scripts/login.js" defer="true"></script>
@endsection


@section('mainSection')
            <div class="leftPresentazione">
                <img src="img/Logo.png">
            </div>
            <form name="login" method='post'>
                <h3>Accedi</h3>
                @csrf
                <div class="formContent spaziati">
                    <label>Username: </label>
                    <input id="username" type="text" name="username" value="{{ old('username') }}" >
                </div>
                <div class="formContent spaziati">
                    <label>Password: </label>
                    <input id="password" type="password" name="password" value="{{ old('password') }}">
                </div>

                @if($errors->has('login'))
                <div class='error'>
                    <div class = 'divError centered'>
                        {{ $errors->first('login') }}
                    </div>
                </div>
                @endif

                <div class="formContent">
                    <input id = "loginButton" type="submit" value="Login" >
                </div>
                
                <div class="login">
                    Non hai un account? <a href="signup">Registrati</a>
                </div>
                
            </form>
@endsection