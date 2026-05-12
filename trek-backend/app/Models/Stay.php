<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Stay extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'destination_id', 'host_id', 'type', 'name', 'slug', 'location',
        'description', 'price_per_night', 'rating', 'image_url', 'amenities',
        'badge', 'reviews_count', 'featured', 'gallery',
    ];

    protected $casts = [
        'amenities'     => 'array',
        'gallery'       => 'array',
        'price_per_night'=> 'decimal:2',
        'rating'        => 'decimal:2',
        'featured'      => 'boolean',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $stay) {
            if (empty($stay->slug)) {
                $stay->slug = Str::slug($stay->name) . '-' . Str::random(4);
            }
        });
    }

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }

    public function host()
    {
        return $this->belongsTo(User::class, 'host_id');
    }

    public function bookings()
    {
        return $this->morphMany(Booking::class, 'bookable');
    }

    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    public function wishlists()
    {
        return $this->morphMany(Wishlist::class, 'wishlistable');
    }
}
