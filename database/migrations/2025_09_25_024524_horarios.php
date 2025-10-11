<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('horarios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idDoctor')->constrained('doctores')->onDelete('cascade');
            $table->foreignId('idConsultorio')->constrained('consultorios')->onDelete('cascade');
            $table->enum('diaSemana', ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']);
            $table->time('horaInicio');
            $table->time('horaFin');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('horarios');
    }
};
