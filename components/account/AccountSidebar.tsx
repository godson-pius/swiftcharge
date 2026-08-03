"use client";

import React from "react";
import Link from "next/link";
import {
  IoApertureOutline,
  IoCallOutline,
  IoEarthOutline,
  IoExitOutline,
  IoFlashOutline,
  IoGitNetworkOutline,
  IoPersonCircleOutline,
  IoPieChartOutline,
  IoSettingsOutline,
  IoTvOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";

const AccountSidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    const handleToggle = () => setIsOpen(!isOpen);
    window.addEventListener("toggle-sidebar", handleToggle);
    return () => window.removeEventListener("toggle-sidebar", handleToggle);
  }, [isOpen]);

  // Close sidebar when route changes on mobile
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const setActiveMenu = (menu: string) => {
    return pathname == menu ? "shadow glass p-2" : null;
  };

  const handleLogout = () => {
    typeof window !== "undefined" &&
      window.localStorage.removeItem("swiftuser");
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <main className={`w-72 h-screen p-4 pt-5 bg-gradient-to-t from-purple-500 to-blue-500 text-white text-sm fixed z-50 transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="flex items-center justify-between lg:block">
          <h1 className="text-xl font-medium text-left">SwiftCharge</h1>
          <button 
            className="lg:hidden text-white"
            onClick={() => setIsOpen(false)}
          >
            <IoExitOutline size={27} className="rotate-180" />
          </button>
        </div>

        <ul className="mt-16 flex flex-col gap-5 h-full overflow-y-auto pb-20">
          <Link
            href={"/account"}
            className={`flex items-center gap-5 rounded-xl hover:shadow-lg hover:p-2 duration-700 ${setActiveMenu("/account")}`}
          >
            <IoApertureOutline size={27} className="duration-700" />
            Overview
          </Link>
          {/* Buy Data */}
          <Link
            href={"/account/data"}
            className={`flex items-center gap-5 rounded-xl hover:shadow-lg hover:p-2 duration-700 ${setActiveMenu("/account/data")}`}
          >
            <IoEarthOutline size={27} className="duration-700" />
            Buy Data
          </Link>

          <Link
            href={"/account/airtime"}
            className={`flex items-center gap-5 rounded-xl hover:shadow-lg hover:p-2 duration-700 ${setActiveMenu("/account/airtime")}`}
          >
            <IoCallOutline size={27} className="duration-700" />
            Buy Airtime
          </Link>

          <Link
            href={"/account/bill"}
            className={`flex items-center gap-5 rounded-xl hover:shadow-lg hover:p-2 duration-700 ${setActiveMenu("/account/bill")}`}
          >
            <IoFlashOutline size={27} className="duration-700" />
            Bill Payment
          </Link>

          <Link
            href={"/account/cable"}
            className={`flex items-center gap-5 rounded-xl hover:shadow-lg hover:p-2 duration-700 ${setActiveMenu("/account/cable")}`}
          >
            <IoTvOutline size={27} className="duration-700" />
            Cable Subscription
          </Link>

          <Link
            href={"/account/profile"}
            className={`flex items-center gap-5 rounded-xl hover:shadow-lg hover:p-2 duration-700 ${setActiveMenu("/account/profile")}`}
          >
            <IoPersonCircleOutline size={27} className="duration-700" />
            Account
          </Link>

          <Link
            href={"/account/settings"}
            className={`flex items-center gap-5 rounded-xl hover:shadow-lg hover:p-2 duration-700 ${setActiveMenu("/account/settings")}`}
          >
            <IoSettingsOutline size={27} className="duration-700" />
            Settings
          </Link>

          <Link
            href={"#"}
            className={`flex items-center gap-5 rounded-xl hover:shadow-lg hover:p-2 duration-700 ${setActiveMenu("/account/wallet")}`}
          >
            <IoWalletOutline size={27} className="duration-700" />
            Fund Wallet
          </Link>

          <div className="mt-auto flex flex-col gap-5 pb-10">
            <button
              onClick={handleLogout}
              className={`flex items-center gap-5 rounded-xl hover:shadow-lg hover:p-2 duration-700 ${setActiveMenu("exit")}`}
            >
              <IoExitOutline size={27} className="duration-700" />
              Logout
            </button>

            <span className="w-full h-0.5 bg-gray-300 opacity-30"></span>

            <Link
              href={"#"}
              className={`flex items-center gap-2 rounded-xl animate-pulse duration-700 ${setActiveMenu("wallet")} text-xs`}
            >
              <IoGitNetworkOutline size={17} className="duration-700" />
              Version 1.0.0
            </Link>
          </div>
        </ul>
      </main>
    </>
  );
};

export default AccountSidebar;
