<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::published()
            ->orderByDesc('published_at')
            ->paginate(9);

        return Inertia::render('Blog/Index', [
            'blogs' => $blogs,
        ]);
    }

    public function show(string $slug)
    {
        $blog = Blog::where('slug', $slug)->firstOrFail();
        $blog->increment('views');

        $recentBlogs = Blog::published()
            ->where('id', '!=', $blog->id)
            ->orderByDesc('published_at')
            ->take(3)
            ->get();

        return Inertia::render('Blog/Show', [
            'blog' => $blog,
            'recentBlogs' => $recentBlogs,
        ]);
    }
}
