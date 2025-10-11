<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuarios extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable; 

    protected $table = 'usuarios';

    protected $fillable = [
        'nombre',
        'email',
        'password',
        'roles'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Relaciones
    public function pacientes(){
        return $this->hasMany(Pacientes::class, 'idUsuario');
    }

    public function doctores(){
        return $this->hasMany(Doctores::class, 'idUsuario');
    }
}
