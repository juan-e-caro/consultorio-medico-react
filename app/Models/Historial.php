<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Historial extends Model
{
    protected $table = 'historial';
    protected $fillable = [
        'idPaciente',
        'idCita',
        'diagnostico',
        'tratamiento',
        'observaciones'
    ];

    public function pacientes(){
        return $this->belongsTo(Pacientes::class,'idPaciente');
    }

    public function citas(){
        return $this->belongsTo(Citas::class,'idCita');
    }
}
