<?php namespace App\Http\Controllers;

use App\Libraries\Helpers;
use Tymon\JWTAuth\JWTAuth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RolesController extends Controller {

    const MODEL = "App\Role";

    use RESTActions;

    protected $jwt;

    public function __construct(JWTAuth $jwt)
    {
        $this->jwt = $jwt;
    }

}
