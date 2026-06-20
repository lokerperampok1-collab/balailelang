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

Route::get('/produk', [ProductController::class, 'index']);
Route::get('/produk/{slug}', [ProductController::class, 'show']);

Route::get('/products', [ProductController::class, 'index'])->name('product.index');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('product.show');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

// Checkout routes
Route::get('/checkout', function () {
    return inertia('Checkout/Index');
})->name('checkout.index');

Route::get('/checkout/success', function (Illuminate\Http\Request $request) {
    $order = \App\Models\Order::where('order_code', $request->order)->first();
    if (!$order) {
        return redirect('/');
    }
    return inertia('Checkout/Success', [
        'order_code' => $order->order_code,
        'order' => $order
    ]);
})->name('checkout.success');

Route::post('/api/checkout', [OrderController::class, 'checkout'])->name('api.checkout');
Route::post('/api/checkout/upload-proof', [OrderController::class, 'uploadProof'])->name('api.checkout.upload-proof');

Route::get('/track', function (Illuminate\Http\Request $request) {
    $search = $request->search ?? $request->order;
    $order = null;
    if ($search) {
        $order = \App\Models\Order::with(['items.product.images'])->where('order_code', $search)->orWhere('phone', $search)->first();
    }
    return inertia('Track/Index', [
        'search' => $search,
        'order' => $order
    ]);
})->name('track.index');

// Admin panel is handled by Filament (default at /admin)
