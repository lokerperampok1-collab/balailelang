<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\Category;
use App\Models\Product;
use App\Models\Setting;
use App\Models\Subcategory;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@balailelangindonesia.com',
            'password' => Hash::make('password'),
            'phone' => '6285136387800',
            'role' => 'admin',
        ]);

        // Settings
        $settings = [
            'website_name' => 'Balai Lelang Indonesia',
            'whatsapp_number' => '6285136387800',
            'whatsapp_group_contact' => '6281281888636',
            'telegram_group' => 'https://t.me/+TDm5UWbF8js4MGE9',
            'telegram_group_title' => 'BALAI LELANG INDONESIA',
            'support_email' => 'support@balailelangindonesia.com',
            'gold_price' => '2799145',
            'harga_pasar_label' => 'Harga Pasar',
            'harga_tebus_label' => 'Harga Tebus',
            'seo_title' => 'Balai Lelang Indonesia',
            'seo_description' => 'Balai Lelang Indonesia, platform lelang terpercaya untuk properti, emas, elektronik dan barang bernilai tinggi dengan proses aman dan transparan.',
            'logo_path' => '/uploads/logos/logo.png',
            'footer_about' => 'Balai Lelang Indonesia adalah platform lelang yang menawarkan barang-barang berkualitas dengan harga kompetitif. Kami berkomitmen untuk menyediakan proses yang transparan, aman, dan terpercaya bagi semua pelanggan.',
        ];

        foreach ($settings as $key => $value) {
            Setting::create(['key' => $key, 'value' => $value]);
        }

        // Categories
        $categories = [
            ['name' => 'Emas', 'slug' => 'emas'],
            ['name' => 'Handphone', 'slug' => 'handphone'],
            ['name' => 'Computer', 'slug' => 'computer'],
            ['name' => 'Camera', 'slug' => 'camera'],
            ['name' => 'Drone', 'slug' => 'drone'],
            ['name' => 'iPad', 'slug' => 'ipad'],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }

        // Subcategories
        $handphoneCategory = Category::where('slug', 'handphone')->first();
        Subcategory::create(['category_id' => $handphoneCategory->id, 'name' => 'iPhone', 'slug' => 'iphone']);
        Subcategory::create(['category_id' => $handphoneCategory->id, 'name' => 'Samsung', 'slug' => 'samsung']);

        // Sample Products
        $iphoneSub = Subcategory::where('slug', 'iphone')->first();
        $samsungSub = Subcategory::where('slug', 'samsung')->first();
        $ipadCategory = Category::where('slug', 'ipad')->first();

        $products = [
            [
                'category_id' => $handphoneCategory->id,
                'subcategory_id' => $iphoneSub->id,
                'title' => 'iPhone 14 Promax 256gb ex iBox',
                'description' => '<p>• Warna: Deep Purple</p><p>• Ex Garansi resmi indonesia ID/A</p><p>• Fungsi 100% Normal (siap pake)</p><p>• Fullset box acc original</p><p>• Bonus case</p>',
                'price' => 2400000,
                'harga_pasar' => 4800000,
                'stock' => 1,
            ],
            [
                'category_id' => $handphoneCategory->id,
                'subcategory_id' => $iphoneSub->id,
                'title' => 'iPhone 15 Promax 256gb ex iBox',
                'description' => '<p>• Warna: Blue titanium</p><p>• Ex Garansi resmi indonesia PA/A</p><p>• Fungsi 100% Normal (siap pake)</p><p>• Fullset box acc original</p><p>• Bonus case bagus dn lucu</p>',
                'price' => 3250000,
                'harga_pasar' => 6350000,
                'stock' => 1,
            ],
            [
                'category_id' => $handphoneCategory->id,
                'subcategory_id' => $iphoneSub->id,
                'title' => 'iPhone 15 Pro 128gb ex iBox',
                'description' => '<p>• Warna: Natural titanium</p><p>• Ex Garansi resmi indonesia SA/A</p><p>• Fungsi 100% Normal (siap pake)</p><p>• Fullset box acc original</p><p>• Bonus case mayan bagusss</p>',
                'price' => 2350000,
                'harga_pasar' => 5300000,
                'stock' => 1,
            ],
            [
                'category_id' => $handphoneCategory->id,
                'subcategory_id' => $samsungSub->id,
                'title' => 'Samsung S25 Ultra 256gb',
                'description' => '<p>• Warna: Putih</p><p>• Ex Garansi resmi indonesia SEIN</p><p>• Fungsi normal 100% (siap pakai)</p><p>• Fullset dus acc Frss original</p><p>• Bonus case ori samsung</p>',
                'price' => 2700000,
                'harga_pasar' => 7500000,
                'stock' => 1,
            ],
            [
                'category_id' => $handphoneCategory->id,
                'subcategory_id' => $samsungSub->id,
                'title' => 'Samsung S25 Ultra 1Tera',
                'description' => '<p>• Warna: Jade Green</p><p>• Ex Garansi resmi indonesia SEIN</p><p>• Fungsi normal 100% (siap pakai)</p><p>• Fullset dus acc original</p><p>• Bonus case ori samsung</p>',
                'price' => 3500000,
                'harga_pasar' => 8500000,
                'stock' => 1,
            ],
            [
                'category_id' => $ipadCategory->id,
                'subcategory_id' => null,
                'title' => 'Samsung Tab S9 Ultra 12/256gb ex Sein',
                'description' => '<p>• Warna: Gray | WiFi Only</p><p>• Ex Garansi resmi indonesia SEIN</p><p>• Fungsi normal 100% (Siap pakai)</p><p>• Fullset dus acc Original</p><p>• Bonus case mayan baguss</p>',
                'price' => 1100000,
                'harga_pasar' => 2700000,
                'stock' => 1,
            ],
            [
                'category_id' => $ipadCategory->id,
                'subcategory_id' => null,
                'title' => 'iPad Pro M5 11inch 256gb iBox WiFi Cellular',
                'description' => '<p>• Warna: Space Black</p><p>• Garansi resmi indonesia PA/A</p><p>• Fungsi 100% Normal (siap pake)</p><p>• Fullset Box Acc Fress original</p>',
                'price' => 1500000,
                'harga_pasar' => 2899000,
                'stock' => 1,
            ],
            [
                'category_id' => $ipadCategory->id,
                'subcategory_id' => null,
                'title' => 'iPad Mini 5 256gb ex iBox WiFi cell',
                'description' => '<p>Jarang dipakee poll.. Bh 93%</p><p>• Warna: Rose Gold</p><p>• Ex Garansi resmi indonesia PA/A</p><p>• Fungsi 100% Normal (siap pake)</p><p>• Fullset Box original</p><p>• Gantinya Charger, Pencil Ori apple</p>',
                'price' => 700000,
                'harga_pasar' => 1100000,
                'stock' => 1,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }

        // Testimonials
        $testimonials = [
            ['name' => 'Ahmad Hasan', 'city' => 'Jakarta', 'content' => 'Saya sangat puas dengan platform lelang ini. Proses penawarannya sangat mudah dan transparan. Saya berhasil mendapatkan barang yang saya inginkan dengan harga yang sangat wajar. Sangat direkomendasikan!', 'sort_order' => 1],
            ['name' => 'Rina Astama', 'city' => 'Surabaya', 'content' => 'Membeli melalui lelang di sini adalah keputusan terbaik yang pernah saya buat. Prosesnya mudah, cepat, dan aman. Saya telah merekomendasikan platform ini kepada semua keluarga dan teman saya.', 'sort_order' => 2],
            ['name' => 'Muhammad Azis', 'city' => 'Bandung', 'content' => 'Layanan pelanggan platform lelang ini luar biasa. Setiap pertanyaan saya dijawab dengan cepat dan profesional. Barang-barang yang ditawarkan berkualitas tinggi dan harganya sangat kompetitif.', 'sort_order' => 3],
            ['name' => 'Nur Azizah', 'city' => 'Medan', 'content' => 'Sebagai ibu rumah tangga, saya menggunakan platform lelang ini untuk menemukan harga terbaik untuk barang-barang rumah tangga. Sistem pelacakan penawaran online memudahkan saya untuk memantau setiap penawaran.', 'sort_order' => 4],
            ['name' => 'Farah Handayani', 'city' => 'Yogyakarta', 'content' => 'Saya telah menjadi penawar setia selama 2 tahun. Setiap kali saya memenangkan lelang, saya merasa sangat gembira. Tim platform selalu membantu dan memberikan saran yang bermanfaat.', 'sort_order' => 5],
            ['name' => 'Rizal Abdullah', 'city' => 'Semarang', 'content' => 'Transaksi lelang di sini sangat transparan dan aman. Dokumentasi yang diberikan lengkap dan dapat diandalkan. Saya sangat senang memilih platform ini sebagai tempat untuk membeli barang.', 'sort_order' => 6],
        ];

        foreach ($testimonials as $testi) {
            Testimonial::create($testi);
        }

        // Blogs
        Blog::create([
            'title' => 'Memahami Lelang dan Gadai: Pilihan Keuangan yang Cerdas atau Risiko Tersembunyi?',
            'slug' => 'memahami-lelang-dan-gadai',
            'content' => '<h2>Apa itu Gadai?</h2><p>Gadai merujuk pada proses di mana seseorang menyerahkan barang berharga seperti emas, perhiasan, atau barang elektronik ke lembaga gadai sebagai jaminan untuk mendapatkan pinjaman uang.</p><h2>Apa itu Lelang?</h2><p>Lelang terjadi ketika barang—biasanya hipotek yang belum ditebus atau aset yang disita—dijual kepada publik melalui proses penawaran. Pembeli bersaing untuk mendapatkan harga terbaik.</p><h2>Kesimpulan</h2><p>Lelang dan gadai dapat menjadi alat keuangan yang bermanfaat jika digunakan dengan bijak. Namun, tanpa pengetahuan yang cukup, hal itu juga dapat menyebabkan kerugian.</p>',
            'published_at' => now(),
        ]);

        Blog::create([
            'title' => 'Emas Dunia: Logam Berharga yang Menguasai Sejarah dan Ekonomi',
            'slug' => 'emas-dunia-logam-berharga',
            'content' => '<h2>Sejarah Emas di Dunia</h2><p>Penggunaan emas bermula sejak lebih 5,000 tahun lalu. Tamadun kuno seperti Mesir Purba menggunakan emas untuk membuat perhiasan, topeng raja, dan artifak keagamaan.</p><h2>Emas dalam Ekonomi Global</h2><p>Emas sering dianggap sebagai "aset selamat" dalam dunia kewangan. Ketika ekonomi global tidak stabil, ramai pelabur akan membeli emas kerana nilainya cenderung kekal atau meningkat.</p>',
            'published_at' => now(),
        ]);

        Blog::create([
            'title' => 'Emas: Logam Berharga yang Bernilai Tinggi',
            'slug' => 'emas-logam-berharga',
            'content' => '<h2>Pengenalan</h2><p>Emas ialah sejenis logam berharga yang sangat bernilai sejak zaman dahulu lagi. Ia dikenali kerana warnanya yang kuning berkilau, tahan karat, dan sukar rosak.</p><h2>Emas Sebagai Pelaburan</h2><p>Emas sering dianggap sebagai aset selamat kerana nilainya cenderung stabil dalam jangka masa panjang.</p>',
            'published_at' => now(),
        ]);
    }
}
