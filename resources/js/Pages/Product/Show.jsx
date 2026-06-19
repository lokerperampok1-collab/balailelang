import { Head, Link, usePage } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { useCart } from '@/Contexts/CartContext';
import { formatRupiah, calcSavings, generateProductWALink } from '@/utils/helpers';
import { useState } from 'react';

export default function Show({ product, relatedProducts }) {
    const { settings } = usePage().props;
    const { addItem } = useCart();
    const whatsappNumber = settings?.whatsapp_number || '6285136387800';
    const savings = calcSavings(product.harga_pasar, product.price);
    const [selectedImage, setSelectedImage] = useState(product.main_image);

    const allImages = [
        product.main_image,
        ...(product.images || []).map(img => img.image_path),
    ].filter(Boolean);

    return (
        <FrontendLayout>
            <Head title={`${product.title} - Balai Lelang Indonesia`} />

            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                    <Link href="/" className="hover:text-amber-600">Beranda</Link>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                    <Link href="/produk" className="hover:text-amber-600">Produk</Link>
                    {product.category && (
                        <>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                            <Link href={`/produk?category=${product.category.slug}`} className="hover:text-amber-600">{product.category.name}</Link>
                        </>
                    )}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                    <span className="text-gray-600 truncate max-w-[200px]">{product.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Gallery */}
                    <div>
                        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
                            {selectedImage ? (
                                <img src={selectedImage} alt={product.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3 3h18a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 21 21H3a2.25 2.25 0 0 1-2.25-2.25V5.25A2.25 2.25 0 0 1 3 3Z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        {allImages.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {allImages.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImage(img)}
                                        className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-colors ${selectedImage === img ? 'border-amber-500' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            {product.category && (
                                <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full">{product.category.name}</span>
                            )}
                            {product.subcategory && (
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">{product.subcategory.name}</span>
                            )}
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

                        {/* Price Section */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 mb-6 border border-amber-100">
                            {product.harga_pasar && (
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-sm text-gray-500">Harga Pasar:</span>
                                    <span className="text-lg text-gray-400 line-through">{formatRupiah(product.harga_pasar)}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-amber-700 font-medium">Harga Tebus:</span>
                                <span className="text-3xl font-bold text-amber-600">{formatRupiah(product.price)}</span>
                            </div>
                            {savings > 0 && (
                                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-lg">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                                    </svg>
                                    Anda Hemat {savings}% ({formatRupiah(product.harga_pasar - product.price)})
                                </div>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2 mb-6">
                            {product.stock > 0 ? (
                                <>
                                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                    <span className="text-sm font-medium text-emerald-600">Tersedia (Sisa {product.stock})</span>
                                </>
                            ) : (
                                <>
                                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                                    <span className="text-sm font-medium text-red-600">Habis Terjual</span>
                                </>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mb-8">
                            <button
                                onClick={() => addItem(product)}
                                disabled={product.stock < 1}
                                className="flex-1 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 shadow-xl shadow-amber-500/25 transition-all hover:shadow-amber-500/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                Beli Sekarang
                            </button>
                            <a
                                href={generateProductWALink(whatsappNumber, product)}
                                target="_blank"
                                className="py-3.5 px-6 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 shadow-xl shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:scale-[1.02] flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                Tanya Admin
                            </a>
                        </div>

                        {/* Description */}
                        <div className="border-t border-gray-100 pt-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Deskripsi Produk</h2>
                            <div
                                className="prose prose-sm max-w-none text-gray-600"
                                dangerouslySetInnerHTML={{ __html: product.description || '<p>Tidak ada deskripsi tersedia.</p>' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Produk Serupa</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {relatedProducts.map(rp => (
                                <Link key={rp.id} href={`/produk/${rp.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:-translate-y-1">
                                    <div className="aspect-square bg-gray-100 overflow-hidden">
                                        {rp.main_image ? (
                                            <img src={rp.main_image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3 3h18a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 21 21H3a2.25 2.25 0 0 1-2.25-2.25V5.25A2.25 2.25 0 0 1 3 3Z" /></svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-amber-700 transition-colors">{rp.title}</h3>
                                        <div className="mt-2">
                                            {rp.harga_pasar && <span className="text-xs text-gray-400 line-through block">{formatRupiah(rp.harga_pasar)}</span>}
                                            <span className="text-base font-bold text-amber-600">{formatRupiah(rp.price)}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </FrontendLayout>
    );
}
