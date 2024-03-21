'use client'

import Image from 'next/image'
import React from 'react'
import { FiArrowRight, FiGlobe } from 'react-icons/fi'
import { IoArrowForwardCircle, IoArrowForwardCircleOutline, IoArrowForwardSharp, IoFlashSharp, IoGlobeOutline, IoGlobeSharp, IoHandRight } from 'react-icons/io5'
import Plans from './Plans'
import Typed from 'react-typed'

const Otherinfo = () => {
    return (
        <>
            <main className='w-full px-5 lg:px-60 mt-20'>
                <header className='flex items-center justify-center'>
                    <Image src={'/limit.svg'} width={0} height={100} alt='svg' className='w-9 md:w-24' />
                    <div className='flex flex-col items-center'>
                        <h1 className='text-2xl md:text-4xl lg:text-6xl font-black'>No Limits, No Borders</h1>
                        <h2 className='flex items-center gap-2 text-2xl md:text-4xl lg:text-6xl font-bold text-purple-700'>
                            <IoArrowForwardSharp />
                            <span className='flex gap-2 items-center'>
                                Go global
                                <span className='bg-gradient-to-r from-purple-100 to-purple-200 w-16 h-10 lg:w-24 lg:h-12 shadow-inner rounded-full flex justify-end pr-1 items-center'>
                                    <IoFlashSharp className='bg-white rounded-full shadow text-3xl lg:text-4xl' />
                                </span>
                            </span>
                        </h2>
                    </div>
                    <Image src={'/limit.svg'} width={0} height={100} alt='svg' className='space-y-reversetransform -scale-x-100 w-9 md:w-24' />
                </header>

                {/* Wallet Funding */}
                <section className='w-full h-[40rem] relative bg-gradient-to-tr from-white to-[#d4e3fb] rounded-3xl mt-12 p-7 lg:p-16 transition hover:scale-105 duration-1000 flex overflow-hidden'>
                    <div>
                        <p className='uppercase text-md text-purple-800 font-medium'>Swift Charge Account</p>

                        <h1 className='text-3xl lg:text-5xl font-extrabold mt-16 text-wrap'>Swift charge instant <br /> wallet funding</h1>
                        <p className='mt-6 text-gray-600 font-medium w-72 lg:w-[40rem] text-md lg:text-xl'>Yes, we got you covered. Enjoy easy, fast and instant funding of your wallet after payment. You will receive your personal swiftcharge bank account details for instant funding of wallet after registration. Any payment made into the bank account gets your wallet credited automatically.</p>

                        <button className='flex items-center gap-1 bottom-10 absolute text-blue-500'>
                            Fund wallet now
                            <IoArrowForwardCircleOutline size={30} />
                        </button>
                    </div>

                    <div className='bottom-1 absolute md:relative md:mt-20 md:scale-110 ml-48 md:ml-0'>
                        <Image src={'/fund.png'} width={1000} height={100} alt='svg' className='scale-110' />
                    </div>
                </section>
                {/* end of wallet funding */}

                {/* airtime */}
                <section className='w-full flex mt-5 gap-5'>
                    <div className='w-[30rem] h-[54rem] bg-[url("https://images.unsplash.com/photo-1611701710755-3cb5920c6cfd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21pbGluZyUyMHBob25lfGVufDB8fDB8fHww")] bg-cover bg-center rounded-3xl saturate-150 transition hover:scale-105 duration-1000 hidden md:block'></div>

                    <div className='w-full lg:w-[45rem] h-[54rem] bg-[url("/globe.svg")] bg-[#f0f0ee] bg-cover bg-center rounded-3xl saturate-200 p-7 lg:p-16 transition hover:scale-105 duration-1000'>
                        <p className='uppercase text-md text-purple-800 font-medium'>Swift Charge Airtime</p>
                        <h1 className='text-3xl lg:text-5xl w-[20rem] lg:w-full font-extrabold mt-10 text-wrap'>Purchase airtime at best rate</h1>

                        <p className='mt-6 text-gray-600 font-medium w-72 lg:w-[35rem] text-md lg:text-xl'>Enjoy as much as 3% discount on airtime purchase on our platform. We offer VTU airtime for MTN, Glo, Airtel and 9mobile.</p>

                        <button className='flex items-center gap-1 text-blue-500 mt-8'>
                            Purchase airtime
                            <IoArrowForwardCircleOutline size={30} />
                        </button>
                    </div>
                </section>
                {/* end of airtime */}

                {/* start data */}
                <section className='w-full h-[40rem] relative bg-gradient-to-tr from-white to-[#e2fac0] rounded-3xl mt-5 p-7 lg:p-16 transition hover:scale-105 duration-1000 flex overflow-hidden'>
                    <div>
                        <p className='uppercase text-md text-purple-800 font-medium'>Swift Charge Data</p>

                        <h1 className='text-3xl lg:text-5xl w-[18rem] lg:w-full font-extrabold mt-10 text-wrap'>Purchase data at best rate</h1>
                        <p className='mt-6 text-gray-600 font-medium w-72 lg:w-[35rem] text-md lg:text-xl'>Buy and resell cheap data (+SME) on SwiftCharge and make money with us. We offer the cheapest data bundles for all networks. We have built an internal infrastructure for the best SIM hosting capabilities. We have many SIMs internally hosted on our dedicated server.</p>

                        <button className='flex items-center gap-1 bottom-20 absolute text-blue-500'>
                            Purchase data
                            <IoArrowForwardCircleOutline size={30} />
                        </button>
                    </div>

                    <div className='mt-20 scale-110 hidden md:block'>
                        <Image src={'/fund.png'} width={1000} height={100} alt='svg' className='scale-110' />
                    </div>
                </section>
                {/* end of data */}

                {/* cable */}
                <section className='w-full flex mt-5 gap-5'>
                    <div className='w-[30rem] h-[54rem] bg-[url("/happywoman.avif")] bg-cover bg-center rounded-3xl saturate-150 transition hover:scale-105 duration-1000 hidden md:block'></div>

                    <div className='w-[45rem] h-[54rem] bg-[url("/globe.svg")] bg-[#f4d9c2] bg-cover bg-center rounded-3xl p-7 lg:p-16 transition hover:scale-105 duration-1000'>
                        <p className='uppercase text-md text-purple-800 font-medium'>Swift Charge Cable Tv</p>
                        <h1 className='text-3xl lg:text-5xl w-[18rem] lg:w-full font-extrabold mt-10 text-wrap'>Subscribe cable Tv at best rate</h1>

                        <p className='mt-6 text-gray-600 font-medium w-72 lg:w-[35rem] text-md lg:text-xl'>Don’t miss that TV programme. Subscribe your Cable TV (DSTv, GOTv & Startimes) at the cheapest price. Instant activation!</p>

                        <button className='flex items-center gap-1 text-blue-500 mt-8'>
                            Subscribe now
                            <IoArrowForwardCircleOutline size={30} />
                        </button>
                    </div>
                </section>
                {/* end of cable */}
            </main>

            {/* Bridge */}
            <div className='w-full flex justify-center mt-3 absolute'>
                <span className='bg-white bg-[url("https://cdn.pixabay.com/photo/2023/11/25/08/16/ai-generated-8411275_1280.jpg")] w-44 h-44 place-items-center rounded-full bg-cover bg-center shadow-lg border-4 hover:scale-150 duration-1000'></span>
            </div>
            <section className='w-full h-[44rem] bg-[#14181f] mt-36 px-7 lg:px-60 overflow-hidden'>

                <div className='flex justify-between w-full mt-36 gap-5'>
                    <div className="text">
                        <h1 className='text-5xl md:text-6xl font-extrabold mt-16 text-wrap text-white'>A truly global <br /> swiftcharge account.</h1>
                        <p className='mt-6 text-gray-200 lg:w-[35rem] text-xl'>Get a global foreign account that puts you in total control of your money.</p>

                        <button className='bg-blue-600 p-3 rounded-md text-blue-100 font-bold text-sm mt-16'>Create account</button>
                    </div>

                    <Image src={'/usdhand.png'} width={380} height={100} alt='svg' className='scale-110' />
                </div>
            </section>
            {/* end of bridge */}

            {/* Plans */}
            <Plans />
            {/* End of plans */}
        </>
    )
}

export default Otherinfo