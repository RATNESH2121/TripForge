<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'reviewer_name'    => $this->reviewer_name,
            'reviewer_avatar'  => $this->reviewer_avatar,
            'reviewer_location'=> $this->reviewer_location,
            'content'          => $this->content,
            'rating'           => $this->rating,
            'trip_type'        => $this->trip_type,
            'is_featured'      => $this->is_featured,
        ];
    }
}
