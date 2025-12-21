"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IUser } from "@/app/interface";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import AccountSidebar from "@/components/account/AccountSidebar";
import AccountNavbar from "@/components/account/AccountNavbar";
import {FiCopy, FiXCircle} from "react-icons/fi";
import Modal from "@/components/Modal";
import {updateUserPin} from "@/utils/caller";

const AccountSettings = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [details, setDetails] = useState({});
  const [pinModalIsVisible, setPinModalIsVisible] = useState<boolean>(false);
  const [inputs, setInputs] = useState<Record<string, any>>({});


  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(details).length === 0)
      return toast.info("Nothing to update.");

    try {
      const res = await toast.promise(
        axios.put(`/api/users/me`, details, {
          headers: { Authorization: `TestBearer ${user!.token}` },
        }),
        {
          pending: "Updating account...",
          success: "Account Updated!",
        },
      );

      if (res.status == 200) {
        const details = {
          details: res.data.data.user,
          token: user!.token,
        };
        typeof window !== "undefined" &&
          window.localStorage.setItem("swiftuser", JSON.stringify(details));
      }
    } catch (e: any) {
      toast.error(e.response.data.error);
      if (e.response.data.error.includes("expired")) {
        return router.push("/login");
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleUpdatePin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await updateUserPin(inputs);
      console.log(res);
    } catch (e) {
      toast.error(`Could not update pin! Please try again later. ${e}`);
    }
  }

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

        <section className={"p-10 mt-16"}>
          <form
            className="w-full shadow h-max rounded-xl p-5"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className="flex flex-col col-span-2 lg:col-span-1">
                <label htmlFor="fullname">Full name</label>
                <input
                  defaultValue={user?.details.fullname}
                  onChange={handleChange}
                  type="fullname"
                  name="fullname"
                  id="fullname"
                  placeholder="Enter your fullname"
                  className="ring-1 ring-gray-200 p-3 rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500"
                />
              </div>

              <div className="flex flex-col col-span-2 lg:col-span-1">
                <label htmlFor="username">Username</label>
                <input
                  defaultValue={user?.details.username}
                  onChange={handleChange}
                  type="username"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  className="ring-1 ring-gray-200 p-3 rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500"
                />
              </div>

              <div className="flex flex-col col-span-2 lg:col-span-1">
                <label htmlFor="email">Email Address</label>
                <input
                  defaultValue={user?.details.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="ring-1 ring-gray-200 p-3 rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500"
                />
              </div>

              <div className="flex flex-col col-span-2 lg:col-span-1">
                <label htmlFor="phone">Phone Number</label>
                <input
                  defaultValue={user?.details.phone}
                  onChange={handleChange}
                  type="phone"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                  className="ring-1 ring-gray-200 p-3 rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500"
                />
              </div>
            </div>

            {/*<div className="flex flex-col col-span-2 lg:col-span-1">*/}
            {/*  <label htmlFor="pin">Transaction Pin</label>*/}
            {/*  <input*/}
            {/*    onChange={handleChange}*/}
            {/*    type="password"*/}
            {/*    maxLength={4}*/}
            {/*    inputMode="numeric"*/}
            {/*    name="pin"*/}
            {/*    id="pin"*/}
            {/*    placeholder="Set / Change Pin"*/}
            {/*    className="ring-1 ring-gray-200 p-3 rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500"*/}
            {/*  />*/}
            {/*</div>*/}

            <button
              type="submit"
              className="w-full btn text-blue-100 bg-blue-500 hover:bg-blue-200 hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:shadow-lg rounded-lg px-10 duration-700 my-5"
            >
              Update account
            </button>
          </form>

          <p onClick={() => setPinModalIsVisible(true)} className={'my-3 float-end underline duration-500 hover:scale-105 cursor-pointer'}>change your transaction pin here</p>
        </section>
      </div>

      <Modal isOpen={pinModalIsVisible}>
        <FiXCircle onClick={() => setPinModalIsVisible(false)} className={'size-6 float-end text-gray-500 duration-500 hover:text-black cursor-pointer hover:scale-105'} />
        <div className="flex flex-col items-start gap-3 mt-5">
          <form
              className="w-full shadow h-max rounded-xl p-5"
              onSubmit={handleUpdatePin}
          >
            {/*<div className="flex flex-col col-span-2 lg:col-span-1">*/}
            {/*  <label htmlFor="pin">Old Transaction Pin</label>*/}
            {/*  <input*/}
            {/*    onChange={handleChange}*/}
            {/*    type="password"*/}
            {/*    maxLength={4}*/}
            {/*    inputMode="numeric"*/}
            {/*    name="pin"*/}
            {/*    id="pin"*/}
            {/*    placeholder="Enter old pin"*/}
            {/*    className="ring-1 ring-gray-200 p-3 rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500"*/}
            {/*  />*/}
            {/*</div>*/}

            <div className="flex flex-col col-span-2 lg:col-span-1">
              <label htmlFor="password">Enter password</label>
              <input
                onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                type="password"
                name="password"
                id="password"
                required
                placeholder="Enter password"
                className="ring-1 ring-gray-200 p-3 rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500"
              />
            </div>

            <div className="flex flex-col col-span-2 lg:col-span-1 mt-5">
              <label htmlFor="pin">New Transaction Pin <span className={'text-xs text-blue-500'}>(PIN must be 4 digits)</span> </label>
              <input onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                type="password"
                maxLength={4}
                inputMode="numeric"
                name="pin"
                id="pin"
                required
                placeholder="Set new Pin"
                className="ring-1 ring-gray-200 p-3 rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500"
              />
            </div>

            <button
                type="submit"
                className="w-full btn text-blue-100 bg-blue-500 hover:bg-blue-200 hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:shadow-lg rounded-lg px-10 duration-700 my-5"
            >
              Update transaction pin
            </button>
          </form>
        </div>
      </Modal>
    </main>
  );
};
export default AccountSettings;
