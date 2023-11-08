import { useNavigate, useParams } from "react-router-dom";
import { useBookMark } from "../../Context/BookMarksListProvider";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

function SingleBookMark() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBookMark, currentBookMarks, isLoading } = useBookMark();

  useEffect(() => {
    getBookMark(id);
  }, [id]);

  if (isLoading || !currentBookMarks) return <Loader />;

  return (
    <div>
      &nbsp;
      <p>Full brief : </p>
      <div className="bookmarkItems">
        <ReactCountryFlag svg countryCode={currentBookMarks.countryCode} />
        <h2>{currentBookMarks.cityName}</h2>
        <p>{currentBookMarks.country}</p>
        <p>Lat : {currentBookMarks.latitude}</p>
        <p>Lng : {currentBookMarks.longitude}</p>
        <p>{currentBookMarks.host_location}</p>
        {/* <img
          src={currentBookMarks.picture_url.url}
          alt={currentBookMarks.name}
          className="pic"
        /> */}
      </div>
      <button onClick={() => navigate(-1)} className="btn btn--back">
        &larr; Back
      </button>
    </div>
  );
}

export default SingleBookMark;
