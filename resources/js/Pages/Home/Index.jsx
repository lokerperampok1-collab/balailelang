import { Head, Link, usePage } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { useCart } from '@/Contexts/CartContext';
import { formatRupiah, calcSavings, generateProductWALink } from '@/utils/helpers';

function ProductCard({ product }) {
    return (
        <div className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-3 transition hover:border-yellow-400 hover:shadow-lg">
            <Link className="absolute inset-0 z-10" href={`/products/${product.slug}`} />
            <div className="relative">
                {product.main_image ? (
                    <img alt={product.title} className="h-full w-full rounded-xl object-cover transition" src={product.main_image} />
                ) : (
                    <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-gray-300">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3 3h18a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 21 21H3a2.25 2.25 0 0 1-2.25-2.25V5.25A2.25 2.25 0 0 1 3 3Z" />
                        </svg>
                    </div>
                )}
            </div>
            <div className="flex flex-col p-4">
                <h3 className="line-clamp-2 text-sm font-bold text-gray-900">{product.title}</h3>
                <span className="mt-1 inline-block self-start rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
                    {product.subcategory?.name || product.category?.name || 'Lainnya'}
                </span>
                <div className="mt-1">
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-gray-300">
                                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                            </svg>
                        ))}
                        <span className="ml-1 text-sm text-gray-600">(0.0)<span className="ml-1">(0)</span></span>
                    </div>
                </div>
                <div className="mt-3 space-y-1">
                    {product.harga_pasar && (
                        <div className="text-xs font-semibold text-blue-900 line-through">Harga Pasar: {formatRupiah(product.harga_pasar)}</div>
                    )}
                    <div className="text-lg font-bold text-yellow-600">{formatRupiah(product.price)}</div>
                    <div className="text-xs text-gray-500">Stok: {product.stock}</div>
                </div>
            </div>
        </div>
    );
}

export default function Index({ products, categories, testimonials, blogs, goldPrice }) {
    const { settings } = usePage().props;
    const whatsappNumber = settings?.whatsapp_number || '6285136387800';
    const telegramGroup = settings?.telegram_group || '#';
    const telegramTitle = settings?.telegram_group_title || 'BALAI LELANG INDONESIA';

    return (
        <FrontendLayout>
            <Head title="Beranda - Balai Lelang Indonesia" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(217, 167, 58, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(217, 167, 58, 0.2) 0%, transparent 50%)' }}></div>
                </div>
                <div className="container mx-auto px-4 py-16 md:py-24 relative">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 text-amber-300 text-sm font-medium rounded-full mb-6 backdrop-blur-sm border border-amber-500/20">
                            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                            Barang Lelang Tidak Ditebus
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Barang <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Berkualitas</span> dengan Harga Terjangkau
                        </h1>
                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                            Dapatkan gadget premium, emas, dan barang berharga lainnya dari hasil lelang gadai dengan harga jauh di bawah pasar. Dijamin original & berfungsi 100%.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/products"
                                className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 shadow-xl shadow-amber-500/30 transition-all hover:shadow-amber-500/50 hover:scale-105"
                            >
                                Lihat Produk
                            </Link>
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Halo Admin, saya ingin bertanya tentang produk lelang.')}`}
                                target="_blank"
                                className="px-8 py-3.5 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 shadow-xl shadow-emerald-500/30 transition-all hover:shadow-emerald-500/50 hover:scale-105"
                            >
                                Hubungi WhatsApp
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-12 max-w-lg mx-auto">
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-amber-400">500+</div>
                                <div className="text-xs text-gray-400 mt-1">Produk Terjual</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-amber-400">100%</div>
                                <div className="text-xs text-gray-400 mt-1">Original</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-amber-400">4.9★</div>
                                <div className="text-xs text-gray-400 mt-1">Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative gradient bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
            </section>

            {/* Telegram CTA */}
            <section className="py-6 -mt-8 relative z-10">
                <div className="container mx-auto px-4">
                    <a
                        href={telegramGroup}
                        target="_blank"
                        className="block max-w-3xl mx-auto p-4 md:p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl shadow-blue-600/20 hover:shadow-2xl hover:shadow-blue-600/30 transition-all hover:scale-[1.02] group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="text-white font-bold text-sm md:text-base">Join Group Telegram Resmi — {telegramTitle}</div>
                                <div className="text-blue-200 text-xs md:text-sm mt-0.5">Lihat bukti order, testimoni pelanggan dan update stok terkini</div>
                            </div>
                            <svg className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </a>
                </div>
            </section>

            {/* Categories */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Kategori Produk Lelang</h2>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {categories.map(category => (
                            <Link
                                key={category.id}
                                href={`/products?category=${category.slug}`}
                                className="group flex flex-col items-center p-4 bg-white rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-500/10 transition-all hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl flex items-center justify-center mb-3 group-hover:from-amber-100 group-hover:to-amber-200 transition-colors">
                                    {category.image ? (
                                        <img src={category.image} alt={category.name} className="w-8 h-8 object-contain" />
                                    ) : (
                                        <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-xs font-medium text-gray-700 group-hover:text-amber-700 transition-colors text-center">{category.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Produk Lelang Terbaru</h2>
                        <Link href="/products" className="text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1">
                            Lihat Semua
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Kenapa Pilih Balai Lelang Indonesia?</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">Balai Lelang Indonesia menyediakan beragam pilihan barang gadai yang tidak ditebus dengan harga yang lebih terjangkau.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[
                            { icon: '📦', title: 'Pengiriman ke seluruh Indonesia' },
                            { icon: '🧾', title: 'Bukti pemesanan tersedia' },
                            { icon: '💬', title: 'Testimoni pelanggan nyata' },
                            { icon: '🔄', title: 'Stok selalu diperbarui' },
                            { icon: '🔐', title: 'Transaksi mudah, cepat & aman' },
                        ].map((benefit, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all hover:-translate-y-1">
                                <span className="text-3xl mb-3">{benefit.icon}</span>
                                <span className="text-sm font-medium text-gray-700">{benefit.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {testimonials.length > 0 && (
                <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Apa Kata Pelanggan Kami</h2>
                            <p className="text-gray-500">Kepuasan pelanggan adalah keutamaan kami</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {testimonials.slice(0, 6).map(testi => (
                                <div key={testi.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {testi.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 text-sm">{testi.name}</div>
                                            <div className="text-xs text-gray-400">{testi.city}</div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">&ldquo;{testi.content}&rdquo;</p>
                                    <div className="flex text-amber-400 mt-3 text-xs">{'★'.repeat(5)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Blog */}
            {blogs.length > 0 && (
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Berita & Informasi Lelang</h2>
                            <p className="text-gray-500">Dapatkan informasi terbaru tentang lelang dan produk.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {blogs.map(blog => (
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
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6V7.5Z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors line-clamp-2">{blog.title}</h3>
                                        <p className="text-xs text-gray-400 mt-2">
                                            {new Date(blog.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </FrontendLayout>
    );
}
