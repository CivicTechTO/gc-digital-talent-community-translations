<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/


$router->get('/', 'DashboardController@index');
$router->get('/{page}', 'DashboardController@index');
$router->get('/{page}/create', 'DashboardController@index');
$router->get('/{page}/{id}/edit', 'DashboardController@index');

