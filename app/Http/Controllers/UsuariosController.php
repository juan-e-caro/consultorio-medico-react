<?php

namespace App\Http\Controllers;

use App\Models\Usuarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsuariosController
{
    public function index()
    {
        $usuarios = Usuarios::all();
        return response()->json($usuarios);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'nombre' => 'required|string',
            'email' => 'required|string|max:255',
            'password' => 'required|string|max:255',
            'rol' => 'required'
        ]);
        if ($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $usuarios = Usuarios::create($validator->validated());
        return response()->json($usuarios,201);
    }

    public function show(string $id)
    {
        $usuarios = Usuarios::find($id);

        if(!$usuarios){
            return response()->json(['message' => 'usuario no encontrado'],404);
        }
        return response()->json($usuarios);
    }

    public function update(Request $request, string $id)
    {
        $usuarios = Usuarios::find($id);

        if(!$usuarios){
            return response()->json(['message' => 'usuario no encontrado'],404);
        }

        $validator = Validator::make($request->all(),[
            'nombre' => 'string',
            'email' => 'string|max:255',
            'password' => 'string|max:255',
            'rol' => 'string'
        ]);
        if ($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $usuarios->update($validator->validated());
        return response()->json($usuarios);
    }

    public function destroy(string $id)
    {
        $usuarios = Usuarios::find($id);

        if(!$usuarios){
            return response()->json(['message' => 'usuario no encontrado'],404);
        }
        return response()->json(['message' => 'usuario eliminado con exito']);
    }
}
