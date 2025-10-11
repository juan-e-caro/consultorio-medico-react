<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('pacientes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idUsuario')->constrained('usuarios')->onDelete('cascade');
            $table->string('documento');
            $table->string('telefono')->nullable();
            $table->string('direccion')->nullable();
            $table->date('fechaNacimiento')->nullable();
            $table->enum('genero', ['masculino', 'femenino', 'otro'])->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('pacientes');
    }
};
