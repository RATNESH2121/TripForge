<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('treks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->string('location');
            $table->string('image')->nullable();
            $table->string('duration')->nullable();
            $table->string('difficulty')->default('Moderate');
            $table->unsignedTinyInteger('stars')->default(4);
            $table->string('badge')->nullable();
            $table->boolean('featured')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('treks');
    }
};
