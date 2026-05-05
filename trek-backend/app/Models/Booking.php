<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'trek_id', 'date', 'guests'];

    protected function casts(): array
    {
        return [
            'date'   => 'date',
            'guests' => 'integer',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function trek()
    {
        return $this->belongsTo(Trek::class);
    }
}
