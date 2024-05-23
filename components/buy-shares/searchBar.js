import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useMap } from "react-leaflet";
import FilterComponent from "./filterComponent";
import { useDispatch } from "react-redux";
import { updateCoordinates } from "@/app/redux/features/buyShareSlice";

const SearchBar = ({ setIsFilterUpdated }) => {
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

  const dispatch = useDispatch();
  const handleSelect = (lat, lon, name) => {
    setQuery(name);
    dispatch(updateCoordinates({ coordinates: [lon, lat] }));
    setResults([]);
  };

  const [filters, setFilters] = useState([
    {
      name: "Property Type",
      id: "propertyTypeActive",
      data: [
        { name: "Mansion", selected: false },
        { name: "Villa", selected: false },
        { name: "Apartment", selected: false },
        { name: "Suite", selected: false },
        { name: "Condo", selected: false },
        { name: "Townhouse", selected: false },
        { name: "Bungalow", selected: false },
        { name: "Cabin", selected: false },
        { name: "Studio", selected: false },
        { name: "Single family home", selected: false },
      ],
      active: false,
    },
    {
      name: "Price",
      id: "priceActive",
      dataMIN: [
        { name: "0", selected: false },
        { name: "30000", selected: false },
        { name: "60000", selected: false },
        { name: "90000", selected: false },
      ],
      dataMAX: [
        { name: "30000", selected: false },
        { name: "60000", selected: false },
        { name: "90000", selected: false },
        { name: "ANY", selected: false },
      ],
      active: false,
    },
    {
      name: "Area",
      id: "areaActive",
      dataMIN: [
        { name: "0", selected: false },
        { name: "500", selected: false },
        { name: "1000", selected: false },
        { name: "1500", selected: false },
        { name: "2000", selected: false },
        { name: "2500", selected: false },
        { name: "3000", selected: false },
      ],
      dataMAX: [
        { name: "500", selected: false },
        { name: "1000", selected: false },
        { name: "1500", selected: false },
        { name: "2000", selected: false },
        { name: "2500", selected: false },
        { name: "3000", selected: false },
        { name: "ANY", selected: false },
      ],
      active: false,
    },
    {
      name: "Beds",
      id: "bedsActive",
      data: [
        { name: "1", selected: false },
        { name: "2", selected: false },
        { name: "3", selected: false },
        { name: "4", selected: false },
        { name: "5", selected: false },
        { name: "6", selected: false },
        { name: "7", selected: false },
        { name: "8", selected: false },
        { name: "9", selected: false },
        { name: "10+", selected: false },
      ],
      active: false,
    },
  ]);

  const [filtersApplied, setFiltersApplied] = useState({
    propertyTypeCategory: 0,
    bedsCategory: 0,
  });

  const [pageMounted, setPageMounted] = useState(false);

  useEffect(() => {
    if (pageMounted) {
      setIsFilterUpdated(true);
      console.log("in filter status check useEffect");
    } else {
      setPageMounted(true);
    }
  }, [filters]);

  return (
    <>
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
      <div>
        <FilterComponent filters={filters} setFilters={setFilters} />
      </div>
    </>
  );
};

export default SearchBar;
