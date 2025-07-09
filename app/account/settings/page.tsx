import React from 'react'
import dynamic from "next/dynamic";

const DynamicSettings= dynamic(() => import('@/components/account/AccountSettings'), {ssr: false});

const Page = () => {
    return (
        <DynamicSettings />
    )
}
export default Page
