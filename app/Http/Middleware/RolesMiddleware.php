<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class RolesMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ... $roles): Response
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            //si no hay token valido o esta vencido, devolvemos error
            return response()->json(['error'=>'Token invalido o no enviado'],401);
        }

        if (!in_array($user->rol, $rol)) {
            return response()->json(['error' => 'Acceso denegado, no tiene permiso'],403);
        }


        return $next($request);
    }
}
