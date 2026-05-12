<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id', 'user_id', 'amount', 'currency', 'gateway',
        'gateway_payment_id', 'gateway_order_id', 'status',
        'gateway_response', 'paid_at',
    ];

    protected $casts = [
        'gateway_response' => 'array',
        'amount'           => 'decimal:2',
        'paid_at'          => 'datetime',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
