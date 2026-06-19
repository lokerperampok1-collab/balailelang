<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Setting;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Load basic settings for the frontend layout
        $settings = [];
        try {
            $settingsDb = Setting::all();
            foreach ($settingsDb as $setting) {
                $settings[$setting->key] = $setting->value;
            }
        } catch (\Exception $e) {
            // In case table doesn't exist yet
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'settings' => $settings,
            'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
        ];
    }
}
