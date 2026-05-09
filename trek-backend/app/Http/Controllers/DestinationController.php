<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    public function index()
    {
        return response()->json(Destination::all());
    }

    public function show($id)
    {
        $destination = Destination::with(['stays', 'experiences'])->findOrFail($id);
        return response()->json($destination);
    }
}
