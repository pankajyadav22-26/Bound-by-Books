import { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const hasPlacedOrder = useRef(false);

  useEffect(() => {
    const placeOrder = async () => {
      if (hasPlacedOrder.current) return;
      hasPlacedOrder.current = true;

      const cart = JSON.parse(sessionStorage.getItem("cart"));
      const headers = {
        id: sessionStorage.getItem("id"),
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      };

      try {
        const res = await axios.post(
          "http://localhost:1000/api/v1/place-order",
          { order: cart, paymentMode: "Paid" },
          { headers }
        );

        alert(res.data.message);
        sessionStorage.removeItem("cart");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("token");

        navigate("/profile/orderHistory");
      } catch (error) {
        console.error("Error placing order:", error);
      }
    };

    placeOrder();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-zinc-900 px-4">
      <div className="text-center bg-zinc-800 p-10 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-green-500 text-4xl font-bold mb-4">
          Payment Successful!
        </h1>
        <p className="text-zinc-300 text-lg mb-6">
          Placing your order... please wait.
        </p>
        <div className="w-16 h-16 mx-auto border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default OrderSuccess;
