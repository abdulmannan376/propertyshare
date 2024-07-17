import React, { useEffect, useState } from "react";
import CurrencyList from "currency-list";
import { toast } from "react-toastify";
import ChangePasswordModal from "@/components/modals/changePassword";

const AccountSetting = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [notifyUpdates, setNotifyUpdates] = useState([]);
  const [notifyMessages, setNotifyMessages] = useState([]);

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // Set a minimum display time for the loader of 2 seconds
    const timeoutId = setTimeout(() => {
      setPageLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId); // Clear the timeout if the component unmounts
    };
  }, [notifyUpdates]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/get-default-settings/${
          JSON.parse(localStorage.getItem("userDetails")).username
        }`
      );

      const response = await res.json();
      console.log("response: ", response);
      if (response.success) {
        setNotifyMessages(response.body.notifyMessages);
        setNotifyUpdates(response.body.notifyUpdates);
        setSelectedLanguage(response.body.languageChoosen);
        setCurrencyList(CurrencyList.getAll(response.body.languageChoosen));
        setSelectedCurrency(response.body.currencyShortName);
        setSelectedCurrencySymbol(response.body.currencySymbol);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleNotifyUpdates = (action, value) => {
    setNotifyUpdates((prevDetails) => {
      const newDetails = [...prevDetails];
      if (action === "add") {
        newDetails.push(value);
        return newDetails;
      } else {
        const removedEntryFromList = newDetails.filter(
          (entry) => entry !== value
        );
        return removedEntryFromList;
      }
    });
  };

  const handleNotifyMessages = (action, value) => {
    setNotifyMessages((prevDetails) => {
      const newDetails = [...prevDetails];
      if (action === "add") {
        newDetails.push(value);
        return newDetails;
      } else {
        const removedEntryFromList = newDetails.filter(
          (entry) => entry !== value
        );
        return removedEntryFromList;
      }
    });
  };

  const languageList = ["Select", "en_US"];

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedCurrencySymbol, setSelectedCurrencySymbol] = useState("");
  const [currencyList, setCurrencyList] = useState({});

  useEffect(() => {
    if (selectedLanguage) {
      setCurrencyList(CurrencyList.getAll("en_US"));
    } else {
      setCurrencyList({});
    }
  }, [selectedLanguage]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const data = {
        currencySymbol: selectedCurrencySymbol,
        currencyShortName: selectedCurrency,
        languageChoosen: selectedLanguage,
        notifyUpdates: notifyUpdates,
        notifyMessages: notifyMessages,
      };

      console.log("data: ", data);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}/user/update-account-settings/${
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
      console.log("response: ", response);

      if (response.success) {
        toast.success(response.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
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
      {pageLoading ? (
        <div className="bg-white w-full my-6 h-[40rem] max-h-[44rem] overflow-y-auto flex flex-row items-center justify-center">
          <div className="border-t-4 border-b-4 border-[#116A7B] bg-transparent h-20 p-2 m-3 animate-spin duration-[2200] shadow-lg w-20 mx-auto rounded-full"></div>
        </div>
      ) : (
        <>
          <div className="w-full xxl:mx-24 xl:mx-16 lg:mx-10 mx-16">
            <div className="w-full flex flex-col items-start pb-8 my-16">
              <h1 className="text-xl text-[#09363F] font-semibold">
                Notification Settings
              </h1>
              <div className="my-7 flex flex-col space-y-3">
                <h2 className="text-lg text-[#116A7B]">
                  Notify me about all updates through
                </h2>
                <div>
                  <input
                    type="checkbox"
                    name="updateByEmail"
                    checked={notifyUpdates.includes("email")}
                    onChange={({ target }) => {
                      if (target.checked) {
                        handleNotifyUpdates("add", "email");
                      } else {
                        handleNotifyUpdates("remove", "email");
                      }
                    }}
                  />
                  <label htmlFor="updateByEmail" className="text-lg">
                    {" "}
                    Email
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="updateByWebsite"
                    checked={notifyUpdates.includes("website")}
                    onChange={({ target }) => {
                      if (target.checked) {
                        handleNotifyUpdates("add", "website");
                      } else {
                        handleNotifyUpdates("remove", "website");
                      }
                    }}
                  />
                  <label htmlFor="updateByEmail" className="text-lg">
                    {" "}
                    Website
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="updateByContact"
                    checked={notifyUpdates.includes("contact")}
                    onChange={({ target }) => {
                      if (target.checked) {
                        handleNotifyUpdates("add", "contact");
                      } else {
                        handleNotifyUpdates("remove", "contact");
                      }
                    }}
                  />
                  <label htmlFor="updateByEmail" className="text-lg">
                    {" "}
                    Contact
                  </label>
                </div>
              </div>
              <div className="my-7 flex flex-col space-y-3">
                <h2 className="text-lg text-[#116A7B]">
                  Notify me about all messages through
                </h2>
                <div>
                  <input
                    type="checkbox"
                    name="updateByEmail"
                    checked={notifyMessages.includes("email")}
                    onChange={({ target }) => {
                      if (target.checked) {
                        handleNotifyMessages("add", "email");
                      } else {
                        handleNotifyMessages("remove", "email");
                      }
                    }}
                  />
                  <label htmlFor="updateByEmail" className="text-lg">
                    {" "}
                    Email
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="updateByWebsite"
                    checked={notifyMessages.includes("website")}
                    onChange={({ target }) => {
                      if (target.checked) {
                        handleNotifyMessages("add", "website");
                      } else {
                        handleNotifyMessages("remove", "website");
                      }
                    }}
                  />
                  <label htmlFor="updateByEmail" className="text-lg">
                    {" "}
                    Website
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="updateByContact"
                    checked={notifyMessages.includes("contact")}
                    onChange={({ target }) => {
                      if (target.checked) {
                        handleNotifyMessages("add", "contact");
                      } else {
                        handleNotifyMessages("remove", "contact");
                      }
                    }}
                  />
                  <label htmlFor="updateByEmail" className="text-lg">
                    {" "}
                    Contact
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-screen h-[2px] bg-[#D9D9D9]"></div>
          <div className="w-full xxl:mx-24 xl:mx-16 lg:mx-10 mx-16 my-16">
            <div className="space-y-5">
              <div className="flex flex-col space-y-3">
                <label htmlFor="language" className="text-xl text-[#116A7B]">
                  Language
                </label>
                <select
                  name="language"
                  value={selectedLanguage}
                  onChange={({ target }) => {
                    if (target.value === "Select") {
                      setSelectedLanguage("");
                    } else {
                      setSelectedLanguage(target.value);
                    }
                  }}
                  className="w-40 bg-[#D9D9D9] text-[#09363F] font-semibold rounded-lg px-3 py-2 focus:border-[#116A7B] outline-none"
                >
                  {languageList.map((lang, index) => (
                    <option key={index} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col space-y-3">
                <label htmlFor="currency" className="text-xl text-[#116A7B]">
                  Currency
                </label>
                <select
                  name="currency"
                  value={selectedCurrency}
                  onChange={({ target }) => {
                    if (target.value === "Select") {
                      setSelectedCurrency("");
                    } else {
                      setSelectedCurrency(currencyList[target.value].code);
                      setSelectedCurrencySymbol(
                        currencyList[target.value].symbol
                      );
                    }
                  }}
                  className="w-80 bg-[#D9D9D9] text-[#09363F] font-semibold rounded-lg px-3 py-2 focus:border-[#116A7B] outline-none"
                >
                  {currencyList &&
                    Object.keys(currencyList)?.map((currencyCode, index) => (
                      <option key={index} value={currencyCode}>
                        {currencyList
                          ? currencyList[currencyCode].name_plural
                          : "Select"}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col items-start space-y-3 my-20">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="text-xl text-[#A2B0B2] underline"
              >
                Change Password
              </button>
              <ChangePasswordModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
              />
              <button
                type="button"
                className="text-xl text-[#A2B0B2] underline"
              >
                Delete Account
              </button>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="w-60 bg-[#116A7B] text-white text-2xl font-medium px-7 py-3 rounded-full"
            >
              Save
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AccountSetting;
