import Image from "next/image";
import React from "react";

const SectionAboutUs = () => {
  return (
    <div className="bg-[#116A7B] xxl:px-24 xl:px-16 lg:px-10 md:px-5 py-14">
      <div className="">
        <h1 className="xl:text-[40px] md:text-4xl text-2xl text-center uppercase font-semibold text-white">
          Discover how we can help
        </h1>
      </div>
      <div className="w-full flex md:flex-row flex-col md:items-start items-center md:justify-between justify-center pt-16">
        <div className="md:w-1/2 w-[85vw] bg-white p-2 rounded-3xl">
          <Image
            width={2000}
            height={2000}
            src={"/assets/landing-page/section-aboutus.png"}
            className="w-full h-auto object-cover object-center rounded-3xl overflow-hidden"
            alt="about-us"
          />
        </div>
        <div className="md:w-1/2 w-full md:text-start text-center px-20 md:mt-0 mt-3">
          <h2 className="lg:text-4xl text-2xl  tracking-widest text-white font-raleway">
            Dream Location Stay Without Buying It:
          </h2>
          <p className="lg:text-xl text-base tracking-wide font-light text-white mt-5">
            The platform allows users to mark desired locations for future
            vacation homes or apartments by clicking on a map, specifying their
            preferences within a 2km radius. Even if no properties are available
            in those areas, users&apos; selections are saved in a Wishlist for
            future reference. The system notifies users when properties matching
            their Wishlist become available. The platform also displays the
            number of interested users for specific locations, and when 25 users
            express interest in a location (with each planning to use the
            property for two weeks), the company will buy a property in that
            area. Initially, the company does not own any properties and uses
            this demand-based approach for acquisition.
          </p>
        </div>
      </div>
      <div className="w-full md:flex hidden flex-row items-start justify-between pt-16">
        <div className="w-1/2 px-20">
          <h2 className="lg:text-4xl text-2xl tracking-widest text-white font-raleway">
            Upgrade According To Your Will:
          </h2>
          <p className="lg:text-xl text-base tracking-wide font-light text-white mt-5">
            Shareholders can request amenities or modifications to vacation
            properties through a dedicated feature in the portal. These
            requests, visible to all 25 shareholders, can include furniture,
            appliances, or upgrades. For a request to proceed, a majority vote
            is required. After consensus is reached, the company reviews the
            feasibility and cost implications before approval. Shareholders
            receive updates on request status and costs through the portal. Any
            approved modifications must be collectively funded by the
            shareholders, as the company bears no financial responsibility for
            these changes.
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
      <div className="w-full md:hidden flex flex-col md:items-start items-center md:justify-between justify-center pt-16">
        <div className="md:w-1/2 w-[85vw] bg-white p-2 rounded-3xl">
          <Image
            width={2000}
            height={2000}
            src={"/assets/landing-page/section-aboutus.png"}
            className="w-full h-auto object-cover object-center rounded-3xl overflow-hidden"
            alt="about-us"
          />
        </div>
        <div className="md:w-1/2 w-full md:text-start text-center px-20 md:mt-0 mt-3">
          <h2 className="lg:text-4xl text-2xl  tracking-widest text-white font-raleway">
            Upgrade According To Your Will:
          </h2>
          <p className="lg:text-xl text-base tracking-wide font-light text-white mt-5">
            Shareholders can request amenities or modifications to vacation
            properties through a dedicated feature in the portal. These
            requests, visible to all 25 shareholders, can include furniture,
            appliances, or upgrades. For a request to proceed, a majority vote
            is required. After consensus is reached, the company reviews the
            feasibility and cost implications before approval. Shareholders
            receive updates on request status and costs through the portal. Any
            approved modifications must be collectively funded by the
            shareholders, as the company bears no financial responsibility for
            these changes.
          </p>
        </div>
      </div>
      <div className="w-full flex md:flex-row flex-col md:items-start items-center md:justify-between justify-center pt-16">
        <div className="md:w-1/2 w-[85vw] bg-white p-2 rounded-3xl">
          <Image
            width={2000}
            height={2000}
            src={"/assets/landing-page/section-aboutus.png"}
            className="w-full h-auto object-cover object-center rounded-3xl overflow-hidden"
            alt="about-us"
          />
        </div>
        <div className="md:w-1/2 w-full md:text-start text-center px-20 md:mt-0 mt-3">
          <h2 className="lg:text-4xl text-2xl  tracking-widest text-white font-raleway">
            Hold the property you like:
          </h2>
          <p className="lg:text-xl text-base tracking-wide font-light text-white mt-5">
            Users can navigate through a list of available shares for a specific
            vacation property and select the share they wish to reserve. Once
            chosen, the system secures the selected share for a period of two
            days. Users can then reserve their preferred time slot and have the
            option to "pay later" to finalize the reservation for the desired
            share, providing flexibility in the booking process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionAboutUs;
