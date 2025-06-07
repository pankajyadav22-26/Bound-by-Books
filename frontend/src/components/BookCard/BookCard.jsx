import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/remove-book-from-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col justify-between h-[350px] w-full">
      <Link to={`/view-book-details/${data._id}`} className="flex-1 flex flex-col">
        <div className="bg-zinc-900 rounded flex items-center justify-center">
          <img src={data.url} alt="/" className="h-[25vh] object-contain" />
        </div>
        <h2 className="mt-4 text-xl text-white font-semibold truncate">{data.title}</h2>
        <p className="mt-1 text-zinc-400 font-semibold truncate">by {data.author}</p>
        <p className="mt-1 text-zinc-200 font-semibold text-xl">₹ {data.price}</p>
      </Link>

      {favourite && (
        <button
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
          onClick={handleRemoveBook}
        >
          Remove from favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;