import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';

export default function Show({ blog, recentBlogs }) {
    return (
        <FrontendLayout>
            <Head title={`${blog.title} - Balai Lelang Indonesia`} />

            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                    <Link href="/" className="hover:text-amber-600">Beranda</Link>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                    <Link href="/blog" className="hover:text-amber-600">Blog</Link>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                    <span className="text-gray-600 truncate max-w-[200px]">{blog.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <article className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                            {blog.image && (
                                <div className="aspect-video bg-gray-100 w-full overflow-hidden">
                                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div className="p-6 md:p-10">
                                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                                    <span className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                                        {new Date(blog.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                                        {blog.views} kali dibaca
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">{blog.title}</h1>
                                <div 
                                    className="prose prose-lg prose-amber max-w-none text-gray-600 prose-headings:text-gray-900 prose-a:text-amber-600 hover:prose-a:text-amber-700"
                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                />
                            </div>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <div>
                        <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6V7.5Z" /></svg>
                                Artikel Terbaru
                            </h3>
                            <div className="space-y-6">
                                {recentBlogs.map(rb => (
                                    <Link key={rb.id} href={`/blog/${rb.slug}`} className="group flex gap-4">
                                        <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden shrink-0">
                                            {rb.image ? (
                                                <img src={rb.image} alt={rb.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-amber-50">
                                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3 3h18a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 21 21H3a2.25 2.25 0 0 1-2.25-2.25V5.25A2.25 2.25 0 0 1 3 3Z" /></svg>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors line-clamp-2 text-sm mb-1">{rb.title}</h4>
                                            <span className="text-xs text-gray-400">{new Date(rb.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
