'use client'
import React, {useEffect, useState} from 'react'
import AccountSidebar from "@/components/account/AccountSidebar";
import AccountNavbar from "@/components/account/AccountNavbar";
import Link from "next/link";
import {toast} from "react-toastify";
import axios from "axios";
import {IUser} from "@/app/interface";
import {useRouter} from "next/navigation";

const AccountProfile = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [scaler, setScaler] = React.useState<boolean>(false)
    const router = useRouter();

    const handleCreateAccount = async () => {
        if (typeof window !== "undefined") {
            const data = {
                userId: user?.details._id
            }

            try {
                const res = await toast.promise(axios.post(`/api/users/accounts`, data, {headers: {"Authorization": `Bearer ${user!.token}`}}), {
                    pending: 'Creating reserved account...',
                    success: 'Account Created!',
                })

                if (res.status == 200) {
                    return window.location.reload();
                }
            } catch (e: any) {
                toast.error(e.response.data.error)
                if (e.response.data.error.includes('expired')) {
                    return router.push('/login')
                }
            }
        }
    }

    const deleteAccount = async () => {
        const conf = confirm("Are you sure you want to delete this account?");
        if (conf) {
            try {
                const res = await toast.promise(axios.delete(`/api/users/me`, {headers: {"Authorization": `Bearer ${user!.token}`}}), {
                    pending: 'Deleting account...',
                    success: 'Account Deleted!',
                })

                if (res.status == 200) {
                    return router.push('/get-started')
                }
            } catch (e: any) {
                toast.error(e.response.data.error)
                if (e.response.data.error.includes('expired')) {
                    return router.push('/login')
                }
            }
        }
    }

    setInterval(() => {
        setScaler(!scaler)
    }, 3000)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userData = window.localStorage.getItem('swiftuser');
            if (!userData) {
                router.push('/login');
                return;
            }

            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                console.error('Failed to parse user data:', error);
                window.localStorage.removeItem('swiftuser'); // Clean up corrupted data
                router.push('/login');
            }
        }
    }, []);

    return (
        <main className='w-full flex items-start bg-base-200 h-screen'>
            <AccountSidebar/>

            <div className="w-full ml-72">
                <AccountNavbar/>

                <section className={'p-10 mt-16 flex justify-between gap-10'}>
                    <div>
                        <div className={`w-96 h-96 rounded-full flex justify-center items-center border-2 border-gray-400 bg-gradient-to-t from-purple-500 to-sky-500 shadow`}>
                            <div className={`w-[22rem] h-[22rem] border-4 rounded-full ${scaler ? 'scale-105 shadow-lg border-green-200' : null} duration-700 transition-all bg-[url("/profile.jpg")] bg-cover bg-center flex justify-center items-center`}></div>
                        </div>
                    </div>

                    <div className={'w-full border-2 rounded-2xl p-7'}>
                        <h3 className={'font-medium'}>Bio & other details</h3>
                        <hr className={'mb-6 border-dashed'}/>

                        <div className="info grid grid-cols-4 gap-4">
                            <div>
                                <div className={'flex items-center gap-1'}>
                                    <div className={'w-3 h-3 bg-gray-600 rounded-full border-2'}></div>
                                    <p className={'text-xs text-gray-500'}>Full Name</p>
                                </div>
                                <p>{user?.details.fullname}</p>
                            </div>

                            <div>
                                <div className={'flex items-center gap-1'}>
                                    <div className={'w-3 h-3 bg-gray-600 rounded-full border-2'}></div>
                                    <p className={'text-xs text-gray-500'}>Username</p>
                                </div>
                                <p>{user?.details.username}</p>
                            </div>

                            <div>
                                <div className={'flex items-center gap-1'}>
                                    <div className={'w-3 h-3 bg-gray-600 rounded-full border-2'}></div>
                                    <p className={'text-xs text-gray-500'}>Phone</p>
                                </div>
                                <p>{user?.details.phone}</p>
                            </div>

                            <div>
                                <div className={'flex items-center gap-1'}>
                                    <div className={'w-3 h-3 bg-gray-600 rounded-full border-2'}></div>
                                    <p className={'text-xs text-gray-500'}>Referral ID</p>
                                </div>
                                <p>{user?.details.refId}</p>
                            </div>

                            <div>
                                <div className={'flex items-center gap-1'}>
                                    <div className={'w-3 h-3 bg-gray-600 rounded-full border-2'}></div>
                                    <p className={'text-xs text-gray-500'}>Reserved Account ( {user?.details.accounts[0]?.bankName.replace(/(?<=\S)\s\S+/, '')} )</p>
                                </div>
                                <p>{user?.details.accounts[0]?.accountNumber}</p>
                            </div>

                            <div>
                                <div className={'flex items-center gap-1'}>
                                    <div className={'w-3 h-3 bg-gray-600 rounded-full border-2'}></div>
                                    <p className={'text-xs text-gray-500'}>Reserved Account ( {user?.details.accounts[1]?.bankName.replace(/(?<=\S)\s\S+/, '')} )</p>
                                </div>
                                <p>{user?.details.accounts[1]?.accountNumber}</p>
                            </div>
                        </div>

                        <div className={'mt-4'}>
                            <div className={'flex items-center gap-1'}>
                                <div className={'w-3 h-3 bg-gray-600 rounded-full border-2'}></div>
                                <p className={'text-xs text-gray-500'}>Email</p>
                            </div>
                            <p>{user?.details.email}</p>
                        </div>

                        <div className={'mt-4'}>
                            <div className={'flex items-center gap-1'}>
                                <div className={'w-3 h-3 bg-gray-600 rounded-full border-2'}></div>
                                <p className={'text-xs text-gray-500'}>Address</p>
                            </div>
                            <p>{user?.details.address}</p>
                        </div>

                        <div className={'mt-5 flex items-center gap-2'}>
                            { user && user.details?.accounts?.length > 0 ? null : (
                                <button onClick={handleCreateAccount} className={'btn text-sky-100 bg-sky-500 hover:bg-sky-200 hover:border-2 hover:border-sky-500 hover:text-sky-500 hover:shadow-lg rounded-full px-10 duration-700'}>Create Reserved Account</button>
                            )}
                            <Link href={'/account/settings'} className={'btn text-blue-100 bg-blue-500 hover:bg-blue-200 hover:border-2 hover:border-blue-500 hover:text-blue-500 hover:shadow-lg rounded-full px-10 duration-700'}>Update</Link>
                            <button onClick={deleteAccount} className={'btn text-red-100 bg-red-500 hover:bg-red-200 hover:border-2 hover:border-red-500 hover:text-red-500 hover:shadow-lg rounded-full px-10 duration-700'}>Delete Account</button>
                        </div>

                        <p className={'text-xs text-right text-gray-500'}>- Swiftcharge</p>

                    </div>
                </section>
            </div>
        </main>
    )
}
export default AccountProfile
