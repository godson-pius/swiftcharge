'use client'

import { UserType } from '@/types/user.type'
import axios from 'axios'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { IoArrowForward } from 'react-icons/io5'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const Login = () => {
    const router = useRouter();
    const [inputs, setInputs] = useState<UserType>({})

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = [{...inputs}]

        const res = await toast.promise(axios.post(`api/users/${inputs.email}`, data[0]), { pending: 'Authenticating', success: 'Auth Successful', error: 'Failed to authenticate'})

        if (res.status == 200) {
            router.push('/account')
        } else {
            toast.error(res.data)
        }

    }

    return (
        <form className='w-full lg:w-[30rem] shadow-lg h-max rounded-xl ring-1 ring-gray-300 bg-base-100 p-5 mb-6' onSubmit={handleSubmit}>
            <h2 className='font-semibold text-xl mb-3'>Login to your account</h2>

            <div className="flex flex-col my-5">
                <label htmlFor="email">Email Address</label>
                <input onChange={(e) => inputs.email = e.target.value} type="email" name="email" id="email" placeholder='Enter your email address' className='ring-1 ring-gray-200 p-3 rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500' />
            </div>

            <div className="flex flex-col mt-5 mb-2">
                <label htmlFor="password">Password</label>
                <input onChange={(e) => inputs.password = e.target.value} type="password" name="password" id="password" placeholder='Enter your password' className='ring-1 ring-gray-200 p-3 rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500' />
            </div>

            <Link href={'#'} className='text-sm link flex items-center gap-1 text-blue-800'>Forgot password <IoArrowForward /> </Link>

            <button type="submit" className='w-full btn bg-blue-600 hover:bg-blue-500 text-white my-5'>Sign in</button>
        </form>
    )
}

export default Login