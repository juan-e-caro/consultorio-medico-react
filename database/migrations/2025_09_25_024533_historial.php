<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('historial', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idPaciente')->constrained('pacientes')->onDelete('cascade');
            $table->foreignId('idCita')->constrained('citas')->onDelete('cascade');
            $table->text('diagnostico')->nullable();
            $table->text('tratamiento')->nullable();
            $table->text('observaciones')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('historial');
    }
};
