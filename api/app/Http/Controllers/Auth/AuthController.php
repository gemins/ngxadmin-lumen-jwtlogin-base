<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Tymon\JWTAuth\JWTAuth;

class AuthController extends Controller
{
    /**
     * @var \Tymon\JWTAuth\JWTAuth
     */
    protected $jwt;

    public function __construct(JWTAuth $jwt)
    {
        $this->jwt = $jwt;
    }

    public function login(Request $request)
    {
        $this->validate($request, ['email'    => 'required|max:255', 'password' => 'required']);

        try {
            $user = User::where("email", $request->input("email"))->first();
            if (!$user || !$token = Auth::claims(["role" => $user->role])->attempt($request->only('email', 'password')))
                return response()->json(['invalid_credentials'], 404);

            $user = $this->jwt->setToken($token)->user();

        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], 500);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], 500);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent' => $e->getMessage()], 500);
        }

        return response()->json(['token' => $token, 'user' => $user]);
    }

    public function logout(){
        return response()->json('ok', 200);
    }
}