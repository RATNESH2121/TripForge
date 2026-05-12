<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'reviewer_name', 'reviewer_avatar', 'reviewer_location',
        'content', 'rating', 'trip_type', 'is_featured',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'rating'      => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}
