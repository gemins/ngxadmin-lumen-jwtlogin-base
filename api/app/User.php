<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Database\Eloquent\SoftDeletes;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Model implements JWTSubject, AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    protected $fillable = ["first_name", "last_name", "gender", "email", "birthday", "avatar", "password"];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];


    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public static $rules = [
        "first_name" => "required",
        "email" => "required|email",
    ];

    public static $messages = [
        'first_name' => 'El nombre es requerido',
        'email' => 'El email es requerido',
    ];

    protected $appends = ['role'];

    public function getRoleAttribute(){
        $role = $this->roles()->first();
        return $role ? $role->name : null;
    }

    public function roles(){
        return $this->belongsToMany("App\Role", "user_roles");
    }
}
