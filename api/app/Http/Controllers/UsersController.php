<?php namespace App\Http\Controllers;

use App\Libraries\Helpers;
use App\Role;
use Illuminate\Http\Exceptions\HttpResponseException;
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
            $role = Role::select("_id")->where("type", $data["role"])->first();
            $role_id = $role ? $role->_id : null;
            if($data["role"] && $role_id)
                $user->roles()->sync([$role_id]);

            //Image
            $image = $request->get('avatar');
            $newImage = Helpers::save_image($image, 'users', "avatar_".$user->id);
            if($newImage){
                $data['avatar'] = $newImage["path"];
                $data['avatar_thumb'] = $newImage["path_thumb"];
                $user->update($data);
            }

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

            $role = Role::select("_id")->where("type", $data["role"])->first();
            $role_id = $role ? $role->_id : null;
            if($data["role"] && $role_id)
                $model->roles()->sync([$role_id]);

            //Image
            $image = $request->get('avatar');
            $newImage = Helpers::save_image($image, 'users', "avatar_".$id);
            if($newImage){
                $data['avatar'] = $newImage["path"];
                $data['avatar_thumb'] = $newImage["path_thumb"];
            }

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
