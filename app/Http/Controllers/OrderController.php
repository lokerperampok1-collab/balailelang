<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'required|string|max:20',
            'shipping_address' => 'required|string',
            'province' => 'nullable|string|max:100',
            'city' => 'nullable|string|max:100',
            'district' => 'nullable|string|max:100',
            'village' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:10',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $order = DB::transaction(function () use ($validated, $request) {
            $totalPrice = 0;
            $orderItems = [];

            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                $subtotal = $product->price * $item['quantity'];
                $totalPrice += $subtotal;

                $orderItems[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'product_title' => $product->title,
                ];
            }

            $order = Order::create([
                'user_id' => $request->user()?->id,
                'order_code' => Order::generateOrderCode(),
                'name' => $validated['name'],
                'email' => $validated['email'] ?? null,
                'phone' => $validated['phone'],
                'shipping_address' => $validated['shipping_address'],
                'province' => $validated['province'] ?? null,
                'city' => $validated['city'] ?? null,
                'district' => $validated['district'] ?? null,
                'village' => $validated['village'] ?? null,
                'postal_code' => $validated['postal_code'] ?? null,
                'total_price' => $totalPrice,
                'payment_method' => 'whatsapp_transfer',
                'status' => 'pending',
                'notes' => $validated['notes'] ?? null,
            ]);

            foreach ($orderItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }

            // Store product titles for WA message
            $order->item_details = $orderItems;

            return $order;
        });

        // Build WhatsApp message
        $whatsappNumber = Setting::get('whatsapp_number', '6285136387800');
        $message = $this->buildWhatsAppMessage($order, $order->item_details);
        $whatsappUrl = "https://wa.me/{$whatsappNumber}?text=" . urlencode($message);

        return response()->json([
            'success' => true,
            'order_code' => $order->order_code,
            'whatsapp_url' => $whatsappUrl,
        ]);
    }

    private function buildWhatsAppMessage(Order $order, array $items): string
    {
        $itemLines = '';
        foreach ($items as $i => $item) {
            $num = $i + 1;
            $formattedPrice = 'Rp ' . number_format($item['price'] * $item['quantity'], 0, ',', '.');
            $itemLines .= "{$num}. {$item['product_title']} x {$item['quantity']} - {$formattedPrice}\n";
        }

        $formattedTotal = 'Rp ' . number_format($order->total_price, 0, ',', '.');

        $addressParts = array_filter([
            $order->shipping_address,
            $order->village,
            $order->district,
            $order->city,
            $order->province,
        ]);
        $fullAddress = implode(', ', $addressParts);
        if ($order->postal_code) {
            $fullAddress .= ' - ' . $order->postal_code;
        }

        return "Halo Admin Balai Lelang Indonesia, saya ingin melakukan konfirmasi pemesanan barang lelang gadai:\n\n"
            . "Kode Pesanan: {$order->order_code}\n"
            . "------------------------------------------\n"
            . "Detail Pembeli:\n"
            . "- Nama: {$order->name}\n"
            . "- No. HP/WA: {$order->phone}\n"
            . "- Email: " . ($order->email ?? '-') . "\n\n"
            . "Alamat Pengiriman:\n"
            . "{$fullAddress}\n"
            . "------------------------------------------\n"
            . "Detail Barang Belanjaan:\n"
            . $itemLines . "\n"
            . "Total Harga Tebus: {$formattedTotal}\n"
            . "Metode Pembayaran: Transfer Bank Manual\n\n"
            . "Mohon segera diproses dan dikirimkan instruksi nomor rekening tujuannya. Terima kasih!";
    }
}
