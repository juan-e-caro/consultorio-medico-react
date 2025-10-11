<?php

namespace App\Http\Controllers;

use App\Models\Usuarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Registrar usuarios
    public function registrar(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:usuarios',
            'password' => 'required|string|min:5|confirmed', // <- para password_confirmation
            'roles' => 'nullable|string|max:10', // <- ahora es opcional
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $usuarios = Usuarios::create([
            'nombre' => $request->nombre,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'roles' => $request->roles ?? 'Paciente', // rol por defecto
        ]);

        // Crear token con Sanctum
        $token = $usuarios->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'usuarios' => $usuarios,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }


    // Login
    public function login(Request $request)
    {
        $data = $request->all() + $request->query();

        $validator = Validator::make($data, [
            'email' => 'required|string|email',
            'password' => 'required|string|min:5',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $usuarios = Usuarios::where('email', $data['email'])->first();

        if (!$usuarios || !Hash::check($data['password'], $usuarios->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Credenciales incorrectas',
            ], 401);
        }

        $token = $usuarios->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    // Logout (eliminar token actual)
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Sesión cerrada correctamente',
        ]);
    }

    // Obtener datos del usuario autenticado
    public function me(Request $request)
    {
        return response()->json([
            'success' => true,
            'usuarios' => $request->user(),
        ]);
    }

    // Mostrar usuarios por ID
    public function show($id)
    {
        $usuarios = Usuarios::find($id);
        if (!$usuarios) {
            return response()->json(['message' => 'Usuarios no encontrado'], 404);
        }

        return response()->json($usuarios);
    }
}
