import React from "react";
import dynamic from "next/dynamic";

const DynamicCableSub = dynamic(
  () => import("@/components/account/CablePayment"),
  { ssr: false },
);

const Page = () => {
  return <DynamicCableSub />;
};
export default Page;
