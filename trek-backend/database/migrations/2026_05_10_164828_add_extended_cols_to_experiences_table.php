<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('experiences', function (Blueprint $table) {
            $table->string('category')->default('tours')->after('title');    // tours|food|culture|adventure|diving
            $table->string('difficulty')->default('Moderate')->after('category'); // Easy|Moderate|Hard|Extreme
            $table->decimal('rating', 3, 2)->default(4.5)->after('image_url');
            $table->unsignedInteger('reviews_count')->default(0)->after('rating');
            $table->string('badge')->nullable()->after('reviews_count');     // HOT|LUXURY|NEW
            $table->boolean('featured')->default(false)->after('badge');
            $table->string('slug')->nullable()->unique()->after('title');
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::table('experiences', function (Blueprint $table) {
            $table->dropColumn(['category', 'difficulty', 'rating', 'reviews_count', 'badge', 'featured', 'slug', 'deleted_at']);
        });
    }
};
