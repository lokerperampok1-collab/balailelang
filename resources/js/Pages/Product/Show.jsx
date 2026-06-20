import { Head, Link, usePage } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { useCart } from '@/Contexts/CartContext';
import { formatRupiah, generateProductWALink } from '@/utils/helpers';
import { useState } from 'react';

export default function Show({ product, relatedProducts }) {
    const { settings } = usePage().props;
    const { addItem } = useCart();
    const whatsappNumber = settings?.whatsapp_number || '6285136387800';
    
    // Fallbacks
    const hargaPasar = product.harga_pasar || 0;
    const price = product.price || 0;
    const description = product.description || '<p>Tidak ada deskripsi tersedia.</p>';
    
    const [selectedImage, setSelectedImage] = useState(product.main_image);

    const allImages = [
        product.main_image,
        ...(product.images || []).map(img => img.image_path),
    ].filter(Boolean);

    return (
        <FrontendLayout>
            <Head title={`${product.title} - Balai Lelang Indonesia`} />

            <div className="p-4 pb-24 md:pb-4">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Left Column: Image Gallery */}
                    <div>
                        <div className="relative">
                            <img 
                                className="h-auto w-full rounded-2xl border border-gray-200 bg-white object-contain" 
                                src={selectedImage} 
                                alt={product.title}
                            />
                        </div>
                        {allImages.length > 1 && (
                            <div className="mt-3 flex gap-2 overflow-x-auto">
                                {allImages.map((img, i) => (
                                    <img 
                                        key={i}
                                        className={`h-20 w-20 cursor-pointer rounded-lg border object-cover transition hover:shadow-sm ${selectedImage === img ? 'border-gray-400' : 'border-gray-200 hover:border-gray-400'}`} 
                                        src={img} 
                                        alt={`${product.title} ${i+1}`}
                                        onClick={() => setSelectedImage(img)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Right Column: Details */}
                    <div className="space-y-4">
                        <h1 className="text-xl font-bold text-gray-800">{product.title}</h1>
                        <div className="flex flex-wrap gap-1.5">
                            {product.category && (
                                <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700">{product.category.name}</span>
                            )}
                            {product.subcategory && (
                                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">{product.subcategory.name}</span>
                            )}
                        </div>
                        <div>
                            {hargaPasar > 0 && (
                                <div className="mb-1 text-sm font-semibold text-blue-900 line-through">Harga Pasar: {formatRupiah(hargaPasar)}</div>
                            )}
                            <div className="flex items-baseline gap-3">
                                <div className="text-2xl font-bold text-yellow-600">{formatRupiah(price)}</div>
                                <div className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-600">Harga Tebus</div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-600">Stok: {product.stock}</div>
                        
                        {/* Desktop Buttons */}
                        <div className="hidden space-y-2 pt-2 md:block">
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => addItem(product)}
                                    disabled={product.stock < 1}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-sky-600 py-3 text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart h-5 w-5"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
                                    Masukkan Keranjang
                                </button>
                                <button 
                                    onClick={() => {
                                        addItem(product);
                                        window.location.href = '/checkout';
                                    }}
                                    disabled={product.stock < 1}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-500 py-3 text-white shadow hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet h-5 w-5"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path></svg>
                                    Beli Sekarang
                                </button>
                            </div>
                            <a 
                                href={generateProductWALink(whatsappNumber, product)}
                                target="_blank"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-3 text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle h-4 w-4"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
                                Beli via WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
                    <h2 className="mb-3 font-semibold">Deskripsi Produk</h2>
                    <div 
                        className="prose max-w-none text-gray-600"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                </div>

                {/* Reviews */}
                <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
                    <h2 className="mb-4 font-semibold">Ulasan Produk</h2>
                    <div className="mb-6 flex items-center gap-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900">0.0</div>
                            <div className="text-sm text-gray-500">/ 5</div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex">
                                <span className="text-lg text-gray-300">★</span>
                                <span className="text-lg text-gray-300">★</span>
                                <span className="text-lg text-gray-300">★</span>
                                <span className="text-lg text-gray-300">★</span>
                                <span className="text-lg text-gray-300">★</span>
                            </div>
                            <div className="text-sm text-gray-600">0 Ulasan</div>
                        </div>
                    </div>
                    <p className="text-gray-500">Belum ada ulasan untuk produk ini.</p>
                </div>

                {/* Related Products */}
                {relatedProducts && relatedProducts.length > 0 && (
                    <div className="mt-10">
                        <h2 className="mb-4 text-lg font-bold text-gray-800">Produk Serupa</h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {relatedProducts.map(rp => (
                                <div key={rp.id} className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-3 transition hover:border-yellow-400 hover:shadow-lg">
                                    <Link className="absolute inset-0 z-0" href={`/products/${rp.slug}`}></Link>
                                    <div className="relative">
                                        <img className="h-32 w-full rounded-xl bg-gray-100 object-cover" src={rp.main_image} alt={rp.title} />
                                        {rp.stock < 1 && (
                                            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/55">
                                                <span className="rounded-full border-2 border-white bg-red-600 px-3 py-1 text-xs font-black tracking-widest text-white uppercase shadow-lg">SOLD</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-2 line-clamp-2 text-xs font-semibold text-gray-800">{rp.title}</div>
                                    <div className="mt-1">
                                        <div className="text-sm font-bold text-yellow-600">{formatRupiah(rp.price)}</div>
                                    </div>
                                    <div className="relative z-10 mt-2 flex gap-1">
                                        <button 
                                            disabled={rp.stock < 1} 
                                            onClick={() => addItem(rp)}
                                            className="flex flex-1 items-center justify-center rounded-lg bg-gray-100 py-1 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart h-4 w-4"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
                                        </button>
                                        <button 
                                            disabled={rp.stock < 1} 
                                            onClick={() => {
                                                addItem(rp);
                                                window.location.href = '/checkout';
                                            }}
                                            className="flex flex-1 items-center justify-center rounded-lg bg-yellow-500 py-1 text-white hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet h-4 w-4"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Fixed Bottom Bar */}
            <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white px-4 py-3 shadow-2xl md:hidden">
                <div className="flex gap-2">
                    <button 
                        onClick={() => addItem(product)}
                        disabled={product.stock < 1}
                        className="flex items-center justify-center rounded-xl bg-sky-600 px-4 py-3 text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart h-5 w-5"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
                    </button>
                    <button 
                        onClick={() => {
                            addItem(product);
                            window.location.href = '/checkout';
                        }}
                        disabled={product.stock < 1}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-500 py-3 text-sm font-bold text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet h-4 w-4"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path></svg>
                        Beli Sekarang
                    </button>
                    <a 
                        href={generateProductWALink(whatsappNumber, product)}
                        target="_blank"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-500 py-3 text-sm font-bold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle h-4 w-4"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
                        Beli via WhatsApp
                    </a>
                </div>
            </div>
        </FrontendLayout>
    );
}
