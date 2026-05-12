<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Stay;
use App\Models\Experience;
use App\Http\Resources\BookingResource;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * GET /my-bookings
     * Returns the authenticated user's bookings with bookable + payment
     */
    public function index(Request $request)
    {
        $bookings = $request->user()
            ->bookings()
            ->with(['bookable', 'payment'])
            ->orderByDesc('created_at')
            ->get();

        return BookingResource::collection($bookings);
    }

    /**
     * POST /bookings
     * body: { bookable_type, bookable_id, check_in_date, check_out_date?, guests, special_requests? }
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'bookable_type'    => 'required|in:Stay,Experience',
            'bookable_id'      => 'required|integer',
            'check_in_date'    => 'required|date|after_or_equal:today',
            'check_out_date'   => 'nullable|date|after:check_in_date',
            'guests'           => 'required|integer|min:1|max:20',
            'special_requests' => 'nullable|string|max:500',
        ]);

        $bookableClass = $validated['bookable_type'] === 'Stay' ? Stay::class : Experience::class;
        $bookable = $bookableClass::findOrFail($validated['bookable_id']);

        // Price calculation
        $pricePerUnit = $validated['bookable_type'] === 'Stay'
            ? $bookable->price_per_night
            : $bookable->price;

        $days = 1;
        if (!empty($validated['check_out_date'])) {
            $days = max(1, (strtotime($validated['check_out_date']) - strtotime($validated['check_in_date'])) / 86400);
        }
        $totalPrice = $pricePerUnit * $days * $validated['guests'];

        $booking = Booking::create([
            'user_id'          => $request->user()->id,
            'bookable_type'    => $bookableClass,
            'bookable_id'      => $bookable->id,
            'check_in_date'    => $validated['check_in_date'],
            'check_out_date'   => $validated['check_out_date'] ?? null,
            'guests'           => $validated['guests'],
            'total_price'      => $totalPrice,
            'status'           => 'confirmed',
            'special_requests' => $validated['special_requests'] ?? null,
        ]);

        return new BookingResource($booking->load('bookable'));
    }

    /**
     * DELETE /bookings/{id}
     * Cancel a booking (must belong to the authenticated user)
     */
    public function cancel(Request $request, $id)
    {
        $booking = Booking::where('user_id', $request->user()->id)->findOrFail($id);

        if (!$booking->isCancellable()) {
            return response()->json(['message' => 'This booking cannot be cancelled.'], 422);
        }

        $request->validate([
            'cancel_reason' => 'nullable|string|max:255',
        ]);

        $booking->update([
            'status'        => 'cancelled',
            'cancel_reason' => $request->cancel_reason ?? 'Cancelled by user',
            'cancelled_at'  => now(),
        ]);

        return new BookingResource($booking->fresh()->load('bookable'));
    }
}
