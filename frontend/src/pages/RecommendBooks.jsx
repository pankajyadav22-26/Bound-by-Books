import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";

const RecommendBooks = () => {
  const id = localStorage.getItem("id");
  const [books, setBooks] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchRecs = async () => {
      try {
        const recResp = await axios.get(`https://bound-recommendation.onrender.com/recommend/${id}`);
        const recIds = recResp.data.recommendations || [];

        if (recIds.length === 0) {
          setBooks([]); 
          return;
        }

        const bookPromises = recIds.map((bookId) =>
          axios.get(`https://bookstore-znt4.onrender.com/api/v1/get-book-by-id/${bookId}`)
        );

        const bookResponses = await Promise.all(bookPromises);
        const recBooks = bookResponses.map((resp) => resp.data.data);

        setBooks(recBooks);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setBooks([]);
      }
    };

    fetchRecs();
  }, [id]);

  return (
    <div className="bg-zinc-900 h-auto px-12 py-8">
      <h4 className="text-3xl text-yellow-100">Recommended For You</h4>

      {!books && (
        <div className="w-full h-screen flex items-center justify-center my-8">
          <Loader />
        </div>
      )}

      {books && books.length === 0 && (
        <div className="text-gray-400 mt-6">No recommendations yet 🤷‍♂️</div>
      )}

      <div className="my-4 grid sm:grid-cols-1 md:grid-cols-4 gap-8">
        {books &&
          books.map((item, i) => (
            <div key={i}>
              <BookCard data={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecommendBooks;