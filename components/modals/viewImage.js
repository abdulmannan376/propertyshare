import { errorAlert, successAlert } from "@/utils/alert";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

Modal.setAppElement("#app-body");

const ViewImageModal = ({ isOpen, onClose, imageSrc }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          // border: "1px solid #ccc",
          background: "transparent",
          borderRadius: "15px",
          outline: "none",
          padding: "5px",
          width: "full",
        },
      }}
    >
      <div className="sm:p-10 p-5 lg:w-[30vw] md:w-[50vw] sm:w-[70vw] w-[95vw] bg-white rounded-2xl max-h-[70vh] overflow-y-auto">
        <Image
          width={2000}
          height={2000}
          src={imageSrc}
          className="w-[30vw] h-auto object-cover object-center mx-auto"
        />
      </div>
    </Modal>
  );
};

export default ViewImageModal;
