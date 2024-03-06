import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <main className='bg-white p-2 flex items-center justify-between px-60 bg-transparent absolute w-full'>

      <Image src={'https://cdn.pixabay.com/photo/2016/11/07/13/04/yoga-1805784_1280.png'} alt='Logo' width={100} height={100} />

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
        <button className='hover:bg-gray-100 rounded-md p-3'>Log in</button>
        <button className='bg-blue-600 p-3 rounded-md text-blue-100 font-bold text-sm'>Get started - It&apos;s free</button>
      </div>
    </main>
  )
}

export default Navbar