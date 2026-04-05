"use client";

import { formatRupiah } from "@/utils/formatRupiah";
import CustomerDetailModal from "./CustomerDetailModal";
import { loadMidtransScript } from "@/utils/loadMidtrans";

export default function CartPanel({
  open,
  onClose,
  cartItems,
  incrementQty,
  decrementQty,
  removeItem,

  // tambahan untuk modal customer
  customer,
  openCustomerModal,
  customerModalOpen,
  setCustomerModalOpen,
  setCustomer,
}) {
  const totalPrice =
    cartItems?.reduce((acc, item) => acc + item.qty * item.price, 0) || 0;

  // =========================================
  // Handle Proceed to Order + Snap Integration
  // =========================================
  const handleProceedToOrder = async () => {
    if (!customer.name || !customer.email || !customer.phone) {
      alert("Semua field customer harus diisi!");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      alert("Cart kosong, tambahkan item dulu!");
      return;
    }

    try {
      // 1. Generate orderId & grossAmount
      const orderId = `SERUAS-ORDER-${Date.now()}`;
      const grossAmount = cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );

      // 2. Hit backend untuk dapat Snap token
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, grossAmount, customer, cartItems }), // <-- kirim cartItems juga
      });

      const data = await res.json();

      if (!data.token) {
        alert("Gagal membuat Snap token. Cek console backend.");
        console.error("Response backend:", data);
        return;
      }

      const snapToken = data.token;

      // 3. Load Snap.js
      await loadMidtransScript(
        process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
        false
      );

      // 4. Trigger Snap popup
      window.snap.pay(snapToken, {
        onSuccess: function (result) {
          console.log("Payment Success:", result);
          alert("Pembayaran berhasil!");
          onClose(); // tutup cart panel
        },
        onPending: function (result) {
          console.log("Payment Pending:", result);
          alert("Pembayaran pending. Silakan selesaikan di halaman Midtrans.");
        },
        onError: function (result) {
          console.log("Payment Error:", result);
          alert("Terjadi kesalahan pembayaran.");
        },
        onClose: function () {
          console.log("Payment popup closed");
          alert(
            "Anda menutup pembayaran tanpa menyelesaikan transaksi."
          );
        },
      });
    } catch (err) {
      console.error("Gagal memproses pembayaran:", err);
      alert("Gagal memproses pembayaran. Coba lagi.");
    }
  };

  return (
    <>
      {/* Background overlay */}
      <div
        className={`fixed inset-0 bg-transparent transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Panel sliding */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-[#f1e3d4] shadow-xl transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-[#f1e3d4]">
          <h2 className="text-xl font-bold text-[#8b5e53]">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-[#8b5e53] font-bold text-2xl"
          >
            ×
          </button>
        </div>

        {/* CUSTOMER CARD */}
        <div className="p-4">
          <div className="bg-white p-3 rounded-lg shadow flex justify-between items-center">
            <div>
              <div className="font-semibold text-[#8b5e53]">Customer</div>
              {customer?.name ? (
                <div className="text-sm text-gray-600">
                  {customer.name} <br />
                  {customer.email} <br />
                  {customer.phone}
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  Belum ada data customer
                </div>
              )}
            </div>

            <button
              onClick={openCustomerModal}
              className="text-[#8b5e53] underline text-sm"
            >
              Detail
            </button>
          </div>
        </div>

        {/* CART LIST */}
        <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100%-150px)]">
          {cartItems?.length > 0 ? (
            cartItems.map((item) => {
              const subtotal = item.qty * item.price;
              return (
                <div
                  key={item.id}
                  className="flex items-center bg-white rounded-lg p-3 gap-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-[#8b5e53]">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {formatRupiah(item.price)} × {item.qty} ={" "}
                      <span className="font-semibold text-[#8b5e53]">
                        {formatRupiah(subtotal)}
                      </span>
                    </div>

                    {/* Qty control */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="w-7 h-7 flex items-center justify-center bg-[#d7c3b8] text-[#8b5e53] rounded-full"
                        onClick={() => decrementQty(item.id)}
                      >
                        –
                      </button>
                      <span className="font-semibold text-[#8b5e53]">
                        {item.qty}
                      </span>
                      <button
                        className="w-7 h-7 flex items-center justify-center bg-[#d7c3b8] text-[#8b5e53] rounded-full"
                        onClick={() => incrementQty(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 text-lg"
                  >
                    ×
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 mt-10">Cart is empty</p>
          )}
        </div>

        {/* TOTAL & BUTTON */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t bg-[#f1e3d4]">
          <div className="flex justify-between font-bold text-[#8b5e53] mb-2 text-lg">
            <span>Total:</span>
            <span>{formatRupiah(totalPrice)}</span>
          </div>

          <button
            disabled={!customer?.name || !customer?.email || !customer?.phone}
            className={`w-full py-3 rounded-lg font-bold transition
              ${
                customer?.name && customer?.email && customer?.phone
                  ? "bg-[#8b5e53] text-white hover:bg-[#563b35]"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }
            `}
            onClick={handleProceedToOrder}
          >
            Proceed to order
          </button>
        </div>
      </div>

      {/* CUSTOMER MODAL */}
      <CustomerDetailModal
        open={customerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
        customer={customer}
        setCustomer={setCustomer}
      />
    </>
  );
}
