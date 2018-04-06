<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{

    public function up()
    {
        Schema::create('users', function(Blueprint $table) {
            $table->increments('id');
            $table->string('first_name', 255);
            $table->string('last_name');
            $table->string('gender');
            $table->string('email')->unique();
            $table->dateTime('birthday');
            $table->string('avatar');
            $table->string('password');
            // Constraints declaration
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::drop('users');
    }
}
