import React from "react";
import dynamic from "next/dynamic";

const DynamicBuyData = dynamic(
  () => import("@/components/account/PurchaseData"),
  { ssr: false },
);

const Page = () => {
  return <DynamicBuyData />;
};
export default Page;
