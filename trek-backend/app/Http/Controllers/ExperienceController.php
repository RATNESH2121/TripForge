<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use App\Http\Resources\ExperienceResource;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    /**
     * GET /experiences
     * Supports: ?category=&difficulty=&destination=&featured=1&search=&min_price=&max_price=&sort=rating
     */
    public function index(Request $request)
    {
        $query = Experience::with('destination');

        if ($request->category)    $query->where('category', $request->category);
        if ($request->difficulty)  $query->where('difficulty', $request->difficulty);
        if ($request->featured)    $query->where('featured', true);
        if ($request->destination) {
            $query->whereHas('destination', fn($q) => $q->where('name', 'like', "%{$request->destination}%"));
        }
        if ($request->search) {
            $s = $request->search;
            $query->where(fn($q) => $q->where('title', 'like', "%{$s}%")
                ->orWhere('description', 'like', "%{$s}%")
                ->orWhereHas('destination', fn($q2) => $q2->where('name', 'like', "%{$s}%")));
        }
        if ($request->min_price) $query->where('price', '>=', $request->min_price);
        if ($request->max_price) $query->where('price', '<=', $request->max_price);

        match ($request->sort) {
            'rating'     => $query->orderByDesc('rating'),
            'price_asc'  => $query->orderBy('price'),
            'price_desc' => $query->orderByDesc('price'),
            default      => $query->orderByDesc('featured')->orderByDesc('rating'),
        };

        return ExperienceResource::collection($query->get());
    }

    /**
     * GET /experiences/{id}
     */
    public function show($id)
    {
        $experience = Experience::with(['destination', 'host', 'reviews.user'])->findOrFail($id);
        return new ExperienceResource($experience);
    }
}
