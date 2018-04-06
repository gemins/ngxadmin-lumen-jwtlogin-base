<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

/**
 * Created by PhpStorm.
 * User: manuel
 * Date: 31/1/17
 * Time: 16:41
 */
class UsersTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('users')->insert([
            'first_name' => 'Admin',
            'last_name' => 'Admin',
            'password' => app('hash')->make('123456'),
            'email' => 'root@root.com',
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
        ]);

        $user = \App\User::where("email", "root@root.com")->first();
        $user->roles()->sync(1);
    }
    
    
}