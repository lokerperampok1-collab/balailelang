<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('order_code')->unique();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone');
            $table->text('shipping_address');
            $table->string('province')->nullable();
            $table->string('city')->nullable();
            $table->string('district')->nullable();
            $table->string('village')->nullable();
            $table->string('postal_code')->nullable();
            $table->decimal('total_price', 15, 2);
            $table->string('payment_method')->default('whatsapp_transfer');
            $table->string('status')->default('pending'); // pending, paid, shipped, completed, cancelled
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
