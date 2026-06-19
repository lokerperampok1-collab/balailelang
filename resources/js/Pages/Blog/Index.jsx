import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';

export default function Index({ blogs }) {
    return (
        <FrontendLayout>
            <Head title="Blog & Berita - Balai Lelang Indonesia" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog & Berita</h1>
                    <p className="text-gray-500">Informasi terbaru seputar dunia lelang, emas, dan investasi</p>
                </div>

                {blogs.data.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-400">Belum ada artikel yang dipublikasikan.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogs.data.map(blog => (
                                <Link
                                    key={blog.id}
                                    href={`/blog/${blog.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:-translate-y-1"
                                >
                                    <div className="aspect-video bg-gray-100 overflow-hidden">
                                        {blog.image ? (
                                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                                                <svg className="w-12 h-12 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6V7.5Z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <h2 className="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors line-clamp-2 mb-2">{blog.title}</h2>
                                        <div className="flex items-center gap-3 text-xs text-gray-400">
                                            <span>{new Date(blog.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                            <span>•</span>
                                            <span>{blog.views} views</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {blogs.links && blogs.links.length > 3 && (
                            <div className="flex justify-center mt-8 gap-1">
                                {blogs.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${link.active ? 'bg-amber-500 text-white font-semibold' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </FrontendLayout>
    );
}
