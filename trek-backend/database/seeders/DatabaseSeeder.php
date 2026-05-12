<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Destination;
use App\Models\Stay;
use App\Models\Experience;
use App\Models\Booking;
use App\Models\Review;
use App\Models\Offer;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Users ──────────────────────────────────────────────────────────
        $admin = User::factory()->create([
            'name'     => 'Admin User',
            'email'    => 'admin@tripforge.com',
            'role'     => 'admin',
            'phone'    => '+91 99999 00001',
            'bio'      => 'Platform administrator for TripForge.',
            'location' => 'Mumbai, India',
        ]);
        $user = User::factory()->create([
            'name'     => 'John Doe',
            'email'    => 'john@example.com',
            'role'     => 'user',
            'phone'    => '+91 98765 43210',
            'bio'      => 'Adventure lover and avid trekker.',
            'location' => 'Delhi, India',
        ]);

        // ── Destinations ───────────────────────────────────────────────────
        $d1 = Destination::create([
            'name'             => 'Tokyo',
            'country'          => 'Japan',
            'type'             => 'city',
            'description'      => 'A neon-lit metropolis where ancient tradition meets futuristic innovation.',
            'image_url'        => 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
            'best_time_to_visit' => 'Autumn',
            'rating'           => 4.8,
            'reviews_count'    => 3241,
            'tags'             => ['Neon Nights', 'Culture', 'Street Food'],
            'starting_price'   => 65000,
            'featured'         => true,
        ]);

        $d2 = Destination::create([
            'name'             => 'Iceland',
            'country'          => 'Europe',
            'type'             => 'nature',
            'description'      => 'A land of fire and ice, featuring dramatic waterfalls and dancing auroras.',
            'image_url'        => 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=800&q=80',
            'best_time_to_visit' => 'Winter',
            'rating'           => 4.9,
            'reviews_count'    => 1876,
            'tags'             => ['Northern Lights', 'Adventure', 'Winter'],
            'starting_price'   => 120000,
            'featured'         => true,
        ]);

        $d3 = Destination::create([
            'name'             => 'Bali',
            'country'          => 'Indonesia',
            'type'             => 'beach',
            'description'      => 'Tropical beaches, jungle resorts, and serene rice terraces.',
            'image_url'        => 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
            'best_time_to_visit' => 'Dry Season',
            'rating'           => 4.7,
            'reviews_count'    => 5432,
            'tags'             => ['Beaches', 'Spiritual', 'Tropical'],
            'starting_price'   => 35000,
            'featured'         => true,
        ]);

        $d4 = Destination::create([
            'name'             => 'Switzerland',
            'country'          => 'Europe',
            'type'             => 'mountain',
            'description'      => 'Alpine mountains, crystal-clear lakes, and luxury trains.',
            'image_url'        => 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
            'best_time_to_visit' => 'Summer',
            'rating'           => 4.9,
            'reviews_count'    => 2109,
            'tags'             => ['Alps', 'Scenic Rail', 'Luxury'],
            'starting_price'   => 180000,
            'featured'         => true,
        ]);

        $d5 = Destination::create([
            'name'             => 'Dubai',
            'country'          => 'UAE',
            'type'             => 'city',
            'description'      => 'Futuristic skyline, desert luxury, and opulent shopping.',
            'image_url'        => 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
            'best_time_to_visit' => 'Winter',
            'rating'           => 4.6,
            'reviews_count'    => 4321,
            'tags'             => ['Luxury', 'Desert', 'Skyline'],
            'starting_price'   => 95000,
            'featured'         => false,
        ]);

        $d6 = Destination::create([
            'name'             => 'Paris',
            'country'          => 'France',
            'type'             => 'city',
            'description'      => 'Eiffel Tower streets, world-class art, and a romantic aesthetic.',
            'image_url'        => 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
            'best_time_to_visit' => 'Spring',
            'rating'           => 4.8,
            'reviews_count'    => 6789,
            'tags'             => ['Romance', 'Art', 'Cuisine'],
            'starting_price'   => 110000,
            'featured'         => true,
        ]);

        // ── Stays ──────────────────────────────────────────────────────────
        $s1 = Stay::create([
            'destination_id'  => $d3->id,
            'host_id'         => $admin->id,
            'name'            => 'Ubud Infinity Resort',
            'type'            => 'Hotel',
            'location'        => 'Bali, Indonesia',
            'description'     => 'Luxury resort featuring a stunning infinity pool overlooking the jungle canopy.',
            'price_per_night' => 15000,
            'rating'          => 4.9,
            'reviews_count'   => 423,
            'image_url'       => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
            'amenities'       => ['WiFi', 'Infinity Pool', 'Spa', 'Jungle View', 'Breakfast'],
            'badge'           => 'Staff Pick',
            'featured'        => true,
        ]);

        $s2 = Stay::create([
            'destination_id'  => $d4->id,
            'host_id'         => $admin->id,
            'name'            => 'Zermatt Alpine Retreat',
            'type'            => 'Hotel',
            'location'        => 'Zermatt, Switzerland',
            'description'     => 'Premium mountain resort with panoramic views of the Matterhorn.',
            'price_per_night' => 35000,
            'rating'          => 5.0,
            'reviews_count'   => 287,
            'image_url'       => 'https://images.unsplash.com/photo-1518182170546-076616fdfaaf?auto=format&fit=crop&w=800&q=80',
            'amenities'       => ['WiFi', 'Ski Access', 'Heated Pool', 'Fireplace', 'Concierge'],
            'badge'           => 'Luxury',
            'featured'        => true,
        ]);

        $s3 = Stay::create([
            'destination_id'  => $d5->id,
            'host_id'         => $admin->id,
            'name'            => 'Palm Jumeirah Villa',
            'type'            => 'Hotel',
            'location'        => 'Dubai, UAE',
            'description'     => 'Exclusive beach villa on the Palm offering absolute privacy and luxury.',
            'price_per_night' => 45000,
            'rating'          => 4.8,
            'reviews_count'   => 198,
            'image_url'       => 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
            'amenities'       => ['WiFi', 'Private Beach', 'Butler Service', 'Pool', 'Gym'],
            'badge'           => 'Hot Deal',
            'featured'        => false,
        ]);

        $s4 = Stay::create([
            'destination_id'  => $d2->id,
            'host_id'         => $user->id,
            'name'            => 'Aurora Cozy Cabin',
            'type'            => 'Homestay',
            'location'        => 'Vik, Iceland',
            'description'     => 'A cozy wooden cabin perfectly situated for viewing the northern lights.',
            'price_per_night' => 12000,
            'rating'          => 4.9,
            'reviews_count'   => 341,
            'image_url'       => 'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=800&q=80',
            'amenities'       => ['WiFi', 'Fireplace', 'Kitchen', 'Northern Lights View'],
            'badge'           => 'Fan Favourite',
            'featured'        => true,
        ]);

        $s5 = Stay::create([
            'destination_id'  => $d6->id,
            'host_id'         => $admin->id,
            'name'            => 'Le Marais Balcony Suite',
            'type'            => 'Hotel',
            'location'        => 'Paris, France',
            'description'     => 'Classic Parisian luxury suite with breathtaking balcony views of the city.',
            'price_per_night' => 22000,
            'rating'          => 4.7,
            'reviews_count'   => 512,
            'image_url'       => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
            'amenities'       => ['WiFi', 'Balcony', 'Room Service', 'City View', 'Mini Bar'],
            'badge'           => null,
            'featured'        => false,
        ]);

        // ── Experiences ────────────────────────────────────────────────────
        $e1 = Experience::create([
            'destination_id' => $d4->id,
            'host_id'        => $admin->id,
            'title'          => 'Swiss Alps Trekking',
            'description'    => 'A guided multi-day trek through breathtaking alpine scenery with expert guides.',
            'category'       => 'tours',
            'difficulty'     => 'Moderate',
            'price'          => 25000,
            'image_url'      => 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80',
            'duration_hours' => 48,
            'rating'         => 4.9,
            'reviews_count'  => 287,
            'badge'          => 'HOT',
            'featured'       => true,
        ]);

        $e2 = Experience::create([
            'destination_id' => $d1->id,
            'host_id'        => $admin->id,
            'title'          => 'Tokyo Night Food Tour',
            'description'    => 'Discover hidden izakayas, ramen alleys, and authentic street food with a local guide.',
            'category'       => 'food',
            'difficulty'     => 'Easy',
            'price'          => 8500,
            'image_url'      => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
            'duration_hours' => 4,
            'rating'         => 4.8,
            'reviews_count'  => 1234,
            'badge'          => 'HOT',
            'featured'       => true,
        ]);

        $e3 = Experience::create([
            'destination_id' => $d5->id,
            'host_id'        => $user->id,
            'title'          => 'Dubai Desert Safari',
            'description'    => 'Thrilling 4x4 dune bashing followed by a traditional Bedouin camp dinner under the stars.',
            'category'       => 'adventure',
            'difficulty'     => 'Moderate',
            'price'          => 12000,
            'image_url'      => 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?auto=format&fit=crop&w=800&q=80',
            'duration_hours' => 6,
            'rating'         => 4.7,
            'reviews_count'  => 987,
            'badge'          => 'LUXURY',
            'featured'       => false,
        ]);

        $e4 = Experience::create([
            'destination_id' => $d3->id,
            'host_id'        => $user->id,
            'title'          => 'Bali Cultural & Temple Tour',
            'description'    => 'Explore ancient Hindu temples and immerse yourself in vibrant Balinese traditions.',
            'category'       => 'culture',
            'difficulty'     => 'Easy',
            'price'          => 5000,
            'image_url'      => 'https://images.unsplash.com/photo-1533669955142-6a73332af4db?auto=format&fit=crop&w=800&q=80',
            'duration_hours' => 8,
            'rating'         => 4.9,
            'reviews_count'  => 1543,
            'badge'          => 'HOT',
            'featured'       => true,
        ]);

        $e5 = Experience::create([
            'destination_id' => $d3->id,
            'host_id'        => $user->id,
            'title'          => 'Tropical Scuba Diving',
            'description'    => 'Dive into crystal clear waters and explore vibrant coral reefs with certified instructors.',
            'category'       => 'adventure',
            'difficulty'     => 'Moderate',
            'price'          => 15000,
            'image_url'      => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
            'duration_hours' => 5,
            'rating'         => 4.8,
            'reviews_count'  => 743,
            'badge'          => 'LUXURY',
            'featured'       => false,
        ]);

        // ── Reviews ────────────────────────────────────────────────────────
        Review::create(['reviewable_id' => $s1->id, 'reviewable_type' => Stay::class, 'rating' => 5, 'comment' => 'Absolutely magical! The infinity pool view at sunset is breathtaking.', 'user_id' => $user->id]);
        Review::create(['reviewable_id' => $e2->id, 'reviewable_type' => Experience::class, 'rating' => 5, 'comment' => 'Best food tour I\'ve ever done. The ramen we had was life-changing!', 'user_id' => $user->id]);

        // ── Bookings ───────────────────────────────────────────────────────
        Booking::create([
            'user_id'        => $user->id,
            'bookable_id'    => $s1->id,
            'bookable_type'  => Stay::class,
            'check_in_date'  => now()->addDays(10),
            'check_out_date' => now()->addDays(15),
            'guests'         => 2,
            'total_price'    => 75000,
            'status'         => 'confirmed',
        ]);

        // ── Offers ─────────────────────────────────────────────────────────
        Offer::create([
            'title'          => 'First Trip Offer',
            'description'    => 'Book any trek or package and save 30% on your very first booking. No minimum spend.',
            'badge'          => '30% OFF',
            'badge_color'    => '#f59e0b',
            'promo_code'     => 'FIRST30',
            'discount_value' => 30.00,
            'discount_type'  => 'percent',
            'image_url'      => 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80',
            'cta_text'       => 'Claim 30% Off',
            'perks'          => ['✓ Any destination', '✓ Stackable with early bird', '✓ Instant discount'],
            'expires_at'     => now()->addDays(7),
            'is_active'      => true,
        ]);

        Offer::create([
            'title'          => 'Free Breakfast Deal',
            'description'    => 'Book any hotel for 3+ nights and get complimentary breakfast for your entire stay.',
            'badge'          => 'FREE STAY',
            'badge_color'    => '#10b981',
            'promo_code'     => 'BRKFAST3',
            'discount_value' => 0,
            'discount_type'  => 'fixed',
            'image_url'      => 'https://images.unsplash.com/photo-1548625361-24fb6ed72714?auto=format&fit=crop&w=800&q=80',
            'cta_text'       => 'Book Hotels',
            'perks'          => ['✓ 200+ partner hotels', '✓ Auto-applied', '✓ All meal types'],
            'expires_at'     => now()->addDays(14),
            'is_active'      => true,
        ]);

        Offer::create([
            'title'          => 'Early Bird Special',
            'description'    => 'Plan 60+ days ahead and unlock 20% off all packages. Best prices for the planners.',
            'badge'          => '20% OFF',
            'badge_color'    => '#ec4899',
            'promo_code'     => 'EARLYBIRD',
            'discount_value' => 20.00,
            'discount_type'  => 'percent',
            'image_url'      => 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
            'cta_text'       => 'Get Early Bird',
            'perks'          => ['✓ 60 days advance', '✓ Free cancellation', '✓ Lock the price'],
            'expires_at'     => now()->addDays(30),
            'is_active'      => true,
        ]);

        // ── Testimonials ───────────────────────────────────────────────────
        $testimonials = [
            ['Priya Sharma', 'Mumbai, India', 'The Bali package was absolutely out of this world. Every detail was perfect — from the airport pickup to the private villa. TripForge made our honeymoon unforgettable!', 5, 'Honeymoon Package', true, 'https://i.pravatar.cc/100?img=47'],
            ['Arjun Mehta', 'Bangalore, India', 'Booked the Swiss Alps trek on a whim and it was the best decision of my life. The guides were knowledgeable and the views — absolutely cinematic. 10/10 will book again.', 5, 'Adventure Trek', true, 'https://i.pravatar.cc/100?img=33'],
            ['Samantha Lee', 'Singapore', 'The Tokyo food tour opened my eyes to an entirely different culinary world. Our guide was amazing — took us to spots that no tourist would ever find. Pure magic!', 5, 'Food Tour', true, 'https://i.pravatar.cc/100?img=25'],
            ['Rahul Verma', 'Delhi, India', 'Stayed at the Aurora Cabin in Iceland during peak Northern Lights season. Waking up to auroras right outside your window is something I cannot describe in words.', 5, 'Northern Lights Stay', false, 'https://i.pravatar.cc/100?img=60'],
            ['Aisha Al-Farsi', 'Dubai, UAE', 'The desert safari experience was thrilling! Dune bashing, camel rides, and an incredible starlit dinner. The TripForge team was responsive and professional throughout.', 4, 'Desert Safari', false, 'https://i.pravatar.cc/100?img=15'],
            ['Carlos Rivera', 'Mexico City', 'Paris through TripForge felt like a dream. The Le Marais suite had a view of the Eiffel Tower sparkling at night. Every morning felt like a painting.', 5, 'City Break', true, 'https://i.pravatar.cc/100?img=52'],
        ];

        foreach ($testimonials as [$name, $location, $content, $rating, $tripType, $featured, $avatar]) {
            Testimonial::create([
                'reviewer_name'     => $name,
                'reviewer_location' => $location,
                'reviewer_avatar'   => $avatar,
                'content'           => $content,
                'rating'            => $rating,
                'trip_type'         => $tripType,
                'is_featured'       => $featured,
            ]);
        }
    }
}
