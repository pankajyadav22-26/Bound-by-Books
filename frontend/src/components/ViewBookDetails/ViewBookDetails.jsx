import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaLanguage, FaHeart, FaShoppingCart, FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://bookstore-znt4.onrender.com/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!data) {
    return <Loader />;
  }

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    try {
      const response = await axios.put(
        "https://bookstore-znt4.onrender.com/api/v1/add-book-to-favourite",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding to favourites:", error);
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.put(
        "https://bookstore-znt4.onrender.com/api/v1/add-to-cart",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const deleteBook = async () => {
    try {
      const response = await axios.delete(
        "https://bookstore-znt4.onrender.com/api/v1/delete-book",
        { headers }
      );
      alert(response.data.message);
      navigate("/all-books");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8">
      <div className="bg-zinc-800 rounded p-4 h-[70vh] lg:h-[88vh] w-full lg:w-3/6 flex flex-col items-center justify-center gap-8">
        <img
          src={data.url}
          alt="Book cover"
          className="h-[50vh] lg:h-[70vh] rounded"
        />
        {isLoggedIn && role === "user" && (
          <div className="flex md:flex-row gap-4">
            <button
              className="bg-white rounded-full text-3xl p-2 text-red-500"
              onClick={handleFavourite}
            >
              <FaHeart />
            </button>
            <button
              className="bg-white rounded-full text-3xl p-2 text-blue-500"
              onClick={handleCart}
            >
              <FaShoppingCart />
            </button>
          </div>
        )}
        {isLoggedIn && role === "admin" && (
          <div className="flex md:flex-row gap-4">
            <Link
              to={`/updateBook/${id}`}
              className="bg-white rounded-full text-3xl p-2"
            >
              <FaRegEdit />
            </Link>
            <button
              className="bg-white rounded-full text-3xl p-2 text-red-500"
              onClick={deleteBook}
            >
              <MdDeleteOutline />
            </button>
          </div>
        )}
      </div>
      <div className="p-4 w-full lg:w-3/6">
        <h1 className="text-4xl text-zinc-300 font-semibold">{data.title}</h1>
        <p className="text-zinc-400 mt-1">by {data.author}</p>
        <p className="text-zinc-500 mt-4 text-xl">{data.description}</p>
        <p className="flex mt-4 items-center text-zinc-400">
          <FaLanguage className="me-3" />
          {data.language}
        </p>
        <p className="mt-4 text-zinc-100 text-3xl font-semibold">
          Price: &#8377; {data.price}
        </p>
      </div>
    </div>
  );
};

export default ViewBookDetails;