<?php

namespace App\Http\Controllers;

use App\Models\Citas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CitasController extends Controller
{
    public function index()
    {
        $citas = Citas::with(['doctores.usuarios', 'pacientes.usuarios', 'horarios'])->get();
        return response()->json($citas);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'idPaciente' => 'required',
            'idDoctor' => 'required',
            'idHorario' => 'required',
            'fecha' => 'required|date',
            'estado' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $cita = Citas::create($validator->validated());
        return response()->json($cita, 201);
    }

    public function show(string $id)
    {
        $cita = Citas::with(['doctores', 'pacientes', 'horarios'])->find($id);

        if (!$cita) {
            return response()->json(['message' => 'Cita no encontrada'], 404);
        }

        return response()->json($cita);
    }

    public function update(Request $request, string $id)
    {
        $cita = Citas::find($id);

        if (!$cita) {
            return response()->json(['message' => 'Cita no encontrada'], 404);
        }

        $validator = Validator::make($request->all(), [
            'idPaciente' => 'sometimes|string',
            'idDoctor' => 'sometimes|string',
            'idHorario' => 'sometimes|string',
            'fecha' => 'sometimes|date',
            'estado' => 'sometimes|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $cita->update($validator->validated());
        return response()->json($cita);
    }

    public function destroy(string $id)
    {
        $cita = Citas::find($id);

        if (!$cita) {
            return response()->json(['message' => 'Cita no encontrada'], 404);
        }

        $cita->delete();

        return response()->json(['message' => 'Cita eliminada con éxito']);
    }
}
