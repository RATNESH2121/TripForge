<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * GET /profile — returns current user profile
     */
    public function show(Request $request)
    {
        return new UserResource($request->user());
    }

    /**
     * PUT /profile — update name, email, phone, bio, location
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name'     => 'sometimes|string|max:255',
            'email'    => 'sometimes|email|unique:users,email,' . $user->id,
            'phone'    => 'sometimes|nullable|string|max:20',
            'bio'      => 'sometimes|nullable|string|max:500',
            'location' => 'sometimes|nullable|string|max:255',
        ]);

        $user->update($validated);

        return new UserResource($user->fresh());
    }

    /**
     * PUT /profile/password — change password
     */
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password'     => 'required|string|min:8|confirmed',
        ]);

        if (!Hash::check($request->current_password, $request->user()->password)) {
            return response()->json(['message' => 'Current password is incorrect.'], 422);
        }

        $request->user()->update(['password' => $request->new_password]);

        return response()->json(['message' => 'Password updated successfully.']);
    }

    /**
     * POST /profile/avatar — upload avatar image
     */
    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $user = $request->user();

        // Delete old avatar if it's a stored file
        if ($user->avatar && str_starts_with($user->avatar, '/storage/')) {
            Storage::delete(str_replace('/storage/', 'public/', $user->avatar));
        }

        $path = $request->file('avatar')->store('avatars', 'public');
        $user->update(['avatar' => '/storage/' . $path]);

        return response()->json(['avatar' => $user->fresh()->avatar]);
    }
}
