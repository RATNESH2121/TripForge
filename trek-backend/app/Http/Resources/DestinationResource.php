<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DestinationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'name'             => $this->name,
            'slug'             => $this->slug,
            'country'          => $this->country,
            'type'             => $this->type,
            'description'      => $this->description,
            'image_url'        => $this->image_url,
            'best_time_to_visit' => $this->best_time_to_visit,
            'rating'           => (float) $this->rating,
            'reviews_count'    => $this->reviews_count,
            'tags'             => $this->tags ?? [],
            'starting_price'   => (float) ($this->starting_price ?? 0),
            'featured'         => (bool) $this->featured,
            'stays_count'      => $this->whenLoaded('stays', fn() => $this->stays->count()),
            'experiences_count'=> $this->whenLoaded('experiences', fn() => $this->experiences->count()),
        ];
    }
}
