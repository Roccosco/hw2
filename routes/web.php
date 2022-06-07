<?php

use Illuminate\Support\Facades\Route;
// use App\Http\Controllers;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('signup', 'App\Http\Controllers\RegisterController@index');
Route::post('signup', 'App\Http\Controllers\RegisterController@signup');
Route::get('login', 'App\Http\Controllers\LoginController@index');
Route::post('login', 'App\Http\Controllers\LoginController@checkLogin');
Route::get('signout', 'App\Http\Controllers\LoginController@signout');

Route::get('home', 'App\Http\Controllers\HomeController@index');
Route::get('indovinelli', 'App\Http\Controllers\IndovinelliController@index');
Route::get('profilo', 'App\Http\Controllers\ProfiloController@index');
