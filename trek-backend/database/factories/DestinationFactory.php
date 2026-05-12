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
        return [
            'name' => fake()->city(),
            'country' => fake()->country(),
            'description' => fake()->paragraph(),
            'image_url' => 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop',
            'best_time_to_visit' => fake()->randomElement(['Spring', 'Summer', 'Autumn', 'Winter', 'All Year']),
        ];
    }
}
