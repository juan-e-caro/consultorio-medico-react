<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('citas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idPaciente')->constrained('pacientes')->onDelete('cascade');
            $table->foreignId('idDoctor')->constrained('doctores')->onDelete('cascade');
            $table->foreignId('idHorario')->constrained('horarios')->onDelete('cascade');
            $table->date('fecha');
            $table->enum('estado', ['pendiente', 'confirmada', 'cancelada', 'finalizada'])->default('pendiente');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('citas');
    }
};