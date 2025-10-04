<?php

namespace App\Http\Controllers;

use App\Models\Doctores;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DoctoresController
{
    public function index()
    {
        $doctores = Doctores::with(['usuarios', 'especialidades'])->get();
        return response()->json($doctores);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'idUsuario' => 'required',
            'idEspecialidad' => 'required',
            'cedula' => 'required|string|max:20',
            'telefono' => 'required|string|max:20'
        ]);
        if ($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $doctores = Doctores::create($validator->validated());
        return response()->json($doctores,201);
    }

    public function show(string $id)
    {
        $doctores = Doctores::with(['usuarios', 'especialidades'])->find($id);

        if(!$doctores){
            return response()->json(['message' => 'doctor no encontrado'],404);
        }
        return response()->json($doctores);
    }

    public function update(Request $request, string $id)
    {
        $doctores = Doctores::find($id);

        if(!$doctores){
            return response()->json(['message' => 'doctor no encontrado'],404);
        }

        $validator = Validator::make($request->all(),[
            'idUsuario' => 'string',
            'idEspecialidad' => 'string',
            'cedula' => 'string|max:20',
            'telefono' => 'string|max:20'
        ]);
        if ($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $doctores->update($validator->validated());
        return response()->json($doctores);
    }

    public function destroy(string $id)
    {
        $doctores = Doctores::find($id);

        if(!$doctores){
            return response()->json(['message' => 'doctor no encontrado'],404);
        }

        $doctores->delete();

        return response()->json(['message' => 'doctor eliminado con exito']);
    }
}
