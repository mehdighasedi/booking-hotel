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
import Login from "./Components/Login/Login";
import AuthProvider from "./Context/AuthProvider";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";

function App() {
  useTitle("Home Page");
  return (
    <AuthProvider>
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
            <Route
              path="/bookmark"
              element={
                <ProtectedRoutes>
                  <BookMarkLayout />
                </ProtectedRoutes>
              }
            >
              <Route index element={<BookMark />} />
              <Route path=":id" element={<SingleBookMark />} />
              <Route path="add" element={<AddNewBookMark />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </HotelsProvider>
      </BookMarkListProvider>
    </AuthProvider>
  );
}

export default App;
