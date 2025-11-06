"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IUser, IVariation } from "@/app/interface";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import AccountSidebar from "@/components/account/AccountSidebar";
import AccountNavbar from "@/components/account/AccountNavbar";
import Image from "next/image";
import { getProductVariations, payForPlan } from "@/utils/caller";
import Modal from "../Modal";

const PurchaseData = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [details, setDetails] = useState({});
  const [selectedIdentifier, setSelectedIdentifier] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [plans, setPlans] = useState<IVariation[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const router = useRouter();

  const handlePayWithCrypto = () => {
    toast.info("Payment with crypto is not yet implemented");
  };

  const handleGetDataVariation = async (identifier: string) => {
    setPlans([]);
    const toastId = toast.loading("Loading data plans...");
    try {
      const response = await getProductVariations(identifier);
      if (response.success) {
        setPlans(response.data.variations);
        toast.dismiss(toastId);
        toast.success("Data plans loaded successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load data plans");
      toast.dismiss(toastId);
    }
  };

  const handlePay = async () => {
    const toastId = toast.loading("Processing payment...");
    const getPlan = plans.filter(
      (plan) => plan.variation_code === selectedPlan,
    );
    const token = user?.token as string;
    const data = {
      amount: +getPlan[0].variation_amount,
      identifier: "data",
      phone: phone || user?.details.phone,
      serviceId: selectedIdentifier,
      variationCode: getPlan[0].variation_code,
    };
    try {
      const response = await payForPlan(data, token);
      console.log(response);
      if (response.success) {
        toast.dismiss(toastId);
        const updatedUser = {
          details: response.data.user,
          token: user?.token || token,
        };
        typeof window !== "undefined" &&
          window.localStorage.setItem("swiftuser", JSON.stringify(updatedUser));
        toast.success(`Data sent to ${phone || user?.details.phone}`, {
          autoClose: false,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send data, please try again!");
      toast.dismiss(toastId);
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
                className={`flex flex-col ${selectedIdentifier === "mtn-data" ? "bg-yellow-100" : "bg-white"} w-full p-4 items-center gap-1 justify-center rounded-lg duration-700 hover:scale-105`}
                onClick={() => {
                  setSelectedPlan("");
                  setSelectedIdentifier("mtn-data");
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
                className={`flex flex-col ${selectedIdentifier === "airtel-data" ? "bg-red-100" : "bg-white"} w-full p-4 items-center gap-1 justify-center rounded-lg duration-700 hover:scale-105`}
                onClick={() => {
                  setSelectedPlan("");
                  setSelectedIdentifier("airtel-data");
                  handleGetDataVariation("airtel-data");
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
                className={`flex flex-col ${selectedIdentifier === "glo-data" ? "bg-green-100" : "bg-white"} w-full p-4 items-center gap-1 justify-center rounded-lg duration-700 hover:scale-105`}
                onClick={() => {
                  setSelectedPlan("");
                  setSelectedIdentifier("glo-data");
                  handleGetDataVariation("glo-data");
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
                className={`flex flex-col ${selectedIdentifier === "etisalet-data" ? "bg-sky-100" : "bg-white"} w-full p-4 items-center gap-1 justify-center rounded-lg duration-700 hover:scale-105`}
                onClick={() => {
                  setSelectedPlan("");
                  setSelectedIdentifier("etisalet");
                  handleGetDataVariation("etisalet-data");
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
            <p>Select data plan</p>
            <p className="font-semibold">
              Balance: ₦{user?.details?.balance.toLocaleString() || "0.00"}
            </p>
          </div>

          <div className="flex flex-col col-span-2 lg:col-span-1 my-5">
            <select
              defaultValue={"select"}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="select ring-1 ring-gray-200 bg-white rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500"
            >
              <option value={"select"} disabled className="option">
                Select plan
              </option>

              {plans.map((plan) => (
                <option key={plan.variation_code} value={plan.variation_code}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handlePay()}
              type="button"
              disabled={!selectedPlan}
              className="w-96 btn text-blue-100 bg-blue-500 hover:bg-blue-200 hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:shadow-lg rounded-lg px-10 duration-700 my-2"
            >
              Buy Data
            </button>
            <button
              onClick={() => handlePayWithCrypto()}
              type="button"
              disabled={true}
              className="w-96 btn text-blue-100 bg-blue-500 hover:bg-blue-200 hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:shadow-lg rounded-lg px-10 duration-700 my-2"
            >
              Buy with crypto (coming soon)
            </button>
          </div>
        </section>
      </div>

      <Modal isOpen={false}>
        <p>This is a modal content.</p>
      </Modal>
    </main>
  );
};
export default PurchaseData;
