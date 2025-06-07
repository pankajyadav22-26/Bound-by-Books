import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-recent-books"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="mt-8 px-4 ">
      <h4 className="text-3xl text-yellow-100">Recently Added Books</h4>
      {!Data && (
        <div className="flex items-center justify-center my-8">
          <Loader />{" "}
        </div>
      )}
      <div className="my-4 grid sm:grid-cols-1 md:grid-cols-4 gap-4">
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

export default RecentlyAdded;
