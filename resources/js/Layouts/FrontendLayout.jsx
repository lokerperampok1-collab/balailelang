import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useCart } from '@/Contexts/CartContext';
import { formatRupiah } from '@/utils/helpers';

export default function FrontendLayout({ children }) {
    const { settings, auth } = usePage().props;
    const { items, totalItems, totalPrice, isCartOpen, setIsCartOpen, removeItem } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const websiteName = settings?.website_name || 'Balai Lelang Indonesia';
    const whatsappNumber = settings?.whatsapp_number || '6285136387800';
    const goldPrice = settings?.gold_price || 0;
    const telegramGroup = settings?.telegram_group || '#';
    const supportEmail = settings?.support_email || '';
    const footerAbout = settings?.footer_about || '';

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/produk?search=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Gold Price Ticker */}
            <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-amber-100 py-1.5 text-center text-sm font-medium">
                <div className="container mx-auto px-4 flex items-center justify-center gap-2">
                    <span className="inline-block w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                    <span>Harga Emas Hari Ini: <strong className="text-amber-300">{formatRupiah(goldPrice)}</strong>/gram</span>
                    <span className="inline-block w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                </div>
            </div>

            {/* Navbar */}
            <header className="sticky top-0 z-50 shadow-lg">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <svg className="h-full w-full" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#0b1f3a" />
                                <stop offset="50%" stopColor="#0f2f5c" />
                                <stop offset="100%" stopColor="#081426" />
                            </linearGradient>
                            <radialGradient id="glow1">
                                <stop offset="0%" stopColor="#2f6bff" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#2f6bff" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient id="glow2">
                                <stop offset="0%" stopColor="#4cc9ff" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#4cc9ff" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <rect width="1920" height="1080" fill="url(#bg)" />
                        <circle cx="1400" cy="200" r="400" fill="url(#glow1)" />
                        <circle cx="500" cy="900" r="350" fill="url(#glow2)" />
                        <path d="M0 750 Q480 650 960 760 T1920 720 L1920 1080 L0 1080 Z" fill="#1c3f75" opacity="0.35" />
                        <path d="M0 820 Q600 700 1200 820 T1920 780 L1920 1080 L0 1080 Z" fill="#2a5aa8" opacity="0.25" />
                    </svg>
                </div>
                <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                    <Link href="/">
                        <img alt={websiteName} className="h-12 sm:h-[72px] w-auto rounded-lg shadow-sm object-contain" src={settings?.logo_path || '/uploads/logos/logo.png'} />
                    </Link>
                    <nav className="hidden items-center gap-5 text-sm md:flex">
                        <Link className="text-blue-100 transition hover:text-yellow-400" aria-label="Beranda" href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house h-4.5 w-4.5">
                                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            </svg>
                        </Link>
                        <div className="group relative">
                            <button className="flex items-center gap-1 text-blue-100 transition hover:font-semibold hover:text-yellow-400">
                                Produk
                                <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="pointer-events-none absolute top-full left-1/2 w-48 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                                <div className="rounded-xl border border-white/10 py-1 shadow-xl" style={{ background: 'linear-gradient(135deg, rgb(11, 31, 58) 0%, rgb(15, 47, 92) 100%)' }}>
                                    <Link className="block px-4 py-2.5 text-sm text-blue-100 transition hover:bg-white/10 hover:text-yellow-400" href="/products">Semua Produk</Link>
                                    <Link className="block px-4 py-2.5 text-sm text-blue-100 transition hover:bg-white/10 hover:text-yellow-400" href="/products?status=available">Produk Tersedia</Link>
                                    <Link className="block px-4 py-2.5 text-sm text-blue-100 transition hover:bg-white/10 hover:text-yellow-400" href="/products?status=sold">Produk Terjual</Link>
                                </div>
                            </div>
                        </div>
                        <div className="group relative">
                            <button className="flex items-center gap-1 text-blue-100 transition hover:font-semibold hover:text-yellow-400">
                                Pesanan
                                <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="pointer-events-none absolute top-full left-1/2 w-52 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                                <div className="rounded-xl border border-white/10 py-1 shadow-xl" style={{ background: 'linear-gradient(135deg, rgb(11, 31, 58) 0%, rgb(15, 47, 92) 100%)' }}>
                                    <Link className="block px-4 py-2.5 text-sm text-blue-100 transition hover:bg-white/10 hover:text-yellow-400" href="/checkout">Pesanan</Link>
                                    <Link className="block px-4 py-2.5 text-sm text-blue-100 transition hover:bg-white/10 hover:text-yellow-400" href="/track">Lacak Pengiriman</Link>
                                </div>
                            </div>
                        </div>
                        <a href="/#telegram-section" className="text-blue-100 transition hover:font-semibold hover:text-yellow-400">Pemesanan via Telegram</a>
                    </nav>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setSearchOpen(!searchOpen)} className="rounded-full p-2 transition hover:bg-white/10" aria-label="Cari Produk">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search h-5 w-5 text-blue-100">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </button>
                        <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative rounded-full p-2 transition hover:bg-white/10" aria-label="Keranjang">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart h-5 w-5 text-blue-100">
                                <circle cx="8" cy="21" r="1" />
                                <circle cx="19" cy="21" r="1" />
                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        {auth?.user ? (
                            <Link href="/dashboard" className="hidden md:flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-100 transition hover:bg-white/10 hover:text-yellow-400 rounded-lg">
                                <span>{auth.user.name}</span>
                            </Link>
                        ) : (
                            <div className="ml-2 hidden items-center gap-2 md:flex">
                                <Link className="rounded px-4 py-2 text-sm font-medium text-blue-100 transition hover:bg-white/10 hover:text-yellow-400" href="/login">Masuk</Link>
                                <Link className="rounded bg-yellow-400 px-4 py-2 text-sm font-semibold text-[#0b1f3a] transition hover:bg-yellow-300" href="/register">Buat Akun Baru</Link>
                            </div>
                        )}
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-full p-2 transition hover:bg-white/10 md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu h-5 w-5 text-blue-100">
                                <line x1="4" x2="20" y1="12" y2="12" />
                                <line x1="4" x2="20" y1="6" y2="6" />
                                <line x1="4" x2="20" y1="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
                {searchOpen && (
                    <div className="bg-[#0f2f5c] border-t border-white/10 py-3">
                        <div className="container mx-auto px-4">
                            <form onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Cari produk lelang..."
                                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    autoFocus
                                />
                            </form>
                        </div>
                    </div>
                )}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-[#0f2f5c] border-t border-white/10 py-3 px-4 space-y-2">
                        <Link href="/" className="block py-2 text-sm text-blue-100 hover:text-yellow-400">Beranda</Link>
                        <Link href="/products" className="block py-2 text-sm text-blue-100 hover:text-yellow-400">Semua Produk</Link>
                        <Link href="/products?status=available" className="block py-2 text-sm text-blue-100 hover:text-yellow-400">Produk Tersedia</Link>
                        <Link href="/products?status=sold" className="block py-2 text-sm text-blue-100 hover:text-yellow-400">Produk Terjual</Link>
                        <Link href="/track" className="block py-2 text-sm text-blue-100 hover:text-yellow-400">Lacak Pengiriman</Link>
                        <a href="/#telegram-section" className="block py-2 text-sm text-blue-100 hover:text-yellow-400">Pemesanan via Telegram</a>
                        {!auth?.user && (
                            <div className="flex gap-2 pt-2 border-t border-white/10">
                                <Link className="flex-1 text-center py-2 text-sm font-medium text-blue-100 border border-white/20 rounded-lg hover:bg-white/10" href="/login">Masuk</Link>
                                <Link className="flex-1 text-center py-2 text-sm font-semibold bg-yellow-400 text-[#0b1f3a] rounded-lg hover:bg-yellow-300" href="/register">Daftar</Link>
                            </div>
                        )}
                    </div>
                )}
            </header>

            {/* Cart Drawer */}
            {isCartOpen && (
                <div className="fixed inset-0 z-[60]">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
                    <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-bold text-gray-900">Keranjang Belanja</h2>
                            <button onClick={() => setIsCartOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                    <p className="text-sm">Keranjang masih kosong</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {items.map(item => (
                                        <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                                {item.main_image && (
                                                    <img src={item.main_image} alt={item.title} className="w-full h-full object-cover" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-gray-900 truncate">{item.title}</h4>
                                                <p className="text-sm font-bold text-amber-600 mt-1">{formatRupiah(item.price)}</p>
                                                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                            </div>
                                            <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 shrink-0">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {items.length > 0 && (
                            <div className="border-t p-4 bg-white">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm text-gray-600">Total</span>
                                    <span className="text-xl font-bold text-amber-600">{formatRupiah(totalPrice)}</span>
                                </div>
                                <Link
                                    href="/checkout"
                                    onClick={() => setIsCartOpen(false)}
                                    className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-center font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/25 transition-all"
                                >
                                    Checkout
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="mt-auto w-full bg-gradient-to-br from-sky-900 to-sky-800 text-white">
                <div className="mx-auto max-w-7xl px-4 py-12">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <h3 className="mb-4 text-lg font-bold text-sky-300">Tentang Kami</h3>
                            <p className="text-sm leading-relaxed text-sky-100">{footerAbout}</p>
                        </div>
                        <div>
                            <h3 className="mb-4 text-lg font-bold text-sky-300">Menu</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link className="text-sky-100 transition hover:text-sky-300" href="/">Beranda</Link></li>
                                <li><Link className="text-sky-100 transition hover:text-sky-300" href="/products">Produk</Link></li>
                                <li><Link className="text-sky-100 transition hover:text-sky-300" href="/track">Lacak Pesanan</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-4 text-lg font-bold text-sky-300">Hubungi Kami</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone h-4 w-4 shrink-0 text-sky-300">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-sky-100 transition hover:text-sky-300">
                                        {whatsappNumber}
                                    </a>
                                </li>
                                {supportEmail && (
                                    <li className="flex items-start gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail h-4 w-4 shrink-0 text-sky-300">
                                            <rect width="20" height="16" x="2" y="4" rx="2" />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                        <a href={`mailto:${supportEmail}`} className="text-sky-100 transition hover:text-sky-300">
                                            {supportEmail}
                                        </a>
                                    </li>
                                )}
                                <li className="flex items-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin h-4 w-4 shrink-0 text-sky-300">
                                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <a href={telegramGroup} target="_blank" rel="noopener noreferrer" className="text-sky-100 transition hover:text-sky-300">
                                        Grup Telegram Resmi
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-4 text-lg font-bold text-sky-300">Newsletter</h3>
                            <p className="mb-3 text-sm text-sky-100">Dapatkan penawaran terbaru langsung di email Anda</p>
                            <div className="flex">
                                <input placeholder="Email Anda" className="flex-1 rounded-l-lg bg-sky-700 px-3 py-2 text-sm text-white placeholder-sky-300 focus:outline-none" type="email" />
                                <button className="rounded-r-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500">Kirim</button>
                            </div>
                        </div>
                    </div>
                    <div className="my-8 border-t border-sky-700" />
                    <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-sky-200 md:flex-row">
                        <p>{websiteName} &copy; {new Date().getFullYear()} All rights reserved.</p>
                        <div className="flex gap-4">
                            <a href="#" className="transition hover:text-sky-300">Privacy Policy</a>
                            <a href="#" className="transition hover:text-sky-300">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Floating WhatsApp Button */}
            <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Halo Admin Balai Lelang Indonesia, saya ingin bertanya tentang produk lelang.')}`}
                target="_blank"
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-all duration-300 group"
            >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="absolute -top-1 -left-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></span>
            </a>
        </div>
    );
}
