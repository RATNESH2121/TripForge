<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\StayController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\AITripPlannerController;

// ─── Rate limited Auth routes ────────────────────────────────────────────────
Route::middleware('throttle:10,1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
});

// ─── Public routes ───────────────────────────────────────────────────────────

// Destinations
Route::get('/destinations',      [DestinationController::class, 'index']);
Route::get('/destinations/{destination}', [DestinationController::class, 'show']);

// Stays
Route::get('/stays',             [StayController::class, 'index']);
Route::get('/stays/{id}',        [StayController::class, 'show']);

// Experiences (and packages alias)
Route::get('/experiences',       [ExperienceController::class, 'index']);
Route::get('/experiences/{id}',  [ExperienceController::class, 'show']);

// Offers / Deals
Route::get('/offers',            [OfferController::class, 'index']);

// Testimonials
Route::get('/testimonials',      [TestimonialController::class, 'index']);

// Global search
Route::get('/search',            [SearchController::class, 'index']);

// AI Trip Planner (public so guests can try it)
Route::post('/ai-planner/generate', [AITripPlannerController::class, 'generate']);

// ─── Authenticated routes ────────────────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout',  [AuthController::class, 'logout']);
    Route::get('/user',     [AuthController::class, 'me']);

    // Profile
    Route::get('/profile',           [ProfileController::class, 'show']);
    Route::put('/profile',           [ProfileController::class, 'update']);
    Route::put('/profile/password',  [ProfileController::class, 'changePassword']);
    Route::post('/profile/avatar',   [ProfileController::class, 'uploadAvatar']);

    // Bookings
    Route::get('/my-bookings',         [BookingController::class, 'index']);
    Route::post('/bookings',           [BookingController::class, 'store']);
    Route::delete('/bookings/{id}',    [BookingController::class, 'cancel']);

    // Reviews (authenticated to post, read is embedded in show endpoints)
    Route::post('/reviews',            [ReviewController::class, 'store']);

    // Wishlist / Favorites
    Route::get('/wishlist',                        [WishlistController::class, 'index']);
    Route::post('/wishlist/{type}/{id}',           [WishlistController::class, 'toggle']);
});
