import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";

const AllBooks = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookstore-znt4.onrender.com/api/v1/get-all-books"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 h-auto px-12 py-8">
      <h4 className="text-3xl text-yellow-100">All Books</h4>
      {!Data && (
        <div className="w-full h-screen flex items-center justify-center my-8">
          <Loader />{" "}
        </div>
      )}
      <div className="my-4 grid sm:grid-cols-1 md:grid-cols-4 gap-8">
        {Data &&
          Data.map((item, i) => (
            <div key={i}>
              <BookCard data={item} />{" "}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
