import React from "react";
import dynamic from "next/dynamic";

const DynamicBuyData = dynamic(
  () => import("@/components/account/PurchaseAirtime"),
  { ssr: false },
);

const Page = () => {
  return <DynamicBuyData />;
};
export default Page;
