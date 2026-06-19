/**
 * Format a number as Indonesian Rupiah currency.
 */
export function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Calculate savings percentage between market price and redemption price.
 */
export function calcSavings(hargaPasar, hargaTebus) {
    if (!hargaPasar || hargaPasar <= 0) return 0;
    return Math.round(((hargaPasar - hargaTebus) / hargaPasar) * 100);
}

/**
 * Generate WhatsApp link for a product inquiry.
 */
export function generateProductWALink(waNumber, product) {
    const text = `Halo Admin Balai Lelang Indonesia, saya tertarik dengan produk *${product.title}* dengan Harga Tebus *${formatRupiah(product.price)}* yang saya lihat di website. Apakah produk ini masih tersedia?`;
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
}
