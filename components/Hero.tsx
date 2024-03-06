import React from 'react'

const Hero = () => {
  return (
    <main className='w-full h-[48rem] pt-60 px-60 bg-[url("https://assets-global.website-files.com/6360022338a81bd6fdbb1145/65cb7dfe58d5bc20d9af06e9_home-image.png")] bg-cover bg-center bg-no-repeat'>
        <section className='flex'>
            <div className='text'>
                <div className='flex flex-col gap-0'>
                <h1 className='text-[5.7rem] font-extrabold text-white tracking-tighter'>Inclusive global</h1>
                <h1 className='text-[5.7rem] font-extrabold text-white tracking-tighter -mt-10'>soft app designed</h1>
                <h1 className='text-[5.7rem] font-extrabold text-white tracking-tighter -mt-12'>just for you.</h1>
                </div>
                <p className='mt-2 text-white text-lg'>Buy/Resell Cheap Data & Airtime, Electricity Bills Payment, <br /> Cable TV Subscription, Convert Airtime to Cash</p>

                <button className='bg-blue-600 p-3 rounded-md text-blue-100 mt-10 font-bold text-sm'>Get started - It&apos;s free</button>
            </div>
        </section>
    </main>
  )
}

export default Hero