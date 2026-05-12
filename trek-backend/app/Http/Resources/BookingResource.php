<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $bookable = $this->bookable;

        return [
            'id'             => $this->id,
            'check_in_date'  => $this->check_in_date,
            'check_out_date' => $this->check_out_date,
            'guests'         => $this->guests,
            'total_price'    => (float) $this->total_price,
            'status'         => $this->status,
            'special_requests' => $this->special_requests,
            'cancel_reason'  => $this->cancel_reason,
            'cancelled_at'   => $this->cancelled_at,
            'is_upcoming'    => $this->isUpcoming(),
            'is_cancellable' => $this->isCancellable(),
            'created_at'     => $this->created_at,
            // Polymorphic bookable data flattened for frontend
            'bookable_type'  => class_basename($this->bookable_type),
            'bookable'       => $bookable ? [
                'id'        => $bookable->id,
                'name'      => $bookable->name ?? $bookable->title ?? null,
                'title'     => $bookable->title ?? $bookable->name ?? null,
                'image_url' => $bookable->image_url,
                'location'  => $bookable->location ?? $bookable->destination?->name ?? null,
                'rating'    => $bookable->rating ?? null,
            ] : null,
            'payment'        => $this->when($this->relationLoaded('payment'), fn() => [
                'status' => $this->payment?->status,
                'amount' => $this->payment?->amount,
            ]),
        ];
    }
}
