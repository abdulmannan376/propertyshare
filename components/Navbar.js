import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="absolute top-0 w-full text-gray-600 body-font">
      <div className="mx-16 flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex flex-col title-font font-medium items-center justify-center text-gray-900 mb-4 md:mb-0">
          <Image
            width={1000}
            height={1000}
            src={"/logo.png"}
            alt="Logo"
            className="w-auto h-10 object-contain object-center"
          />
        </a>
        <nav className="md:ml-12 md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href={"/"} className="mr-12 hover:text-gray-900">
            Home
          </Link>
          <Link href={"/"} className="mr-12 hover:text-gray-900">
            Map
          </Link>
          <Link href={"/"} className="mr-12 hover:text-gray-900">
            Buy Shares
          </Link>
          <Link href={"/"} className="mr-12 hover:text-gray-900">
            Rent
          </Link>
          <Link href={"/contactus"} className="mr-12 hover:text-gray-900">
            Contact
          </Link>
          <Link href={"/"} className="mr-12 hover:text-gray-900">
            About
          </Link>
          <Link href={"/privacy-policy"} className="mr-12 hover:text-gray-900">
            Privacy
          </Link>
        </nav>
        <Link href={"/login"}  className="inline-flex items-center bg-[#116A7B] text-white border-0 py-1 px-3 focus:outline-none hover:bg-[#0C4A56] rounded text-base mt-4 md:mt-0">
          Login
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
