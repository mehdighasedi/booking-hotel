import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookMark } from "../../Context/BookMarksListProvider";

function BookMarkLayout() {
  const { bookmarks } = useBookMark();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocations={bookmarks} />
    </div>
  );
}

export default BookMarkLayout;
