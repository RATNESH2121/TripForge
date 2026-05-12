<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('special_requests')->nullable()->after('status');
            $table->string('cancel_reason')->nullable()->after('special_requests');
            $table->timestamp('cancelled_at')->nullable()->after('cancel_reason');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn(['special_requests', 'cancel_reason', 'cancelled_at']);
        });
    }
};
