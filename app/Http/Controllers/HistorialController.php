<?php

namespace App\Http\Controllers;

use App\Models\Historial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HistorialController
{
    public function index()
    {
        $historial = Historial::with(['pacientes.usuarios', 'citas.doctores.usuarios'])->get();
        return response()->json($historial);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'idPaciente' => 'required',
            'idCita' => 'required',
            'diagnostico' => 'required|string',
            'tratamiento' => 'required|string',
            'observaciones' => 'required|string'
        ]);
        if ($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $historial = Historial::create($validator->validated());
        return response()->json($historial,201);
    }

    public function show(string $id)
    {
        $historial = Historial::find($id);

        if(!$historial){
            return response()->json(['message' => 'historial no encontrado'],404);
        }
        return response()->json($historial);
    }

    public function update(Request $request, string $id)
    {
        $historial = Historial::find($id);

        if(!$historial){
            return response()->json(['message' => 'historial no encontrado'],404);
        }

        $validator = Validator::make($request->all(),[
            'idPaciente' => 'string',
            'idCita' => 'string',
            'diagnostico' => 'string',
            'tratamiento' => 'string',
            'observaciones' => 'string'
        ]);
        if ($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $historial->update($validator->validated());
        return response()->json($historial);
    }

    public function destroy(string $id)
    {
        $historial = Historial::find($id);

        if(!$historial){
            return response()->json(['message' => 'historial no encontrado'],404);
        }
        return response()->json(['message' => 'historial eliminado con exito']);
    }
}
