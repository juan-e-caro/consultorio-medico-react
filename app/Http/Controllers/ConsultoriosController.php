<?php

namespace App\Http\Controllers;

use App\Models\Consultorios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConsultoriosController
{
    public function index()
    {
        $consultorios = Consultorios::all();
        return response()->json($consultorios);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'numero' => 'required|string|max:10',
            'ubicacion' => 'required|string|max:150'
        ]);
        if ($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $consultorios = Consultorios::create($validator->validated());
        return response()->json($consultorios,201);
    }

    public function show(string $id)
    {
        $consultorios = Consultorios::find($id);

        if(!$consultorios){
            return response()->json(['message' => 'consultorio no encontrado'],404);
        }
        return response()->json($consultorios);
    }

    public function update(Request $request, string $id)
    {
        $consultorios = Consultorios::find($id);

        if(!$consultorios){
            return response()->json(['message' => 'consultorio no encontrado'],404);
        }

        $validator = Validator::make($request->all(),[
            'numero' => 'string|max:10',
            'ubicacion' => 'string|max:150'
        ]);
        if ($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $consultorios->update($validator->validated());
        return response()->json($consultorios);
    }

    public function destroy(string $id)
    {
        $consultorios = Consultorios::find($id);

        if(!$consultorios){
            return response()->json(['message' => 'consultorio no encontrado'],404);
        }
        return response()->json(['message' => 'consultorio eliminado con exito']);
    }
}
