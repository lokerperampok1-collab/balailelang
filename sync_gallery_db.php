<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$data = json_decode(file_get_contents(__DIR__ . '/storage/app/gallery_sync.json'), true);

foreach ($data as $title => $images) {
    $product = App\Models\Product::where('title', $title)->first();
    if ($product) {
        foreach ($images as $img) {
            App\Models\ProductImage::firstOrCreate([
                'product_id' => $product->id,
                'image_path' => $img
            ]);
        }
        echo "Successfully seeded " . count($images) . " images for: " . $title . "\n";
    } else {
        echo "Product not found locally: " . $title . "\n";
    }
}
