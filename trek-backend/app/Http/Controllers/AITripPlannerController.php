<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;

class AITripPlannerController extends Controller
{
    public function generate(Request $request)
    {
        $request->validate([
            'budget' => 'required|in:Budget,Moderate,Luxury',
            'style' => 'required|in:Adventure,Relaxation,Culture',
            'days' => 'required|integer|min:1|max:30',
        ]);

        // Simple rule-based generation
        $destinations = Destination::with(['stays', 'experiences'])->get();
        if ($destinations->isEmpty()) {
            return response()->json(['error' => 'No destinations found.'], 404);
        }

        $recommendedDestination = $destinations->random();

        // Filter stays based on budget
        $stays = $recommendedDestination->stays;
        $filteredStays = $stays;
        if ($request->budget === 'Budget') {
            $filteredStays = $stays->where('price_per_night', '<', 2000);
        } elseif ($request->budget === 'Moderate') {
            $filteredStays = $stays->whereBetween('price_per_night', [2000, 8000]);
        } elseif ($request->budget === 'Luxury') {
            $filteredStays = $stays->where('price_per_night', '>', 8000);
        }
        
        if ($filteredStays->isEmpty()) {
            $filteredStays = $stays; // Fallback
        }

        $recommendedStay = $filteredStays->random();

        $experiences = $recommendedDestination->experiences->take($request->days);

        $itinerary = [
            'destination' => $recommendedDestination,
            'recommended_stay' => $recommendedStay,
            'experiences' => $experiences,
            'estimated_budget' => ($recommendedStay->price_per_night * $request->days) + $experiences->sum('price'),
            'days' => $request->days,
            'style' => $request->style,
        ];

        return response()->json($itinerary);
    }
}
