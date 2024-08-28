"use client";

import { errorAlert, successAlert } from "@/utils/alert";
import { useState } from "react";
import { toast } from "react-toastify";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (newPassword !== confirmPassword) {
        throw new Error("New passwords do not match!");
      }
      const data = {
        currentPassword: currentPassword,
        newPassword: newPassword,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/change-login-password/${
          JSON.parse(localStorage.getItem("userDetails")).username
        }`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const response = await res.json();

      if (response.success) {
        successAlert("Success", response.message);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onClose();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      errorAlert("Error", error.message);
    }

    // Here, you would typically handle the password change logic or call an API
    console.log("Password changed:", { currentPassword, newPassword });
    // Close modal on successful change
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-[30rem] shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Change Password
          </h3>
          <form onSubmit={handleSubmit} className="mt-2 text-xl">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="my-5 px-5 py-3 w-full border border-[#116A7B] rounded-full outline-none"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="my-5 px-5 py-3 w-full border border-[#116A7B] rounded-full outline-none"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="my-5 px-5 py-3 w-full border border-[#116A7B] rounded-full outline-none"
              required
            />
            <div className="items-center py-3">
              <button
                type="submit"
                className="px-4 py-2 bg-[#116A7B] text-white text-base font-medium rounded-full w-full shadow-sm hover:bg-[#09363F] focus:outline-none"
              >
                Change Password
              </button>
            </div>
          </form>
          <div className="mt-2">
            <button
              type="button"
              className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
