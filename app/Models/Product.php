<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Product extends Model
{
    protected $fillable = [
        'category_id', 'subcategory_id', 'title', 'slug',
        'description', 'price', 'harga_pasar', 'stock',
        'weight', 'main_image', 'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'harga_pasar' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::creating(function (Product $product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->title) . '-' . Str::random(8);
            }
        });
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function subcategory(): BelongsTo
    {
        return $this->belongsTo(Subcategory::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class)->orderBy('sort_order');
    }

    /**
     * Calculate the savings percentage between harga_pasar and price (harga tebus).
     */
    public function getSavingsPercentAttribute(): ?int
    {
        if ($this->harga_pasar && $this->harga_pasar > 0) {
            return (int) round((($this->harga_pasar - $this->price) / $this->harga_pasar) * 100);
        }
        return null;
    }

    protected $appends = ['savings_percent'];
}
