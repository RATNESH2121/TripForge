<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StayResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->id,
            'name'            => $this->name,
            'slug'            => $this->slug,
            'type'            => $this->type,
            'location'        => $this->location,
            'description'     => $this->description,
            'image_url'       => $this->image_url,
            'gallery'         => $this->gallery ?? [],
            'price_per_night' => (float) $this->price_per_night,
            'rating'          => (float) $this->rating,
            'reviews_count'   => $this->reviews_count,
            'amenities'       => $this->amenities ?? [],
            'badge'           => $this->badge,
            'featured'        => (bool) $this->featured,
            'destination'     => $this->when($this->relationLoaded('destination'), fn() => [
                'id'   => $this->destination->id,
                'name' => $this->destination->name,
                'slug' => $this->destination->slug,
            ]),
            'host'            => $this->when($this->relationLoaded('host'), fn() => [
                'id'     => $this->host->id,
                'name'   => $this->host->name,
                'avatar' => $this->host->avatar,
            ]),
            'reviews'         => ReviewResource::collection($this->whenLoaded('reviews')),
        ];
    }
}
