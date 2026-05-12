<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('stays', function (Blueprint $table) {
            $table->string('badge')->nullable()->after('rating');           // e.g. "Staff Pick", "Hot Deal"
            $table->string('slug')->nullable()->unique()->after('name');
            $table->unsignedInteger('reviews_count')->default(0)->after('badge');
            $table->boolean('featured')->default(false)->after('reviews_count');
            $table->json('gallery')->nullable()->after('featured');         // Additional image URLs
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::table('stays', function (Blueprint $table) {
            $table->dropColumn(['badge', 'slug', 'reviews_count', 'featured', 'gallery', 'deleted_at']);
        });
    }
};
