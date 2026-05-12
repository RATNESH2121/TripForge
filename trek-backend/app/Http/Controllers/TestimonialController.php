<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use App\Http\Resources\TestimonialResource;

class TestimonialController extends Controller
{
    /**
     * GET /testimonials — returns featured testimonials for homepage
     */
    public function index()
    {
        $testimonials = Testimonial::orderByDesc('is_featured')
            ->orderByDesc('created_at')
            ->get();

        return TestimonialResource::collection($testimonials);
    }
}
