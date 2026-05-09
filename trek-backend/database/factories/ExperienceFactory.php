<?php

namespace Database\Factories;

use App\Models\Experience;
use App\Models\Destination;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Experience>
 */
class ExperienceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'destination_id' => Destination::factory(),
            'host_id' => User::factory()->state(['role' => 'experience_host']),
            'title' => fake()->catchPhrase() . ' ' . fake()->randomElement(['Tour', 'Adventure', 'Expedition', 'Class']),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 100, 5000),
            'duration_hours' => fake()->numberBetween(1, 12),
            'image_url' => 'https://images.unsplash.com/photo-1516654215234-93ff558e803c?q=80&w=800&auto=format&fit=crop',
        ];
    }
}
