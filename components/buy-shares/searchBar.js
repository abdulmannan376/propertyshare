import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useMap } from "react-leaflet";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  //   const map = useMap();

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 3) {
      // Limit requests for performance
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${e.target.value}`
      );
      const data = await response.json();
      setResults(data);
    }
  };

  const handleSelect = (lat, lon, name) => {
    setQuery(name);
    const nameList = name.split(",");
    setResults([]);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className="w-full relative"
    >
      <form className="flex flex-row bg-[#D9D9D9] bg-opacity-[76%] border border-[#F5F5F5] mt-6 rounded-md pl-2">
        <input
          type="text"
          name="searchbar"
          value={query}
          onChange={handleSearch}
          placeholder="City, Address, ZIP..."
          className="w-full bg-transparent text-xl font-raleway placeholder:text-[#676767] placeholder:opacity-80 text-[#676767] m-4 outline-none"
        />
        <button type="submit">
          <IoIosSearch className="bg-[#CDC2AE] p-2 text-6xl text-[#FFFDF4] border-r border-[#F5F5F5] rounded-r-md rounded-br-md" />
        </button>
      </form>
      <div className="absolute w-full z-[5000]">
        {results.length > 0 && (
          <ul className="mx-5 bg-white p-3">
            {results.map((item, index) => (
              <li
                key={index}
                className="my-1 cursor-pointer"
                onClick={() =>
                  handleSelect(item.lat, item.lon, item.display_name)
                }
              >
                {item.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
