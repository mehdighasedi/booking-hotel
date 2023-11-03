import { Link } from "react-router-dom";
import { useBookMark } from "../../Context/BookMarksListProvider";
import ReactCountryFlag from "react-country-flag";
import Loader from "../Loader/Loader";

function BookMark() {
  const { isLoading, bookmarks, currentBookMarks } = useBookMark();

  if (isLoading) return <Loader />;

  return (
    <div>
      <h2>Bookmark List</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookMarks?.id ? "current-bookmark" : ""
                }`}
              >
                <ReactCountryFlag svg countryCode={item.countryCode} />
                &nbsp;<strong>{item.cityName}</strong> &nbsp;{" "}
                <span>{item.country.slice(0, 5)}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BookMark;
