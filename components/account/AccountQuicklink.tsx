import Link from 'next/link'
import React from 'react'
import { IoLink, IoRepeat, IoShieldCheckmark, IoWallet } from 'react-icons/io5'

const AccountQuicklink = () => {
    return (
        <>
            <main className='w-full px-5 mt-10'>
                <div className="w-full flex items-center justify-between">
                    <h2 className='text-2xl font-semibold'>Quick Links</h2>
                </div>

                <section className='w-full grid grid-cols-3 gap-5 my-4'>

                    <Link href={'/account/data'}>
                        <div className='card bg-white p-5 overflow-hidden w-full hover:glass duration-700 transition'>
                            <span className='bg-black w-5 h-5 rounded-full absolute -top-1 left-0 z-50'></span>
                            <div className=''>
                                <h3 className='text-lg font-bold'>Buy Data</h3>
                                <p className='text-xs text-gray-600'>Quick point to purchase data</p>
                            </div>

                            <IoLink className='absolute -right-8' size={100} />
                        </div>
                    </Link>

                    <Link href={'/account/airtime'}>
                        <div className='card bg-white p-5 overflow-hidden w-full hover:glass duration-700 transition'>
                            <span className='bg-black w-5 h-5 rounded-full absolute -top-1 left-0 z-50'></span>
                            <div className=''>
                                <h3 className='text-lg font-bold'>Buy Airtime</h3>
                                <p className='text-xs text-gray-600'>Quick point to purchase airtime</p>
                            </div>

                            <IoLink className='absolute -right-8' size={100} />
                        </div>
                    </Link>

                    <Link href={'/account/cable'}>
                        <div className='card bg-white p-5 overflow-hidden w-full hover:glass duration-700 transition'>
                            <span className='bg-black w-5 h-5 rounded-full absolute -top-1 left-0 z-50'></span>
                            <div className=''>
                                <h3 className='text-lg font-bold'>Cable Subscription</h3>
                                <p className='text-xs text-gray-600'>Quick point for cable subscription</p>
                            </div>

                            <IoLink className='absolute -right-8' size={100} />
                        </div>
                    </Link>

                    <Link href={'/account/bill'}>
                        <div className='card bg-white p-5 overflow-hidden w-full hover:glass duration-700 transition'>
                            <span className='bg-black w-5 h-5 rounded-full absolute -top-1 left-0 z-50'></span>
                            <div className=''>
                                <h3 className='text-lg font-bold'>Bill Payment</h3>
                                <p className='text-xs text-gray-600'>Quick point for bill payment</p>
                            </div>

                            <IoLink className='absolute -right-8' size={100} />
                        </div>
                    </Link>

                    <Link href={'#'}>
                        <div className='card bg-white p-5 overflow-hidden w-full hover:glass duration-700 transition'>
                            <span className='bg-black w-5 h-5 rounded-full absolute -top-1 left-0 z-50'></span>
                            <div className=''>
                                <h3 className='text-lg font-bold'>Fund Account</h3>
                                <p className='text-xs text-gray-600'>Quick point for funding wallet</p>
                            </div>

                            <IoWallet className='absolute -right-8' size={100} />
                        </div>
                    </Link>

                    <Link href={'#'}>
                        <div className='card bg-white p-5 overflow-hidden w-full hover:glass duration-700 transition'>
                            <span className='bg-black w-5 h-5 rounded-full absolute -top-1 left-0 z-50'></span>
                            <div className=''>
                                <h3 className='text-lg font-bold'>Swiftcharge Prices</h3>
                                <p className='text-xs text-gray-600'>Quick point for viewing our prices</p>
                            </div>

                            <IoLink className='absolute -right-8' size={100} />
                        </div>
                    </Link>

                </section>
            </main>
        </>
    )
}

export default AccountQuicklink