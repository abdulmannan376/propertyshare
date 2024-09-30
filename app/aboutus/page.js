"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateBgColor,
  updateCurrentPageValue,
  updateNavbarLogo,
  updateNavbarTextColor,
  updateNotificationIconColor,
} from "../redux/features/navbarSlice";
import Image from "next/image";

const SectionOne = () => {
  return (
    <div className="w-full h-full flex md:flex-row flex-col items-start justify-center bg-[#116A7B] lg:px-24 xs:px-10 px-3 py-10">
      <div className="lg:w-1/2 md:w-[60%] w-full flex items-center md:justify-end justify-center md:pr-10">
        <Image
          width={1000}
          height={2000}
          src={"/assets/about-us/section-1-1.jpg"}
          className="w-[526px] md:h-[617px] h-[317px] border-4 border-white object-cover object-center rounded-3xl overflow-hidden"
        />
      </div>
      <div className="w-full md:pr-10 space-y-5 mx-auto">
        <h1 className="lg:text-6xl text-4xl font-bold uppercase text-white md:text-start text-center md:mt-0 mt-5">
          Our Story
        </h1>
        <p className="lg:text-base text-sm md:text-start text-center font-normal text-white">
          <strong className="font-semibold text-white">
            beachbunnyhouse.com
          </strong>{" "}
          was born out of a simple yet profound realization by our Founder and
          CEO, Dr. Huschyar Al-Kaidy. While enjoying annual vacations at the
          same destination, he was struck by the high costs of vacation homes
          and the lack of flexible ownership options. Combining this insight
          with his experiences working remotely from various locations, Dr.
          Al-Kaidy envisioned a revolutionary approach to property investment.
          <br />
          <br />
          He imagined a system where individuals could purchase shares in
          vacation properties, allowing them to enjoy two weeks per year in
          their chosen destinations. This innovative concept not only addresses
          the financial challenges associated with traditional property rental
          and purchase but also accommodates the growing demand for flexibility
          in today&apos;s work environment.
          <br />
          <br />
          Dr. Al-Kaidy&apos;s idea transforms the way people experience vacation
          homes, making it possible to build a diverse portfolio of global
          locations without the burdens of full ownership. This model allows
          users to secure their ideal vacation spot each year while managing
          costs effectively.
          <br />
          <br />
          Recognized as an inventor and awarded by the Federal Ministry of
          Education and Research for his innovative contributions, Dr.
          Al-Kaidy&apos;s leadership and visionary thinking have shaped{" "}
          <strong className="font-semibold text-white">
            beachbunnyhouse.com
          </strong>{" "}
          into a global platform that redefines real estate and travel.
          <br />
          <br />
          Our story is one of innovation, flexibility, and a commitment to
          enhancing the way you experience the world. At{" "}
          <strong className="font-semibold text-white">
            beachbunnyhouse.com
          </strong>{" "}
          , we are dedicated to making your dream vacations accessible and
          enjoyable, wherever your heart takes you.
        </p>
      </div>
    </div>
  );
};

const SectionTwo = () => {
  return (
    <div
      className="w-full h-full flex flex-row items-center justify-center lg:p-24 md:py-24 py-10 sm:px-10 xs:px-5 px-3 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/about-us/section-2-bg.jpg')" }}
    >
      <div className="w-6/6 bg-white border-4 border-[#116A7B] rounded-3xl space-y-10 md:p-20 sm:p-10 px-5 py-10">
        <h1 className="text-[#116A7B] lg:text-6xl text-4xl text-center font-bold uppercase">
          What we do
        </h1>
        <p className="lg:text-xl text-base font-normal leading-10">
          At{" "}
          <strong className="font-semibold text-[#116A7B]">
            beachbunnyhouse.com
          </strong>
          , we revolutionize the way you think about property investment and
          rental. Whether you&apos;re looking to build wealth gradually without
          incurring hefty bank interest, or seeking to make your money work for
          you instead of losing value in a bank account, we have a solution
          tailored to your needs.
        </p>
        <ul className="list-disc space-y-5 text-sm">
          <h2 className="lg:text-xl text-base font-semibold">
            Our platform is perfect if:
          </h2>
          <li className="mx-10">
            You want to gradually build up your fortune while avoiding the
            costly interest associated with traditional bank investments.
          </li>
          <li className="mx-10">
            You&apos;re interested in purchasing a property but lack the initial
            capital, and you&apos;re wary of the diminishing value of money kept
            in banks or at home.
          </li>
          <li className="mx-10">
            You and your family enjoy vacationing in the same location year
            after year, and you're looking for a way to secure your holiday spot
            long-term.
          </li>
          <li className="mx-10">
            You work remotely and desire the flexibility to live and work from
            different countries, without the hassle of traditional rental
            agreements.
          </li>
          <li className="mx-10">
            You own a property but aren&apos;t ready to sell, whether you need
            financial flexibility or simply enjoy having a lively environment
            with others around you.
          </li>
        </ul>
        <p className="lg:text-xl text-base font-normal leading-10">
          <strong className="font-semibold text-[#116A7B]">
            beachbunnyhouse.com
          </strong>{" "}
          is designed to support diverse property needs and help you achieve
          your goals with ease. Join us in transforming the way you interact
          with real estate and explore a world of possibilities.
        </p>
      </div>
    </div>
  );
};

