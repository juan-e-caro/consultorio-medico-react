<?php

namespace App\Http\Controllers;

use App\Models\Horarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HorariosController
{
    public function index()
    {
        $horarios = Horarios::with('doctores.usuarios','consultorios')->get();

        return response()->json($horarios);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'idDoctor' => 'required',
            'idConsultorio' => 'required',
            'diaSemana' => 'required',
            'horaInicio' => 'required|date_format:H:i',
            'horaFin' => 'required|date_format:H:i'

        ]);
        if ($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $horarios = Horarios::create($validator->validated());
        return response()->json($horarios,201);
    }

    public function show(string $id)
    {
        $horarios = Horarios::find($id);

        if(!$horarios){
            return response()->json(['message' => 'horario no encontrado'],404);
        }
        return response()->json($horarios);
    }

    public function update(Request $request, string $id)
    {
        $horarios = Horarios::find($id);

        if(!$horarios){
            return response()->json(['message' => 'horario no encontrado'],404);
        }

        $validator = Validator::make($request->all(),[
            'idDoctor' => 'string',
            'idConsultorio' => 'string',
            'diaSemana' => 'string',
            'horaInicio' => 'date_format:H:i',
            'horaFin' => 'date_format:H:i'

        ]);
        if ($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $horarios->update($validator->validated());
        return response()->json($horarios);
    }

    public function destroy(string $id)
    {
        $horarios = Horarios::find($id);

        if(!$horarios){
            return response()->json(['message' => 'horaio no encontrado'],404);
        }
        return response()->json(['message' => 'horario eliminado con exito']);
    }
}
