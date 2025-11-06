"use client";

import React, { useEffect, useState } from "react";
import { ITransaction, IUser, IVariation } from "@/app/interface";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AccountSidebar from "@/components/account/AccountSidebar";
import AccountNavbar from "@/components/account/AccountNavbar";
import {
  getProductVariations,
  getProducts,
  payForPlan,
  verifyIUC,
} from "@/utils/caller";
import Modal from "../Modal";
import { FiCopy, FiLoader, FiXCircle } from "react-icons/fi";

interface ICable {
  name: string;
  serviceID: string;
  minimium_amount: string;
  maximum_amount: string;
  convinience_fee: string;
  product_type: string;
  image: string;
}

const BillPayment = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [details, setDetails] = useState<ITransaction | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [cables, setCables] = useState<ICable[]>([]);
  const [plans, setPlans] = useState<IVariation[]>([]);
  const [selectedCable, setSelectedCable] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [subscriptionType, setSubscriptionType] = useState<string>("");
  const [iucNumber, setIucNumber] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [detailsModal, setDetailsModal] = useState<boolean>(false);
  const [verificationMessage, setVerificationMessage] = useState<string>("");
  const [checkingIUC, setCheckingIUC] = useState<boolean>(false);
  const router = useRouter();

  const handlePayWithCrypto = () => {
    toast.info("Payment with crypto is not yet implemented");
  };

  const handleGetCableVariation = async (identifier: string) => {
    setPlans([]);
    const toastId = toast.loading("Loading cable packages...");
    try {
      const response = await getProductVariations(identifier);
      if (response.success) {
        setPlans(response.data.variations);
        toast.dismiss(toastId);
        toast.success("Cable packages loaded successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load cable packages");
      toast.dismiss(toastId);
    }
  };

  const getCables = async () => {
    const toastId = toast.loading("Loading cables...");
    try {
      const response = await getProducts("tv-subscription");
      if (response.success) {
        setCables(response.data);
        toast.dismiss(toastId);
        toast.success("Cables loaded successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load cables");
      toast.dismiss(toastId);
    }
  };

  const handleVerifyIUC = async () => {
    setCheckingIUC(true);
    const getPlan = plans.filter(
      (plan) => plan.variation_code === selectedPlan,
    );

    const dataToVerify = {
      serviceId: selectedCable,
      variationCode: getPlan[0].variation_code,
      billersCode: iucNumber,
    };

    const response = await verifyIUC(dataToVerify);
    if (response.success) {
      setVerificationMessage(
        response.data.verificationData.content?.Customer_Name,
      );
      setCheckingIUC(false);
    } else {
      setVerificationMessage(response.message);
      setCheckingIUC(false);
    }
    return response;
  };

  const handlePay = async () => {
    const toastId = toast.loading("Processing payment...");
    const token = user?.token as string;
    setDetails(null);

    const getPlan = plans.filter(
      (plan) => plan.variation_code === selectedPlan,
    );

    // const dataToVerify = {
    //   serviceId: selectedCable,
    //   variationCode: getPlan[0].variation_code,
    //   billersCode: iucNumber,
    // };
    const getVerificationRes = await handleVerifyIUC();
    if (getVerificationRes.success) {
      const data = {
        amount: 9000,
        // amount: +amount,
        identifier: "tv-subscription",
        variationCode: getPlan[0].variation_code,
        phone: phone || user?.details.phone,
        serviceId: selectedCable,
        billersCode: iucNumber,
      };
      try {
        const response = await payForPlan(data, token);
        if (response.success) {
          toast.dismiss(toastId);
          const updatedUser = {
            details: response.data.user,
            token: user?.token || token,
          };
          typeof window !== "undefined" &&
            window.localStorage.setItem(
              "swiftuser",
              JSON.stringify(updatedUser),
            );
          // setDetails(response.data.transaction.bill.metaData);
          // setDetailsModal(true);
          toast.success(`Subscription was successful`, {
            autoClose: false,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to make payment, please try again!");
        toast.dismiss(toastId);
      }
    } else {
      toast.error(`${getVerificationRes.message}`);
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
    getCables();
  }, [router]);

  return (
    <main className="w-full flex items-start bg-base-200 h-screen">
      <AccountSidebar />

      <div className="w-full ml-72">
        <AccountNavbar />

        <section className={"mx-5 mt-14 h-40"}>
          <hr className="my-5" />
          <div className="flex justify-between">
            <p>Cable Subscription</p>
            <p className="font-semibold">
              Balance: ₦{user?.details?.balance.toLocaleString() || "0.00"}
            </p>
          </div>

          <div className="flex flex-col col-span-2 lg:col-span-1 my-5 gap-1">
            <select
              defaultValue={"select"}
              onChange={(e) => {
                setSelectedCable(e.target.value);
                handleGetCableVariation(e.target.value);
              }}
              className="select ring-1 ring-gray-200 bg-white rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500"
            >
              <option value={"select"} disabled className="option">
                Select cable tv
              </option>

              {cables.map((cable) => (
                <option key={cable.serviceID} value={cable.serviceID}>
                  {cable.name}
                </option>
              ))}
            </select>

            <select
              defaultValue={"select"}
              disabled={!selectedCable}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="select ring-1 ring-gray-200 bg-white rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500"
            >
              <option value={"select"} disabled className="option">
                Select package
              </option>

              {plans.map((plan) => (
                <option key={plan.variation_code} value={plan.variation_code}>
                  {plan.name}
                </option>
              ))}
            </select>

            <div>
              <input
                type="number"
                name="iucNumber"
                value={iucNumber}
                onBlur={() => handleVerifyIUC()}
                onChange={(e) => {
                  setIucNumber(e.target.value);
                }}
                className="input duration-700 focus:glass bg-white w-full text-sm outline-none rounded-lg mt-1"
                placeholder="Enter smartCard/IUC Number"
              />
              <p className="text-xs mt-2 ml-3 text-gray-500">
                {checkingIUC ? (
                  <p className="flex items-center gap-1 text-blue-500 animate-pulse">
                    <FiLoader className="animate-spin" /> Checking IUC...
                  </p>
                ) : (
                  verificationMessage
                )}
              </p>
            </div>

            <select
              defaultValue={"select"}
              onChange={(e) => setSubscriptionType(e.target.value)}
              className="select ring-1 ring-gray-200 bg-white rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500"
            >
              <option value={"select"} disabled className="option">
                Select subscription type
              </option>

              <option value={"renew"}>Renew</option>
              <option value={"change"}>Change</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handlePay()}
              type="button"
              disabled={!selectedCable || !subscriptionType || !iucNumber}
              className="w-96 btn text-blue-100 bg-blue-500 hover:bg-blue-200 hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:shadow-lg rounded-lg px-10 duration-700 my-2"
            >
              Pay Bill
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

      <Modal isOpen={detailsModal}>
        <div className="flex flex-col items-start gap-3">
          <div className="w-full flex justify-between">
            <p className="text-sm">Electricity token</p>
            <FiXCircle
              className="text-xl cursor-pointer duration-500 hover:scale-105"
              onClick={() => setDetailsModal(false)}
            />
          </div>
        </div>
      </Modal>
    </main>
  );
};
export default BillPayment;
