import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchFavouriteBooks = async () => {
      try {
        const response = await axios.get(
          "https://bookstore-znt4.onrender.com/api/v1/get-favourite-books",
          { headers }
        );
        setFavouriteBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      }
    };
    fetchFavouriteBooks();
  }, []);

  return (
    <>
      {FavouriteBooks.length === 0 ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-5xl font-semibold text-zinc-500 flex flex-col items-center justify-center">
            <h1>No Favourite Book</h1>
            <img src="/noFavourite.png" alt="No Favourite" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {FavouriteBooks.map((item, i) => (
            <BookCard key={i} data={item} favourite={true} />
          ))}
        </div>
      )}
    </>
  );
};

export default Favourites;