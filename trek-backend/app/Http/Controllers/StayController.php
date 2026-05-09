<?php

namespace App\Http\Controllers;

use App\Models\Stay;
use Illuminate\Http\Request;

class StayController extends Controller
{
    public function index()
    {
        return response()->json(Stay::with('destination')->get());
    }

    public function show($id)
    {
        $stay = Stay::with(['destination', 'host', 'reviews.user'])->findOrFail($id);
        return response()->json($stay);
    }
}
