<?php

namespace Database\Factories;

use App\Models\Stay;
use App\Models\Destination;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Stay>
 */
class StayFactory extends Factory
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
            'host_id' => User::factory()->state(['role' => 'hotel_owner']),
            'type' => fake()->randomElement(['Hotel', 'Hostel', 'Homestay']),
            'name' => fake()->company() . ' ' . fake()->randomElement(['Resort', 'Lodge', 'Hostel', 'Stay']),
            'location' => fake()->streetAddress(),
            'description' => fake()->paragraph(),
            'price_per_night' => fake()->randomFloat(2, 500, 15000),
            'rating' => fake()->randomFloat(2, 3.5, 5.0),
            'image_url' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
            'amenities' => fake()->randomElements(['WiFi', 'Pool', 'Spa', 'Breakfast', 'Gym', 'Parking', 'Bar'], fake()->numberBetween(2, 5)),
        ];
    }
}
