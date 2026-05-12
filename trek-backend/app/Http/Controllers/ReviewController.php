<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Stay;
use App\Models\Experience;
use App\Http\Resources\ReviewResource;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * POST /reviews
     * body: { reviewable_type: 'Stay'|'Experience', reviewable_id, rating, comment }
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'reviewable_type' => 'required|in:Stay,Experience',
            'reviewable_id'   => 'required|integer',
            'rating'          => 'required|integer|min:1|max:5',
            'comment'         => 'nullable|string|max:1000',
        ]);

        $reviewableClass = $validated['reviewable_type'] === 'Stay' ? Stay::class : Experience::class;
        $reviewable = $reviewableClass::findOrFail($validated['reviewable_id']);

        // Prevent duplicate review from the same user
        $existing = Review::where([
            'user_id'         => $request->user()->id,
            'reviewable_type' => $reviewableClass,
            'reviewable_id'   => $reviewable->id,
        ])->first();

        if ($existing) {
            return response()->json(['message' => 'You have already reviewed this.'], 422);
        }

        $review = Review::create([
            'user_id'         => $request->user()->id,
            'reviewable_type' => $reviewableClass,
            'reviewable_id'   => $reviewable->id,
            'rating'          => $validated['rating'],
            'comment'         => $validated['comment'] ?? null,
        ]);

        // Update the reviewable's average rating + count
        $avg = Review::where('reviewable_type', $reviewableClass)
            ->where('reviewable_id', $reviewable->id)
            ->avg('rating');

        $count = Review::where('reviewable_type', $reviewableClass)
            ->where('reviewable_id', $reviewable->id)
            ->count();

        $reviewable->update([
            'rating'        => round($avg, 2),
            'reviews_count' => $count,
        ]);

        return new ReviewResource($review->load('user'));
    }
}
