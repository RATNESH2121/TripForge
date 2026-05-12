<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Http\Resources\DestinationResource;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    /**
     * GET /destinations
     * Supports: ?type=&country=&featured=1&search=&sort=rating
     */
    public function index(Request $request)
    {
        $query = Destination::query();

        // Filters
        if ($request->type)     $query->where('type', $request->type);
        if ($request->country)  $query->where('country', $request->country);
        if ($request->featured) $query->where('featured', true);
        if ($request->search) {
            $s = $request->search;
            $query->where(fn($q) => $q->where('name', 'like', "%{$s}%")
                ->orWhere('country', 'like', "%{$s}%"));
        }

        // Sort
        match ($request->sort) {
            'rating'       => $query->orderByDesc('rating'),
            'price_asc'    => $query->orderBy('starting_price'),
            'price_desc'   => $query->orderByDesc('starting_price'),
            default        => $query->orderByDesc('featured')->orderBy('name'),
        };

        return DestinationResource::collection($query->get());
    }

    /**
     * GET /destinations/{destination} — by slug OR id
     */
    public function show($destination)
    {
        $dest = is_numeric($destination)
            ? Destination::with(['stays', 'experiences'])->findOrFail($destination)
            : Destination::with(['stays', 'experiences'])->where('slug', $destination)->firstOrFail();

        return new DestinationResource($dest);
    }
}
