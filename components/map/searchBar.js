import React, { useState } from "react";
import { useMap } from "react-leaflet";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const map = useMap();

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

  const handleSelect = (lat, lon) => {
    map.flyTo([lat, lon], 15); // Adjust zoom level as necessary
    setResults([]);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      style={{ position: "absolute", top: 100, left: 64, zIndex: 1000 }}
    >
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for places"
        className="w-[40rem] bg-white border border-[#116A7B] text-2xl px-5 py-3 rounded-full"
      />
      {results.length > 0 && (
        <ul className="mx-5 bg-white p-3">
          {results.map((item, index) => (
            <li
              key={index}
              className="my-1"
              onClick={() => handleSelect(item.lat, item.lon)}
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
