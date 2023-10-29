import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useState } from "react";
import useTitle from "../../hooks/useTitle";
import { useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
function Header() {
  useTitle("Home Page");
  const opt = {
    adult: 1,
    children: 0,
    room: 1,
  };
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState(opt);

  const handleOptions = (name, operation) => {
    setOptions((prevValue) => {
      return {
        ...prevValue,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <div>
      <div className="headers">
        <div className="headerSearch">
          <div className="headerSearchItem">
            <MdLocationOn className="headerIcon locationIcon" />
            <input
              className="headerSearchInput"
              type="text"
              name="destination"
              id="destination"
              placeholder="Where Wanna Go ?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <span className="seperator"></span>
          </div>
          <div className="headerSearchItem">
            <HiCalendar className="headerIcon dateIcon" />
            <div className="dateDropDown">2023/01/30</div>
            <span className="seperator"></span>
          </div>
          <div className="headerSearchItem">
            <div
              id="optionDropDown"
              onClick={() => setOpenOptions((open) => !open)}
            >
              {options.adult} adult &bull; {options.children} children &bull;
              {options.room} room
            </div>
            {openOptions && (
              <GuestOpenList
                options={options}
                handleOptions={handleOptions}
                setOpenOptions={setOpenOptions}
              />
            )}
            <span className="seperator"></span>
          </div>
          <div className="headerSearchItem">
            <button className="headerSearchBtn">
              <HiSearch className="headerIcon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOpenList({ options, handleOptions, setOpenOptions }) {
  const optionRef = useRef();
  useOutsideClick(optionRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div className="guestOptions" ref={optionRef}>
      <OptionItem
        handleOptions={handleOptions}
        options={options}
        type="adult"
        minLimit={1}
      />
      <OptionItem
        handleOptions={handleOptions}
        options={options}
        type="children"
        minLimit={0}
      />
      <OptionItem
        handleOptions={handleOptions}
        options={options}
        type="room"
        minLimit={1}
      />
    </div>
  );
}

function OptionItem({ options, type, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
      <div className="optionCounter">
        <button
          onClick={() => handleOptions(type, "dec")}
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          onClick={() => handleOptions(type, "inc")}
          className="optionCounterBtn"
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
