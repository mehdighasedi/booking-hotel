import { Link } from "react-router-dom";
import { useBookMark } from "../../Context/BookMarksListProvider";
import ReactCountryFlag from "react-country-flag";
import { HiTrash } from "react-icons/hi";
import Loader from "../Loader/Loader";

function BookMark() {
  const { isLoading, bookmarks, currentBookMarks, deleteBookMark } =
    useBookMark();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookMark(id);
  };

  if (!bookmarks.length)
    return <p className="err">There is No Bookmarked Place</p>;

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
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp;<strong>{item.cityName}</strong> &nbsp;{" "}
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BookMark;
