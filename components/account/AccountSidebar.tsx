'use client'

import React from 'react'
import Link from 'next/link'
import { IoApertureOutline, IoCallOutline, IoEarthOutline, IoExitOutline, IoFlashOutline, IoGitNetworkOutline, IoPersonCircleOutline, IoPieChartOutline, IoSettingsOutline, IoTvOutline, IoWalletOutline } from 'react-icons/io5'
import { usePathname } from 'next/navigation'

const AccountSidebar = () => {
    const pathname = usePathname()

    const setActiveMenu = (menu: string) => {
        return pathname.includes(menu) ? 'shadow glass p-2' : null
    }

  return (
    <main className='w-72 h-screen p-4 pt-5 bg-gradient-to-t from-purple-500 to-blue-500 text-white text-sm fixed'>
        <h1 className='text-xl font-medium text-center'>SwiftCharge</h1>

        <ul className='mt-16 flex flex-col gap-5'>
            <Link href={'#'} className={`flex items-center gap-5 rounded-xl hover:shadow-lg hover:p-2 duration-700 ${setActiveMenu('account')}`}>
                <IoApertureOutline size={27} className='duration-700' />
                Overview
            </Link>
            
            <Link href={'#'} className={`flex items-center gap-5 rounded-xl hover:shadow-lg hover:p-2 duration-700 ${setActiveMenu('data')}`}>
                <IoEarthOutline size={27} className='duration-700' />
                Buy Data
            </Link>
            
            <Link href={'#'} className={`flex items-center gap-5 rounded-xl hover:shadow-lg hover:p-2 duration-700 ${setActiveMenu('airtime')}`}>
                <IoCallOutline size={27} className='duration-700' />
                Buy Airtime
            </Link>
            
            <Link href={'#'} className={`flex items-center gap-5 rounded-xl hover:shadow-lg hover:p-2 duration-700 ${setActiveMenu('bill')}`}>
                <IoFlashOutline size={27} className='duration-700' />
                Bill Payment
            </Link>
            
            <Link href={'#'} className={`flex items-center gap-5 rounded-xl hover:shadow-lg hover:p-2 duration-700 ${setActiveMenu('cable')}`}>
                <IoTvOutline size={27} className='duration-700' />
                Cable Subscription
            </Link>
            
            <Link href={'#'} className={`flex items-center gap-5 rounded-xl hover:shadow-lg hover:p-2 duration-700 ${setActiveMenu('cable')}`}>
                <IoPieChartOutline size={27} className='duration-700' />
                SwiftCharge Prices
            </Link>
            
            <Link href={'#'} className={`flex items-center gap-5 rounded-xl hover:shadow-lg hover:p-2 duration-700 ${setActiveMenu('cable')}`}>
                <IoPersonCircleOutline size={27} className='duration-700' />
                Account
            </Link>
            
            <Link href={'#'} className={`flex items-center gap-5 rounded-xl hover:shadow-lg hover:p-2 duration-700 ${setActiveMenu('cable')}`}>
                <IoSettingsOutline size={27} className='duration-700' />
                Setting
            </Link>
            
            <Link href={'#'} className={`flex items-center gap-5 rounded-xl hover:shadow-lg hover:p-2 duration-700 ${setActiveMenu('wallet')}`}>
                <IoWalletOutline size={27} className='duration-700' />
                Fund Wallet
            </Link>
            
            <Link href={'#'} className={`flex items-center gap-5 rounded-xl hover:shadow-lg hover:p-2 duration-700 ${setActiveMenu('exit')} bottom-24 absolute`}>
                <IoExitOutline size={27} className='duration-700' />
                Logout
            </Link>

            <span className='w-60 h-0.5 bg-gray-300 bottom-11 absolute'></span>

            <Link href={'#'} className={`flex items-center gap-2 rounded-xl animate-pulse duration-700 ${setActiveMenu('wallet')} bottom-5 absolute text-xs`}>
                <IoGitNetworkOutline size={17} className='duration-700' />
                Version 1.0.0
            </Link>
        </ul>
    </main>
  )
}

export default AccountSidebar