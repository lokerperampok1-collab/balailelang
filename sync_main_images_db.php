<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$data = json_decode(file_get_contents(__DIR__ . '/storage/app/main_images_sync.json'), true);

$updated = 0;
foreach ($data as $item) {
    $title = $item['title'];
    $image = $item['image'];

    $product = App\Models\Product::where('title', $title)->first();
    if ($product) {
        $product->main_image = $image;
        $product->save();
        $updated++;
        echo "Updated main_image for: " . $title . "\n";
    } else {
        echo "Product not found locally: " . $title . "\n";
    }
}

echo "\nTotal updated: " . $updated . "\n";
