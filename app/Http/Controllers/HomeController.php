<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use App\Models\Product;
use App\Models\Setting;
use App\Models\Testimonial;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $products = Product::with(['category', 'subcategory'])
            ->where('is_active', true)
            ->orderByDesc('created_at')
            ->take(8)
            ->get();

        $categories = Category::all();

        $testimonials = Testimonial::orderBy('sort_order')->get();

        $blogs = Blog::published()
            ->orderByDesc('published_at')
            ->take(3)
            ->get();

        $goldPrice = Setting::get('gold_price', 0);

        return Inertia::render('Home/Index', [
            'products' => $products,
            'categories' => $categories,
            'testimonials' => $testimonials,
            'blogs' => $blogs,
            'goldPrice' => (int) $goldPrice,
        ]);
    }
}
