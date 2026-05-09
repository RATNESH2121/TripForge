<?php

namespace Database\Factories;

use App\Models\Destination;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Destination>
 */
class DestinationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $images = [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1580655653885-65763b2597d0?q=80&w=800&auto=format&fit=crop',
        ];

        return [
            'name' => fake()->city(),
            'country' => fake()->country(),
            'description' => fake()->paragraph(),
            'image_url' => fake()->randomElement($images),
            'best_time_to_visit' => fake()->randomElement(['Spring', 'Summer', 'Autumn', 'Winter', 'All Year']),
        ];
    }
}
