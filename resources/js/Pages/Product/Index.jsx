import { Head, Link, router } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { formatRupiah } from '@/utils/helpers';
import { useState } from 'react';

export default function Index({ products, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/products', { ...filters, search }, { preserveState: true });
    };

    const handleCategoryChange = (category) => {
        router.get('/products', { ...filters, category }, { preserveState: true });
    };

    const handleSortChange = (sort) => {
        router.get('/products', { ...filters, sort }, { preserveState: true });
    };

    const handleStatusChange = (status) => {
        router.get('/products', { ...filters, status }, { preserveState: true });
    };

    return (
        <FrontendLayout>
            <Head title="Produk - Balai Lelang Indonesia" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-2 pb-8">
                {/* Search & Filters Card */}
                <div className="mx-auto mb-8 max-w-7xl px-4">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
                        {/* Search bar */}
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Cari produk..."
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-12 pl-11 text-sm text-gray-800 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                                />
                                <button type="submit" className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-600">
                                    Cari
                                </button>
                            </div>
                        </form>

                        {/* Filter dropdowns */}
                        <div className="flex flex-wrap gap-4 md:items-center">
                            <select
                                value={filters.category || ''}
                                onChange={e => handleCategoryChange(e.target.value)}
                                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                            >
                                <option value="">📦 Semua Kategori</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>

                            <select
                                value={filters.sort || ''}
                                onChange={e => handleSortChange(e.target.value)}
                                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                            >
                                <option value="">📊 Urutkan</option>
                                <option value="price_low">💰 Harga Terendah</option>
                                <option value="price_high">💎 Harga Tertinggi</option>
                                <option value="name_az">A-Z</option>
                                <option value="name_za">Z-A</option>
                            </select>
                        </div>

                        {/* Status buttons */}
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => handleStatusChange('')}
                                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${!filters.status ? 'bg-yellow-500 text-white shadow' : 'border border-gray-300 bg-white text-gray-600 hover:border-yellow-400 hover:text-yellow-600'}`}
                            >
                                Semua
                            </button>
                            <button
                                onClick={() => handleStatusChange('available')}
                                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${filters.status === 'available' ? 'bg-yellow-500 text-white shadow' : 'border border-gray-300 bg-white text-gray-600 hover:border-yellow-400 hover:text-yellow-600'}`}
                            >
                                Tersedia
                            </button>
                            <button
                                onClick={() => handleStatusChange('sold')}
                                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${filters.status === 'sold' ? 'bg-yellow-500 text-white shadow' : 'border border-gray-300 bg-white text-gray-600 hover:border-yellow-400 hover:text-yellow-600'}`}
                            >
                                Terjual
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="mx-auto max-w-7xl px-4">
                    {products.data.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">Produk tidak ditemukan</h3>
                            <p className="text-sm text-gray-400">Coba ubah kata kunci atau filter pencarian Anda</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                {products.data.map(product => {
                                    return (
                                        <div key={product.id} className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-3 transition hover:border-yellow-400 hover:shadow-lg">
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
                                })}
                            </div>

                            {/* Pagination */}
                            {products.links && products.links.length > 3 && (
                                <div className="flex justify-center mt-8 gap-1">
                                    {products.links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url || '#'}
                                            className={`px-3 py-2 text-sm rounded-lg transition-colors ${link.active ? 'bg-yellow-500 text-white font-semibold' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
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
        </FrontendLayout>
    );
}
