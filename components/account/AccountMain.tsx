'use client'

import React, { useEffect, useState } from 'react'
import { IoPeopleCircleOutline } from 'react-icons/io5';

const AccountMain = () => {
    const blurstatus = Boolean || JSON.parse(`${window.localStorage.getItem('blurstate')}`)
    const [blurState, setBlurState] = useState(blurstatus);
    return (
        <>
            <section className='w-full px-5 mt-32 flex gap-10'>
                <div className='card w-full bg-purple-600 glass p-10 text-white shadow-lg bg-[url("/cardimage.jpg")] bg-center bg-cover hover:mx-5 duration-700'>
                    <div>
                        <h3 className='text-lg font-medium'>Wema Bank</h3>
                        <p className='text-xs text-gray-200'>Bank name</p>
                    </div>

                    <h3 className='mt-16 text-5xl font-bold'>8104486836</h3>

                    <div className='flex items-center gap-10'>
                        <div className='mt-5'>
                            <h3 className='text-lg font-medium'>Walezino Info-Tech - godsonprince</h3>
                            <p className='text-xs text-gray-200'>Account Name</p>
                        </div>

                        <div className='mt-5 '>
                            <h3 className='text-lg font-medium'>Valid till death</h3>
                            <p className='text-xs text-gray-200'>Expiry Date</p>
                        </div>
                    </div>
                </div>

                <div className="w-full flex gap-2">
                    <div className="flex flex-col gap-3">
                        <div className="card w-64 h-full p-6 bg-blue-500 text-white hover:scale-105 duration-700 bg-[url('/balanceimage.avif')] bg-center bg-cover cursor-pointer" onClick={() => setBlurState(!blurState)}>
                            <h2 className={`text-3xl font-semibold cursor-pointer ${blurState ? 'blur' : null}`}>$ 3000</h2>
                            <p className='ml-1 text-gray-200'>Current Balance</p>
                            <p className='ml-1 text-xs bottom-3 absolute text-blue-100'>Powered by swiftcharge</p>
                        </div>

                        <div className="card w-64 h-full p-6 bg-blue-500 text-white hover:scale-105 duration-700 bg-[url('/balanceimage.avif')] bg-center bg-cover cursor-pointer" onClick={() => setBlurState(!blurState)}>
                            <h2 className={`text-3xl font-semibold cursor-pointer flex items-center ${blurState ? 'blur' : null}`}>
                                <IoPeopleCircleOutline size={40} />
                                100
                            </h2>
                            <p className='ml-1 text-gray-200'>Total Referrals</p>
                            <p className='ml-1 text-xs bottom-3 absolute text-blue-100'>Powered by swiftcharge</p>
                        </div>
                    </div>

                    <div className="card w-[26rem] p-6 bg-blue-500 text-white hover:scale-105 duration-700 bg-[url('/balanceimage.avif')] bg-center bg-cover cursor-pointer" onClick={() => setBlurState(!blurState)}>

                        {/* start each person */}

                        <div className="flex gap-3 flex-wrap h-56 hover:overflow-auto overflow-hidden">
                            <div className="person flex flex-col items-center">
                                <h2 className={`text-3xl font-semibold cursor-pointer flex items-center ${blurState ? 'blur' : null}`}>
                                    <IoPeopleCircleOutline size={40} />
                                </h2>
                                <p className='ml-1 text-gray-200 text-xs'>James Peter</p>
                            </div>
                            
                        </div>

                        {/* end each person */}
                        <p className='ml-1 text-xs bottom-3 absolute text-blue-100'>Powered by swiftcharge</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AccountMain