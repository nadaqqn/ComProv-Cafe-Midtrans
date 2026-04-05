// pages/api/payment.js
import midtransClient from "midtrans-client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { orderId, grossAmount, customer, cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart items tidak boleh kosong" });
    }

    // Buat Snap instance
    let snap = new midtransClient.Snap({
      isProduction: false, // true kalau live
      serverKey: process.env.MIDTRANS_SERVER_KEY, // gunakan server key Midtrans
    });

    // Parameter transaksi
    let parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      credit_card: { secure: true },
      customer_details: {
        first_name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
      item_details: cartItems.map(item => ({
        id: item.id,
        price: item.price,
        quantity: item.qty,
        name: item.name,
      })),
    };

    // Buat transaksi Snap
    const transaction = await snap.createTransaction(parameter);

    // Kembalikan token Snap ke frontend
    res.status(200).json({ token: transaction.token });
  } catch (err) {
    console.error("Midtrans error:", err);
    res.status(500).json({
      error: "Failed to create transaction token",
      details: err.message || err,
    });
  }
}
