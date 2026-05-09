<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\User;
use App\Models\Stay;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $checkIn = fake()->dateTimeBetween('now', '+3 months');
        $checkOut = (clone $checkIn)->modify('+' . fake()->numberBetween(1, 7) . ' days');
        
        return [
            'user_id' => User::factory(),
            'bookable_type' => Stay::class,
            'bookable_id' => Stay::factory(),
            'check_in_date' => $checkIn,
            'check_out_date' => $checkOut,
            'guests' => fake()->numberBetween(1, 4),
            'total_price' => fake()->randomFloat(2, 1000, 50000),
            'status' => fake()->randomElement(['pending', 'confirmed', 'cancelled']),
        ];
    }
}
