import { useEffect, useState } from "react";
import useUrlPosition from "../../hooks/useUrlPosition";
import axios from "axios";
import Loader from "../Loader/Loader";
import CatchError from "../CatchError/CatchError";
import ReactCountryFlag from "react-country-flag";

function AddNewBookMark() {
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [continent, setContinent] = useState("");
  const [GeoCodingError, setGeoCodingError] = useState(null);
  const [countryCode, setCountryCode] = useState("");

  const BASE_GEOCODING_URL =
    "https://api.bigdatacloud.net/data/reverse-geocode-client";

  //   function getFlagEmoji(countryCode) {
  //     const codePoints = countryCode
  //       .toUpperCase()
  //       .split("")
  //       .map((char) => 127397 + char.charCodeAt());
  //     return String.fromCodePoint(...codePoints);
  //   }
  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchLocationData() {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );

        if (!data.countryCode)
          throw new Error(
            "This Location is Invalid , Please Select SomeWhere Else"
          );

        setCityName(data.city || data.locality || "");
        setCountryName(data.countryName);
        setContinent(data.continent);
        setCountryCode(data.countryCode);
        setIsLoadingGeoCoding(false);
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  if (isLoadingGeoCoding) return <Loader />;
  if (GeoCodingError) return <p className="err">{GeoCodingError}</p>;

  return (
    <div>
      <h2>Add A New BookMark</h2>
      <form className="form">
        &nbsp;
        <div className="formControl">
          <label htmlFor="">City Name:</label>
          <input
            type="text"
            name="cityName"
            value={cityName}
            id="cityName"
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="">Country Name:</label>
          <input
            type="text"
            name="countryName"
            value={countryName}
            id="countryName"
            onChange={(e) => setCountryName(e.target.value)}
          />
          <ReactCountryFlag svg className="flag" countryCode={countryCode} />
          {/* <span className="flag">{countryCode}</span> */}
        </div>
        <div className="formControl">
          <label htmlFor="">Continent : </label>
          <input
            type="text"
            name="continentName"
            value={continent}
            id="continentName"
            onChange={(e) => setContinent(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button className="btn btn--back">&larr; Back</button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookMark;
