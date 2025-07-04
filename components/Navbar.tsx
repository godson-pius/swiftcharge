'use client'

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import MobileNav from './MobileNav';
import {usePathname, useRouter} from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const hideNavbar = () => {
    if (pathname.includes('account')) {
      return 'lg:hidden';
    }
  }

  return (
    <>
      <main className={`bg-white p-2 lg:flex items-center justify-between px-60 fixed z-50 w-full hidden ${hideNavbar()}`}>

        <Link href={'./'}>
        <Image src={'https://cdn.pixabay.com/photo/2016/11/07/13/04/yoga-1805784_1280.png'} alt='Logo' width={100} height={100} />
        </Link>

        <ul className='text-slate-800 flex gap-4'>
          <li>
            <Link href={'#'}>Products</Link>
          </li>
          <li>
            <Link href={'#'}>Learn</Link>
          </li>
          <li>
            <Link href={'#'}>Company</Link>
          </li>
        </ul>

        <div className="group text-white flex gap-4">
          <Link href={'/login'} className='hover:bg-gray-100 rounded-md p-3 text-blue-500'>Log in</Link>
          <Link href={'/get-started'} className='bg-blue-600 p-3 rounded-md text-blue-100 font-bold text-sm'>Get started - It&apos;s free</Link>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
    </>
  )
}

export default Navbar