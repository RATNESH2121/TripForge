<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Stay;
use App\Models\Experience;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $bookings = $request->user()->bookings()->with('bookable')->orderBy('created_at', 'desc')->get();
        return response()->json($bookings);
    }

    public function store(Request $request)
    {
        $request->validate([
            'bookable_type' => 'required|in:Stay,Experience',
            'bookable_id' => 'required|integer',
            'check_in_date' => 'required|date',
            'check_out_date' => 'nullable|date|after:check_in_date',
            'guests' => 'required|integer|min:1',
        ]);

        $bookableClass = $request->bookable_type === 'Stay' ? Stay::class : Experience::class;
        $bookable = $bookableClass::findOrFail($request->bookable_id);

        // Dummy price calculation (could be more complex based on dates)
        $pricePerUnit = $request->bookable_type === 'Stay' ? $bookable->price_per_night : $bookable->price;
        $days = 1;
        if ($request->check_out_date) {
            $days = max(1, (strtotime($request->check_out_date) - strtotime($request->check_in_date)) / 86400);
        }
        $totalPrice = $pricePerUnit * $days * $request->guests;

        $booking = Booking::create([
            'user_id' => $request->user()->id,
            'bookable_type' => $bookableClass,
            'bookable_id' => $bookable->id,
            'check_in_date' => $request->check_in_date,
            'check_out_date' => $request->check_out_date,
            'guests' => $request->guests,
            'total_price' => $totalPrice,
            'status' => 'confirmed', // Auto confirm since no payments
        ]);

        return response()->json($booking, 201);
    }
}
