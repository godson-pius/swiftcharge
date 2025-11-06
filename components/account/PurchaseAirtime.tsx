"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { IUser } from "@/app/interface";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AccountSidebar from "@/components/account/AccountSidebar";
import AccountNavbar from "@/components/account/AccountNavbar";
import Image from "next/image";
import { payForPlan } from "@/utils/caller";
import Modal from "../Modal";
import { FiXCircle } from "react-icons/fi";

interface IPlan {
  name: string;
  variation_code: string;
  variation_amount: string;
  fixedPrice: string;
}

const PurchaseData = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [selectedIdentifier, setSelectedIdentifier] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [pins, setPins] = useState<string[]>(["", "", "", ""]);
  const [showModal, setShowModal] = useState(false);
  const pinRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const router = useRouter();

  const handlePayWithCrypto = () => {
    toast.info("Payment with crypto is not yet implemented");
  };

  const handleGetDataVariation = async (identifier: string) => {};

  const handlePay = async () => {
    const token = user?.token as string;
    const data = {
      amount: selectedAmount,
      identifier: "airtime",
      phone: phone || user?.details.phone,
      serviceId: selectedIdentifier,
      pin: pins.join(""),
    };
    const toastId = toast.loading("Processing payment...");
    try {
      const response = await payForPlan(data, token);
      console.log(response);
      if (response.success) {
        setShowModal(false);
        const updatedUser = {
          details: response.data.user,
          token: user?.token || token,
        };
        typeof window !== "undefined" &&
          window.localStorage.setItem("swiftuser", JSON.stringify(updatedUser));
        toast.success(
          `Airtime purchase sent to ${phone || user?.details.phone}`,
          { autoClose: false },
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to process payment");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handlePinChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newPins = [...pins];
    newPins[index] = e.target.value;
    setPins(newPins);

    if (index < 3) {
      pinRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (!pins[index] && index > 0) {
        pinRefs[index - 1].current?.focus();
      } else if (pins[index]) {
        // Clear the current digit
        const newPin = [...pins];
        newPin[index] = "";
        setPins(newPin);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = window.localStorage.getItem("swiftuser");
      if (!userData) {
        router.push("/login");
        return;
      }

      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        window.localStorage.removeItem("swiftuser"); // Clean up corrupted data
        router.push("/login");
      }
    }
  }, [router]);

  return (
    <main className="w-full flex items-start bg-base-200 h-screen">
      <AccountSidebar />

      <div className="w-full ml-72">
        <AccountNavbar />

        <section className={"mx-5 mt-14 h-40"}>
          <hr className="my-5" />
          <div className="rounded-lg">
            <input
              type="text"
              name="phone"
              defaultValue={user?.details?.phone}
              className="p-2 duration-700 focus:glass bg-white w-full text-sm outline-none rounded"
              placeholder="Enter phone number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <section className="my-4">
            <h2>Network</h2>
            <div className="flex gap-3 items-start my-3">
              <button
                className={`flex flex-col ${selectedIdentifier === "mtn" ? "bg-yellow-100" : "bg-white"} w-full p-4 items-center gap-1 justify-center rounded-lg duration-700 hover:scale-105`}
                onClick={() => {
                  setSelectedIdentifier("mtn");
                  handleGetDataVariation("mtn-data");
                }}
              >
                <Image
                  src={"/account/mtn.webp"}
                  alt="MTN Logo"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <span className="font-semibold">Mtn</span>
              </button>

              <button
                className={`flex flex-col ${selectedIdentifier === "airtel" ? "bg-red-100" : "bg-white"} w-full p-4 items-center gap-1 justify-center rounded-lg duration-700 hover:scale-105`}
                onClick={() => {
                  setSelectedIdentifier("airtel");
                  handleGetDataVariation("airtel");
                }}
              >
                <Image
                  src={"/account/airtel.webp"}
                  alt="Airtel Logo"
                  width={43}
                  height={43}
                  className="rounded-full"
                />
                <span className="font-semibold">Airtel</span>
              </button>

              <button
                className={`flex flex-col ${selectedIdentifier === "glo" ? "bg-green-100" : "bg-white"} w-full p-4 items-center gap-1 justify-center rounded-lg duration-700 hover:scale-105`}
                onClick={() => {
                  setSelectedIdentifier("glo");
                  handleGetDataVariation("glo");
                }}
              >
                <Image
                  src={"/account/glo.webp"}
                  alt="Glo Logo"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <span className="font-semibold">Glo</span>
              </button>

              <button
                className={`flex flex-col ${selectedIdentifier === "etisalet" ? "bg-sky-100" : "bg-white"} w-full p-4 items-center gap-1 justify-center rounded-lg duration-700 hover:scale-105`}
                onClick={() => {
                  setSelectedIdentifier("etisalet");
                  handleGetDataVariation("9mobile");
                }}
              >
                <Image
                  src={"/account/9mobile.webp"}
                  alt="9Mobile Logo"
                  width={70}
                  height={70}
                  className="rounded-full"
                />
                <span className="font-semibold">9Mobile</span>
              </button>
            </div>
          </section>

          <div className="flex justify-between">
            <p>Enter amount or select airtime amount</p>
            <p className="font-semibold">
              Balance: ₦{user?.details?.balance.toLocaleString() || "0.00"}
            </p>
          </div>

          <div className="flex flex-col col-span-2 lg:col-span-1 my-5">
            <input
              type="number"
              placeholder="0.00"
              value={selectedAmount || ""}
              onChange={(e) => setSelectedAmount(+e.target.value)}
              className="input ring-1 ring-gray-200 bg-white rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 items-center">
            <button
              onClick={() => {
                setSelectedAmount(100);
              }}
              className={`w-full p-3 ${selectedAmount === 100 ? "bg-blue-500 glass text-white" : "bg-white"} rounded-lg font-semibold duration-700 hover:bg-blue-500 hover:text-white`}
            >
              <p>₦ 100</p>
            </button>

            <button
              onClick={() => {
                setSelectedAmount(200);
              }}
              className={`w-full p-3 ${selectedAmount === 200 ? "bg-blue-500 glass text-white" : "bg-white"} rounded-lg font-semibold duration-700 hover:bg-blue-500 hover:text-white`}
            >
              <p>₦ 200</p>
            </button>

            <button
              onClick={() => {
                setSelectedAmount(500);
              }}
              className={`w-full p-3 ${selectedAmount === 500 ? "bg-blue-500 glass text-white" : "bg-white"} rounded-lg font-semibold duration-700 hover:bg-blue-500 hover:text-white`}
            >
              <p>₦ 500</p>
            </button>

            <button
              onClick={() => {
                setSelectedAmount(1000);
              }}
              className={`w-full p-3 ${selectedAmount === 1000 ? "bg-blue-500 glass text-white" : "bg-white"} rounded-lg font-semibold duration-700 hover:bg-blue-500 hover:text-white`}
            >
              <p>₦ 1,000</p>
            </button>

            <button
              onClick={() => {
                setSelectedAmount(2000);
              }}
              className={`w-full p-3 ${selectedAmount === 2000 ? "bg-blue-500 glass text-white" : "bg-white"} rounded-lg font-semibold duration-700 hover:bg-blue-500 hover:text-white`}
            >
              <p>₦ 2,000</p>
            </button>

            <button
              onClick={() => {
                setSelectedAmount(5000);
              }}
              className={`w-full p-3 ${selectedAmount === 5000 ? "bg-blue-500 glass text-white" : "bg-white"} rounded-lg font-semibold duration-700 hover:bg-blue-500 hover:text-white`}
            >
              <p>₦ 5,000</p>
            </button>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={() => {
                pinRefs[0].current?.focus();
                setShowModal(true);
              }}
              type="button"
              disabled={!selectedAmount || !selectedIdentifier}
              className="w-96 btn text-blue-100 bg-blue-500 hover:bg-blue-200 hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:shadow-lg rounded-lg px-10 duration-700 my-2"
            >
              Proceed to payment
            </button>
          </div>
        </section>
      </div>

      <Modal isOpen={showModal}>
        <div className="flex flex-col items-start gap-3">
          <div className="w-full flex justify-between">
            <p className="text-sm">Enter security pin</p>
            <FiXCircle
              className="text-xl cursor-pointer duration-500 hover:scale-105 bg-gradient-to-tr from-blue-500 to-blue-700 bg-clip-text"
              onClick={() => {
                setPins(["", "", "", ""]);
                setShowModal(false);
              }}
            />
          </div>
          <div className="flex items-center gap-4">
            {pins.map((pin, index) => (
              <input
                key={index}
                type="password"
                maxLength={1}
                inputMode="numeric"
                ref={pinRefs[index]}
                value={pin}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onChange={(e) => handlePinChange(e, index)}
                className="w-12 h-12 border border-gray-300 rounded-md text-center text-lg"
              />
            ))}
          </div>
          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={() => handlePay()}
              type="button"
              disabled={!selectedAmount || !selectedIdentifier}
              className="btn text-blue-100 bg-blue-500 hover:bg-blue-200 hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:shadow-lg rounded-lg px-10 duration-700 my-2"
            >
              Buy Airtime
            </button>
            <button
              onClick={() => handlePayWithCrypto()}
              type="button"
              disabled={true}
              className="btn text-blue-100 bg-blue-500 hover:bg-blue-200 hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:shadow-lg rounded-lg px-10 duration-700 my-2"
            >
              Buy with crypto (coming soon)
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
};
export default PurchaseData;
