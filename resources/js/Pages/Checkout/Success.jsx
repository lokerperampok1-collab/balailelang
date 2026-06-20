import { Head, Link, usePage } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { useState } from 'react';
import { formatRupiah } from '@/utils/helpers';

export default function Success({ order_code, order }) {
    const { settings } = usePage().props;
    const whatsappNumber = settings?.whatsapp_number || '6285136387800';
    
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [copied, setCopied] = useState(false);
    const [copiedCode, setCopiedCode] = useState(false);
    
    const hasUploadedProof = uploadSuccess || (order && order.payment_proof);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setErrorMsg('');
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        setErrorMsg('');

        const formData = new FormData();
        formData.append('order_code', order_code);
        formData.append('proof', file);
        
        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const res = await fetch('/api/checkout/upload-proof', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': token,
                },
                body: formData
            });
            const data = await res.json();
            
            if (data.success) {
                setUploadSuccess(true);
            } else {
                setErrorMsg(data.message || 'Gagal mengunggah bukti pembayaran.');
            }
        } catch (e) {
            setErrorMsg('Terjadi kesalahan jaringan.');
        } finally {
            setUploading(false);
        }
    };

    const payments = {
        'MUTIARA RIZKI ANANDA': {
            type: 'transfer',
            bank: 'Bank BRI',
            account_name: 'MUTIARA RIZKI ANANDA',
            account_number: '0019 0120 0976 501'
        },
        'Balai lelang Indonesia': {
            type: 'qris',
            name: 'Balai lelang Indonesia',
            logo: '/uploads/payments/xgknpkr6W3IksEzYCSS8AfdrpvugttYexsuIZTYe.jpg'
        }
    };

    const paymentDetails = order?.payment_method ? payments[order.payment_method] : null;

    return (
        <FrontendLayout>
            <Head title="Pesanan Berhasil - Balai Lelang Indonesia" />

            <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
                    <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Pesanan Berhasil!</h1>
                    <p className="text-gray-600 mb-8 text-lg">Terima kasih telah berbelanja di Balai Lelang Indonesia.</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-left flex justify-between items-center">
                            <div>
                                <p className="text-sm text-blue-800 font-medium mb-1">Kode Pesanan:</p>
                                <p className="text-xl font-bold text-blue-900 tracking-wider">{order_code}</p>
                            </div>
                            <button 
                                onClick={() => {
                                    navigator.clipboard.writeText(order_code);
                                    setCopiedCode(true);
                                    setTimeout(() => setCopiedCode(false), 2000);
                                }}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition flex items-center gap-1"
                                title="Salin Kode Pesanan"
                            >
                                {copiedCode ? (
                                    <>
                                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        <span className="text-xs font-semibold text-green-600">Tersalin</span>
                                    </>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                )}
                            </button>
                        </div>
                        <div className="bg-green-50 border border-green-100 p-4 rounded-xl text-left">
                            <p className="text-sm text-green-800 font-medium mb-1">Total Tagihan:</p>
                            <p className="text-xl font-bold text-green-900">{order?.total_price ? formatRupiah(order.total_price) : 'Rp 0'}</p>
                        </div>
                    </div>

                    {paymentDetails && (
                        <div className="bg-white rounded-2xl p-6 text-left mb-8 border border-gray-200 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Informasi Pembayaran</h3>
                            
                            {paymentDetails.type === 'transfer' && (
                                <div className="space-y-3">
                                    <p className="text-sm text-gray-600">Silakan transfer sesuai dengan total tagihan ke rekening berikut:</p>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-500">Bank Tujuan</span>
                                            <span className="font-bold text-gray-800">{paymentDetails.bank}</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-500">Atas Nama</span>
                                            <span className="font-bold text-gray-800">{paymentDetails.account_name}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Nomor Rekening</span>
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-lg font-bold tracking-widest text-blue-600">{paymentDetails.account_number}</span>
                                                <button 
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(paymentDetails.account_number.replace(/\s+/g, ''));
                                                        setCopied(true);
                                                        setTimeout(() => setCopied(false), 2000);
                                                    }}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md transition flex items-center gap-1"
                                                    title="Salin Nomor Rekening"
                                                >
                                                    {copied ? (
                                                        <>
                                                            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                            <span className="text-xs font-semibold text-green-600">Tersalin</span>
                                                        </>
                                                    ) : (
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded flex items-start gap-2">
                                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>Pastikan nominal transfer sesuai hingga 3 digit terakhir untuk mempercepat verifikasi.</span>
                                    </div>
                                </div>
                            )}

                            {paymentDetails.type === 'qris' && (
                                <div className="space-y-4 text-center">
                                    <p className="text-sm text-gray-600">Silakan scan kode QRIS berikut menggunakan aplikasi m-Banking atau e-Wallet Anda:</p>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 inline-block">
                                        <img src={paymentDetails.logo} alt="QRIS" className="w-48 h-48 object-contain mx-auto rounded-lg shadow-sm" />
                                        <p className="mt-3 font-bold text-gray-800">{paymentDetails.name}</p>
                                    </div>
                                    <p className="text-xs text-gray-500">Mendukung pembayaran via BCA, Mandiri, BNI, BRI, GoPay, OVO, Dana, LinkAja, dll.</p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="bg-amber-50 rounded-2xl p-6 text-left mb-8 border border-amber-100">
                        <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
                            Langkah Selanjutnya:
                        </h3>
                        <ol className="list-decimal list-inside text-amber-800 space-y-2 text-sm leading-relaxed">
                            <li>Silakan lakukan pembayaran sesuai dengan nominal tagihan dan instruksi yang akan diberikan.</li>
                            <li>Unggah bukti transfer (foto struk/screenshot) pada form di bawah.</li>
                            <li>Pesanan Anda akan segera diproses dan dikirimkan.</li>
                        </ol>
                    </div>

                    {hasUploadedProof ? (
                        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-6 mb-8">
                            <div className="flex justify-center mb-3">
                                <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                </svg>
                            </div>
                            <p className="font-bold mb-1">Bukti Pembayaran Berhasil Terkirim!</p>
                            <p className="text-sm">Admin kami akan segera memverifikasi pesanan Anda. Anda dapat mengecek status pesanan pada menu Lacak Pesanan.</p>
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8 border border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-3 text-center">Upload Bukti Transfer</h3>
                            
                            <div className="space-y-4">
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                                />
                                {errorMsg && <p className="text-sm text-red-600 font-medium text-center">{errorMsg}</p>}
                                <button 
                                    onClick={handleUpload}
                                    disabled={!file || uploading}
                                    className="w-full py-3 bg-yellow-500 text-white font-bold rounded-xl hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {uploading && <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>}
                                    {uploading ? 'Mengunggah...' : 'Kirim Bukti Pembayaran'}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {hasUploadedProof && (
                            <Link 
                                href={`/track?order=${order_code}`}
                                className="inline-flex items-center justify-center gap-2 bg-sky-500 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-sky-600 transition shadow-lg shadow-sky-500/30"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                Lacak Pesanan
                            </Link>
                        )}

                        <Link href="/products" className="inline-flex items-center justify-center bg-gray-100 text-gray-700 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition">
                            Kembali Belanja
                        </Link>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
