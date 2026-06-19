import { Head, usePage } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { useCart } from '@/Contexts/CartContext';
import { formatRupiah } from '@/utils/helpers';
import { useState } from 'react';

export default function Index() {
    const { settings, auth } = usePage().props;
    const { items, totalPrice, removeItem, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: auth?.user?.name || '',
        email: auth?.user?.email || '',
        phone: auth?.user?.phone || '',
        shipping_address: '',
        province: '',
        city: '',
        district: '',
        village: '',
        postal_code: '',
        notes: '',
    });

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (items.length === 0) return;

        setLoading(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    ...form,
                    items: items.map(item => ({
                        product_id: item.id,
                        quantity: item.quantity,
                    })),
                }),
            });

            const data = await response.json();

            if (data.success) {
                clearCart();
                window.open(data.whatsapp_url, '_blank');
                window.location.href = '/?checkout=success&order=' + data.order_code;
            } else {
                alert('Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.');
            }
        } catch (error) {
            alert('Terjadi kesalahan jaringan. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <FrontendLayout>
                <Head title="Checkout - Balai Lelang Indonesia" />
                <div className="container mx-auto px-4 py-16 text-center">
                    <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Kosong</h2>
                    <p className="text-gray-500 mb-6">Silakan tambahkan produk ke keranjang terlebih dahulu</p>
                    <a href="/produk" className="inline-flex px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-500/25">
                        Lihat Produk
                    </a>
                </div>
            </FrontendLayout>
        );
    }

    return (
        <FrontendLayout>
            <Head title="Checkout - Balai Lelang Indonesia" />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Personal Info */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Informasi Pembeli</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                                        <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="Nama lengkap Anda" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp *</label>
                                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="628xxxxxxxxxx" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="email@contoh.com" />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Alamat Pengiriman</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap *</label>
                                        <textarea name="shipping_address" value={form.shipping_address} onChange={handleChange} required rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none" placeholder="Jalan, Nomor Rumah, RT/RW, dll." />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                                            <input type="text" name="province" value={form.province} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="Provinsi" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Kota/Kabupaten</label>
                                            <input type="text" name="city" value={form.city} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="Kota/Kabupaten" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Kecamatan</label>
                                            <input type="text" name="district" value={form.district} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="Kecamatan" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Kelurahan/Desa</label>
                                            <input type="text" name="village" value={form.village} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="Kelurahan/Desa" />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
                                        <input type="text" name="postal_code" value={form.postal_code} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="Kode Pos" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Catatan Tambahan</label>
                                        <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none" placeholder="Catatan tambahan untuk pesanan (opsional)" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Ringkasan Pesanan</h2>

                                <div className="space-y-3 mb-6">
                                    {items.map(item => (
                                        <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                                {item.main_image && <img src={item.main_image} alt="" className="w-full h-full object-cover" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                                                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="text-sm font-semibold text-gray-900">{formatRupiah(item.price * item.quantity)}</p>
                                                <button onClick={() => removeItem(item.id)} className="text-xs text-red-400 hover:text-red-600">Hapus</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-100 pt-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-700">Total Harga Tebus</span>
                                        <span className="text-2xl font-bold text-amber-600">{formatRupiah(totalPrice)}</span>
                                    </div>
                                </div>

                                {/* Payment Info */}
                                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                                    <div className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-medium text-blue-800">Metode Pembayaran</p>
                                            <p className="text-xs text-blue-600 mt-1">Transfer Bank Manual — Instruksi rekening tujuan akan dikirimkan oleh Admin melalui WhatsApp setelah Anda mengirim pesanan.</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || items.length === 0}
                                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 shadow-xl shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                                            Memproses...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                            Selesaikan Pemesanan via WhatsApp
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </FrontendLayout>
    );
}
