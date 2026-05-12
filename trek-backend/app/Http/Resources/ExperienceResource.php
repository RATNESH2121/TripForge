<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'title'         => $this->title,
            'slug'          => $this->slug,
            'description'   => $this->description,
            'category'      => $this->category,
            'difficulty'    => $this->difficulty,
            'price'         => (float) $this->price,
            'duration_hours'=> $this->duration_hours,
            'duration'      => $this->duration_hours . 'h',
            'image_url'     => $this->image_url,
            'image'         => $this->image_url,  // alias for frontend compat
            'rating'        => (float) $this->rating,
            'reviews_count' => $this->reviews_count,
            'badge'         => $this->badge ?? ($this->price > 10000 ? 'LUXURY' : 'HOT'),
            'featured'      => (bool) $this->featured,
            'stars'         => (int) round($this->rating),
            'location'      => $this->destination?->name ?? '',
            'destination'   => $this->when($this->relationLoaded('destination'), fn() => [
                'id'   => $this->destination->id,
                'name' => $this->destination->name,
                'slug' => $this->destination->slug,
            ]),
            'host'          => $this->when($this->relationLoaded('host'), fn() => [
                'id'     => $this->host->id,
                'name'   => $this->host->name,
                'avatar' => $this->host->avatar,
            ]),
            'reviews'       => ReviewResource::collection($this->whenLoaded('reviews')),
        ];
    }
}
