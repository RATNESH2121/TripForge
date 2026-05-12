<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Offer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title', 'description', 'badge', 'badge_color', 'promo_code',
        'discount_value', 'discount_type', 'image_url', 'cta_text',
        'perks', 'expires_at', 'is_active', 'max_uses', 'used_count',
    ];

    protected $casts = [
        'perks'          => 'array',
        'expires_at'     => 'datetime',
        'discount_value' => 'decimal:2',
        'is_active'      => 'boolean',
    ];

    // Only return active, non-expired offers
    public function scopeActive($query)
    {
        return $query->where('is_active', true)
            ->where(function ($q) {
                $q->whereNull('expires_at')->orWhere('expires_at', '>', now());
            });
    }
}
