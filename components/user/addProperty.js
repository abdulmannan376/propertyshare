import { updateActivePropertyManagementTab } from "@/app/redux/features/dashboardSlice";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { SiPinboard } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const MapArea = dynamic(() => import("./mapArea"), { ssr: false });
const compCities = require("countrycitystatejson");

const PropertyManagement = () => {
  const [isAddPropertyClicked, setIsAddPropertyClicked] = useState(false);

  const [myProperties, setMyProperties] = useState([]);
  const [propertyByIndex, setPropertyByIndex] = useState(null);

  const [listingStatus, setListingStatus] = useState("new");

  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [numOfShares, setNumberOfShares] = useState(1);
  const [totalPrize, setTotalPrize] = useState(0);
  const [areaSize, setAreaSize] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState("");

  const [houseNumber, setHouseNumber] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [coordinates, setCoordinates] = useState(null);

  const [formPhase, setFormPhase] = useState(1);

  const [yearBuilt, setYearBuilt] = useState("");
  const [floorCount, setFloorCount] = useState("");
  const [elevators, setElevators] = useState("");
  const [parkingSpace, setParkingSpace] = useState("");
  const [selectedNumOfBeds, setSelectedNumOfBeds] = useState("");
  const [selectedNumOfBaths, setSelectedNumOfBaths] = useState("");
  const [servantQuater, setServantQuater] = useState("");
  const [kitchens, setKitchens] = useState("");
  const [distanceFromAirport, setDistanceFromAirport] = useState("");

  const [files, setFiles] = useState([]);
  const [pinnedImage, setPinnedImage] = useState(-1);
  const [deleteImageList, setDeleteImageList] = useState([]);

  const dispatch = useDispatch();
  const activeNavBtn = useSelector(
    (state) => state.userDashboardSliceReducer.activePropertyManagementTab
  );

  const allCountries = compCities.getCountries();

  const TextArea = () => {
    const textRef = useRef();
    console.log(`${textRef.current}`);
    return (
      <textarea
        ref={textRef}
        type="text"
        name="title"
        value={title}
        required={true}
        onChange={({ target }) => setTitle(target.value)}
        style={{ height: "46px" }}
        className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 resize-none rounded-full"
      />
    );
  };

  const fetchMyProperties = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/get-properties-by-username/${userDetails.username}`
      );
      const response = await res.json();
      if (response.success) {
        setMyProperties(response.body);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    fetchMyProperties();
  }, [isAddPropertyClicked]);

  const handleClickToAdd = (e, status, index) => {
    e.preventDefault();
    if (status !== "new") {
      const property = myProperties[index];

      setListingStatus(status);
      setTitle(property.title);
      setOverview(property.detail);
      setNumberOfShares(property.totalStakes);
      setAreaSize(property.area);
      setTotalPrize(property.valueOfProperty);
      setSelectedPropertyType(property.propertyType);
      setSelectedNumOfBeds(property.beds);
      setSelectedNumOfBaths(property.baths);
      if (
        property.addressOfProperty.country &&
        property.addressOfProperty.country.length > 0
      ) {
        setHouseNumber(property.addressOfProperty.houseNumber);
        setStreetNumber(property.addressOfProperty.streetNumber);
        const country = compCities.getCountryByShort(
          property.addressOfProperty.country
        );
        country.shortName = property.addressOfProperty.country;
        setSelectedCountry(country);
        setSelectedState(property.addressOfProperty.state);
        setSelectedCity(property.addressOfProperty.city);
        setZipCode(property.addressOfProperty.zipCode);
        setFullAddress(property.addressOfProperty.addressInString);
      }
      setCoordinates({
        lat: property.location.coordinates[1],
        long: property.location.coordinates[0],
      });
      setStartDate(property.startDurationFrom.split("T")[0]);
      setIsAddPropertyClicked(true);
      setPropertyByIndex(index);
      setPinnedImage(property.pinnedImageIndex);
      console.log("length: ", Object.keys(property.amenitiesID)?.length);
      if (Object.keys(property.amenitiesID)?.length > 2) {
        const amenities = property.amenitiesID;
        setYearBuilt(amenities.mainFeatures?.inputs?.yearBuilt || "");
        setFloorCount(amenities.mainFeatures?.inputs?.floorCount || "");
        setParkingSpace(amenities.mainFeatures?.inputs?.parkingSpace || "");
        setElevators(amenities.mainFeatures?.inputs?.elevators || "");
        if (amenities.mainFeatures?.tags?.length > 0) {
          amenities.mainFeatures?.tags?.map((tag) => {
            handleAddTagsByCamelCase(0, tag);
          });
        }

        setSelectedNumOfBeds(amenities.roomsDetails?.inputs?.beds || "");
        setSelectedNumOfBaths(amenities.roomsDetails?.inputs?.baths || "");
        setServantQuater(amenities.roomsDetails?.inputs?.servantQuater || "");
        setKitchens(amenities.roomsDetails?.inputs?.kitchen || "");
        if (amenities.roomsDetails?.tags?.length > 0) {
          amenities.roomsDetails?.tags?.map((tag) => {
            handleAddTagsByCamelCase(1, tag);
          });
        }

        if (amenities.business?.tags?.length > 0) {
          amenities.business?.tags?.map((tag) => {
            handleAddTagsByCamelCase(2, tag);
          });
        }
        if (amenities.community?.tags?.length > 0) {
          amenities.community?.tags?.map((tag) => {
            handleAddTagsByCamelCase(3, tag);
          });
        }

        if (amenities.healthAndRecreational?.tags?.length > 0) {
          amenities.healthAndRecreational?.tags?.map((tag) => {
            handleAddTagsByCamelCase(4, tag);
          });
        }
        setDistanceFromAirport(
          amenities.nearbyFacilitiesAndLocations?.inputs.distanceFromAirport ||
            ""
        );
        if (amenities.nearbyFacilitiesAndLocations?.tags?.length > 0) {
          amenities.nearbyFacilitiesAndLocations?.tags?.map((tag) => {
            handleAddTagsByCamelCase(5, tag);
          });
        }
      }
    } else {
      setListingStatus("new");
      setTitle("");
      setOverview("");
      setNumberOfShares(1);
      setAreaSize(0);
      setTotalPrize(0);
      setSelectedPropertyType("");
      setSelectedNumOfBeds("");
      setSelectedNumOfBaths("");
      setHouseNumber("");
      setStreetNumber("");
      setSelectedCountry("");
      setSelectedState("");
      setSelectedCity("");
      setZipCode("");
      setFullAddress("");
      setCoordinates({});
      setStartDate(null);

      setIsAddPropertyClicked(true);
      setFormPhase(1);

      setYearBuilt("");
      setFloorCount("");
      setParkingSpace("");
      setElevators("");
      setSelectedNumOfBeds("");
      setSelectedNumOfBaths("");
      setServantQuater("");
      setKitchens("");
      setDistanceFromAirport("");
      setSelectedTags([
        { name: "mainFeatures", tagsByName: [], tags: [] },
        { name: "roomsDetail", tagsByName: [], tags: [] },
        { name: "businessAndComm", tagsByName: [], tags: [] },
        { name: "community", tagsByName: [], tags: [] },
        { name: "healthAndRecreational", tagsByName: [], tags: [] },
        { name: "nearbyFacilitiesAndLocations", tagsByName: [], tags: [] },
      ]);

      setPinnedImage(-1);
      setDeleteImageList([]);
    }
  };

  const propertyTypes = [
    "Select",
    "Mansion",
    "Villa",
    "Apartment",
    "Suite",
    "Condo",
    "Townhouse",
    "Bungalow",
    "Cabin",
    "Studio",
    "Single family home",
  ];

  const numOfBedsAndBaths = [
    "Select",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10+",
  ];

  useEffect(() => {
    const date = new Date(startDate);
    const duration = numOfShares * 14;
    const afterDuration = new Date();
    afterDuration.setDate(date.getDate() + duration);
    console.log("in useEffect: ", afterDuration.toISOString().split("T")[0]);
    setEndDate(afterDuration.toISOString().split("T")[0]);
  }, [startDate, numOfShares]);

  useEffect(() => {
    console.log("in useEffect");
    if (listingStatus !== "draft") {
      if (selectedCountry) {
        setAllStates(compCities.getStatesByShort(selectedCountry.shortName));
        setSelectedState("");
        setSelectedCity("");
      }
    } else {
      setAllStates(compCities.getStatesByShort(selectedCountry.shortName));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (listingStatus !== "draft") {
      setSelectedCity("");
      if (selectedState) {
        setAllCities(
          compCities.getCities(selectedCountry.shortName, selectedState)
        );
      }
    } else {
      setAllCities(
        compCities.getCities(selectedCountry.shortName, selectedState)
      );
    }
  }, [selectedState]);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchedCoordinate, setSearchedCoordinate] = useState([]);

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
    setSearchedCoordinate([lat, lon]);
    setQuery(name);
    setResults([]);
  };

  const handleLocation = (value) => {
    setCoordinates(value);
  };

  const changeFormPhase = (value) => {
    setFormPhase(value);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));

      const data = {
        title: title,
        coordinates: coordinates,
        overview: overview,
        numOfShares: numOfShares,
        totalPrice: totalPrize,
        areaSize: areaSize,
        startDate: startDate,
        propertyType: selectedPropertyType,
        selectedNumOfBeds: selectedNumOfBeds,
        numOfBaths: selectedNumOfBaths,
        houseNumber: houseNumber,
        streetNumber: streetNumber,
        zipCode: zipCode,
        country: selectedCountry.shortName,
        state: selectedState,
        city: selectedCity,
        fullAddress: fullAddress,
        username: userDetails.username,
        userRole: userDetails.role,
        userName: userDetails.name,
        email: userDetails.email,
        listingStatus: formPhase === 3 ? "completed" : listingStatus,
        token: localStorage.getItem("token"),
      };

      if (listingStatus === "new") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/add-new-property`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const response = await res.json();
        setIsLoading(false);
        if (response.success) {
          toast.success(response.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setListingStatus("draft");
          changeFormPhase(formPhase + 1);
          setMyProperties((prevData) => {
            let newData;

            if (myProperties.length > 0) {
              newData = [...prevData];
            } else {
              newData = [];
            }
            newData.push(response.body);
            return newData;
          });
          setPropertyByIndex(myProperties.length);
        } else {
          throw new Error(response.message);
        }
      } else if (listingStatus === "draft" || "live") {
        if (formPhase === 1) {
          data.formPhase = formPhase;

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/update-property/${myProperties[propertyByIndex].propertyID}`,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );

          const response = await res.json();

          setIsLoading(false);
          if (response.success) {
            changeFormPhase(formPhase + 1);
            toast.success(response.message, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            throw new Error(response.message);
          }
        } else if (formPhase === 2) {
          const amenities = {
            mainFeatures: {
              inputs: {
                yearBuilt: yearBuilt,
                floorCount: floorCount,
                parkingSpace: parkingSpace,
                elevators: elevators,
              },
              tags: selectedTags[0].tags,
            },
            roomsDetails: {
              inputs: {
                beds: selectedNumOfBeds,
                baths: selectedNumOfBeds,
                servantQuater: servantQuater,
                kitchen: kitchens,
              },
              tags: selectedTags[1].tags,
            },
            business: {
              tags: selectedTags[2].tags,
            },
            community: {
              tags: selectedTags[3].tags,
            },
            healthAndRecreational: {
              tags: selectedTags[4].tags,
            },
            nearbyFacilitiesAndLocations: {
              inputs: {
                distanceFromAirport: distanceFromAirport,
              },
              tags: selectedTags[5].tags,
            },
          };

          data.amenities = amenities;
          data.formPhase = formPhase;
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/update-property/${myProperties[propertyByIndex].propertyID}`,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );
          const response = await res.json();
          setIsLoading(false);
          if (response.success) {
            changeFormPhase(formPhase + 1);
            toast.success(response.message, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            throw new Error(response.message);
          }
        } else {
          const formData = new FormData();
          formData.append(
            "propertyID",
            myProperties[propertyByIndex].propertyID
          );
          formData.append("userName", userDetails.name);
          formData.append("email", userDetails.email);
          formData.append("userRole", userDetails.role);
          formData.append("pinnedImage", pinnedImage);
          // formData.append("deleteImageList", deleteImageList);

          deleteImageList.map((entry, index) => {
            formData.append(`deleteImageList[${index}]`, entry);
          });

          for (const file of files) {
            formData.append("imageFiles", file);
          }
          let res = null;

          // if (
          //   deleteImageList.length ===
          //     myProperties[propertyByIndex]?.imageCount &&
          //   files.length === 0
          // ) {
          //   res = await fetch(
          //     `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/delete-all-images-by-propertyID`,
          //     {
          //       method: "POST",
          //       body: formData,
          //     }
          //   );
          // } else {
          // }
          // console.log(formData.get("propertyID"))
          res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_HOST}/property/upload-property-images`,
            {
              method: "POST",
              body: formData,
            }
          );

          const response = await res.json();
          if (response.success) {
            toast.success(response.message, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setIsLoading(false);
            setIsAddPropertyClicked(false);
          } else {
            throw new Error(response.message);
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [selectedTags, setSelectedTags] = useState([
    { name: "mainFeatures", tagsByName: [], tags: [] },
    { name: "roomsDetail", tagsByName: [], tags: [] },
    { name: "businessAndComm", tagsByName: [], tags: [] },
    { name: "community", tagsByName: [], tags: [] },
    { name: "healthAndRecreational", tagsByName: [], tags: [] },
    { name: "nearbyFacilitiesAndLocations", tagsByName: [], tags: [] },
  ]);

  const mainFeaturesList = [
    "Select",
    "Central AC",
    "Electricity Backup",
    "Lobby",
    "Central Heating",
    "Waste Disposal",
    "Service Elevator",
    "Other",
  ];

  const roomsDetailList = [
    "Select",
    "Drawing Room",
    "Study Room",
    "Gym",
    "Lounge",
    "Powder Room",
    "Steam Room",
    "Other",
  ];

  const businessAndCommList = [
    "Select",
    "Internet",
    "Conference Room",
    "Cable TV",
    "Satellite TV",
    "Intercom",
    "Media Room",
    "ATM Machine",
    "Other",
  ];

  const communityList = [
    "Select",
    "Community Lawn",
    "First Aid",
    "Medical Centre",
    "Barbeque Area",
    "Camp Fire Area",
    "Swimming Pool",
    "Day Care Centre",
    "Mosque",
    "Prayer Area",
    "Community Gym",
    "Kids Play Area",
    "Community Centre",
    "Other",
  ];

  const healthAndRecreationalList = ["Select", "Sauna", "Jacuzzi", "Other"];

  const nearbyFacilitiesAndLocationsList = [
    "Select",
    "Schools",
    "Restaurants",
    "Hospitals",
    "Shopping Malls",
    "Public Transport",
    "Other",
  ];

  const handleAddTags = (index, value) => {
    console.log("Called handleAddTags with index:", index, "and value:", value);

    // Function to convert string to camelCase
    const toCamelCase = (str) => {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white space
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
    };

    const camelCaseValue = toCamelCase(value); // Convert value to camelCase

    setSelectedTags((prevData) => {
      // Check if the camelCase value already exists in the tagsByName array at the given index
      if (!prevData[index].tagsByName.includes(value)) {
        console.log("Adding new camelCase tag:", camelCaseValue);
        // Create a new array with all the previous data
        const newData = prevData.map((item, idx) => {
          if (idx === index) {
            // Only update the item at the specific index
            return {
              ...item,
              tagsByName: [...item.tagsByName, value],
              tags: [...item.tags, camelCaseValue], // Assuming tags should also store the camelCase value
            };
          }
          return item;
        });
        return newData;
      }
      return prevData; // Return the previous data unchanged if the tag is a duplicate
    });
  };

  const handleAddTagsByCamelCase = (index, value) => {
    console.log("Called handleAddTags with index:", index, "and value:", value);

    // Function to convert camelCase string to human-readable format
    const toHumanReadable = (str) => {
      // Insert a space before each uppercase letter and convert the entire string to lowercase
      const spaced = str.replace(/([A-Z])/g, " $1").toLowerCase();

      // Trim any leading space and capitalize the first letter of each word
      return spaced.replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) =>
        match.toUpperCase()
      );
    };

    // Example usage:
    const humanReadableString = toHumanReadable(value);

    setSelectedTags((prevData) => {
      // Check if the camelCase value already exists in the tagsByName array at the given index
      if (!prevData[index].tagsByName.includes(value)) {
        // Create a new array with all the previous data
        const newData = prevData.map((item, idx) => {
          if (idx === index) {
            // Only update the item at the specific index
            return {
              ...item,
              tagsByName: [...item.tagsByName, humanReadableString],
              tags: [...item.tags, value], // Assuming tags should also store the camelCase value
            };
          }
          return item;
        });
        return newData;
      }
      return prevData; // Return the previous data unchanged if the tag is a duplicate
    });
  };

  const handleDelete = (event, index, tagToDelete) => {
    event.preventDefault();

    // Function to convert string to camelCase
    const toCamelCase = (str) => {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white space
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
    };

    const camelCaseValue = toCamelCase(tagToDelete); // Convert value to camelCase

    setSelectedTags((prevData) => {
      // Map over the existing data to produce a new array
      const newData = prevData.map((item, idx) => {
        // Only update the item at the specified index
        if (idx === index) {
          return {
            ...item,
            tagsByName: item.tagsByName.filter((tag) => tag !== tagToDelete),
            tags: item.tags.filter((tag) => tag !== camelCaseValue), // Remove the tag from the tagsByName array
          };
        }
        return item; // Return other items unchanged
      });
      return newData;
    });
  };

  const [sharesCountByProperty, setSharesCountByProperty] = useState([]);

  const fetchMyPurchase = async () => {
    try {
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/get-shares-by-username/${username}`,
        {
          method: "GET",
        }
      );

      const response = await res.json();
      if (response.success) {
        setSharesCountByProperty(response.body.sharesPerProperty);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [myShareReservations, setMyShareReservations] = useState([]);

  const fetchMyReservations = async () => {
    try {
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/get-reservations-by-username/${username}`,
        {
          method: "GET",
        }
      );

      const response = await res.json();
      if (response.success) {
        setMyShareReservations(response.body);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [myShareRentals, setMyShareRentals] = useState([]);

  const fetchMyRentals = async () => {
    try {
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/share/get-share-rentals-by-user/${username}`,
        {
          method: "GET",
        }
      );

      const response = await res.json();
      if (response.success) {
        setMyShareRentals(response.body);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="bg-white w-full my-6 lg:h-[85vh] md:h-[89vh] lg:max-h-[85vh] max-h-[93vh] overflow-y-auto">
      {isAddPropertyClicked ? (
        <div className="w-full flex flex-row items-center pb-8 px-14">
          <h1 className="text-2xl font-medium">Add Property</h1>
          <button
            onClick={() => {
              setIsAddPropertyClicked(false);
              setFormPhase(1);
            }}
            type="button"
            className="bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
          >
            Back
            {/* <FaPlus className="inline-flex text-sm ml-2 mb-1" /> */}
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-row items-center border-b border-b-[#D9D9D9] pb-7 px-14">
          <h1 className="text-2xl font-medium">My Properties</h1>
          <button
            onClick={(e) => handleClickToAdd(e, "new")}
            type="button"
            className="bg-[#116A7B] text-white text-lg ml-auto mx-1 px-5 py-1 rounded-full"
          >
            Add Property
            <FaPlus className="inline-flex text-sm ml-2 mb-1" />
          </button>
        </div>
      )}
      {isAddPropertyClicked ? (
        <form className="flex flex-row flex-wrap gap-x-[90px] px-14 py-5">
          {formPhase === 1 && (
            <>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="title" className="text-[#676767]">
                  Property Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  required={true}
                  onChange={({ target }) => setTitle(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="title" className="text-[#676767]">
                  Property Overview
                </label>
                <textarea
                  // ref={textRef}
                  type="text"
                  name="title"
                  value={overview}
                  required={true}
                  onChange={({ target }) => setOverview(target.value)}
                  style={{ height: "46px" }}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 resize-none rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="shares-slider" className="text-gray-600">
                  Total Number of Shares: <strong>{numOfShares}</strong>
                </label>
                <input
                  type="range"
                  id="shares-slider"
                  name="shares-slider"
                  min="1"
                  max="25"
                  step="1"
                  value={numOfShares}
                  onChange={({ target }) => setNumberOfShares(target.value)}
                  className="slider w-[620px] h-2 my-auto rounded-full bg-[#116A7B30] outline-none appearance-none"
                  style={{
                    backgroundSize: `${((numOfShares - 1) / 24) * 100}%`,
                    backgroundImage: `
            linear-gradient(#116A7B, #116A7B),
            url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='10' fill='%23116A7B'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left center",
                    backgroundAttachment: "local",
                  }}
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="totalPrize" className="text-[#676767]">
                  Total Price {`($)`}
                </label>
                <input
                  type="number"
                  name="totalPrize"
                  value={totalPrize}
                  required={true}
                  onChange={({ target }) => setTotalPrize(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="areaSize" className="text-[#676767]">
                  Area Size{" "}
                  {`(${
                    JSON.parse(localStorage.getItem("userSettings")).areaUnit
                  })`}
                </label>
                <input
                  type="number"
                  name="areaSize"
                  value={areaSize}
                  required={true}
                  onChange={({ target }) => setAreaSize(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="title" className="text-[#676767]">
                  Duration
                  {startDate && endDate ? `: ${startDate} to ${endDate}` : ""}
                </label>
                <input
                  type="date"
                  name="title"
                  value={startDate}
                  required={true}
                  onChange={({ target }) => {
                    const date = new Date(target.value);
                    setStartDate(date.toISOString().split("T")[0]);
                  }}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>

              <div className="mb-6 ml-6 flex flex-col">
                <div>
                  <label htmlFor="propertyType" className="text-[#676767]">
                    Property Type
                  </label>
                  <select
                    name="nationality"
                    value={selectedPropertyType}
                    onChange={({ target }) => {
                      if (target.value == "Select") {
                        setSelectedPropertyType("");
                      } else {
                        setSelectedPropertyType(target.value);
                      }
                    }}
                    className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                  >
                    {propertyTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  name="propertyType"
                  value={selectedPropertyType}
                  required={true}
                  readOnly={true}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <input
                  type="hidden"
                  name="noName"
                  className="w-[620px] bg-transparent outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="w-full flex flex-row items-center pb-8">
                <h1 className="text-2xl font-medium">Address</h1>
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="houseNumber" className="text-[#676767]">
                  House Number
                </label>
                <input
                  type="text"
                  name="houseNumber"
                  value={houseNumber}
                  required={true}
                  onChange={({ target }) => setHouseNumber(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="streetNumber" className="text-[#676767]">
                  Street Number
                </label>
                <input
                  type="text"
                  name="streetNumber"
                  value={streetNumber}
                  required={true}
                  onChange={({ target }) => setStreetNumber(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="zipCode" className="text-[#676767]">
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={zipCode}
                  required={true}
                  onChange={({ target }) => setZipCode(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <div>
                  <label htmlFor="country" className="text-[#676767]">
                    Country
                  </label>
                  <select
                    name="country"
                    value={selectedCountry?.name}
                    onChange={({ target }) => {
                      if (target.value == "Select") {
                        setSelectedCountry({});
                      } else {
                        const country = compCities.getCountryByShort(
                          target.value
                        );
                        country.shortName = target.value;
                        setSelectedCountry(country);
                      }
                    }}
                    className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                  >
                    <option value="Select">Select</option>
                    {allCountries.map((country, index) => (
                      <option key={index} value={country.shortName}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  name="country"
                  value={selectedCountry?.name}
                  required={true}
                  readOnly={true}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <div>
                  <label htmlFor="state" className="text-[#676767]">
                    State/Province
                  </label>
                  <select
                    name="state"
                    value={selectedState}
                    onChange={({ target }) => {
                      if (target.value == "Select") {
                        setSelectedState({});
                      } else {
                        setSelectedState(target.value);
                      }
                    }}
                    className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                  >
                    <option value="Select">Select</option>
                    {allStates?.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  name="state"
                  value={selectedState}
                  required={true}
                  readOnly={true}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <div>
                  <label htmlFor="City" className="text-[#676767]">
                    City
                  </label>
                  <select
                    name="City"
                    value={selectedCity}
                    onChange={({ target }) => {
                      if (target.value == "Select") {
                        setSelectedCity("");
                      } else {
                        setSelectedCity(target.value);
                      }
                    }}
                    className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                  >
                    <option value="Select">Select</option>
                    {allCities?.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  name="city"
                  value={selectedCity}
                  required={true}
                  readOnly={true}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="fullAddress" className="text-[#676767]">
                  Full Address
                </label>
                <input
                  type="text"
                  name="fullAddress"
                  value={fullAddress}
                  required={true}
                  onChange={({ target }) => setFullAddress(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              {/* <div className="mb-6 ml-6 flex flex-col">
            <input
              type="hidden"
              name="noName"
              className="w-[620px] bg-transparent outline-none px-5 py-2 mt-3 rounded-full"
            />
          </div> */}
              <div className="mb-6 ml-6 flex flex-col relative">
                <label htmlFor="searchLocation" className="text-[#676767]">
                  Search Location
                </label>
                <input
                  type="text"
                  name="searchLocation"
                  value={query}
                  required={true}
                  onChange={handleSearch}
                  placeholder="Search..."
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
                <div className="absolute w-[620px] z-[5000] top-20">
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
              <MapArea
                searchedCoordinate={searchedCoordinate}
                handleCoordinates={handleLocation}
                marker={coordinates}
              />
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="fullAddress" className="text-[#676767]">
                  Latitude
                </label>
                <input
                  type="text"
                  name="fullAddress"
                  value={coordinates?.lat}
                  required={true}
                  onChange={(event) => {
                    setCoordinates((prevData) => {
                      if (prevData) {
                        const newData = { ...prevData };
                        newData.lat = event.target.value;
                        return newData;
                      }
                    });
                  }}
                  placeholder="Click on the map..."
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>

              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="fullAddress" className="text-[#676767]">
                  Longitude
                </label>
                <input
                  type="text"
                  name="fullAddress"
                  value={coordinates?.long}
                  required={true}
                  onChange={(event) => {
                    setCoordinates((prevData) => {
                      if (prevData) {
                        const newData = { ...prevData };
                        newData.long = event.target.value;
                        return newData;
                      }
                    });
                  }}
                  placeholder="Click on the map..."
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
            </>
          )}
          {formPhase === 2 && (
            <>
              <div className="w-full flex flex-row items-center pb-8">
                <h1 className="text-2xl font-medium">Main Features</h1>
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="yearBuilt" className="text-[#676767]">
                  Year Built
                </label>
                <input
                  type="number"
                  name="yearBuilt"
                  value={yearBuilt}
                  required={true}
                  onChange={({ target }) => setYearBuilt(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="floorCount" className="text-[#676767]">
                  Floor Count
                </label>
                <input
                  type="number"
                  name="floorCount"
                  value={floorCount}
                  required={true}
                  onChange={({ target }) => setFloorCount(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="parkingSpace" className="text-[#676767]">
                  Parking Space
                </label>
                <input
                  type="number"
                  name="parkingSpace"
                  value={parkingSpace}
                  required={true}
                  onChange={({ target }) => setParkingSpace(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="elevators" className="text-[#676767]">
                  Elevators
                </label>
                <input
                  type="number"
                  name="elevators"
                  value={elevators}
                  required={true}
                  onChange={({ target }) => setElevators(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <div>
                  <label htmlFor="otherFeatures" className="text-[#676767]">
                    Other Features
                  </label>
                  <select
                    name="otherFeatures"
                    // value={selectedPropertyType}
                    onChange={({ target }) => {
                      if (target.value !== "Select") {
                        handleAddTags(0, target.value);
                      }
                    }}
                    className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                  >
                    {mainFeaturesList.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-[620px] min-h-[46px] flex flex-wrap items-center border border-[#116A7B30] focus-within:border-[#116A7B] rounded-full px-5 py-2 mt-3 outline-none">
                  {selectedTags[0].tagsByName.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-[#E1ECF4] text-[#0a66c2] rounded-full px-3 py-1 text-sm font-medium mr-2 mb-1"
                    >
                      {tag}
                      <button
                        onClick={(e) => handleDelete(e, 0, tag)}
                        className="text-[#666] hover:text-[#333]"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <input
                  type="button"
                  name="noName"
                  className="w-[620px] bg-transparent outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="w-full flex flex-row items-center pb-8">
                <h1 className="text-2xl font-medium">Rooms Detail</h1>
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <div>
                  <label htmlFor="selectedNumOfBeds" className="text-[#676767]">
                    Beds
                  </label>
                  <select
                    name="nationality"
                    value={selectedNumOfBeds}
                    onChange={({ target }) => {
                      if (target.value == "Select") {
                        setSelectedNumOfBeds("");
                      } else {
                        setSelectedNumOfBeds(target.value);
                      }
                    }}
                    className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                  >
                    {numOfBedsAndBaths.map((count, index) => (
                      <option key={index} value={count}>
                        {count}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  name="selectedNumOfBeds"
                  value={selectedNumOfBeds}
                  required={true}
                  readOnly={true}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <div>
                  <label htmlFor="numOfBaths" className="text-[#676767]">
                    Baths
                  </label>
                  <select
                    name="numOfBaths"
                    value={selectedNumOfBaths}
                    onChange={({ target }) => {
                      if (target.value == "Select") {
                        setSelectedNumOfBaths("");
                      } else {
                        setSelectedNumOfBaths(target.value);
                      }
                    }}
                    className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                  >
                    {numOfBedsAndBaths.map((count, index) => (
                      <option key={index} value={count}>
                        {count}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  name="numOfBaths"
                  value={selectedNumOfBaths}
                  required={true}
                  readOnly={true}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="servantQuater" className="text-[#676767]">
                  Servant Quater
                </label>
                <input
                  type="number"
                  name="servantQuater"
                  value={servantQuater}
                  required={true}
                  onChange={({ target }) => setServantQuater(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="kitchens" className="text-[#676767]">
                  Kitchens
                </label>
                <input
                  type="number"
                  name="kitchens"
                  value={kitchens}
                  required={true}
                  onChange={({ target }) => setKitchens(target.value)}
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <div>
                  <label htmlFor="otherFeatures" className="text-[#676767]">
                    Other Features
                  </label>
                  <select
                    name="otherFeatures"
                    // value={selectedPropertyType}
                    onChange={({ target }) => {
                      if (target.value !== "Select") {
                        handleAddTags(1, target.value);
                      }
                    }}
                    className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                  >
                    {roomsDetailList.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-[620px] min-h-[46px] flex flex-wrap items-center border border-[#116A7B30] focus-within:border-[#116A7B] rounded-full px-5 py-2 mt-3 outline-none">
                  {selectedTags[1].tagsByName.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-[#E1ECF4] text-[#0a66c2] rounded-full px-3 py-1 text-sm font-medium mr-2 mb-1"
                    >
                      {tag}
                      <button
                        onClick={(e) => handleDelete(e, 1, tag)}
                        className="text-[#666] hover:text-[#333]"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <input
                  type="button"
                  name="noName"
                  className="w-[620px] bg-transparent outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="w-full flex flex-row items-center pb-8">
                <h1 className="text-2xl font-medium">
                  Business and Communication
                </h1>
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <div>
                  <label htmlFor="features" className="text-[#676767]">
                    Features
                  </label>
                  <select
                    name="features"
                    // value={selectedPropertyType}
                    onChange={({ target }) => {
                      if (target.value !== "Select") {
                        handleAddTags(2, target.value);
                      }
                    }}
                    className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                  >
                    {businessAndCommList.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-[620px] min-h-[46px] flex flex-wrap items-center border border-[#116A7B30] focus-within:border-[#116A7B] rounded-full px-5 py-2 mt-3 outline-none">
                  {selectedTags[2].tagsByName.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-[#E1ECF4] text-[#0a66c2] rounded-full px-3 py-1 text-sm font-medium mr-2 mb-1"
                    >
                      {tag}
                      <button
                        onClick={(e) => handleDelete(e, 2, tag)}
                        className="text-[#666] hover:text-[#333]"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <input
                  type="button"
                  name="noName"
                  className="w-[620px] bg-transparent outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="w-full flex flex-row items-center pb-8">
                <h1 className="text-2xl font-medium">Community</h1>
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <div>
                  <label htmlFor="features" className="text-[#676767]">
                    Features
                  </label>
                  <select
                    name="features"
                    // value={selectedPropertyType}
                    onChange={({ target }) => {
                      if (target.value !== "Select") {
                        handleAddTags(3, target.value);
                      }
                    }}
                    className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                  >
                    {communityList.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-[620px] min-h-[46px] flex flex-wrap items-center border border-[#116A7B30] focus-within:border-[#116A7B] rounded-full px-5 py-2 mt-3 outline-none">
                  {selectedTags[3].tagsByName.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-[#E1ECF4] text-[#0a66c2] rounded-full px-3 py-1 text-sm font-medium mr-2 mb-1"
                    >
                      {tag}
                      <button
                        onClick={(e) => handleDelete(e, 3, tag)}
                        className="text-[#666] hover:text-[#333]"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <input
                  type="button"
                  name="noName"
                  className="w-[620px] bg-transparent outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="w-full flex flex-row items-center pb-8">
                <h1 className="text-2xl font-medium">
                  Health and Recreational
                </h1>
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <div>
                  <label htmlFor="features" className="text-[#676767]">
                    Features
                  </label>
                  <select
                    name="features"
                    // value={selectedPropertyType}
                    onChange={({ target }) => {
                      if (target.value !== "Select") {
                        handleAddTags(4, target.value);
                      }
                    }}
                    className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                  >
                    {healthAndRecreationalList.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-[620px] min-h-[46px] flex flex-wrap items-center border border-[#116A7B30] focus-within:border-[#116A7B] rounded-full px-5 py-2 mt-3 outline-none">
                  {selectedTags[4].tagsByName.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-[#E1ECF4] text-[#0a66c2] rounded-full px-3 py-1 text-sm font-medium mr-2 mb-1"
                    >
                      {tag}
                      <button
                        onClick={(e) => handleDelete(e, 4, tag)}
                        className="text-[#666] hover:text-[#333]"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <input
                  type="button"
                  name="noName"
                  className="w-[620px] bg-transparent outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="w-full flex flex-row items-center pb-8">
                <h1 className="text-2xl font-medium">
                  Nearby Facilities and Locations
                </h1>
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <label htmlFor="distanceFromAirport" className="text-[#676767]">
                  Distance From Airport {"(km)"}
                </label>
                <input
                  type="number"
                  name="distanceFromAirport"
                  value={distanceFromAirport}
                  required={true}
                  onChange={({ target }) =>
                    setDistanceFromAirport(target.value)
                  }
                  className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div>
              <div className="mb-6 ml-6 flex flex-col">
                <div>
                  <label htmlFor="features" className="text-[#676767]">
                    Other Features
                  </label>
                  <select
                    name="features"
                    // value={selectedPropertyType}
                    onChange={({ target }) => {
                      if (target.value !== "Select") {
                        handleAddTags(5, target.value);
                      }
                    }}
                    className="inline-flex mx-10 border border-[#116A7B30] rounded-full px-3 focus:border-[#116A7B] outline-none"
                  >
                    {nearbyFacilitiesAndLocationsList.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-[620px] min-h-[46px] flex flex-wrap items-center border border-[#116A7B30] focus-within:border-[#116A7B] rounded-full px-5 py-2 mt-3 outline-none">
                  {selectedTags[5].tagsByName.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-[#E1ECF4] text-[#0a66c2] rounded-full px-3 py-1 text-sm font-medium mr-2 mb-1"
                    >
                      {tag}
                      <button
                        onClick={(e) => handleDelete(e, 5, tag)}
                        className="text-[#666] hover:text-[#333]"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {formPhase === 3 && (
            <>
              <div className="w-full flex flex-row items-center pb-8">
                <h1 className="text-2xl font-medium">Upload Images</h1>
              </div>
              <div
                className={`mb-6 ml-6 flex ${
                  myProperties[propertyByIndex]?.imageCount > 0
                    ? "flex-col"
                    : "flex-row"
                } `}
              >
                <div className="flex flex-col">
                  <label htmlFor="propertyImages" className="text-[#676767]">
                    Max 10, {`supported formats: .png`}
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/png"
                    required={true}
                    onChange={({ target }) => setFiles(target.files)}
                    className="w-[620px] text-xl text-[#676767] font-normal border border-[#116A7B30] focus:border-[#116A7B] outline-none px-5 py-2 mt-3 rounded-full"
                  />
                </div>
                {myProperties[propertyByIndex]?.imageCount > 0 ? (
                  <div
                    className="relative flex flex-row gap-x-3 overflow-y-visible overflow-x-auto my-5"
                    style={{ maxWidth: "fit" }}
                  >
                    {Array.from(
                      { length: myProperties[propertyByIndex]?.imageCount },
                      (_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            if (pinnedImage === index) {
                              setPinnedImage(-1);
                            } else {
                              if (!deleteImageList.includes(index))
                                setPinnedImage(index);
                            }
                          }}
                          className="relative h-40"
                        >
                          <Image
                            key={index}
                            width={1000}
                            height={1000}
                            src={`${
                              process.env.NEXT_PUBLIC_SERVER_HOST
                            }/uploads/${
                              myProperties[propertyByIndex].propertyID
                            }/image-${index + 1}.png`}
                            className="w-60 h-32  object-fit rounded-xl overflow-hidden "
                            alt={`Property Image ${index + 1}`} // Always include an alt for accessibility
                          />
                          {deleteImageList.includes(index) && (
                            <div className="absolute inset-y-4 w-60 h-32 bg-gray-700 opacity-60 rounded-xl"></div>
                          )}
                          {pinnedImage === index && (
                            <span className="absolute inset-y-2 left-0 px-1 text-red-700 font-semibold focus:outline-none cursor-pointer">
                              {" "}
                              <SiPinboard className="text-xl" />
                            </span>
                          )}
                          <span className="absolute inset-y-2 right-0 px-1 text-white font-semibold focus:outline-none cursor-pointer">
                            {" "}
                            <MdClose
                              onClick={(event) => {
                                event.stopPropagation();
                                if (deleteImageList.includes(index)) {
                                  const newList = deleteImageList.filter(
                                    (item) => item !== index
                                  );
                                  setDeleteImageList(newList);
                                } else {
                                  const newList = [...deleteImageList];
                                  newList.push(index);
                                  setDeleteImageList(newList);
                                  if (pinnedImage === index) setPinnedImage(-1);
                                }
                              }}
                              className="bg-[#116A7B] rounded-full text-xl p-[2px]"
                            />
                          </span>
                        </button>
                      )
                    )}
                  </div>
                ) : (
                  <div className="mb-6 ml-6 flex flex-col">
                    <input
                      type="button"
                      name="noName"
                      className="w-[620px] bg-transparent outline-none px-5 py-2 mt-3 rounded-full"
                    />
                  </div>
                )}
              </div>

              {/* <div className="mb-6 ml-6 flex flex-col">
                <input
                  type="button"
                  name="noName"
                  className="w-[620px] bg-transparent outline-none px-5 py-2 mt-3 rounded-full"
                />
              </div> */}
            </>
          )}
          <div className="mb-6 ml-6 flex flex-row space-x-3">
            {formPhase < 3 && (
              <button
                type="button"
                onClick={(e) => {
                  handleSubmit(e);
                  // changeFormPhase(formPhase + 1)
                }}
                className="w-52 bg-[#116A7B] text-white text-2xl font-medium px-7 py-3 rounded-full"
              >
                {" "}
                {!isLoading && `Save & Next`}
                {isLoading && (
                  <div className="border-t-2 border-b-2 border-white bg-transparent h-3 p-2 animate-spin shadow-lg w-fit mx-auto rounded-full"></div>
                )}
              </button>
            )}
            {formPhase === 3 && (
              <button
                type="button"
                onClick={(e) => handleSubmit(e)}
                className="w-52 bg-[#116A7B] text-white text-2xl font-medium px-7 py-3 rounded-full"
              >
                {" "}
                {!isLoading && `Submit`}
                {isLoading && (
                  <div className="border-t-2 border-b-2 border-white bg-transparent h-3 p-2 animate-spin shadow-lg w-fit mx-auto rounded-full"></div>
                )}
              </button>
            )}
            {formPhase > 1 && (
              <button
                type="button"
                onClick={() => changeFormPhase(formPhase - 1)}
                className="bg-[#116A7B] text-white text-2xl font-medium px-7 py-3 rounded-full"
              >
                Back
              </button>
            )}
          </div>
        </form>
      ) : (
        <>
          <div className="flex items-center justify-start md:space-x-20 space-x-14 my-3 px-14 text-white text-2xl font-semibold">
            <button
              onClick={() =>
                dispatch(updateActivePropertyManagementTab("Listings"))
              }
            >
              <h1
                className={`flex ${
                  activeNavBtn === "Listings"
                    ? "underline-text"
                    : "hover-underline-animation"
                } `}
              >
                Listings
              </h1>
            </button>
            {/* <Link href={`${process.env.NEXT_PUBLIC_HOST}/chef`}> */}
            <button
              onClick={() => {
                dispatch(updateActivePropertyManagementTab("Purchases"));
                fetchMyPurchase();
              }}
            >
              <h2
                className={`flex ${
                  activeNavBtn === "Purchases"
                    ? "underline-text"
                    : "hover-underline-animation"
                } `}
              >
                Purchases
              </h2>
            </button>
            <button
              onClick={() => {
                dispatch(updateActivePropertyManagementTab("Reservations"));
                fetchMyReservations();
              }}
            >
              <h2
                className={`flex ${
                  activeNavBtn === "Reservations"
                    ? "underline-text"
                    : "hover-underline-animation"
                } `}
              >
                Reservations
              </h2>
            </button>
            <button
              onClick={() => {
                dispatch(updateActivePropertyManagementTab("Rentals"));
                fetchMyRentals();
              }}
            >
              <h2
                className={`flex ${
                  activeNavBtn === "Rentals"
                    ? "underline-text"
                    : "hover-underline-animation"
                } `}
              >
                Rentals
              </h2>
            </button>

            {/* </Link> */}
          </div>
          {activeNavBtn === "Listings" && (
            <div className="py-10">
              {myProperties.length > 0 ? (
                myProperties.map((property, index) => (
                  <div
                    key={index}
                    onClick={(e) =>
                      handleClickToAdd(e, property.listingStatus, index)
                    }
                    className="w-full flex flex-row flex-wrap border border-[#D9D9D9] px-14 mb-5 cursor-pointer"
                  >
                    {property.imageCount === 0 ? (
                      <Image
                        width={1000}
                        height={1000}
                        src={"/assets/user/property-management/no-image.jpg"}
                        className="w-64 h-60 object-cover object-center"
                      />
                    ) : (
                      <Image
                        width={1000}
                        height={1000}
                        src={`${process.env.NEXT_PUBLIC_SERVER_HOST}/${
                          property.imageDirURL
                        }/image-${
                          property.pinnedImage === -1
                            ? "1"
                            : `${property.pinnedImage}`
                        }.png`}
                        className="w-64 h-60 object-cover object-center"
                      />
                    )}
                    <div className="ml-10 space-y-5 my-5">
                      <div className="flex flex-row text-2xl text-[#09363F]">
                        <h1 className="w-80 text-2xl font-medium">
                          Property Title:{" "}
                        </h1>
                        <p className="ml-44">{property.title}</p>
                      </div>
                      <div className="flex flex-row text-2xl text-[#09363F]">
                        <h1 className="w-80 text-2xl font-medium">
                          Property Status:{" "}
                        </h1>
                        <p
                          className={`ml-44 ${
                            property.listingStatus === "live"
                              ? "text-[#36FE62]"
                              : property.listingStatus === "pending approval"
                              ? "text-[#FF9900]"
                              : property.listingStatus === "draft"
                              ? "text-gray-700"
                              : "text-[#FF0000]"
                          }`}
                        >
                          {property.listingStatus}
                        </p>
                      </div>
                      <div className="flex flex-row text-2xl text-[#09363F]">
                        <h1 className="w-80 text-2xl font-medium">
                          Total Shares:{" "}
                        </h1>
                        <p className="ml-44">{property.totalStakes}</p>
                      </div>
                      <div className="flex flex-row text-2xl text-[#09363F]">
                        <h1 className="w-80 text-2xl font-medium">
                          Available Shares:{" "}
                        </h1>
                        <p className="ml-44">
                          {property.totalStakes - property.stakesOccupied}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-2xl text-[#116A7B] font-semibold px-14">
                  No Properties Listed Yet.
                </h1>
              )}
            </div>
          )}
          {activeNavBtn === "Purchases" && (
            <div>
              {sharesCountByProperty.length > 0 &&
                sharesCountByProperty.map((share, index) => (
                  <Link
                    key={index}
                    href={`/buy-shares/property/${share.propertyDetails.propertyID}`}
                    className="w-full flex flex-row flex-wrap border border-[#D9D9D9] px-14 mb-5 cursor-pointer"
                  >
                    {share.propertyDetails.imageCount === 0 ? (
                      <Image
                        width={1000}
                        height={1000}
                        src={"/assets/user/property-management/no-image.jpg"}
                        className="xl:w-64 lg:w-52 md:w-44 md:h-48 xl:h-60 lg:h-48 object-cover object-center"
                      />
                    ) : (
                      <Image
                        width={1000}
                        height={1000}
                        src={`${process.env.NEXT_PUBLIC_SERVER_HOST}/${share.propertyDetails.imageDirURL}/image-1.png`}
                        className="xl:w-64 lg:w-52 md:w-52 md:h-60 xl:h-60 lg:h-56 object-cover object-center"
                      />
                    )}
                    <div className="ml-10 space-y-5 my-5">
                      <div className="flex flex-row text-2xl text-[#09363F]">
                        <h1 className="xl:w-80 lg:w-60 md:w-60 text-2xl font-medium">
                          Property Title:{" "}
                        </h1>
                        <p className="xl:hare. lg:ml-20">
                          {share.propertyDetails.title}
                        </p>
                      </div>
                      <div className="flex flex-row text-2xl text-[#09363F]">
                        <h1 className="xl:w-80 lg:w-60 md:w-60 text-2xl font-medium">
                          My Shares:{" "}
                        </h1>
                        <p className="xl:ml-44 lg:ml-20">
                          {
                            sharesCountByProperty.filter(
                              (entry) =>
                                entry.propertyID ===
                                share.propertyDetails.propertyID
                            )[0]?.count
                          }
                        </p>
                      </div>
                      <div className="flex flex-row text-2xl text-[#09363F]">
                        <h1 className="xl:w-80 lg:w-60 md:w-60 text-2xl font-medium">
                          Total Shares:{" "}
                        </h1>
                        <p className="xl:ml-44 lg:ml-20">
                          {share.propertyDetails.totalStakes}
                        </p>
                      </div>
                      <div className="flex flex-row text-2xl text-[#09363F]">
                        <h1 className="xl:w-80 lg:w-60 md:w-60 text-2xl font-medium">
                          Available Shares:{" "}
                        </h1>
                        <p className="xl:ml-44 lg:ml-20">
                          {share.propertyDetails.totalStakes -
                            share.propertyDetails.stakesOccupied}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
          {activeNavBtn === "Reservations" && (
            <div>
              {myShareReservations.length > 0 &&
                myShareReservations.map((share, index) => (
                  <Link
                    key={index}
                    href={`/buy-shares/property/${share.propertyDetails.propertyID}`}
                    className="w-full flex flex-row flex-wrap border border-[#D9D9D9] px-14 mb-5 cursor-pointer"
                  >
                    {share.propertyDetails.imageCount === 0 ? (
                      <Image
                        width={1000}
                        height={1000}
                        src={"/assets/user/property-management/no-image.jpg"}
                        className="xl:w-64 lg:w-52 md:w-52 xl:h-60 lg:h-56 md:h-60 object-cover object-center"
                      />
                    ) : (
                      <Image
                        width={1000}
                        height={1000}
                        src={`${process.env.NEXT_PUBLIC_SERVER_HOST}/${share.propertyDetails.imageDirURL}/image-1.png`}
                        className="xl:w-64 lg:w-52 md:w-52 xl:h-60 lg:h-56 md:h-60 object-cover object-center"
                      />
                    )}
                    <div className="ml-10 space-y-5 my-5">
                      <div className="flex flex-row text-2xl text-[#09363F]">
                        <h1 className="xl:w-80 lg:w-60 md:w-60 text-2xl font-medium">
                          Property Title:{" "}
                        </h1>
                        <p className="xl:ml-44 lg:ml-20">
                          {share.propertyDetails.title}
                        </p>
                      </div>
                      <div className="flex flex-row text-2xl text-[#09363F]">
                        <h1 className="xl:w-80 lg:w-60 md:w-60 text-2xl font-medium">
                          My Reservations:{" "}
                        </h1>
                        <p className="xl:ml-44 lg:ml-20">
                          {
                            myShareReservations.filter(
                              (entry) =>
                                entry.propertyID ===
                                share.propertyDetails.propertyID
                            )[0]?.count
                          }
                        </p>
                      </div>
                      <div className="flex flex-row text-2xl text-[#09363F]">
                        <h1 className="xl:w-80 lg:w-60 md:w-60 text-2xl font-medium">
                          Total Shares:{" "}
                        </h1>
                        <p className="xl:ml-44 lg:ml-20">
                          {share.propertyDetails.totalStakes}
                        </p>
                      </div>
                      <div className="flex flex-row text-2xl text-[#09363F]">
                        <h1 className="xl:w-80 lg:w-60 md:w-60 text-2xl font-medium">
                          Available Shares:{" "}
                        </h1>
                        <p className="xl:ml-44 lg:ml-20">
                          {share.propertyDetails.totalStakes -
                            share.propertyDetails.stakesOccupied}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
          {activeNavBtn === "Rentals" && (
            <div>
              {myShareRentals.length > 0 &&
                myShareRentals.map((share, index) => (
                  <Link
                    key={index}
                    href={`/rent-shares/property/${share.propertyDetails.propertyID}`}
                    className="w-full flex flex-row flex-wrap border border-[#D9D9D9] px-14 mb-5 cursor-pointer"
                  >
                    {share.propertyDetails.imageCount === 0 ? (
                      <Image
                        width={1000}
                        height={1000}
                        src={"/assets/user/property-management/no-image.jpg"}
                        className="xl:w-64 lg:w-52 md:w-52 xl:h-60 lg:h-56 md:h-60 object-cover object-center"
                      />
                    ) : (
                      <Image
                        width={1000}
                        height={1000}
                        src={`${process.env.NEXT_PUBLIC_SERVER_HOST}/${share.propertyDetails.imageDirURL}/image-1.png`}
                        className="xl:w-64 lg:w-52 md:w-52 xl:h-60 lg:h-56 md:h-60 object-cover object-center"
                      />
                    )}
                    <div className="ml-10 space-y-5 my-5">
                      <div className="flex flex-row text-2xl text-[#09363F]">
                        <h1 className="xl:w-80 lg:w-60 md:w-60 text-2xl font-medium">
                          Property Title:{" "}
                        </h1>
                        <p className="xl:ml-44 lg:ml-20">
                          {share.propertyDetails.title}
                        </p>
                      </div>
                      <div className="flex flex-row text-2xl text-[#09363F]">
                        <h1 className="xl:w-80 lg:w-60 md:w-60 text-2xl font-medium">
                          My Rentals:{" "}
                        </h1>
                        <p className="xl:ml-44 lg:ml-20">
                          {
                            myShareRentals.filter(
                              (entry) =>
                                entry.propertyID ===
                                share.propertyDetails.propertyID
                            )[0]?.count
                          }
                        </p>
                      </div>
                      <div className="flex flex-row text-2xl text-[#09363F]">
                        <h1 className="xl:w-80 lg:w-60 md:w-60 text-2xl font-medium">
                          Total Shares:{" "}
                        </h1>
                        <p className="xl:ml-44 lg:ml-20">
                          {share.propertyDetails.totalStakes}
                        </p>
                      </div>
                      <div className="flex flex-row text-2xl text-[#09363F]">
                        <h1 className="xl:w-80 lg:w-60 md:w-60 text-2xl font-medium">
                          Available Shares:{" "}
                        </h1>
                        <p className="xl:ml-44 lg:ml-20">
                          {share.propertyDetails.totalStakes -
                            share.propertyDetails.stakesOccupied}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PropertyManagement;
