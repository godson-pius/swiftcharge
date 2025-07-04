'use client'

import React, {useState} from 'react'
import {IoCallOutline, IoEyeOffOutline, IoEyeOutline, IoNotificationsOutline, IoPersonOutline} from 'react-icons/io5'
import {toast} from 'react-toastify'
import {IUser} from "@/app/interface";

const AccountNavbar = () => {
    const blurstatus = Boolean || JSON.parse(`${localStorage.getItem('blurstate')}`)
    const user: IUser = JSON.parse(`${localStorage.getItem('swiftuser')}`)
    const [blurState, setBlurState] = useState(blurstatus)

    const handleBlur = () => {
        setBlurState(!blurState)
        localStorage.setItem('blurstate', JSON.stringify(blurState))

        toast.info('Effect will take place on reload')
    }

    return (
        <main className='w-full h-20 px-5 pt-7'>
            <div className="w-full flex items-center justify-between">
                <div>
                    <h2 className='text-4xl font-medium'>SwiftCharge</h2>
                    <p className='w-[50rem] text-gray-600 mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Doloremque quis atque eveniet voluptates animi voluptatem accusantium nemo minus odit qui!</p>
                </div>

                <div className="flex items-center gap-4">

                    <IoCallOutline size={25} className='cursor-pointer'/>

                    {!blurState ? <IoEyeOutline onClick={handleBlur} size={25} className='cursor-pointer'/> :
                        <IoEyeOffOutline onClick={handleBlur} size={25} className='cursor-pointer'/>}
                    <IoNotificationsOutline size={25}/>

                    <div className='flex gap-2 items-center'>
                        <div className='flex justify-center items-center rounded-full ring-1 ring-blue-600 p-2'>
                            <IoPersonOutline size={23}/>
                        </div>
                        <div className='flex flex-col'>
                            <h4 className='text-sm font-semibold'>{user?.details.fullname}</h4>
                            <p className='text-xs'>Account</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AccountNavbar