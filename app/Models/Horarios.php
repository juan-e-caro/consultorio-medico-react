<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Horarios extends Model
{
    protected $table = 'horarios';
    protected $fillable = [
        'idDoctor',
        'idConsultorio',
        'diaSemana',
        'horaInicio',
        'horaFin'
    ];

    public function doctores(){
        return $this->belongsTo(Doctores::class,'idDoctor');
    }

    public function consultorios(){
        return $this->belongsTo(Consultorios::class,'idConsultorio');
    }

    public function citas(){
        return $this->hasMany(Citas::class,'idHorario');
    }
}
