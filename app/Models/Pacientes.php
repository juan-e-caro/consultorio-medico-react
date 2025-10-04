<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pacientes extends Model
{
    protected $table = 'pacientes';
    protected $fillable =[
        'idUsuario',
        'documento',
        'telefono',
        'direccion',
        'fechaNacimiento',
        'genero'
    ];

    public function usuarios(){
        return $this->belongsTo(Usuarios::class,'idUsuario');
    }

    public function citas(){
        return $this->hasMany(Citas::class, 'idPaciente');
    }

    public function historial(){
        return $this->hasMany(Historial::class,'idPaciente');
    }

}
