<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $bookings = Booking::with('trek')
            ->where('user_id', $request->user()->id)
            ->orderByDesc('created_at')
            ->get();

        return response()->json($bookings);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'trek_id' => 'required|exists:treks,id',
            'date'    => 'required|date|after_or_equal:today',
            'guests'  => 'nullable|integer|min:1|max:10',
        ]);

        $booking = Booking::create([
            'user_id' => $request->user()->id,
            'trek_id' => $data['trek_id'],
            'date'    => $data['date'],
            'guests'  => $data['guests'] ?? 1,
        ]);

        return response()->json([
            'message' => 'Booking confirmed!',
            'booking' => $booking->load('trek'),
        ], 201);
    }
}
