import { useState } from "react";
import { motion } from "framer-motion";
import Homepage from "./pages/Homepage";
const api_key = import.meta.env.VITE_api_key;

const App = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const searchBook = async () => {
    if (!query.trim()) return;
    setError("");
    setBooks([]);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=15&key=${api_key}`,
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      console.log(data);
      setBooks(data.items || []);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError("Something went wrong");
    }
  };
  return (
    <div className="p-8 bg-zinc-900 text-white min-h-screen  ">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Book Discovery</h1>
        <button className="border p-2 rounded-xl w-15 mx-2">Light</button>
      </div>
      <div className="flex items-center mt-10 justify-center gap-3">
        <input
          type="text"
          placeholder="Enter Book Name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border bg-transparent border-white p-4 rounded-2xl w-100 "
        />
        <button
          onClick={searchBook}
          className="p-4 bg-emerald-600 w-24 rounded-2xl cursor-pointer hover:bg-emerald-700"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {/* Books Grid  */}
      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-5 p-30  mt-2">
        {books.map((b) => {
          const info = b.volumeInfo;
          return (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={b.id}
              className="flex flex-col w-55 gap-3 mb-4"
            >
              {info.imageLinks?.thumbnail && (
                <img
                  src={info.imageLinks.thumbnail}
                  alt={info.title}
                  className="w-full h-70  object-cover rounded-lg"
                />
              )}
              <h3 className="text-sm font-semibold mt-2 mb-[-10px] line-clamp-2 w-full">
                {info.title}
              </h3>
              <p className="text-xs text-gray-400">
                {info.authors?.join(", ") || "Unknown"}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
