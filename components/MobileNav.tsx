'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { IoMenuOutline } from 'react-icons/io5'

const MobileNav = () => {
    const pathname = usePathname();
    const hideMenu = () => {
        if (pathname.includes('account')) {
          return 'hidden';
        }
      }
    return (
        <>
            <main className={`w-full flex bg-white p-2  px-5 fixed z-50 lg:hidden drawer ${hideMenu()}`}>
                <div className='w-full flex justify-between items-center'>
                    <Image src={'https://cdn.pixabay.com/photo/2016/11/07/13/04/yoga-1805784_1280.png'} alt='Logo' width={100} height={100} />
                    <label htmlFor="my-drawer">
                        <IoMenuOutline size={30} className='cursor-pointer drawer-button' />
                    </label>
                </div>


                <div className="">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content divide-y-2">
                            <Image src={'https://cdn.pixabay.com/photo/2016/11/07/13/04/yoga-1805784_1280.png'} alt='Logo' width={100} height={100} className='
                            mb-5' />

                            <li className='w-full text-md font-extrabold p-4 products'>
                                <Link href={'#'}>Products</Link>
                            </li>
                            <li className='w-full text-md font-extrabold p-4 learn'>
                                <Link href={'#'}>Learn</Link>
                            </li>
                            <li className='w-full text-md font-extrabold p-4 company'>
                                <Link href={'#'}>Company</Link>
                            </li>

                            <div className="group text-white flex flex-col gap-4 w-72 bottom-10 absolute">
                                <button className='hover:bg-gray-100 rounded-md p-3 bg-black'>Log in</button>
                                <button className='bg-blue-600 p-3 rounded-md text-blue-100 font-bold text-sm'>Get started - It&apos;s free</button>
                            </div>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    )
}

export default MobileNav