import { Head, Link, router, usePage } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { useCart } from '@/Contexts/CartContext';
import { formatRupiah, calcSavings, generateProductWALink } from '@/utils/helpers';
import { useState } from 'react';

export default function Index({ products, categories, filters }) {
    const { settings } = usePage().props;
    const { addItem } = useCart();
    const whatsappNumber = settings?.whatsapp_number || '6285136387800';
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/produk', { ...filters, search }, { preserveState: true });
    };

    const handleSort = (sort) => {
        router.get('/produk', { ...filters, sort }, { preserveState: true });
    };

    return (
        <FrontendLayout>
            <Head title="Produk Lelang - Balai Lelang Indonesia" />

            <div className="container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Produk Lelang</h1>
                    <p className="text-gray-500">Temukan barang lelang berkualitas dengan harga terjangkau</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
                            {/* Search */}
                            <form onSubmit={handleSearch} className="mb-6">
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">Cari Produk</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        placeholder="Ketik nama produk..."
                                        className="w-full pl-3 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    />
                                    <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                        </svg>
                                    </button>
                                </div>
                            </form>

                            {/* Categories */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Kategori</h3>
                                <div className="space-y-1">
                                    <Link
                                        href="/produk"
                                        className={`block px-3 py-2 text-sm rounded-lg transition-colors ${!filters.category ? 'bg-amber-50 text-amber-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        Semua Kategori
                                    </Link>
                                    {categories.map(cat => (
                                        <Link
                                            key={cat.id}
                                            href={`/produk?category=${cat.slug}`}
                                            className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${filters.category === cat.slug ? 'bg-amber-50 text-amber-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            <span>{cat.name}</span>
                                            {cat.products_count !== undefined && (
                                                <span className="text-xs text-gray-400">{cat.products_count}</span>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Sort */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Urutkan</h3>
                                <div className="space-y-1">
                                    {[
                                        { value: 'latest', label: 'Terbaru' },
                                        { value: 'price_asc', label: 'Harga Terendah' },
                                        { value: 'price_desc', label: 'Harga Tertinggi' },
                                        { value: 'name', label: 'Nama A-Z' },
                                    ].map(opt => (
                                        <button
                                            key={opt.value}
                                            onClick={() => handleSort(opt.value)}
                                            className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${filters.sort === opt.value || (!filters.sort && opt.value === 'latest') ? 'bg-amber-50 text-amber-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {products.data.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                                <h3 className="text-lg font-semibold text-gray-600 mb-2">Produk tidak ditemukan</h3>
                                <p className="text-sm text-gray-400">Coba ubah kata kunci atau filter pencarian Anda</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                    {products.data.map(product => {
                                        const savings = calcSavings(product.harga_pasar, product.price);
                                        return (
                                            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                                                <div className="relative overflow-hidden aspect-square bg-gray-100">
                                                    {product.main_image ? (
                                                        <img src={product.main_image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3 3h18a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 21 21H3a2.25 2.25 0 0 1-2.25-2.25V5.25A2.25 2.25 0 0 1 3 3Z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                    {savings > 0 && (
                                                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">Hemat {savings}%</div>
                                                    )}
                                                </div>
                                                <div className="p-4">
                                                    <Link href={`/produk/${product.slug}`}>
                                                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-amber-700 transition-colors min-h-[2.5rem]">{product.title}</h3>
                                                    </Link>
                                                    <div className="mt-3 space-y-1">
                                                        {product.harga_pasar && (
                                                            <span className="text-xs text-gray-400 line-through block">{formatRupiah(product.harga_pasar)}</span>
                                                        )}
                                                        <span className="text-lg font-bold text-amber-600 block">{formatRupiah(product.price)}</span>
                                                    </div>
                                                    <div className="mt-4 flex gap-2">
                                                        <button onClick={() => addItem(product)} className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 shadow-md shadow-amber-500/20 transition-all">
                                                            Beli Sekarang
                                                        </button>
                                                        <a href={generateProductWALink(whatsappNumber, product)} target="_blank" className="py-2.5 px-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors">
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Pagination */}
                                {products.links && products.links.length > 3 && (
                                    <div className="flex justify-center mt-8 gap-1">
                                        {products.links.map((link, i) => (
                                            <Link
                                                key={i}
                                                href={link.url || '#'}
                                                className={`px-3 py-2 text-sm rounded-lg transition-colors ${link.active ? 'bg-amber-500 text-white font-semibold' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                preserveState
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
