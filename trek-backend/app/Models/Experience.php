<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Experience extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'destination_id', 'host_id', 'title', 'slug', 'description',
        'category', 'difficulty', 'price', 'duration_hours', 'image_url',
        'rating', 'reviews_count', 'badge', 'featured',
    ];

    protected $casts = [
        'price'         => 'decimal:2',
        'rating'        => 'decimal:2',
        'featured'      => 'boolean',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $exp) {
            if (empty($exp->slug)) {
                $exp->slug = Str::slug($exp->title) . '-' . Str::random(4);
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
