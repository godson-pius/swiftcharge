import CreateAccount from '@/components/CreateAccount'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>
            <main className='w-full px-5 lg:px-0 h-max lg:h-screen pt-32 pb-10 lg:pb-0 lg:pt-0 flex flex-col justify-center items-center bg-gradient-to-tr from-blue-100 to-white'>
                <h2 className='text-3xl my-5 font-semibold'>SwiftCharge</h2>
                <CreateAccount />
                <p>Already a user? <Link href={'/login'} className='link font-semibold'>Sign in</Link></p>
            </main>
        </>
    )
}

export default page