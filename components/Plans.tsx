'use client'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { IoApertureSharp, IoRemoveOutline } from 'react-icons/io5';
import { Controller, Thumbs } from 'swiper/modules';

const Plans = () => {
    const [controlledSwiper, setControlledSwiper] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <>
            <main className='w-full h-[44rem] bg-[#14181f]'>
                <hr className='mx-8 md:mx-16' />

                <section className='px-60 mt-16'>
                    <Swiper
                        modules={[Controller]}
                        spaceBetween={50}
                        slidesPerView={3}
                        className='md:grid md:grid-cols-3'
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        <SwiperSlide className='bg-[#1b1f28] w-full h-48 rounded-3xl p-10 py-20 duration-700 bg-[url("https://img.freepik.com/free-vector/gradient-black-background-with-wavy-lines_23-2149154120.jpg?t=st=1710388963~exp=1710392563~hmac=22e92d471d23efd636e1e69bf13336a2431b98d5ce10e4525a5ee5b17cb594ab&w=2000")] bg-cover bg-center'>
                            
                                <IoApertureSharp size={50} color='yellow' className='animate-spin sepia' />
                           

                            <p className='flex items-center mt-20 text-white'>01  <IoRemoveOutline /></p>
                            <p className='text-white text-4xl font-semibold mt-2'>Mtn data at best rate</p>
                        </SwiperSlide>

                        <SwiperSlide className='bg-[#1b1f28] w-full h-48 rounded-3xl p-10 py-20 duration-700 bg-[url("https://img.freepik.com/free-vector/gradient-black-background-with-wavy-lines_23-2149154120.jpg?t=st=1710388963~exp=1710392563~hmac=22e92d471d23efd636e1e69bf13336a2431b98d5ce10e4525a5ee5b17cb594ab&w=2000")] bg-cover bg-center'>

                        <IoApertureSharp size={50} color='pink' className='animate-spin' />

                            <p className='flex items-center mt-20 text-white'>02  <IoRemoveOutline /></p>
                            <p className='text-white text-4xl font-semibold mt-2'>Airtel data at best rate</p>
                        </SwiperSlide>

                        <SwiperSlide className='bg-[#1b1f28] w-full h-48 rounded-3xl p-10 py-20 duration-700 bg-[url("https://img.freepik.com/free-vector/gradient-black-background-with-wavy-lines_23-2149154120.jpg?t=st=1710388963~exp=1710392563~hmac=22e92d471d23efd636e1e69bf13336a2431b98d5ce10e4525a5ee5b17cb594ab&w=2000")] bg-cover bg-center'>

                        <IoApertureSharp size={50} color='green' className='animate-spin' />

                            <p className='flex items-center mt-20 text-white'>03  <IoRemoveOutline /></p>
                            <p className='text-white text-4xl font-semibold mt-2'>Glo data at best rate</p>
                        </SwiperSlide>

                        <SwiperSlide className='bg-[#1b1f28] w-full h-48 rounded-3xl p-10 py-20 duration-700 bg-[url("https://img.freepik.com/free-vector/gradient-black-background-with-wavy-lines_23-2149154120.jpg?t=st=1710388963~exp=1710392563~hmac=22e92d471d23efd636e1e69bf13336a2431b98d5ce10e4525a5ee5b17cb594ab&w=2000")] bg-cover bg-center'>
                        <IoApertureSharp size={50} color='green' className='animate-spin sepia' />

                            <p className='flex items-center mt-20 text-white'>04  <IoRemoveOutline /></p>
                            <p className='text-white text-4xl font-semibold mt-2'>9Mobile data at best rate</p>
                        </SwiperSlide>
                        ...
                    </Swiper>
                </section>
            </main>
        </>
    )
}

export default Plans