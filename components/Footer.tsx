'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';

const Footer = () => {
    const pathname = usePathname();

    const hideFooter = () => {
        if (pathname.includes('account')) {
          return 'hidden';
        }
      }

    return (
        <>
            <main className={`${hideFooter()}`}>
            <footer className={`w-full px-5 lg:px-60 grid grid-cols-2 lg:flex lg:flex-row justify-between gap-5 pt-10`}>
                <section className='flex flex-col'>
                    <h1 className='uppercase font-semibold'>Contact us</h1>
                    <Link href={'#'} className='text-blue-500 text-sm font-semibold'>hello@swiftcharge.net</Link>
                </section>

                <section className='flex flex-col'>
                    <h1 className='uppercase font-semibold'>Products</h1>
                    <Link href={'#'} className="text-gray-500 text-sm font-medium mt-1">Purchase Data</Link>
                    <Link href={'#'} className="text-gray-500 text-sm font-medium mt-1">Purchase Airtime</Link>
                    <Link href={'#'} className="text-gray-500 text-sm font-medium mt-1">Cable Subscription</Link>
                    <Link href={'#'} className="text-gray-500 text-sm font-medium mt-1">Purchase Electricity</Link>
                </section>

                <section className='flex flex-col'>
                    <h1 className='uppercase font-semibold'>Company</h1>
                    <Link href={'#'} className="text-gray-500 text-sm font-medium mt-1">About Us</Link>
                    <Link href={'#'} className="text-gray-500 text-sm font-medium mt-1">Careers</Link>
                    <Link href={'#'} className="text-gray-500 text-sm font-medium mt-1">Blog</Link>
                    <Link href={'#'} className="text-gray-500 text-sm font-medium mt-1">Contact</Link>
                </section>

                <section className='flex flex-col'>
                    <h1 className='uppercase font-semibold'>Legal</h1>
                    <Link href={'#'} className="text-gray-500 text-sm font-medium mt-1">Privacy Policy</Link>
                    <Link href={'#'} className="text-gray-500 text-sm font-medium mt-1">Terms of service</Link>
                    <Link href={'#'} className="text-gray-500 text-sm font-medium mt-1">Acceptable use policy</Link>
                </section>

                <section className='flex flex-col'>
                    <h1 className='uppercase font-semibold'>Support</h1>
                    <Link href={'#'} className="text-gray-500 text-sm font-medium mt-1">Help center</Link>
                    <Link href={'#'} className="text-gray-500 text-sm font-medium mt-1">Video Tutorials</Link>
                    <Link href={'#'} className="text-gray-500 text-sm font-medium mt-1">FAQ</Link>
                </section>
            </footer>
            <hr className='mt-10 mx-16' />
            <h2 className='text-center text-[13rem] font-bold animate-pulse bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text hidden md:block'>SWIFT CHARGE</h2>
            </main>
        </>
    )
}

export default Footer