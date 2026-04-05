"use client";

import { useState } from "react";
import Header from "./Header";
import CartPanel from "./CartPanel";
import MenuCarousel from "./MenuCarousel";

export default function HeaderWithCart() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [customerModalOpen, setCustomerModalOpen] = useState(false);

  


  // Tambah quantity
  const incrementQty = id =>
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    );

  const decrementQty = id =>
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
      )
    );

  const removeItem = id => setCartItems(prev => prev.filter(item => item.id !== id));

  // Fungsi Add to Cart
  const addToCart = (item, qty) => {
    setCartItems(prev => {
      const exist = prev.find(ci => ci.id === item.id);
      if (exist) {
        // kalau sudah ada, tambahkan qty
        return prev.map(ci =>
          ci.id === item.id ? { ...ci, qty: ci.qty + qty } : ci
        );
      } else {
        // kalau belum ada, tambahkan baru
        return [...prev, { ...item, qty }];
      }
    });
    setCartOpen(true); // otomatis buka cart
  };

  return (
    <>
      <Header onCartClick={() => setCartOpen(true)} />

      <MenuCarousel
        items={[
          { id: 1, name: "Hot Cappuccino", price: 25000, category: "minuman", image: "/menu/coffee.png" },
          { id: 2, name: "Iced Latte", price: 28000, category: "minuman", image: "/menu/iced-coffee.png" },
          { id: 3, name: "Croissant", price: 20000, category: "kue", image: "/menu/croissantbasket.png" },
          { id: 4, name: "Sandwich", price: 35000, category: "makanan", image: "/menu/sandwich.png" },
        ]}
        addToCart={addToCart} // kirim fungsi ke carousel
      />

      <CartPanel
  open={cartOpen}
  onClose={() => setCartOpen(false)}
  cartItems={cartItems}
  incrementQty={incrementQty}
  decrementQty={decrementQty}
  removeItem={removeItem}

  customer={customer}
  openCustomerModal={() => setCustomerModalOpen(true)}
  customerModalOpen={customerModalOpen}
  setCustomerModalOpen={setCustomerModalOpen}
  setCustomer={setCustomer}
/>


    </>
  );
}
