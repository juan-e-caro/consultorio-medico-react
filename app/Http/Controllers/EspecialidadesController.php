<?php

namespace App\Http\Controllers;

use App\Models\Especialidades;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EspecialidadesController
{
     public function index()
    {
        $especialidades = Especialidades::all();
        return response()->json($especialidades);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'nombre' => 'required|string|max:100',
            'descripcion' => 'required|string'
        ]);
        if ($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $especialidades = Especialidades::create($validator->validated());
        return response()->json($especialidades,201);
    }

    public function show(string $id)
    {
        $especialidades = Especialidades::find($id);

        if(!$especialidades){
            return response()->json(['message' => 'especialidad no encontrada'],404);
        }
        return response()->json($especialidades);
    }

    public function update(Request $request, string $id)
    {
        $especialidades = Especialidades::find($id);

        if(!$especialidades){
            return response()->json(['message' => 'especialidad no encontrada'],404);
        }

        $validator = Validator::make($request->all(),[
            'nombre' => 'string|max:100',
            'descripcion' => 'string'
        ]);
        if ($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $especialidades->update($validator->validated());
        return response()->json($especialidades);
    }

    public function destroy(string $id)
    {
        $especialidades = Especialidades::find($id);

        if(!$especialidades){
            return response()->json(['message' => 'especialidad no encontrada'],404);
        }
        return response()->json(['message' => 'especialidad eliminada
         con exito']);
    }
}
