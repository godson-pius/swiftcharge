import React from "react";
import dynamic from "next/dynamic";

const DynamicBillPayment = dynamic(
  () => import("@/components/account/BillPayment"),
  { ssr: false },
);

const Page = () => {
  return <DynamicBillPayment />;
};
export default Page;
