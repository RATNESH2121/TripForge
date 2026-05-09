<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index()
    {
        return response()->json(Experience::with('destination')->get());
    }

    public function show($id)
    {
        $experience = Experience::with(['destination', 'host', 'reviews.user'])->findOrFail($id);
        return response()->json($experience);
    }
}
