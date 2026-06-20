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
        password: '',
        password_confirmation: '',
        shipping_address: '',
        province: '',
        city: '',
        district: '',
        village: '',
        courier: 'Pos Laju',
        payment: 'MUTIARA RIZKI ANANDA',
    });

    const couriers = [
        { name: 'Pos Laju', price: 0 },
        { name: 'GDEX', price: 0 },
        { name: 'City-Link', price: 0 },
        { name: 'SkyNet', price: 0 },
        { name: 'Nationwide Express', price: 0 },
        { name: 'J&T Express', price: 0 },
        { name: 'DHL Express', price: 0 },
        { name: 'Gojek', price: 0 },
        { name: 'GO-SEND', price: 0 },
    ];

    const payments = [
        { 
            name: 'MUTIARA RIZKI ANANDA', 
            type: 'transfer', 
            account: '0019 0120 0976 501', 
            logo: null 
        },
        { 
            name: 'Balai lelang Indonesia', 
            type: 'qris', 
            account: null, 
            logo: '/uploads/payments/xgknpkr6W3IksEzYCSS8AfdrpvugttYexsuIZTYe.jpg' 
        },
    ];

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
                // Instead of opening WhatsApp, redirect to order tracking/success page
                window.location.href = '/checkout/success?order=' + data.order_code;
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
                    <a href="/products" className="inline-flex px-6 py-3 bg-yellow-500 text-white font-semibold rounded-xl hover:bg-yellow-600 transition">
                        Lihat Produk
                    </a>
                </div>
            </FrontendLayout>
        );
    }

    const inputClass = "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 outline-none";

    return (
        <FrontendLayout>
            <Head title="Checkout - Balai Lelang Indonesia" />

            <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                <h1 className="mb-4 text-xl font-bold">Checkout</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-4 md:col-span-2">
                            {/* Data Pembeli */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-4">
                                <h2 className="mb-3 font-semibold">Data Pembeli</h2>
                                <div className="grid gap-3">
                                    <div>
                                        <input className={inputClass} placeholder="Nama" name="name" value={form.name} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <input className={inputClass} placeholder="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <input className={inputClass} placeholder="No. Telepon" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <input className={inputClass} placeholder="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <input className={inputClass} placeholder="Konfirmasi Password" name="password_confirmation" type="password" value={form.password_confirmation} onChange={handleChange} required />
                                    </div>
                                    <p className="text-xs text-gray-500">Minimal 6 karakter</p>
                                    
                                    <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-3 text-sm text-amber-800">
                                        <div className="font-semibold">⚠️ Penting: Harap ingat password ini</div>
                                        <div className="mt-1">Password yang Anda buat akan digunakan untuk login ke akun Anda dan melacak pesanan serta status pengiriman di masa depan. Pastikan Anda mengingat password ini dengan baik.</div>
                                    </div>
                                </div>
                            </div>

                            {/* Alamat Pengiriman */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-4">
                                <h2 className="mb-3 font-semibold text-slate-700">Alamat Pengiriman</h2>
                                <div>
                                    <textarea className={inputClass} placeholder="Alamat lengkap" name="shipping_address" value={form.shipping_address} onChange={handleChange} required rows={3}></textarea>
                                </div>
                                <div className="mt-3 grid grid-cols-2 gap-3">
                                    <div>
                                        <input className={inputClass} placeholder="Provinsi" name="province" value={form.province} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <input className={inputClass} placeholder="Kab/Kota" name="city" value={form.city} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <input className={inputClass} placeholder="Kecamatan" name="district" value={form.district} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <input className={inputClass} placeholder="Desa" name="village" value={form.village} onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>

                            {/* Jasa Pengiriman */}
                            <div className="space-y-2">
                                <h2 className="mb-3 font-semibold">Jasa Pengiriman</h2>
                                {couriers.map((courier, idx) => (
                                    <label key={idx} className={`flex cursor-pointer justify-between rounded-lg border p-3 hover:border-yellow-400 transition ${form.courier === courier.name ? 'border-yellow-400 bg-yellow-50/50' : 'border-gray-200 bg-white'}`}>
                                        <div>
                                            <div className="font-medium">{courier.name}</div>
                                            <div className="text-sm text-gray-500">Rp 0</div>
                                        </div>
                                        <input type="radio" name="courier" value={courier.name} checked={form.courier === courier.name} onChange={handleChange} className="hidden" />
                                        {form.courier === courier.name && (
                                            <div className="flex items-center text-yellow-500">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                            </div>
                                        )}
                                    </label>
                                ))}
                            </div>

                            {/* Pilihan Pembayaran */}
                            <div className="space-y-2">
                                <h2 className="mb-3 font-semibold">Pilihan Pembayaran</h2>
                                {payments.map((payment, idx) => (
                                    <label key={idx} className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:border-yellow-400 transition ${form.payment === payment.name ? 'border-yellow-400 bg-yellow-50/50' : 'border-gray-200 bg-white'}`}>
                                        <div className="flex items-center gap-3">
                                            {payment.logo && (
                                                <img alt={payment.name} className="h-12 w-12 object-contain" src={payment.logo} />
                                            )}
                                            <div>
                                                <div className="font-medium">{payment.name}</div>
                                                {payment.account && (
                                                    <div className="text-sm text-gray-500">{payment.account}</div>
                                                )}
                                            </div>
                                        </div>
                                        <input type="radio" name="payment" value={payment.name} checked={form.payment === payment.name} onChange={handleChange} className="hidden" />
                                        {form.payment === payment.name && (
                                            <div className="flex items-center text-yellow-500">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                            </div>
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Ringkasan Pesanan */}
                        <div>
                            <div className="h-fit rounded-2xl border border-gray-200 bg-white p-4 sticky top-24">
                                <h2 className="mb-3 font-semibold">Ringkasan Pesanan</h2>
                                
                                <div className="space-y-3 mb-4">
                                    {items.map(item => (
                                        <div key={item.id} className="flex gap-3 text-sm">
                                            <div className="flex-1 truncate">{item.title}</div>
                                            <div className="font-medium">x{item.quantity}</div>
                                        </div>
                                    ))}
                                </div>

                                <hr className="my-2" />
                                <div className="flex justify-between text-sm py-1">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">{formatRupiah(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-sm py-1">
                                    <span className="text-gray-600">Ongkir</span>
                                    <span className="font-medium">Rp 0</span>
                                </div>
                                <div className="mt-3 pt-3 border-t border-dashed border-gray-200 flex justify-between text-lg font-bold text-yellow-600">
                                    <span>Total</span>
                                    <span>{formatRupiah(totalPrice)}</span>
                                </div>
                                <button type="submit" disabled={loading} className="mt-6 w-full rounded-xl bg-yellow-500 py-3.5 text-white font-semibold hover:bg-yellow-600 transition disabled:opacity-50 flex items-center justify-center gap-2">
                                    {loading && <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                                    {loading ? 'Memproses...' : 'Buat Pesanan'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </FrontendLayout>
    );
}
