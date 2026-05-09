<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Stay extends Model
{
    use HasFactory;

    protected $fillable = ['destination_id', 'host_id', 'type', 'name', 'location', 'description', 'price_per_night', 'rating', 'image_url', 'amenities'];

    protected $casts = [
        'amenities' => 'array',
        'price_per_night' => 'decimal:2',
        'rating' => 'decimal:2'
    ];

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
}
