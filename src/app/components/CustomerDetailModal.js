"use client";

import { useState } from "react";

export default function CustomerDetailModal({ open, onClose, customer, setCustomer }) {
  if (!open) return null;

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const updateField = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));

    // Reset error saat user mengetik ulang
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    let newErrors = {};

    // Validasi Nama
    if (!customer.name.trim()) {
      newErrors.name = "Nama wajib diisi";
    }

    // Validasi Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customer.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!emailPattern.test(customer.email)) {
      newErrors.email = "Format email tidak valid";
    }

    // Validasi Nomor Telepon
    const phonePattern = /^[0-9]{9,15}$/; // angka saja, dan panjang 9-15 digit
    if (!customer.phone.trim()) {
      newErrors.phone = "Nomor telepon wajib diisi";
    } else if (!phonePattern.test(customer.phone)) {
      newErrors.phone = "Nomor telepon tidak valid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[999]">
      <div className="bg-[#f1e3d4] w-96 rounded-xl p-6 shadow-xl relative">
        <h2 className="text-xl font-bold text-[#8b5e53] mb-4">Customer Details</h2>

        <div className="flex flex-col gap-4">

          {/* Nama */}
          <div>
            <input
              className={`border p-2 rounded w-full text-[#8b5e53] ${
                errors.name ? "border-red-500 placeholder-red-500" : ""
              }`}
              placeholder={errors.name || "Nama"}
              value={customer.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <input
              className={`border p-2 rounded w-full text-[#8b5e53] ${
                errors.email ? "border-red-500 placeholder-red-500" : ""
              }`}
              placeholder={errors.email || "Anda@contoh.com"}
              value={customer.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>

          {/* Nomor Telepon */}
          <div>
            <input
              className={`border p-2 rounded w-full text-[rgb(139,94,83)] ${
                errors.phone ? "border-red-500 placeholder-red-500" : ""
              }`}
              placeholder={errors.phone || "08xxxxxxxxxx"}
              value={customer.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>

        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">
            Batal
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-[#8b5e53] text-white font-bold"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
