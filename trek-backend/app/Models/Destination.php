<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Destination extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'slug', 'country', 'type', 'description', 'image_url',
        'best_time_to_visit', 'rating', 'reviews_count', 'tags',
        'starting_price', 'featured',
    ];

    protected $casts = [
        'tags'          => 'array',
        'rating'        => 'decimal:2',
        'starting_price'=> 'decimal:2',
        'featured'      => 'boolean',
    ];

    // Auto-generate slug on creation
    protected static function booted(): void
    {
        static::creating(function (self $destination) {
            if (empty($destination->slug)) {
                $destination->slug = Str::slug($destination->name);
            }
        });
    }

    public function stays()
    {
        return $this->hasMany(Stay::class);
    }

    public function experiences()
    {
        return $this->hasMany(Experience::class);
    }

    // Route model binding by slug
    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
