<?php
namespace App\Libraries;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

class Helpers
{
    public static function save_image($image, $dir, $name)
    {
        try {
            $path = false;
            if (isset($image["base64_image"])) {
                $png_url = $name . ".png";
                $path = 'images/' . $dir . '/' . $png_url;
                $newimage = Image::make(file_get_contents($image["base64_image"]))->save(app()->public_path . '/' . $path);
            }
            return $path;
        } catch (\ErrorException $e) {
            return $e->getMessage();
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