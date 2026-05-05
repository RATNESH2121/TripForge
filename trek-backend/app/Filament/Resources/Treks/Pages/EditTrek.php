<?php

namespace App\Filament\Resources\Treks\Pages;

use App\Filament\Resources\Treks\TrekResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditTrek extends EditRecord
{
    protected static string $resource = TrekResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
