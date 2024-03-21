import Login from '@/components/Login'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>
            <main className='w-full px-5 lg:px-0 h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-blue-100 to-white'>
                <h2 className='text-3xl my-5 font-semibold'>SwiftCharge</h2>
                <Login />
                <p>Are you a new user? <Link href={'/get-started'} className='link font-semibold'>Create an account</Link></p>
            </main>
        </>
    )
}

export default page