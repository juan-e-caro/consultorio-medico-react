<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuarios extends Model
{
    protected $table = 'usuarios';
    protected $fillable = [
        'nombre',
        'email',
        'password',
        'rol'
    ];

    public function pacientes(){
        return $this->hasMany(Pacientes::class,'idUsuario');
    }

    public function doctores(){
        return $this->hasMany(Doctores::class,'idUsuario');
    }

}
