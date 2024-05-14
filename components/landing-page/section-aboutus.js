import Image from "next/image";
import React from "react";

const SectionAboutUs = () => {
  return (
    <div className="bg-[#116A7B]">
      <div className="px-14 pt-14">
        <h1 className="xl:text-[40px] text-4xl text-center uppercase font-semibold text-white">
          Discover how we can help
        </h1>
      </div>
      <div className="w-full flex flex-row items-start justify-between px-14 pt-16">
        <div className="w-1/2 bg-white p-2 rounded-3xl">
          <Image
            width={2000}
            height={2000}
            src={"/assets/landing-page/section-aboutus.png"}
            className="w-full h-auto object-cover object-center rounded-3xl overflow-hidden"
            alt="about-us"
          />
        </div>
        <div className="w-1/2 px-20">
          <h2 className="text-4xl tracking-widest text-white font-raleway">
            Know the facts about a location
          </h2>
          <p className="text-2xl tracking-wide font-light text-white mt-5">
            Lorem Ipsum has been the industry&apos;s standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
          </p>
        </div>
      </div>
      <div className="w-full flex flex-row items-start justify-between px-14 pt-16">
        <div className="w-1/2 px-20">
          <h2 className="text-4xl tracking-widest text-white font-raleway">
            Know the facts about a location
          </h2>
          <p className="text-2xl tracking-wide font-light text-white mt-5">
            Lorem Ipsum has been the industry&apos;s standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
          </p>
        </div>
        <div className="w-1/2 bg-white p-2 rounded-3xl">
          <Image
            width={2000}
            height={2000}
            src={"/assets/landing-page/section-aboutus.png"}
            className="w-full h-auto object-cover object-center rounded-3xl overflow-hidden"
            alt="about-us"
          />
        </div>
      </div>
      <div className="w-full flex flex-row items-start justify-between px-14 py-16">
        <div className="w-1/2 bg-white p-2 rounded-3xl">
          <Image
            width={2000}
            height={2000}
            src={"/assets/landing-page/section-aboutus.png"}
            className="w-full h-auto object-cover object-center rounded-3xl overflow-hidden"
            alt="about-us"
          />
        </div>
        <div className="w-1/2 px-20">
          <h2 className="text-4xl tracking-widest text-white font-raleway">
            Know the facts about a location
          </h2>
          <p className="text-2xl tracking-wide font-light text-white mt-5">
            Lorem Ipsum has been the industry&apos;s standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionAboutUs;
