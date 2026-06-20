<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'subcategory'])
            ->where('is_active', true);

        // Filter by category
        if ($request->has('category') && $request->category) {
            $query->whereHas('category', function ($q) use ($request) {
                if (is_numeric($request->category)) {
                    $q->where('id', $request->category);
                } else {
                    $q->where('slug', $request->category);
                }
            });
        }

        // Filter by subcategory
        if ($request->has('subcategory') && $request->subcategory) {
            $query->whereHas('subcategory', function ($q) use ($request) {
                if (is_numeric($request->subcategory)) {
                    $q->where('id', $request->subcategory);
                } else {
                    $q->where('slug', $request->subcategory);
                }
            });
        }

        // Search
        if ($request->has('search') && $request->search) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Filter by status
        if ($request->has('status')) {
            if ($request->status === 'available') {
                $query->where('stock', '>', 0);
            } elseif ($request->status === 'sold') {
                $query->where('stock', '<=','0');
            }
        }

        // Sort
        $sort = $request->get('sort', 'latest');
        match ($sort) {
            'price_low', 'price_asc' => $query->orderBy('price', 'asc'),
            'price_high', 'price_desc' => $query->orderBy('price', 'desc'),
            'name_az', 'name' => $query->orderBy('title', 'asc'),
            'name_za' => $query->orderBy('title', 'desc'),
            default => $query->orderByDesc('created_at'),
        };

        $products = $query->paginate(12)->withQueryString();
        $categories = Category::withCount('products')->get();

        return Inertia::render('Product/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['category', 'subcategory', 'search', 'sort', 'status']),
        ]);
    }

    public function show(string $slug)
    {
        $product = Product::with(['category', 'subcategory', 'images'])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $relatedProducts = Product::with(['category'])
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->take(4)
            ->get();

        return Inertia::render('Product/Show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }
}
