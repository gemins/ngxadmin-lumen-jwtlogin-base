<?php
namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\SoftDeletes as SoftDeletes;

class Role extends Eloquent
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    protected $fillable = ["name"];

    public function user(){
        return $this->belongsToMany('App\User', "user_role", "role_id", "user_id");
    }
}