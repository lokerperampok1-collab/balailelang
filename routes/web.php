<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/produk', [ProductController::class, 'index'])->name('product.index');
Route::get('/produk/{slug}', [ProductController::class, 'show'])->name('product.show');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

// Checkout routes
Route::get('/checkout', function () {
    return inertia('Checkout/Index');
})->name('checkout.index');

Route::post('/api/checkout', [OrderController::class, 'checkout'])->name('api.checkout');

// Admin panel is handled by Filament (default at /admin)
