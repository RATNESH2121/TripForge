<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TrekController;
use App\Http\Controllers\BookingController;

// ─── Public ───────────────────────────────────────────────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::get('/treks',        [TrekController::class, 'index']);
Route::get('/treks/{id}',   [TrekController::class, 'show']);

// ─── Protected ────────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout',      [AuthController::class, 'logout']);
    Route::get('/user',         [AuthController::class, 'me']);

    Route::get('/my-bookings',  [BookingController::class, 'index']);
    Route::post('/bookings',    [BookingController::class, 'store']);

    // Admin: create trek
    Route::post('/treks',       [TrekController::class, 'store']);
});
