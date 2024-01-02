import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [voucher, setVoucher] = useState(null);

  const generateVoucher = async () => {
    try {
      const response = await axios.post("/api/discount/generateVoucher");
      setVoucher(response.data.data.voucher);
    } catch (error) {
      console.error("Error generating voucher:", error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Discount App</h1>
      <button onClick={generateVoucher}>Generate Voucher</button>

      {voucher && (
        <div>
          <h2>Your Voucher:</h2>
          <p>Code: {voucher.code}</p>
          <p>Value: {voucher.value}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
