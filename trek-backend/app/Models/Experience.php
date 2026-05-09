<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = ['destination_id', 'host_id', 'title', 'description', 'price', 'duration_hours', 'image_url'];

    protected $casts = [
        'price' => 'decimal:2',
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
