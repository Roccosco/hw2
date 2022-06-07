@extends('layouts.loginsignup')

@section('titolo', 'Registrati')

@section('links')
@parent
<script src="scripts/signup.js" defer="true"></script>
@endsection

@section('mainSection')
            <div class="leftPresentazione">
                <div>
                    <img src="img/Logo.png">
                </div>
                <div id="slideshow-container">
                    <a class="prev">&#10094;</a>
                    <a class="next">&#10095;</a>
                </div>
            </div>
            <div id="dati">
                <form method="POST" >
                    <h3>Registrati</h3>
                    @csrf
                    <input type="hidden" name="hidden" value="web"/>
                    <div class="formContent">
                        <label>Nome: </label>
                        <input id="nome" type="text" name="nome" value="{{ old('nome') }}">
                        <div class="divError">
                            Nome vuoto
                        </div>
                    </div>
                    <div class="formContent">
                        <label>Username: </label>
                        <input id="username" type="text" name="username" value="{{ old('username') }}">
                        <div class="divError">
                            Inserisci solo lettere, numeri e underscore. Max. 64
                        </div>
                    </div>
                    <div class="formContent">
                        <label>Password: </label>
                        <input id="password" type="password" name="password" value="{{ old('password') }}">
                        <div class="divError">
                            La password deve contenere almeno 8 caratteri
                        </div>
                    </div>
                    <div class="formContent">
                        <label>Conferma Password: </label>
                        <input id="conferma" type="password" name="conferma" value="{{ old('conferma') }}">
                        <div class="divError">
                            Le due password non coincidono
                        </div>
                    </div>
                    <div class="formContent">
                        <label>Email: </label>
                        <input id="email" type="text" name="email" value="{{ old('email') }}">
                        <div class="divError">
                            Email non valida
                        </div>
                    </div>
                    <div class="formContent" id="altriCampi">
                        <div class="formContent" id="dataInput">
                            <label>Data di nascita: </label>
                            <input id="dataNascita" type="date" name="dataNascita" value="{{ old('dataNascita') }}" >
                            <div class="divError">
                                Data non valida
                            </div>
                        </div>
                        <div class="formContent" id="sessoInput">
                            <label>Sesso: </label>
                            <label>M <input type="radio" class="radio" name="sesso" value="M"
                            @if(old('sesso')=='M')
                            checked=true
                            @endif
                            ></label>
                            <label>F <input type="radio" class="radio" name="sesso" value="F" 
                            @if(old('sesso')=='F')
                            checked=true
                            @endif
                            ></label>
                        </div>
                    </div>

                    @if($errors->has('signup'))
                        <span class='serverError'>{{ $errors->first('signup') }}</span>
                    @endif
                    
                    <input id = "signupButton" type="submit" value="Signup!" disabled=true>
                </form>
                <div class="login">
                    Hai già un account? <a href="login">Accedi</a>
                </div>
            </div>
@endsection