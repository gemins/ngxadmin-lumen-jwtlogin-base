<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    protected $fillable = ["name"];

    public function user(){
        return $this->belongsToMany("App\User", "user_id");
    }
}