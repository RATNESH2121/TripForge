<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Destination extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'country', 'description', 'image_url', 'best_time_to_visit'];

    public function stays()
    {
        return $this->hasMany(Stay::class);
    }

    public function experiences()
    {
        return $this->hasMany(Experience::class);
    }
}
