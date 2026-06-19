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
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold text-gray-900 hidden sm:block">{websiteName}</span>
                        </Link>

                        {/* Desktop Search */}
                        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Cari produk lelang..."
                                    className="w-full pl-4 pr-10 py-2.5 bg-gray-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                                />
                                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </button>
                            </div>
                        </form>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-700 rounded-lg hover:bg-amber-50 transition-colors">
                                Beranda
                            </Link>
                            <Link href="/produk" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-700 rounded-lg hover:bg-amber-50 transition-colors">
                                Produk
                            </Link>
                            <Link href="/blog" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-700 rounded-lg hover:bg-amber-50 transition-colors">
                                Blog
                            </Link>
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {/* Mobile search toggle */}
                            <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden p-2 text-gray-600 hover:text-amber-600 rounded-lg hover:bg-gray-100">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>

                            {/* Cart */}
                            <button
                                onClick={() => setIsCartOpen(!isCartOpen)}
                                className="relative p-2 text-gray-600 hover:text-amber-600 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Auth */}
                            {auth?.user ? (
                                <Link href="/dashboard" className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-700 rounded-lg hover:bg-amber-50">
                                    <div className="w-7 h-7 bg-amber-100 rounded-full flex items-center justify-center">
                                        <span className="text-amber-700 text-xs font-bold">{auth.user.name.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <span>{auth.user.name}</span>
                                </Link>
                            ) : (
                                <Link href="/login" className="hidden sm:block px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-500/25 transition-all hover:shadow-amber-500/40">
                                    Login
                                </Link>
                            )}

                            {/* Mobile menu */}
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-600 hover:text-amber-600 rounded-lg hover:bg-gray-100">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    {mobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile search bar */}
                    {searchOpen && (
                        <div className="md:hidden pb-3">
                            <form onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Cari produk lelang..."
                                    className="w-full px-4 py-2.5 bg-gray-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-amber-500"
                                    autoFocus
                                />
                            </form>
                        </div>
                    )}

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden pb-4 border-t border-gray-100 pt-3">
                            <nav className="flex flex-col gap-1">
                                <Link href="/" className="px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-amber-700 rounded-lg hover:bg-amber-50">Beranda</Link>
                                <Link href="/produk" className="px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-amber-700 rounded-lg hover:bg-amber-50">Produk</Link>
                                <Link href="/blog" className="px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-amber-700 rounded-lg hover:bg-amber-50">Blog</Link>
                                {!auth?.user && (
                                    <Link href="/login" className="mt-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold rounded-xl text-center">Login</Link>
                                )}
                            </nav>
                        </div>
                    )}
                </div>
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
                                    Checkout via WhatsApp
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
            <footer className="bg-gray-900 text-gray-300">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* About */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                    </svg>
                                </div>
                                <span className="text-white font-bold text-lg">{websiteName}</span>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed">{footerAbout}</p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Menu</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/" className="hover:text-amber-400 transition-colors">Beranda</Link></li>
                                <li><Link href="/produk" className="hover:text-amber-400 transition-colors">Produk Lelang</Link></li>
                                <li><Link href="/blog" className="hover:text-amber-400 transition-colors">Blog & Berita</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Hubungi Kami</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                    </svg>
                                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" className="hover:text-emerald-400 transition-colors">
                                        +{whatsappNumber}
                                    </a>
                                </li>
                                {supportEmail && (
                                    <li className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                        </svg>
                                        <span>{supportEmail}</span>
                                    </li>
                                )}
                                <li className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                    </svg>
                                    <a href={telegramGroup} target="_blank" className="hover:text-blue-400 transition-colors">Grup Telegram</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 py-4">
                    <p className="text-center text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} {websiteName}. All rights reserved.
                    </p>
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
