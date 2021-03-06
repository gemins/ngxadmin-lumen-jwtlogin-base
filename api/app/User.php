<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\SoftDeletes as SoftDeletes;

class User extends Eloquent implements JWTSubject, AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    protected $fillable = ["first_name", "last_name", "gender", "email", "birthday", "avatar", "password", "company_id"];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'role_id',
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

    protected $appends = ['text', 'role', 'role_name'];

    public function getTextAttribute(){
        return $this->first_name . " " . $this->last_name;
    }

    public function getRoleAttribute(){
        $role = $this->roles()->first();
        return $role ? $role->type : null;
    }

    public function getRoleNameAttribute(){
        $role = $this->roles()->first();
        return $role ? $role->name : null;
    }

    public function roles(){
        return $this->belongsToMany( "App\Role", "user_role", "user_id", "role_id");
    }

    public function hasRole($role){
        return $this->hasRoles([$role]);
    }

    public function hasRoles($roles)
    {
        foreach ($roles as $role){
            if($this->roles()->get()->contains("type", $role))
                return true;
        }
        return false;
    }
}
