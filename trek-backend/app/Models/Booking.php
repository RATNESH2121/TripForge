<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'bookable_type', 'bookable_id',
        'check_in_date', 'check_out_date', 'guests',
        'total_price', 'status', 'special_requests',
        'cancel_reason', 'cancelled_at',
    ];

    protected $casts = [
        'check_in_date'  => 'date',
        'check_out_date' => 'date',
        'total_price'    => 'decimal:2',
        'cancelled_at'   => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bookable()
    {
        return $this->morphTo();
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    // ─── Helpers ─────────────────────────────────────────────────
    public function isUpcoming(): bool
    {
        return $this->check_in_date >= now()->toDateString();
    }

    public function isCancellable(): bool
    {
        return $this->status !== 'cancelled' && $this->isUpcoming();
    }
}
