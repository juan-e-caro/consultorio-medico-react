<?php

namespace App\Http\Controllers;

use App\Models\Pacientes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PacientesController
{
    public function index()
    {
        $pacientes = Pacientes::with(['usuarios'])->get();

        return response()->json($pacientes);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'idUsuario' => 'required',
            'documento' => 'required|string|max:20',
            'telefono' => 'required|string',
            'direccion' => 'required|string|max:150',
            'fechaNacimiento' => 'required|date',
            'genero' => 'required'
        ]);
        if ($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $pacientes = Pacientes::create($validator->validated());
        return response()->json($pacientes,201);
    }

    public function show(string $id)
    {
        $pacientes = Pacientes::find($id);

        if(!$pacientes){
            return response()->json(['message' => 'paciente no encontrado'],404);
        }
        return response()->json($pacientes);
    }

    public function update(Request $request, string $id)
    {
        $pacientes = Pacientes::find($id);

        if(!$pacientes){
            return response()->json(['message' => 'paciente no encontrado'],404);
        }

        $validator = Validator::make($request->all(),[
            'idUsuario' => 'string',
            'documento' => 'string|max:20',
            'telefono' => 'string',
            'direccion' => 'string|max:150',
            'fechaNacimiento' => 'date',
            'genero' => 'string'
        ]);
        if ($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $pacientes->update($validator->validated());
        return response()->json($pacientes);
    }

    public function destroy(string $id)
    {
        $pacientes = Pacientes::find($id);

        if(!$pacientes){
            return response()->json(['message' => 'paciente no encontrado'],404);
        }
        return response()->json(['message' => 'paciente eliminado con exito']);
    }
}
