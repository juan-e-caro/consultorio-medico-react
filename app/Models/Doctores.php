<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctores extends Model
{
    protected $table = 'doctores';
    protected $fillable = [
        'idUsuario',
        'idEspecialidad',
        'cedula',
        'telefono'
    ];

    public function usuarios(){
        return $this->belongsTo(Usuarios::class,'idUsuario');
    }

    public function especialidades(){
        return $this->belongsTo(Especialidades::class,'idEspecialidad');
    }

    public function horarios(){
        return $this->hasMany(Horarios::class,'idDoctor');
    }

    public function citas(){
        return $this->hasMany(Citas::class,'idDoctor');
    }
}
