<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfferResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'title'          => $this->title,
            'description'    => $this->description,
            'badge'          => $this->badge,
            'badge_color'    => $this->badge_color,
            'promo_code'     => $this->promo_code,
            'discount_value' => (float) $this->discount_value,
            'discount_type'  => $this->discount_type,
            'image_url'      => $this->image_url,
            'image'          => $this->image_url, // alias
            'cta_text'       => $this->cta_text,
            'perks'          => $this->perks ?? [],
            'expires_at'     => $this->expires_at,
            'expiry'         => $this->expires_at?->timestamp ? $this->expires_at->timestamp * 1000 : null,
        ];
    }
}
