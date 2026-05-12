<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('badge');                            // "30% OFF", "FREE STAY"
            $table->string('badge_color')->default('#f59e0b');  // hex color
            $table->string('promo_code')->unique();
            $table->decimal('discount_value', 5, 2);           // 30.00 = 30%
            $table->string('discount_type')->default('percent'); // percent|fixed
            $table->string('image_url');
            $table->string('cta_text')->default('Claim Offer');
            $table->json('perks')->nullable();                  // ["✓ Any destination","✓ Stackable"]
            $table->timestamp('expires_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('max_uses')->nullable();
            $table->unsignedInteger('used_count')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('offers');
    }
};
