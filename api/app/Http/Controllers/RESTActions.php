<?php namespace App\Http\Controllers;

use App\Libraries\Helpers;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Tymon\JWTAuth\JWTAuth;

trait RESTActions {

    protected $jwt;
    protected $user;

    public function __construct(JWTAuth $jwt)
    {
        $this->jwt = $jwt;
        $this->user = $this->jwt->parseToken()->authenticate();
    }


    public function all(Request $request)
    {
        try{
            //Queries
            $per_page = $request->get("per_page") ? (int) $request->get("per_page") : 10;
            $order = $request->get("order") ? $request->get("order") : 'desc';
            $order_by = $request->get("order_by") ? $request->get("order_by") : '_id';
            $search = $request->get("q");

            //Model to get fillables
            $m = self::MODEL;
            $newM = new $m();

            //model to search results
            $model = self::MODEL;

            //Function query
            $result = $model::orderBy($order_by, $order)
//                ->where(function ($query) use($search) {
//                    if ($this->access->isOwner)
//                        $query->where('user_id', $this->access->authUser->id);
//                    elseif ($this->access->isSeller)
//                        $query->where('user_id', $this->access->authUser->user_id);
//                })
                ->where(function ($query) use($search, $newM) {
                    if($search){
                        foreach($newM->getFillable() as $column)
                        {
                            if($column != '_id')
                                $query->orWhere($column, 'like', '%'.$search.'%');
                        }
                    }
                })->paginate($per_page);

            return $this->respond(Response::HTTP_OK, $result);
        }catch(\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }

    public function get($id)
    {
        try{
            $m = self::MODEL;
            $model = $m::find($id);
            if(is_null($model))
                return $this->respond(Response::HTTP_NOT_FOUND);

            if($model && method_exists($model, 'getRelationshipsAttributes'))
                $model->getRelationshipsAttributes();

            return $this->respond(Response::HTTP_OK, $model);
        }catch(\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }

    public function add(Request $request)
    {
        try{
            $m = self::MODEL;
            Helpers::validate($request, $m::$rules, $m::$messages);
            $data = $request->all();
            $data["company_id"] = $this->user->company_id;
            $data["owner_id"] = $this->user->id;

            return $this->respond(Response::HTTP_CREATED, $m::create($data));
        }catch(HttpResponseException $e){
            return $e->getResponse();
        }catch(\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }

    public function put(Request $request, $id)
    {
        try{
            $m = self::MODEL;
            Helpers::validate($request, $m::$rules, $m::$messages);
            $model = $m::find($id);

            //Find or fail
            if(is_null($model))
                return $this->respond(Response::HTTP_NOT_FOUND);

            //Control access by type user.
            //if(($this->access->isOwner || $this->access->isSeller) && $model->user_id != $this->access->authUser->id)
            //    return $this->isUnauthorized();

            $data = $request->all();
            $data["company_id"] = $this->user->company_id;
            $data["owner_id"] = $this->user->id;

            $model->update($data);
            return $this->respond(Response::HTTP_OK, $model);
        }catch(HttpResponseException $e){
            return $e->getResponse();
        }catch(\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }

    public function remove($id)
    {
        try{
            $m = self::MODEL;
            $model = $m::find($id);
            if(is_null($model))
                return $this->respond(Response::HTTP_NOT_FOUND);

            //Check if is own element;
            //if(($this->access->isOwner || $this->access->isSeller) && $model->user_id != $this->access->authUser->id)
            //    return $this->isUnauthorized();

            $model->delete($id);
            return $this->respond(Response::HTTP_NO_CONTENT);
        }catch(\ErrorException $e) {
            return response()->json(["error" => [$e->getLine(), $e->getMessage()]], 500);
        }
    }

    public function replicate($id){
        try{
            $m = self::MODEL;
            $model = $m::find($id);
            if(is_null($model))
                return $this->respond(Response::HTTP_NOT_FOUND);

            $newModel = $model->replicate();
            $newModel->save();
            return response()->json(['resp' => 'ok']);
        }catch(\ErrorException $e){
            return response()->json(["error" => [$e->getLine(),$e->getMessage()]], 500);
        }
    }

    protected function respond($status, $data = [])
    {
        return response()->json($data, $status);
    }

    private function isUnauthorized()
    {
        return response()->json('Access Unauthorized.', 401);
    }

}