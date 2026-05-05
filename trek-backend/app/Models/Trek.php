<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trek extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'price',
        'location',
        'image',
        'duration',
        'difficulty',
        'stars',
        'badge',
        'featured',
    ];

    protected function casts(): array
    {
        return [
            'featured' => 'boolean',
            'price'    => 'float',
            'stars'    => 'integer',
        ];
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
