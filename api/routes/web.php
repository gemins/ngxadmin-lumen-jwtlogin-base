<?php

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
global $app;

//Root of lumen
$router->get('/', function () use($app){
    return $app->version();
});

//Function to generate a random Key
$router->get('/key', function() {
    return str_random(32);
});

//Special Function to make resources
function rest($path, $controller)
{
    global $app;

    $app->router->get($path, $controller.'@all');
    $app->router->get($path.'/{id}', $controller.'@get');
    $app->router->post($path, $controller.'@add');
    $app->router->put($path.'/{id}', $controller.'@put');
    $app->router->delete($path.'/{id}', $controller.'@remove');
    $app->router->delete($path.'/{id}/destroy', $controller.'@destroy');
    $app->router->get($path.'/{id}/clone', $controller.'@replicate');
}

//Fix to Method OPTIONS
$router->options('/{any:.*}', function () {
    return response(['status' => 'success'])->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, DELETE')
        ->header('Access-Control-Allow-Headers', 'Authorization, Content-Type, Origin');
});


$router->group(['prefix' => 'v1'], function($router)
{
    $router->group(['prefix' => 'auth', 'namespace' => 'Auth'], function($router)
    {
        $router->post('/login', 'AuthController@login');
        $router->post('/logout', 'AuthController@logout');
    });

    $router->group(['middleware' => ['auth:api','role:admin|root']], function($router)
    {
        $router->get('/me/data', 'UsersController@getSelfData');

        $router->group(['prefix' => 'admin'], function($router)
        {
            rest('user', 'UsersController');
            rest('role', 'RolesController');
        });        
    });
});