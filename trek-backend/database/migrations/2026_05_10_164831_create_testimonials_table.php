<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('reviewer_name');
            $table->string('reviewer_avatar')->nullable();
            $table->string('reviewer_location')->nullable();   // "Mumbai, India"
            $table->text('content');
            $table->tinyInteger('rating')->default(5);         // 1-5 stars
            $table->string('trip_type')->nullable();           // "Adventure Trek", "Beach Holiday"
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
