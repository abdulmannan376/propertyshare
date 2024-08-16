"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const CodeVerificationInput = (userEmail) => {
  const [inputs, setInputs] = useState(new Array(6).fill(""));
  const inputRefs = useRef(new Array(6).fill().map(() => React.createRef()));
  const [secondsLeft, setSecondsLeft] = useState(30);

  const router = useRouter();

  useEffect(() => {
    if (secondsLeft) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [secondsLeft]);

  const handleChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);

    if (index < 5 && event.target.value) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleKeyUp = (index, event) => {
    if (event.key === "Backspace" && index > 0 && !inputs[index]) {
      inputRefs.current[index - 1].current.focus();
    }
    if (event.key === "Enter") {
      () => handleSubmission(event);
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      let codeString = "";
      inputs.map((input) => (codeString += input));

      const data = {
        email: userEmail.userEmail,
        code: codeString,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/verify-email`,
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
        // toast.success(response.message, {
        //   position: "bottom-center",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
        setTimeout(() => {
          router.push("/login");
        }, 5100);
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

  const handleGenNewVerificationCode = async (e) => {
    e.preventDefault();
    try {
        console.log(userEmail)
      const data = {
        email: userEmail.userEmail,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/gen-new-verification-code`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data)
        }
      );

      const response = await res.json();
      if (response.success) {
        // toast.success(response.message, {
        //   position: "bottom-center",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
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
    <>
      <div
        className="my-10"
        style={{ display: "flex", justifyContent: "center", gap: "10px" }}
      >
        {inputs.map((input, index) => (
          <input
            key={index}
            ref={inputRefs.current[index]}
            type="text"
            maxLength="1"
            value={input}
            onChange={(event) => handleChange(index, event)}
            onKeyUp={(event) => handleKeyUp(index, event)}
            className="rounded-md outline-none"
            style={{
              width: "40px",
              height: "40px",
              textAlign: "center",
              fontSize: "24px",
            }}
          />
        ))}
      </div>
      <div className="my-3 flex flex-col items-center justify-center">
        <button
          type="button"
          onClick={handleSubmission}
          className="lg:w-[252px] md:w-[252px] bg-[#FFFDF4] bg-opacity-[65%] rounded border border-[#CACACA] text-[#676767] text-lg text-center p-3 mb-5"
        >
          Submit
        </button>
        <h1 className="text-[#676767] text-center">
          Did not receive a code? Try again in{" "}
          <strong>{secondsLeft} seconds.</strong>
          <button
            disabled={secondsLeft > 0 ? true : false}
            type="button"
            onClick={handleGenNewVerificationCode}
            className="disabled:hidden text-[#676767] underline px-2 font-semibold"
          >
            Send Again
          </button>
        </h1>
      </div>
    </>
  );
};

export default CodeVerificationInput;
