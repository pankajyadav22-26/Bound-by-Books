import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-user-cart",
        { headers }
      );
      setCart(response.data.data);
    };
    fetch();
  }, []);

  const deleteItem = async (bookid) => {
    const response = await axios.put(
      `http://localhost:1000/api/v1/remove-from-cart/${bookid}`,
      {},
      { headers }
    );
    alert(response.data.message);
    setCart(Cart.filter((item) => item._id !== bookid));
  };

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = Cart.reduce((acc, item) => acc + item.price, 0);
      setTotal(total);
    }
  }, [Cart]);

  const PlaceOrder = async () => {
    try {
      const stripe = await stripePromise;

      sessionStorage.setItem("cart", JSON.stringify(Cart));
      sessionStorage.setItem("token", localStorage.getItem("token"));
      sessionStorage.setItem("id", localStorage.getItem("id"));

      const session = await axios.post(
        "http://localhost:1000/api/v1/create-checkout-session",
        { cart: Cart },
        { headers }
      );

      const result = await stripe.redirectToCheckout({
        sessionId: session.data.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.log("Stripe error", error);
    }
  };

  const handleCOD = async () => {
    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/place-order",
        { order: Cart, paymentMode: "COD" },
        { headers }
      );

      alert(res.data.message);
      sessionStorage.removeItem("cart");
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("token");

      navigate("/profile/orderHistory");
    } catch (error) {
      console.error("COD Order Error:", error);
    }
  };

  return (
    <div className="bg-zinc-900 px-12 h-screen py-8">
      {!Cart && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {Cart && Cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
              Empty Cart
            </h1>
            <img
              src="/empty-cart.png"
              alt="empty cart"
              className="lg:h-[50vh]"
            />
          </div>
        </div>
      )}
      {Cart && Cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h1>
          {Cart.map((item, i) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
              key={i}
            >
              <img
                src={item.url}
                alt="/"
                className="h-[20vh] md:h-[10vh] object-cover"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                  {item.title}
                </h1>
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {item.description.slice(0, 100)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                  {item.description.slice(0, 63)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                  {item.description.slice(0, 100)}...
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-3xl font-semibold flex">
                  ₹ {item.price}
                </h2>
                <button
                  className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                  onClick={() => deleteItem(item._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {Cart && Cart.length > 0 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <div className="p-4 bg-zinc-800 rounded">
            <h1 className="text-3xl text-zinc-200 font-semibold">
              Total Amount
            </h1>
            <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
              <h2>{Cart.length} books</h2> <h2>₹ {Total}</h2>
            </div>
            <div className="w-[100%] mt-3">
              <button
                className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-100"
                onClick={() => setShowOptions(true)}
              >
                Place your order
              </button>
            </div>
          </div>
        </div>
      )}

      {showOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
          <div className="bg-zinc-800 rounded-2xl shadow-2xl p-6 w-[90%] md:w-[28%] text-center border border-zinc-700">
            <h2 className="text-2xl font-semibold mb-5 text-zinc-200">
              Select Payment Method
            </h2>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl w-full mb-3 text-lg transition duration-200"
              onClick={handleCOD}
            >
              Cash on Delivery
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl w-full text-lg transition duration-200"
              onClick={PlaceOrder}
            >
              Make Payment
            </button>
            <button
              className="mt-5 text-sm text-zinc-400 hover:text-zinc-200 underline transition duration-150"
              onClick={() => setShowOptions(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
