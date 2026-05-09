<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\StayController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AITripPlannerController;

// ─── Public ───────────────────────────────────────────────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::get('/destinations',        [DestinationController::class, 'index']);
Route::get('/destinations/{id}',   [DestinationController::class, 'show']);

Route::get('/stays',        [StayController::class, 'index']);
Route::get('/stays/{id}',   [StayController::class, 'show']);

Route::get('/experiences',        [ExperienceController::class, 'index']);
Route::get('/experiences/{id}',   [ExperienceController::class, 'show']);

Route::post('/ai-planner/generate', [AITripPlannerController::class, 'generate']);

// ─── Protected ────────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout',      [AuthController::class, 'logout']);
    Route::get('/user',         [AuthController::class, 'me']);

    Route::get('/my-bookings',  [BookingController::class, 'index']);
    Route::post('/bookings',    [BookingController::class, 'store']);
});
