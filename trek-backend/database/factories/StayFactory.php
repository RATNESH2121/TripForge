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
        $images = [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=800&auto=format&fit=crop',
        ];

        return [
            'destination_id' => Destination::factory(),
            'host_id' => User::factory()->state(['role' => 'hotel_owner']),
            'type' => fake()->randomElement(['Hotel', 'Hostel', 'Homestay']),
            'name' => fake()->company() . ' ' . fake()->randomElement(['Resort', 'Lodge', 'Hostel', 'Stay', 'Retreat', 'Inn']),
            'location' => fake()->streetAddress(),
            'description' => fake()->paragraph(),
            'price_per_night' => fake()->randomFloat(2, 500, 15000),
            'rating' => fake()->randomFloat(2, 3.5, 5.0),
            'image_url' => fake()->randomElement($images),
            'amenities' => fake()->randomElements(['WiFi', 'Pool', 'Spa', 'Breakfast', 'Gym', 'Parking', 'Bar', 'Mountain View', 'Room Service'], fake()->numberBetween(3, 6)),
        ];
    }
}
