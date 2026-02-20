import { useState } from "react";
import Homepage from "./pages/Homepage";
const api_key = import.meta.env.VITE_API_KEY;

const App = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const searchBook = async () => {
    if(!query.trim()) return;
    setError("");
    setBooks([]);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12&key=${api_key}`,
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError('Something went wrong')
    }
  };
  return (
    <>
      <Homepage />
    </>
  );
};

export default App;
