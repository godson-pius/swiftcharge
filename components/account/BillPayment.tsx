"use client";

import React, { useEffect, useState } from "react";
import { ITransaction, IUser } from "@/app/interface";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AccountSidebar from "@/components/account/AccountSidebar";
import AccountNavbar from "@/components/account/AccountNavbar";
import { getProducts, payForPlan } from "@/utils/caller";
import Modal from "../Modal";
import { FiCopy, FiXCircle } from "react-icons/fi";

interface IFirm {
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
  const [firms, setFirms] = useState<IFirm[]>([]);
  const [selectedFirm, setSelectedFirm] = useState<string>("");
  const [selectedMeterType, setSelectedMeterType] = useState<string>("");
  const [meterNumber, setMeterNumber] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [detailsModal, setDetailsModal] = useState<boolean>(false);
  const router = useRouter();

  const handlePayWithCrypto = () => {
    toast.info("Payment with crypto is not yet implemented");
  };

  const getFirms = async () => {
    const toastId = toast.loading("Loading firms...");
    try {
      const response = await getProducts("electricity-bill");
      if (response.success) {
        setFirms(response.data);
        toast.dismiss(toastId);
        toast.success("Firms loaded successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load firms");
      toast.dismiss(toastId);
    }
  };

  const handlePay = async () => {
    const toastId = toast.loading("Processing payment...");
    const token = user?.token as string;
    setDetails(null);
    const data = {
      amount: +amount,
      identifier: "electricity-bill",
      variationCode: selectedMeterType,
      phone: phone || user?.details.phone,
      serviceId: selectedFirm,
      billersCode: meterNumber,
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
          window.localStorage.setItem("swiftuser", JSON.stringify(updatedUser));
        setDetails(response.data.transaction.bill.metaData);
        setDetailsModal(true);
        toast.success(`Electricity payment was successful`, {
          autoClose: false,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to make bill payment, please try again!");
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
    getFirms();
  }, [router]);

  return (
    <main className="w-full flex items-start bg-base-200 h-screen">
      <AccountSidebar />

      <div className="w-full ml-72">
        <AccountNavbar />

        <section className={"mx-5 mt-14 h-40"}>
          <hr className="my-5" />
          <div className="flex justify-between">
            <p>Electricity</p>
            <p className="font-semibold">
              Balance: ₦{user?.details?.balance.toLocaleString() || "0.00"}
            </p>
          </div>

          <div className="flex flex-col col-span-2 lg:col-span-1 my-5 gap-1">
            <input
              type="number"
              name="meterNumber"
              value={meterNumber}
              onChange={(e) => setMeterNumber(e.target.value)}
              className="input duration-700 focus:glass bg-white w-full text-sm outline-none rounded-lg mt-1"
              placeholder="Enter meter number"
            />

            <select
              defaultValue={"select"}
              onChange={(e) => setSelectedFirm(e.target.value)}
              className="select ring-1 ring-gray-200 bg-white rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500"
            >
              <option value={"select"} disabled className="option">
                Select electricity firm
              </option>

              {firms.map((firm) => (
                <option key={firm.serviceID} value={firm.serviceID}>
                  {firm.name}
                </option>
              ))}
            </select>

            <select
              defaultValue={"select"}
              onChange={(e) => setSelectedMeterType(e.target.value)}
              className="select ring-1 ring-gray-200 bg-white rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500"
            >
              <option value={"select"} disabled className="option">
                Select meter type
              </option>

              <option value={"prepaid"}>Prepaid</option>
              <option value={"postpaid"}>Postpaid</option>
            </select>

            <input
              type="number"
              name="amount"
              className="input duration-700 focus:glass bg-white w-full text-sm outline-none rounded-lg mt-1"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handlePay()}
              type="button"
              disabled={
                !selectedFirm || !selectedMeterType || !amount || !meterNumber
              }
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
          <h3 className="font-bold text-3xl">
            {details?.purchased_code
              ?.trim()
              .split(":")[1]
              .match(/.{1,3}/g)
              ?.join("-") || details?.mainToken}
          </h3>
          <p
            className="flex items-center gap-1 text-sm w-full justify-start cursor-pointer duration-500 hover:text-blue-500"
            onClick={() => {
              navigator.clipboard.writeText(
                (details?.purchased_code as string) ||
                  (details?.mainToken as string),
              );
              toast.info("Token copied!");
            }}
          >
            <FiCopy size={15} />
            copy
          </p>
        </div>
      </Modal>
    </main>
  );
};
export default BillPayment;
