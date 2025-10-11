<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consultorios extends Model
{
    protected $table = 'consultorios';
    protected $fillable = [
        'numero',
        'ubicacion'
    ];

    public function horarios(){
        return $this->hasMany(Horarios::class,'idConsultorio');
    }
}
