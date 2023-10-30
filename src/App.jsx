import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./Components/Header/Header";
import LocationList from "./Components/LocationList/LocationList";
import useTitle from "./hooks/useTitle";
import { Route, Routes } from "react-router-dom";
function App() {
  useTitle("Home Page");
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
      </Routes>
    </div>
  );
}

export default App;
