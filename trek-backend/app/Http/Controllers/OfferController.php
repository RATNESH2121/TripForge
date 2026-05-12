<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Http\Resources\OfferResource;

class OfferController extends Controller
{
    /**
     * GET /offers — returns all active, non-expired offers
     */
    public function index()
    {
        $offers = Offer::active()->orderByDesc('created_at')->get();
        return OfferResource::collection($offers);
    }
}
