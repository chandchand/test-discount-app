// pages/index.js
import React, { useState } from "react";
import axios from "axios";

const IndexPage = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [voucher, setVoucher] = useState(null);
  const [purchasedItems, setPurchasedItems] = useState([]);

  const handlePurchase = (productName, price) => {
    const newTotalAmount = totalAmount + price;
    setTotalAmount(newTotalAmount);

    // Update purchased items list
    const newPurchasedItems = [...purchasedItems, { productName, price }];
    setPurchasedItems(newPurchasedItems);
  };

  const handleConfirmPurchase = async () => {
    try {
      const response = await axios.post("/api/discount/generateVoucher", {
        totalAmount,
      });

      // Akses data voucher dari properti yang sesuai di dalam respons
      const voucherData = response.data.data.voucher;
      setVoucher(voucherData);
    } catch (error) {
      console.error("Error generating voucher:", error);
    }
  };

  return (
    <div>
      <h1>Toko XYZ</h1>

      <p>Total Harga: {totalAmount} rupiah</p>

      {purchasedItems.length > 0 && (
        <div>
          <h2>Daftar Barang yang Dibeli</h2>
          <ul>
            {purchasedItems.map((item, index) => (
              <li key={index}>
                {item.productName}: {item.price} rupiah
              </li>
            ))}
          </ul>

          {voucher ? (
            <div>
              <h2>Informasi Voucher</h2>
              <p>Kode Voucher: {voucher.code}</p>
              <p>Nilai Voucher: {voucher.value} rupiah</p>
              <p>Expired: {voucher.expirationDate}</p>
            </div>
          ) : (
            <button onClick={handleConfirmPurchase}>
              Konfirmasi Pembelian
            </button>
          )}
        </div>
      )}

      {/* Tombol pembelian produk */}
      <button onClick={() => handlePurchase("Product A", 1000000)}>
        Beli Product A
      </button>
      <button onClick={() => handlePurchase("Product B", 800000)}>
        Beli Product B
      </button>
    </div>
  );
};

export default IndexPage;
