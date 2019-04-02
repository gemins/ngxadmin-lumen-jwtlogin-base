<?php
namespace App\Libraries;

use Carbon\Carbon;
use GrahamCampbell\Flysystem\Facades\Flysystem;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

class Helpers
{
    public static function save_image($image, $dir, $name)
    {
        try {
            $path_file = null;
            if (isset($image["base64_image"])) {
                $png_url = $name . "_". Carbon::now()->timestamp;
                $path_file = 'images/' . $dir . '/' . $png_url;
                if(!Flysystem::has('images/' . $dir))
                    Flysystem::createDir('images/' . $dir);

                //General Image Vars
                $fileByBase64 = file_get_contents($image["base64_image"]);

                //Original
                Image::make($fileByBase64)->save(app()->public_path . '/' . $path_file .".png");

                $width = 128;
                $height = 128;
                //Thumbnails
                Image::make($fileByBase64)->resize($width, $height, function ($constraint) {
                    $constraint->aspectRatio();
                })->save(app()->public_path . '/' . $path_file ."_thumb.png");

                $path_file = ["path" => $path_file .".png", "path_thumb" => $path_file."_thumb.png" ] ;
            }
            return $path_file ? $path_file : null;
        } catch (\ErrorException $e) {
            $error =  $e->getMessage();
            $request = response()->json($error, 500);
            throw new HttpResponseException($request);
        }
    }

    public static function save_file($file, $dir, $name)
    {
        try {
            $path = false;
            if (isset($file["base64_file"])) {
                $path = 'files/' . $dir . '/' . $name;
                $file_data_sheet = file_get_contents($file["base64_file"]);
                file_put_contents(app()->public_path . '/' . $path, $file_data_sheet);
            }
            return $path;
        } catch (\ErrorException $e) {
            return $e->getMessage();
        }
    }

    public static function validate($request, $rules, $messages = false)
    {
        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            $errors = $validator->errors()->getMessages();
            $request = response()->json($errors, 422);
            throw new HttpResponseException($request);
        }
    }
}