const SectionThree = () => {
  return (
    <div className="w-full h-full bg-[#116A7B] py-10">
      <h1 className=" text-white lg:text-6xl text-4xl text-center font-bold uppercase">
        our leadership
      </h1>
      <div className="w-full h-screen flex sm:flex-row flex-col items-center justify-center bg-[#116A7B] lg:px-24 xs:px-10 px-3 py-10">
        <div className="lg:w-1/3 md:w-[55%] w-[100%] flex items-center justify-end sm:pr-10">
          <Image
            width={1000}
            height={2000}
            src={"/assets/about-us/huschyar.jpg"}
            className="sm:w-[526px] sm:h-[617px] h-[417px] border-4 border-white object-cover sm:object-center object-top rounded-3xl overflow-hidden"
          />
        </div>
        <div className="lg:w-1/2 w-full sm:pr-10 space-y-5 sm:mt-0 mt-5">
          <h1 className="lg:text-6xl text-4xl sm:text-start text-center font-bold text-white uppercase">
            Dr. Huschyar Al-Kaidy
          </h1>
          <p className="lg:text-base text-sm sm:text-start text-center font-normal text-white md:leading-10 leading-6">
            At{" "}
            <strong className="font-semibold text-white">
              beachbunnyhouse.com
            </strong>
            , we are guided by visionary leadership and innovative thinking. Dr.
            Huschyar Al-Kaidy, our Founder and CEO, is the driving force behind
            our unique approach to real estate and vacation home ownership.
            <br />
            <br />
            Dr. Al-Kaidy&apos;s journey began with a personal challenge: finding
            affordable vacation homes in a favorite annual destination.
            Realizing the high costs associated with traditional rental and
            purchase options, he conceived a groundbreaking solution: offering
            property shares that allow individuals to enjoy two weeks per year
            in their chosen locations. This concept not only makes vacation home
            ownership more accessible but also aligns with the flexibility of
            modern remote work.
            <br />
            <br />
            In addition to his role at{" "}
            <strong className="font-semibold text-white">
              beachbunnyhouse.com
            </strong>
            , Dr. Al-Kaidy is a distinguished inventor and has been recognized
            by the German Federal Ministry of Education and Research for his
            contributions to innovation. His expertise in business strategy,
            combined with his inventive spirit, has been instrumental in shaping
            <strong className="font-semibold text-white">
              beachbunnyhouse.com
            </strong>{" "}
            into a global platform that redefines property investment and
            vacationing.
            <br />
            Under Dr. Al-Kaidy's leadership,{" "}
            <strong className="font-semibold text-white">
              beachbunnyhouse.com
            </strong>{" "}
            is committed to providing an exceptional experience for our users,
            blending creativity with practical solutions to meet the evolving
            needs of today&apos;s world.
          </p>
        </div>
      </div>
      {/* <div className="w-full h-screen flex sm:flex-row flex-col items-center justify-center bg-white lg:px-24 xs:px-10 px-3 py-10">
        <div className="sm:w-1/2 w-full sm:pr-10 space-y-5 sm:mb-0 mb-5">
          <h1 className="lg:text-6xl text-4xl sm:text-start text-center font-bold text-[#116A7B] uppercase">
            Dr. Huschyar Al-Kaidy
          </h1>
          <p className="lg:text-base text-sm sm:text-start text-center font-normal text-[#116A7B] md:leading-10 leading-6">
            Dr. Al-Kaidy&apos;s journey began with a personal challenge: finding
            affordable vacation homes in a favorite annual destination.
            Realizing the high costs associated with traditional rental and
            purchase options, he conceived a groundbreaking solution: offering
            property shares that allow individuals to enjoy two weeks per year
            in their chosen locations. This concept not only makes vacation home
            ownership more accessible but also aligns with the flexibility of
            modern remote work.
          </p>
        </div>
        <div className="lg:w-1/3 md:w-[55%] w-[100%] flex items-center justify-end sm:pr-10">
          <Image
            width={1000}
            height={2000}
            src={"/assets/about-us/section-3-2.png"}
            className="sm:w-[526px] sm:h-[617px] h-[417px] border-4 border-white object-cover object-center rounded-3xl overflow-hidden"
          />
        </div>
      </div>
      <div className="w-full md:h-screen h-full flex sm:flex-row flex-col items-center justify-center bg-[#116A7B] lg:px-24 xs:px-10 px-3 py-10">
        <div className="lg:w-1/3 md:w-[55%] w-[100%] flex items-center justify-end sm:pr-10">
          <Image
            width={1000}
            height={2000}
            src={"/assets/about-us/section-3-1.png"}
            className="sm:w-[526px] sm:h-[617px] h-[417px] border-4 border-white object-cover sm:object-center object-top rounded-3xl overflow-hidden"
          />
        </div>
        <div className="sm:w-1/2 w-full sm:pr-10 space-y-5 sm:mt-0 mt-5">
          <h1 className="lg:text-6xl text-4xl sm:text-start text-center font-bold text-white uppercase">
            Dr. Huschyar Al-Kaidy
          </h1>
          <p className="lg:text-base text-sm sm:text-start text-center font-normal text-white md:leading-10 leading-6">
            In addition to his role at{" "}
            <strong className="font-semibold text-white">
              beachbunnyhouse.com
            </strong>
            , Dr. Al-Kaidy is a distinguished inventor and has been recognized
            by the German Federal Ministry of Education and Research for his
            contributions to innovation. His expertise in business strategy,
            combined with his inventive spirit, has been instrumental in shaping
            <strong className="font-semibold text-white">
              beachbunnyhouse.com
            </strong>{" "}
            into a global platform that redefines property investment and
            vacationing.
            <br />
            Under Dr. Al-Kaidy's leadership,{" "}
            <strong className="font-semibold text-white">
              beachbunnyhouse.com
            </strong>{" "}
            is committed to providing an exceptional experience for our users,
            blending creativity with practical solutions to meet the evolving
            needs of today&apos;s world.
          </p>
        </div>
      </div> */}
    </div>
  );
};

