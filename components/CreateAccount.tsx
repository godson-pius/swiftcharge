'use client'

import axios from 'axios'
import Link from 'next/link'
import React, {FormEvent, useState} from 'react'
import {IoArrowForward} from 'react-icons/io5'
import {toast} from 'react-toastify'
import {CreateUserInput} from '@/types/user.type'
import {useRouter} from 'next/navigation'

const CreateAccount = () => {
    const router = useRouter();
    const [inputs, setInputs] = useState<CreateUserInput>({
        fullname: "",
        username: "",
        email: "",
        parentId: "",
        password: "",
        address: "",
        phone: "",
        refId: "",
        role: "user"
    })
    const [password, setPassword] = useState('')
    const [passwordState, setPasswordState] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {...inputs, password}

        try {
            const res = await toast.promise(axios.post(`/api/users`, data, {headers: {"Authorization": `Test`}}), {
                pending: 'Creating account',
                success: 'Account Created!',
            })

            if (res.status == 201) {
                router.push('/login')
            }
        } catch (e: any) {
            toast.error(e.response.data.error, { autoClose: false })
        }
    }

    const checkPassword = (pwd1: string, pwd2: string | undefined) => {
        if (pwd1 != pwd2) {
            setPasswordState('password do not match')
        } else {
            setPasswordState('Correct! Password matched')
            setPassword(pwd2)

            setTimeout(() => {
                setPasswordState('')
            }, 5000)
        }
    }
    return (
        <form className='w-full lg:w-[40rem] shadow-lg h-max rounded-xl ring-1 ring-gray-300 bg-base-100 p-5 mb-6'
              onSubmit={handleSubmit}>
            <h2 className='font-semibold text-xl mb-3'>Create account</h2>

            <div className="grid grid-cols-2 gap-4 mb-2">

                <div className="flex flex-col col-span-2 lg:col-span-1">
                    <label htmlFor="fullname">Full name</label>
                    <input onChange={(e) => inputs.fullname = e.target.value} type="fullname" name="fullname"
                           id="fullname" placeholder='Enter your fullname'
                           className='ring-1 ring-gray-200 p-3 rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500'/>
                </div>

                <div className="flex flex-col col-span-2 lg:col-span-1">
                    <label htmlFor="username">Username</label>
                    <input onChange={(e) => inputs.username = e.target.value} type="username" name="username"
                           id="username" placeholder='Enter your username'
                           className='ring-1 ring-gray-200 p-3 rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500'/>
                </div>

                <div className="flex flex-col col-span-2 lg:col-span-1">
                    <label htmlFor="email">Email Address</label>
                    <input onChange={(e) => inputs.email = e.target.value} type="email" name="email" id="email"
                           placeholder='Enter your email'
                           className='ring-1 ring-gray-200 p-3 rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500'/>
                </div>

                <div className="flex flex-col col-span-2 lg:col-span-1">
                    <label htmlFor="phone">Phone Number</label>
                    <input onChange={(e) => inputs.phone = e.target.value} type="phone" name="phone" id="phone"
                           placeholder='Enter your phone number'
                           className='ring-1 ring-gray-200 p-3 rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500'/>
                </div>

                <div className="flex flex-col col-span-2 lg:col-span-1">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => inputs.password = e.target.value} type="password" name="password"
                           id="password" placeholder='Enter your password'
                           className='ring-1 ring-gray-200 p-3 rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500'/>
                </div>

                <div className="flex flex-col col-span-2 lg:col-span-1">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input onChange={(e) => checkPassword(e.target.value, inputs.password)} type="password"
                           name="password" id="cpassword" placeholder='Confirm your password'
                           className='ring-1 ring-gray-200 p-3 rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500'/>
                    <span
                        className={`text-xs my-1 ml-2 ${passwordState.includes('Correct') ? 'text-green-600' : 'text-red-600'}`}>{passwordState}</span>
                </div>

                <div className="flex flex-col col-span-2 lg:col-span-1">
                    <label htmlFor="address">Address</label>
                    <input onChange={(e) => inputs.address = e.target.value} type="address" name="address" id="address"
                           placeholder='Enter your address'
                           className='ring-1 ring-gray-200 p-3 rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500'/>
                </div>


                <div className="flex flex-col col-span-2 lg:col-span-1">
                    <label htmlFor="ref">Referral Id <span className='text-xs text-blue-400'>(Optional)</span></label>
                    <input onChange={(e) => inputs.parentId = e.target.value} type="ref" name="ref" id="ref"
                           placeholder='Enter referral ID'
                           className='ring-1 ring-gray-200 p-3 rounded-lg font-thin mt-1 text-sm border-none outline-none focus:ring-blue-700 duration-500'/>
                </div>
            </div>

            <Link href={'#'} className='text-sm link flex items-center gap-1 text-blue-800'>Forgot
                password <IoArrowForward/> </Link>

            <button type="submit" className='w-full btn bg-blue-600 hover:bg-blue-500 text-white my-5'>Create account
            </button>
        </form>
    )
}

export default CreateAccount