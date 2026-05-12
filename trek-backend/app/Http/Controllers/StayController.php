<?php

namespace App\Http\Controllers;

use App\Models\Stay;
use App\Http\Resources\StayResource;
use Illuminate\Http\Request;

class StayController extends Controller
{
    /**
     * GET /stays
     * Supports: ?type=Hotel|Hostel|Homestay&destination=&featured=1&search=&min_price=&max_price=&sort=rating
     */
    public function index(Request $request)
    {
        $query = Stay::with('destination');

        if ($request->type)        $query->where('type', $request->type);
        if ($request->featured)    $query->where('featured', true);
        if ($request->destination) {
            $query->whereHas('destination', fn($q) => $q->where('name', 'like', "%{$request->destination}%"));
        }
        if ($request->search) {
            $s = $request->search;
            $query->where(fn($q) => $q->where('name', 'like', "%{$s}%")
                ->orWhere('location', 'like', "%{$s}%"));
        }
        if ($request->min_price) $query->where('price_per_night', '>=', $request->min_price);
        if ($request->max_price) $query->where('price_per_night', '<=', $request->max_price);

        match ($request->sort) {
            'rating'      => $query->orderByDesc('rating'),
            'price_asc'   => $query->orderBy('price_per_night'),
            'price_desc'  => $query->orderByDesc('price_per_night'),
            default       => $query->orderByDesc('featured')->orderByDesc('rating'),
        };

        return StayResource::collection($query->get());
    }

    /**
     * GET /stays/{id}
     */
    public function show($id)
    {
        $stay = Stay::with(['destination', 'host', 'reviews.user'])->findOrFail($id);
        return new StayResource($stay);
    }
}
