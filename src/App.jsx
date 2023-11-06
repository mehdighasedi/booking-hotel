import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./Components/Header/Header";
import LocationList from "./Components/LocationList/LocationList";
import useTitle from "./hooks/useTitle";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./Components/AppLayout/AppLayout";
import Hotels from "./Components/Hotels/Hotels";
import HotelsProvider from "./Context/HotelsProvider";
import SingleHotel from "./Components/SingleHotel/SingleHotel";
import BookMarkLayout from "./Components/BookMarkLayout/BookMarkLayout";
import BookMark from "./Components/BookMark/BookMark";
import BookMarkListProvider from "./Context/BookMarksListProvider";
import SingleBookMark from "./Components/SingleBookMark/SingleBookMark";
import AddNewBookMark from "./Components/AddNewBookMark/AddNewBookMark";

function App() {
  useTitle("Home Page");
  return (
    <BookMarkListProvider>
      <HotelsProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmark" element={<BookMarkLayout />}>
            <Route index element={<BookMark />} />
            <Route path=":id" element={<SingleBookMark />} />
            <Route path="add" element={<AddNewBookMark />} />
          </Route>
        </Routes>
      </HotelsProvider>
    </BookMarkListProvider>
  );
}

export default App;
