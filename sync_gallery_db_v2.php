<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Truncate the table to remove all previously faulty images
\Illuminate\Support\Facades\DB::table('product_images')->truncate();
echo "Cleared product_images table.\n";

$data = json_decode(file_get_contents(__DIR__ . '/storage/app/gallery_sync_v2.json'), true);

foreach ($data as $title => $images) {
    $product = App\Models\Product::where('title', $title)->first();
    if ($product) {
        $sortOrder = 0;
        foreach ($images as $img) {
            App\Models\ProductImage::create([
                'product_id' => $product->id,
                'image_path' => $img,
                'sort_order' => $sortOrder++
            ]);
        }
        echo "Successfully seeded " . count($images) . " images for: " . $title . "\n";
    } else {
        echo "Product not found locally: " . $title . "\n";
    }
}
