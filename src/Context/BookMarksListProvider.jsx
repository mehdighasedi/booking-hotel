import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookMarkContext = createContext();
const BASE_URL = "http://localhost:5000";

function BookMarkListProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentBookMarks, setCurrentBookMarks] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    async function fetchBookmarks() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks/`);
        setBookmarks(data);
      } catch (error) {
        toast.error(error?.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBookmarks();
  }, []);

  async function getBookMark(id) {
    setIsLoading(true);
    setCurrentBookMarks(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookMarks(data);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function createBookMark(newBookMark) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookMark);
      setCurrentBookMarks(data);
      setBookmarks((prev) => [...prev, data]);
      toast.success("Bookmark Added Succesfully");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteBookMark(id) {
    setIsLoading(true);
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      setBookmarks((prev) => prev.filter((item) => item.id !== id));
      toast.success("Bookmark Successfully Deleted");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <BookMarkContext.Provider
        value={{
          isLoading,
          bookmarks,
          getBookMark,
          currentBookMarks,
          createBookMark,
          deleteBookMark,
        }}
      >
        {children}
      </BookMarkContext.Provider>
    </div>
  );
}

export default BookMarkListProvider;

export function useBookMark() {
  return useContext(BookMarkContext);
}