const SectionFour = () => {
  return (
    <div className="w-full h-[50vh] bg-white sm:px-24 xs:px-10 px-3 py-10">
      <h1 className="text-4xl text-[#116A7B] text-center font-semibold uppercase">
        our investors
      </h1>
      <div className="flex flex-row flex-wrap items-center justify-center mt-10">
        <Image
          width={500}
          height={500}
          src={"/assets/about-us/rapidsai.png"}
          className="lg:w-40 md:w-24 w-20 h-auto md:mx-10 mx-5"
        />
        <Image
          width={500}
          height={500}
          src={"/logo-bbh.png"}
          className="lg:w-40 md:w-24 w-20 h-auto md:mx-10 mx-5"
        />
        <Image
          width={500}
          height={500}
          src={"/icon-bbh.png"}
          className="lg:w-40 md:w-24 w-20 h-auto md:mx-10 mx-5"
        />
        <Image
          width={500}
          height={500}
          src={"/assets/about-us/rapidsai.png"}
          className="lg:w-40 md:w-24 w-20 h-auto md:mx-10 mx-5"
        />
      </div>
    </div>
  );
};
const Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateNavbarTextColor({
        textColor: "text-white",
        hoverTextColor: "text-white",
      })
    );
    dispatch(updateNavbarLogo("/white-icon-bbh.png"));
    dispatch(updateBgColor("bg-[#116A7B]"));
    dispatch(updateNotificationIconColor("text-white"));
    dispatch(
      updateCurrentPageValue({
        tag: "About",
        bgColor: "bg-white",
        textColor: "text-[#116A7B]",
      })
    );
  }, []);
  return (
    <div>
      <div className="w-full h-20 bg-[#116A7B]"></div>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
    </div>
  );
};

export default Page;
