import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../../Context/HotelsProvider";
import { useEffect } from "react";

function SingleHotel() {
  const { id } = useParams();
  const { currentHotel, isLoadingCurrHotel, getSingleHotel } = useHotels();

  useEffect(() => {
    getSingleHotel(id);
  }, [id]);

  if (isLoadingCurrHotel || !currentHotel) return <Loader />;

  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} Reviews &bull;{" "}
          {currentHotel.smart_location}{" "}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    </div>
  );
}

export default SingleHotel;
