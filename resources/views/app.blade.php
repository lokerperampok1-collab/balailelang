<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Balai Lelang Indonesia') }}</title>
        <meta name="description" content="Balai Lelang Indonesia, platform lelang terpercaya untuk properti, emas, elektronik dan barang bernilai tinggi dengan proses aman dan transparan.">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600,700,800&display=swap" rel="stylesheet" />

        @php
            $favicon = \App\Models\Setting::where('key', 'logo_path')->value('value') ?? '/uploads/logos/logo.png';
        @endphp
        <link rel="icon" href="{{ $favicon }}" sizes="any">
        <link rel="apple-touch-icon" href="{{ $favicon }}">

        <!-- Scripts -->
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-gray-50 text-gray-900">
        @inertia
    </body>
</html>
