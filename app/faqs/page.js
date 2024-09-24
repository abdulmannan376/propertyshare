"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateBgColor,
  updateCurrentPageValue,
  updateNavbarLogo,
  updateNavbarTextColor,
  updateNotificationIconColor,
} from "../redux/features/navbarSlice";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const faqList = [
  {
    question: "What is Beach Bunny House?",
    answer:
      "Beach Bunny House is a real estate platform that helps users find and own their dream vacation homes.",
  },
  {
    question: "What can I do on the website?",
    answer:
      "You can buy and rent shares, and discover more about locations on the website.",
  },
  {
    question: "How can I contact Beach Bunny House?",
    answer:
      "You can contact us through our office number, email, or by filling out the contact form on our website.",
  },
  {
    question: "What is the purpose of the website?",
    answer:
      "The purpose of the website is to help users find and own their dream vacation homes.",
  },
  {
    question: "Is there a privacy policy?",
    answer: "Yes, there is a privacy policy available on the website.",
  },
  {
    question: "Can I rent a house through the website?",
    answer: "Yes, you can rent a house through the website by renting shares.",
  },
  {
    question: "What is the main purpose of the proposed project?",
    answer:
      "Our project aims to facilitate temporary vacation stays through a unique model of property sharing.",
  },
  {
    question: "How many weeks can I stay in a property each year?",
    answer:
      "Each share entitles the holder to 2 weeks of stay annually. Shareholders have the option to purchase additional shares for extended stays.",
  },
  {
    question: "How many shares are available for each property?",
    answer:
      "A maximum of 25 shares are available per property. These shares can be owned individually or jointly by up to 25 individuals.",
  },
  {
    question: "What happens to the share that is reserved for the company?",
    answer: "The company retains one share (the 26th share) for itself.",
  },
  {
    question: "How are the time periods for stays allocated to shareholders?",
    answer:
      "The company manages the allocation of specific time periods to each shareholder and oversees the rotation of allotted weeks to ensure fairness.",
  },
  {
    question: "Can shareholders exchange their allocated weeks?",
    answer:
      "Yes, shareholders have the flexibility to exchange weeks among themselves.",
  },
  {
    question: "How can I buy, sell, or rent shares in vacation properties?",
    answer:
      "All transactions for buying, selling, renting, and exchanging shares must be conducted legally through our company platform.",
  },
  {
    question: "What other features does the platform offer?",
    answer:
      "Our platform provides features for property management, share allocation, and communication among shareholders.",
  },
  {
    question:
      "What is the main objective of the vacation property share management project?",
    answer:
      "The primary objective is to enhance vacation experiences by providing a user-friendly web application for managing vacation property shares.",
  },
  {
    question:
      "How does the web application facilitate buying and selling shares?",
    answer:
      "The application allows users to buy and sell shares, rent out or exchange their allocated time in vacation properties.",
  },
  {
    question: "How will shareholders communicate with each other?",
    answer:
      "The platform enables efficient communication and interaction among shareholders.",
  },
  {
    question: "What property management capabilities will be provided?",
    answer:
      "The company will leverage AI-driven decision-making to optimize property acquisition strategies.",
  },
  {
    question: "Can individuals sell their properties through the platform?",
    answer:
      "Yes, individuals can easily reach out to the company to sell their properties.",
  },
  {
    question: "Can shareholders swap their allotted time with others?",
    answer:
      "Yes, shareholders can request swaps of their allotted time with other shareholders.",
  },
  {
    question: "How can I buy, sell, or rent shares in vacation properties?",
    answer:
      "All transactions for buying, selling, renting, and exchanging shares must be conducted legally through our company platform.",
  },
  {
    question: "What other features does the platform offer?",
    answer:
      "Our platform provides features for property management, share allocation, and communication among shareholders.",
  },
  {
    question:
      "What is the main objective of the vacation property share management project?",
    answer:
      "The primary objective is to enhance vacation experiences by providing a user-friendly web application for managing vacation property shares.",
  },
  {
    question:
      "How does the web application facilitate buying and selling shares?",
    answer:
      "The application allows users to buy and sell shares, rent out or exchange their allocated time in vacation properties.",
  },
  {
    question: "How will shareholders communicate with each other?",
    answer:
      "The platform enables efficient communication and interaction among shareholders.",
  },
  {
    question: "What property management capabilities will be provided?",
    answer:
      "The company will leverage AI-driven decision-making to optimize property acquisition strategies.",
  },
  {
    question: "Can individuals sell their properties through the platform?",
    answer:
      "Yes, individuals can easily reach out to the company to sell their properties.",
  },
  {
    question: "Can shareholders swap their allotted time with others?",
    answer:
      "Yes, shareholders can request swaps of their allotted time with other shareholders.",
  },
  {
    question: "Can a user secure a share without buying it?",
    answer:
      "The system allows users to secure a share by placing a hold on it for a maximum of two days. During this period, the share cannot be purchased by any other user, ensuring exclusivity.",
  },
  {
    question:
      "What happens if a user cannot complete the purchase transaction within the two-day holding period?",
    answer:
      "If the user fails to transfer the necessary funds and data within the two-day period, the held share will become available for purchase by other users again.",
  },
  {
    question:
      "Can a shareholder exchange or rent their second week if they cannot utilize it?",
    answer:
      "Yes, if a shareholder cannot take their second week due to scheduling conflicts, they can offer it for exchange or rent to other shareholders first. If nobody is interested, it can be made available for rent to the entire community.",
  },
  {
    question:
      "What is the process for determining which shareholders get access to weeks if multiple shareholders have shares?",
    answer:
      "The allocation of weeks is handled by the system on a rotating basis to ensure fairness in access among shareholders.",
  },
  {
    question:
      "If a shareholder wants to stay at the property in a different time frame, what options do they have?",
    answer:
      "A shareholder can choose to exchange their designated weeks with other shareholders or rent out their weeks to community members if they are unable to utilize them.",
  },
  {
    question: "How is the price of each share dependent on the property?",
    answer:
      "The price of each share is determined based on the purchase price of the property, which ensures that shareholders are investing in a value proportional to the property's worth.",
  },
  {
    question:
      "What happens if no shareholders are interested in renting an unused week?",
    answer:
      "If no shareholders show interest in renting an unused week, the week will be offered to the entire community to maximize utilization of the property.",
  },
  {
    question:
      "What responsibilities does a shareholder have regarding data submission after the purchase?",
    answer:
      "After purchasing shares, the shareholder must submit the necessary data to the company for proper allocation and record-keeping of their stay.",
  },
  {
    question:
      "How far in advance can a shareholder reserve their week for next year?",
    answer:
      "A shareholder can reserve their two consecutive weeks for usage two weeks later the following year, following the system's rotation principle for fairness in access.",
  },
  {
    question:
      "How does the company ensure the equitable distribution of operating costs and housing fees among the shareholders?",
    answer:
      "The company allocates the operating costs and housing fees to the 25 shareholders based on their ownership share, ensuring that each individual's expenses are proportional to their investment.",
  },
  {
    question:
      "What factors are considered when allocating specific weeks to shareholders?",
    answer:
      "The allocation considers each shareholder's share ownership, previous stays, and personal preferences to ensure a fair distribution of vacation time.",
  },
  {
    question:
      "How can shareholders request specific weeks for their vacation time?",
    answer:
      "Shareholders can request particular weeks or exchange their allotted weeks with others, facilitating flexibility in their scheduling without any commission fee imposed by the company.",
  },
  {
    question:
      "What processes are in place for shareholders who wish to rent out their allotted time?",
    answer:
      "Shareholders can list their designated vacation weeks for rent, although a commission must be paid to the company for facilitating the rental transaction.",
  },
  {
    question:
      "In what ways does the AI integration assist the company in assessing potential properties for purchase?",
    answer:
      "AI algorithms analyze various factors such as location, climate, tourism, amenities, and property features to identify promising investment opportunities that align with shareholder interests.",
  },
  {
    question:
      "How can users effectively save their desired locations for future reference?",
    answer:
      "Users can mark their favorite locations on a map interface through a mouse click, allowing them to specify their preferences within a 2km radius for potential vacation properties.",
  },
];

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
        tag: "FAQs",
        bgColor: "bg-white",
        textColor: "text-[#116A7B]",
      })
    );
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null); // Collapse the answer if clicked again
    } else {
      setActiveIndex(index); // Show the answer for the clicked question
    }
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const faqsPerPage = 12;

  // Calculate the indices of the FAQs to display
  const indexOfLastFaq = currentPage * faqsPerPage;
  const indexOfFirstFaq = indexOfLastFaq - faqsPerPage;
  const currentFaqs = faqList.slice(indexOfFirstFaq, indexOfLastFaq);

  const totalPages = Math.ceil(faqList.length / faqsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="w-full h-20 bg-[#116A7B]"></div>
      <div className="container mx-auto min-h-[90vh] sm:px-28 py-10">
        <h1 className="text-3xl font-bold mb-5 text-center">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {currentFaqs.map((faq, index) => {
            const faqIndex = indexOfFirstFaq + index; // Actual index in faqList
            return (
              <div key={faqIndex} className="border-b pb-3">
                <button
                  className="text-lg font-medium text-left w-full focus:outline-none"
                  onClick={() => toggleAnswer(faqIndex)}
                >
                  {faq.question}
                </button>
                {activeIndex === faqIndex && (
                  <p className="mt-3 text-gray-600">{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-5 space-x-5">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 disabled:opacity-30 text-[#116A7B]`}
          >
            <FaArrowCircleLeft className="text-xl" />
          </button>
          {/* Page numbers */}
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageClick(i + 1)}
              className={`px-3 py-1 rounded-full ${
                currentPage === i + 1
                  ? "bg-[#116A7B] text-white"
                  : "bg-transparent"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 disabled:opacity-30 text-[#116A7B]`}
          >
            <FaArrowCircleRight className="text-xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
