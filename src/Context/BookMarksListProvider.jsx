import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookMarkContext = createContext();
const BASE_URL = "http://localhost:5000";

const initialState = {
  isLoading: false,
  bookmarks: [],
  currentBookMarks: null,
  error: null,
};

function bookMarkReducer(state, { type, payload }) {
  switch (type) {
    case "loading":
      return { ...state, isLoading: true };
    case "bookmarks/loaded":
      return { ...state, isLoading: false, bookmarks: payload };
    case "bookmark/loaded":
      return {
        ...state,
        isLoading: false,
        currentBookMarks: payload,
      };
    case "bookmark/created":
      return {
        ...state,
        bookmarks: [...state.bookmarks, payload],
        isLoading: false,
        currentBookMarks: payload,
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== payload),
        currentBookMarks: null,
      };
    case "rejected":
      return { ...state, isLoading: false, error: payload };
    default:
      throw new Error("Unknown Action Called");
  }
}

function BookMarkListProvider({ children }) {
  const [{ isLoading, bookmarks, currentBookMarks }, dispatch] = useReducer(
    bookMarkReducer,
    initialState
  );
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentBookMarks, setCurrentBookMarks] = useState(null);
  // const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    async function fetchBookmarks() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks/`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error?.message);
        dispatch({ type: "rejected", payload: error });
      }
    }
    fetchBookmarks();
  }, []);

  async function getBookMark(id) {
    if (Number(id) === currentBookMarks?.id) return;
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error?.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function createBookMark(newBookMark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookMark);
      dispatch({ type: "bookmark/loaded", payload: data });
      dispatch({
        type: "bookmark/created",
        payload: data,
      });
      toast.success("Bookmark Added Succesfully");
    } catch (error) {
      toast.error(error?.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function deleteBookMark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({
        type: "bookmark/deleted",
        payload: id,
      });
      toast.success("Bookmark Successfully Deleted");
    } catch (error) {
      toast.error(error?.message);
      dispatch({ type: "rejected ", payload: error.message });
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
