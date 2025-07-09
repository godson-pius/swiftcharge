import dynamic from "next/dynamic";

const DynamicProfile = dynamic(() => import('@/components/account/AccountProfile'), {ssr: false});

const Page = () => {
    return (
        <DynamicProfile />
    )
}
export default Page
