<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        $response->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, DELETE')
            ->header('Access-Control-Allow-Headers', 'Authorization, Content-Type, Origin');
        
        return $response;
    }
}