"use client";

import React, {useEffect, useState} from "react";
import {IoCallOutline, IoEyeOffOutline, IoEyeOutline, IoNotificationsOutline, IoPersonOutline,} from "react-icons/io5";
import {toast} from "react-toastify";
import {IUser} from "@/app/interface";

const AccountNavbar = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [blurState, setBlurState] = useState<boolean>();

    const handleBlur = () => {
        console.log("blur", blurState);
        setBlurState(!blurState);
        typeof window !== "undefined" &&
        window.localStorage.setItem("blurstate", JSON.stringify(blurState));

        toast.info("Effect will take place on reload");
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            setUser(JSON.parse(`${localStorage.getItem("swiftuser")}`));
            setBlurState(
                Boolean || JSON.parse(`${localStorage.getItem("blurstate")}`),
            );
        }
    }, [blurState]);

    return (
        <main className="w-full h-20 px-5 pt-7">
            <div className="w-full flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-medium">SwiftCharge</h2>
                    <p className="w-[38rem] text-gray-600 mt-1 text-xs font-thin">
                        SwiftCharge is a next-generation Virtual Top-Up and Web3 payment
                        platform that lets users buy airtime, data, and pay utility bills
                        instantly, using either local currency or digital assets like USDT.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <IoCallOutline size={17} className="cursor-pointer"/>

                    {!blurState ? (
                        <IoEyeOutline
                            onClick={handleBlur}
                            size={17}
                            className="cursor-pointer"
                        />
                    ) : (
                        <IoEyeOffOutline
                            onClick={handleBlur}
                            size={17}
                            className="cursor-pointer"
                        />
                    )}
                    <IoNotificationsOutline size={17}/>

                    <div className="flex gap-2 items-center">
                        <div className="flex justify-center items-center rounded-full ring-1 ring-blue-600 p-2">
                            <IoPersonOutline size={17}/>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-sm font-semibold">
                                {user?.details.fullname}
                            </h4>
                            <p className="text-xs">Account</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AccountNavbar;
