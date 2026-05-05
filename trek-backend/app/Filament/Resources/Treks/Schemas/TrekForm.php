<?php

namespace App\Filament\Resources\Treks\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class TrekForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                Textarea::make('description')
                    ->columnSpanFull(),
                TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('$'),
                TextInput::make('location')
                    ->required(),
                FileUpload::make('image')
                    ->image(),
                TextInput::make('duration'),
                TextInput::make('difficulty')
                    ->required()
                    ->default('Moderate'),
                TextInput::make('stars')
                    ->required()
                    ->numeric()
                    ->default(4),
                TextInput::make('badge'),
                Toggle::make('featured')
                    ->required(),
            ]);
    }
}
