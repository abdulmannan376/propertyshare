import React, { useEffect, useState } from "react";
import WishlistCard from "./wishlistCard";
import { useSelector } from "react-redux";

const WishList = () => {
  const [myWishlist, setMyWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const wishList = useSelector((state) => state.adminSliceReducer.wishList);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const username = JSON.parse(localStorage.getItem("userDetails")).username;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/get-user-wishlist/${username}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const response = await res.json();
      if (response.success) {
        setIsLoading(false);
        setMyWishlist(response.body);
      } else {
        throw new Error(response.message);
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

  useEffect(() => {
    fetchData();
  }, [wishList]);
  return (
    <div className="bg-white w-full my-6 xxl:h-[85vh] md:h-[88vh] max-h-[88vh] overflow-y-auto">
      <div className="w-full flex flex-row items-center border-b border-b-[#D9D9D9] pt-1 pb-7 px-14">
        <h1 className="text-2xl font-medium">Wishlist</h1>
      </div>
      {!isLoading ? (
        <div className="flex flex-row flex-wrap items-center">
          {myWishlist.length > 0 ? (
            myWishlist.map((favourite, index) => (
              <WishlistCard key={index} card={favourite} />
            ))
          ) : (
            <div className="mx-14 my-5 ">Wishlist Empty</div>
          )}
        </div>
      ) : (
        <div className="bg-white w-full my-6 xxl:h-[85vh] md:h-[88vh] max-h-[88vh] overflow-y-auto flex flex-row items-center justify-center">
          <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default WishList;
