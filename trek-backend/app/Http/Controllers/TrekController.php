<?php

namespace App\Http\Controllers;

use App\Models\Trek;
use Illuminate\Http\Request;

class TrekController extends Controller
{
    public function index()
    {
        return response()->json(Trek::orderBy('id')->get());
    }

    public function show($id)
    {
        $trek = Trek::find($id);

        if (! $trek) {
            return response()->json(['message' => 'Trek not found.'], 404);
        }

        return response()->json($trek);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'      => 'required|string|max:255',
            'description'=> 'nullable|string',
            'price'      => 'required|numeric|min:0',
            'location'   => 'required|string|max:255',
            'image'      => 'nullable|string',
            'duration'   => 'nullable|string',
            'difficulty' => 'nullable|string|in:Easy,Moderate,Hard,Extreme',
            'stars'      => 'nullable|integer|min:1|max:5',
            'badge'      => 'nullable|string',
            'featured'   => 'nullable|boolean',
        ]);

        return response()->json(Trek::create($data), 201);
    }
}
