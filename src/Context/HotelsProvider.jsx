import { createContext, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";

const HotelsContext = createContext();
function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;

  const { isLoading, data: hotels } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
  return (
    <div>
      <HotelsContext.Provider value={{ isLoading, hotels }}>
        {children}
      </HotelsContext.Provider>
    </div>
  );
}

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelsContext);
}
