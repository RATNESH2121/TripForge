<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('destinations', function (Blueprint $table) {
            $table->string('type')->default('city')->after('country');          // mountain|beach|city|nature|hidden
            $table->string('slug')->nullable()->unique()->after('name');
            $table->decimal('rating', 3, 2)->default(4.5)->after('image_url');
            $table->unsignedInteger('reviews_count')->default(0)->after('rating');
            $table->json('tags')->nullable()->after('reviews_count');           // ["Adventure","Scenic"]
            $table->decimal('starting_price', 10, 2)->nullable()->after('tags');
            $table->boolean('featured')->default(false)->after('starting_price');
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::table('destinations', function (Blueprint $table) {
            $table->dropColumn(['type', 'slug', 'rating', 'reviews_count', 'tags', 'starting_price', 'featured', 'deleted_at']);
        });
    }
};
