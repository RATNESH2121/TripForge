<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\Stay;
use App\Models\Experience;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * GET /search?q=manali&type=stays|destinations|experiences
     * Global search across all content types
     */
    public function index(Request $request)
    {
        $q    = $request->q ?? '';
        $type = $request->type; // optional filter to single type

        if (strlen($q) < 2) {
            return response()->json(['destinations' => [], 'stays' => [], 'experiences' => []]);
        }

        $results = [];

        if (!$type || $type === 'destinations') {
            $results['destinations'] = Destination::where('name', 'like', "%{$q}%")
                ->orWhere('country', 'like', "%{$q}%")
                ->limit(5)
                ->get(['id', 'name', 'country', 'image_url', 'slug', 'type'])
                ->map(fn($d) => array_merge($d->toArray(), ['_type' => 'destination']));
        }

        if (!$type || $type === 'stays') {
            $results['stays'] = Stay::where('name', 'like', "%{$q}%")
                ->orWhere('location', 'like', "%{$q}%")
                ->with('destination:id,name')
                ->limit(5)
                ->get(['id', 'name', 'location', 'image_url', 'price_per_night', 'rating', 'destination_id'])
                ->map(fn($s) => array_merge($s->toArray(), ['_type' => 'stay']));
        }

        if (!$type || $type === 'experiences') {
            $results['experiences'] = Experience::where('title', 'like', "%{$q}%")
                ->orWhereHas('destination', fn($dq) => $dq->where('name', 'like', "%{$q}%"))
                ->with('destination:id,name')
                ->limit(5)
                ->get(['id', 'title', 'image_url', 'price', 'rating', 'destination_id'])
                ->map(fn($e) => array_merge($e->toArray(), ['_type' => 'experience']));
        }

        return response()->json($results);
    }
}
