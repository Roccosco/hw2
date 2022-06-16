<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('checkUsername', 'App\Http\Controllers\RegisterController@checkUsername');
Route::get('checkEmail', 'App\Http\Controllers\RegisterController@checkEmail');

Route::get('getCommenti', 'App\Http\Controllers\CommentiController@getCommenti');
Route::post('addCommento', 'App\Http\Controllers\CommentiController@addCommento');
Route::post('addSorriso', 'App\Http\Controllers\CommentiController@addSorriso');
Route::post('deleteSorriso', 'App\Http\Controllers\CommentiController@deleteSorriso');

Route::get('getIndovinello', 'App\Http\Controllers\IndovinelliController@getIndovinello');
Route::get('getIndovinelli', 'App\Http\Controllers\IndovinelliController@getIndovinelli');
Route::get('getIndovinelliPreview', 'App\Http\Controllers\IndovinelliController@getPreview');
Route::post('addIndovinello', 'App\Http\Controllers\IndovinelliController@addIndovinello');

Route::get('giphyAPI', 'App\Http\Controllers\ProfiloController@giphyAPI');
Route::post('modifyPassword', 'App\Http\Controllers\ProfiloController@modifyPassword'); 
Route::post('modifyProfileImage', 'App\Http\Controllers\ProfiloController@modifyProfileImage');

Route::get('getNotifiche', 'App\Http\Controllers\NotificheController@getNotifiche');
Route::post('readNotifica', 'App\Http\Controllers\NotificheController@readNotifica');

