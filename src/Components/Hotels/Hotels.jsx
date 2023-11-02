import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../../Context/HotelsProvider";

function Hotels() {
  const { isLoading, hotels, currentHotel } = useHotels();
  if (isLoading) return <Loader />;
  return (
    <div className="searchList">
      <h2>Search Result ({hotels.length})</h2>
      {hotels.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div className="searchItem">
              <img src={item.picture_url.url} alt={item.name} />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  €&nbsp;{item.price}&nbsp;
                  <span>Night</span>
                </p>
                <p className="select">
                  <span
                    className={`preSelected ${
                      item.id === currentHotel?.id ? "activate" : ""
                    }`}
                  >
                    Previously Selected
                  </span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;
