<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Citas extends Model
{
    protected $table = 'citas';
    protected $fillable = [
        'idPaciente',
        'idDoctor',
        'idHorario',
        'fecha',
        'estado'
    ];

    public function pacientes(){
        return $this->belongsTo(Pacientes::class,'idPaciente');
    }

    public function doctores(){
        return $this->belongsTo(Doctores::class,'idDoctor');
    }

    public function horarios(){
        return $this->belongsTo(Horarios::class,'idHorario');
    }

    public function historial(){
        return $this->hasMany(Historial::class,'idCita');
    }
}
