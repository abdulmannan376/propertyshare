"use client";

import React, { useState } from "react";

const BuyShare = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-lg font-bold">Modal Title</h4>
          <button
            onClick={onClose}
            className="text-black text-lg font-semibold"
          >
            &times;
          </button>
        </div>
        <p>This is a modal component in Next.js using TailwindCSS.</p>
        <div className="mt-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyShare;
