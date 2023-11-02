import { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const HotelsContext = createContext();
const BASE_URL = "http://localhost:5000/hotels";
function HotelsProvider({ children }) {
  const [isLoadingCurrHotel, setIsLoadingCurrHotel] = useState(false);
  const [currentHotel, setCurrentHotel] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;

  const { isLoading, data: hotels } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  async function getSingleHotel(id) {
    setIsLoadingCurrHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrHotel(false);
    } catch (error) {
      toast.error(error?.message);
      setIsLoadingCurrHotel(false);
    }
  }
  return (
    <div>
      <HotelsContext.Provider
        value={{
          isLoading,
          hotels,
          getSingleHotel,
          currentHotel,
          isLoadingCurrHotel,
        }}
      >
        {children}
      </HotelsContext.Provider>
    </div>
  );
}

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelsContext);
}
