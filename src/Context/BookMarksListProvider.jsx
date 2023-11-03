import { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BookMarkContext = createContext();
const BASE_URL = "http://localhost:5000";

function BookMarkListProvider({ children }) {
  const [isLoadingCurrBookMarks, setIsLoadingCurrBookMarks] = useState(false);
  const [currentBookMarks, setCurrentBookMarks] = useState(null);

  const { isLoading, data: bookmarks } = useFetch(`${BASE_URL}/bookmarks`);

  async function getBookMark(id) {
    setIsLoadingCurrBookMarks(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentBookMarks(data);
      setIsLoadingCurrBookMarks(false);
    } catch (error) {
      toast.error(error?.message);
      setIsLoadingCurrBookMarks(false);
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
          isLoadingCurrBookMarks,
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
