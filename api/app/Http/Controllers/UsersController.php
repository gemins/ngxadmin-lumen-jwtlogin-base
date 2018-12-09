<?php namespace App\Http\Controllers;

use App\Libraries\Helpers;
use Tymon\JWTAuth\JWTAuth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UsersController extends Controller {

    const MODEL = "App\User";

    use RESTActions;

    protected $jwt;

    public function __construct(JWTAuth $jwt)
    {
        $this->jwt = $jwt;
    }

    public function add(Request $request)
    {
        try{
            $m = self::MODEL;
            Helpers::validate($request, $m::$rules, $m::$messages);

            $data = $request->all();

            if($data["password"] != $data["confirmation_password"])
                return response()->json(['password' => ['Los passwords ingresados no coinciden.']], 422);

            if($m::where("email", $data["email"])->first())
                return response()->json(["user" => ['El usuario ya existe.']], 422);

            $data["password"] = app('hash')->make($data["password"]);

            $user = $m::create($data);
            $user->roles()->sync($data["role"]);

            return $this->respond(Response::HTTP_CREATED, $user);
        }catch(HttpResponseException $e){
            return $e->getResponse();
        }
    }

    public function put(Request $request, $id)
    {
        try{
            $m = self::MODEL;
            Helpers::validate($request, $m::$rules, $m::$messages);
            $model = $m::find($id);
            $data = $request->all();

            //Find or fail
            if(is_null($model))
                return $this->respond(Response::HTTP_NOT_FOUND);

            if(isset($data["password"])){
             if($data["password"] != $data["confirmation_password"])
                return response()->json(['password' => ['Los passwords ingresados no coinciden.']], 422);

                $data["password"] = app('hash')->make($data["password"]);
            }

            if($data["role"])
                $model->roles()->sync($data["role"]);

            $model->update($data);
            return $this->respond(Response::HTTP_OK, $model);
        }catch(HttpResponseException $e){
            return $e->getResponse();
        }catch(\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }

    public function getSelfData(){
        try{
            $user = $this->jwt->parseToken()->authenticate();
            return response()->json($user);
        }catch(\Exception $e){
            return response()->json(["error" => [$e->getLine(),$e->getMessage()]], 500);
        }
    }

}
