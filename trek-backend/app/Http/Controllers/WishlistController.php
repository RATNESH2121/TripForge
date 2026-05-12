<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use App\Models\Stay;
use App\Models\Experience;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    private function resolveModel(string $type): string
    {
        return match($type) {
            'stay', 'Stay' => Stay::class,
            'experience', 'Experience' => Experience::class,
            default => abort(422, 'Invalid type.'),
        };
    }

    /**
     * GET /wishlist — returns user's favorited items
     */
    public function index(Request $request)
    {
        $items = $request->user()
            ->wishlists()
            ->with('wishlistable')
            ->get()
            ->map(function ($w) {
                $item = $w->wishlistable;
                if (!$item) return null;
                return [
                    'type'      => class_basename($w->wishlistable_type),
                    'id'        => $item->id,
                    'name'      => $item->name ?? $item->title,
                    'image_url' => $item->image_url,
                    'location'  => $item->location ?? $item->destination?->name,
                    'rating'    => $item->rating,
                ];
            })
            ->filter()
            ->values();

        return response()->json($items);
    }

    /**
     * POST /wishlist/{type}/{id} — toggle favorite
     */
    public function toggle(Request $request, string $type, int $id)
    {
        $modelClass = $this->resolveModel($type);
        $modelClass::findOrFail($id); // Ensure it exists

        $existing = Wishlist::where([
            'user_id'           => $request->user()->id,
            'wishlistable_type' => $modelClass,
            'wishlistable_id'   => $id,
        ])->first();

        if ($existing) {
            $existing->delete();
            return response()->json(['wishlisted' => false]);
        }

        Wishlist::create([
            'user_id'           => $request->user()->id,
            'wishlistable_type' => $modelClass,
            'wishlistable_id'   => $id,
        ]);

        return response()->json(['wishlisted' => true]);
    }
}
