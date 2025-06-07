import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookstore-znt4.onrender.com/api/v1/get-favourite-books",
        { headers }
      );
      setFavouriteBooks(response.data.data);
    };
    fetch();
  }, [FavouriteBooks]);
  return (
    <>
      {FavouriteBooks && FavouriteBooks.length === 0 && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-5xl font-semibold text-zinc-500 flex flex-col items-center justify-center">
            <h1>No Favourite Book</h1>
            <img src="/noFavourite.png" alt="/" />
          </div>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {FavouriteBooks &&
          FavouriteBooks.map((item, i) => (
            <div key={i}>
              <BookCard data={item} favourite={true} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favourites;
