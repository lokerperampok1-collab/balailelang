import { Head, useForm } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { formatRupiah } from '@/utils/helpers';

export default function Index({ search, order }) {
    const { data, setData, get, processing } = useForm({
        search: search || '',
    });

    const submit = (e) => {
        e.preventDefault();
        get(route('track.index'));
    };

    const getStatusBadge = (status) => {
        const statuses = {
            'pending': { label: 'Menunggu Pembayaran', color: 'bg-amber-100 text-amber-800 border-amber-200' },
            'payment_verifying': { label: 'Verifikasi Pembayaran', color: 'bg-blue-100 text-blue-800 border-blue-200' },
            'processing': { label: 'Diproses', color: 'bg-purple-100 text-purple-800 border-purple-200' },
            'shipped': { label: 'Dikirim', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
            'completed': { label: 'Selesai', color: 'bg-green-100 text-green-800 border-green-200' },
            'cancelled': { label: 'Dibatalkan', color: 'bg-red-100 text-red-800 border-red-200' },
        };
        const s = statuses[status] || { label: status, color: 'bg-gray-100 text-gray-800 border-gray-200' };
        
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${s.color}`}>
                {s.label}
            </span>
        );
    };

    return (
        <FrontendLayout>
            <Head title="Cek Pesanan - Balai Lelang Indonesia" />

            <div className="container mx-auto px-4 py-12 max-w-3xl min-h-[60vh]">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">Cek Pesanan</h1>
                    <p className="text-gray-500">Lacak status pesanan Anda secara real-time</p>
                </div>

                <form onSubmit={submit} className="mb-12 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input 
                            type="text"
                            value={data.search}
                            onChange={e => setData('search', e.target.value)}
                            className="flex-1 rounded-xl border border-gray-300 px-5 py-4 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none outline-none transition"
                            placeholder="Masukkan No. Order atau No. HP"
                            required
                        />
                        <button 
                            type="submit"
                            disabled={processing}
                            className="rounded-xl bg-yellow-500 px-8 py-4 font-bold text-white transition-all hover:bg-yellow-600 active:scale-95 disabled:opacity-70"
                        >
                            {processing ? 'Mencari...' : 'Cari Pesanan'}
                        </button>
                    </div>
                </form>

                {search && !order && (
                    <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.143 17.082a24.248 24.248 0 003.844.148m-3.844-.148a23.856 23.856 0 01-5.455-1.31 8.966 8.966 0 012.3-5.542m3.155 6.852a3 3 0 005.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 003.536-1.003A8.967 8.967 0 0021 9.619v-.115a2.029 2.029 0 00-2.036-2.002H18.5a6.5 6.5 0 00-11.833-2.52M12 11.5v.01" />
                        </svg>
                        <h3 className="text-lg font-bold text-gray-700">Pesanan Tidak Ditemukan</h3>
                        <p className="text-gray-500 mt-1">Pastikan Nomor Order atau Nomor HP sudah benar.</p>
                    </div>
                )}

                {order && (
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 border-b border-gray-100 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <p className="text-sm text-gray-500 font-medium mb-1">Kode Pesanan</p>
                                <p className="text-xl font-bold text-gray-900 tracking-wider">{order.order_code}</p>
                            </div>
                            <div className="text-right">
                                {getStatusBadge(order.status)}
                            </div>
                        </div>

                        <div className="p-6 grid sm:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Informasi Pembeli</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Nama</span>
                                        <span className="font-semibold text-gray-800">{order.name}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">No. HP</span>
                                        <span className="font-semibold text-gray-800">{order.phone}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Tanggal</span>
                                        <span className="font-semibold text-gray-800">{new Date(order.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Alamat Pengiriman</h3>
                                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    {order.shipping_address}<br/>
                                    {order.village}, {order.district}<br/>
                                    {order.city}, {order.province}
                                </p>
                            </div>
                        </div>

                        <div className="px-6 pb-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 mt-2">Daftar Produk</h3>
                            <div className="space-y-4">
                                {order.items.map((item, idx) => {
                                    const productImage = item.product?.images?.[0]?.image_path 
                                        ? `/storage/${item.product.images[0].image_path}` 
                                        : 'https://placehold.co/100x100?text=No+Image';
                                        
                                    return (
                                        <div key={idx} className="flex items-center gap-4 border border-gray-100 p-3 rounded-xl hover:border-yellow-200 hover:bg-yellow-50/30 transition">
                                            <div className="w-16 h-16 flex-shrink-0 bg-white rounded-lg border border-gray-200 overflow-hidden">
                                                <img src={productImage} alt={item.product?.title || 'Produk'} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-800 truncate">{item.product?.title || 'Produk Tidak Ditemukan'}</p>
                                                <p className="text-sm text-gray-500">{item.quantity} x {formatRupiah(item.price)}</p>
                                            </div>
                                            <div className="font-bold text-gray-900 pl-4">
                                                {formatRupiah(item.quantity * item.price)}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="mt-6 pt-6 border-t border-dashed border-gray-200 flex justify-between items-center">
                                <span className="font-bold text-gray-600">Total Pembayaran</span>
                                <span className="text-2xl font-bold text-yellow-600">{formatRupiah(order.total_price)}</span>
                            </div>
                            
                            {order.status === 'pending' && (
                                <div className="mt-6">
                                    <a href={`/checkout/success?order=${order.order_code}`} className="block w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-center rounded-xl transition">
                                        Selesaikan Pembayaran
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </FrontendLayout>
    );
}
