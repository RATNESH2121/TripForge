<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Destination;
use App\Models\Stay;
use App\Models\Experience;
use App\Models\Booking;
use App\Models\Review;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@tripforge.com',
            'role' => 'admin',
        ]);

        // Regular User
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'role' => 'user',
        ]);

        // Generate Destinations
        $destinations = Destination::factory(10)->create();

        // Generate Stays, Experiences, Bookings, and Reviews
        foreach ($destinations as $destination) {
            $stays = Stay::factory(5)->create(['destination_id' => $destination->id]);
            $experiences = Experience::factory(3)->create(['destination_id' => $destination->id]);

            foreach ($stays as $stay) {
                Review::factory(rand(1, 5))->create([
                    'reviewable_id' => $stay->id,
                    'reviewable_type' => Stay::class,
                ]);
            }

            foreach ($experiences as $experience) {
                Review::factory(rand(1, 3))->create([
                    'reviewable_id' => $experience->id,
                    'reviewable_type' => Experience::class,
                ]);
            }
        }

        // Add a few bookings for the test user
        $stay = Stay::first();
        if ($stay) {
            Booking::factory()->create([
                'user_id' => $user->id,
                'bookable_id' => $stay->id,
                'bookable_type' => Stay::class,
                'status' => 'confirmed'
            ]);
        }
    }
}
