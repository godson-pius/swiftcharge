import React from 'react'

const Guarantee = () => {
    return (
        <main className='flex flex-col lg:flex-row items-center justify-between my-7 px-5 lg:px-60 gap-3 lg:gap-0'>
            <h1 className='uppercase text-gray-400 text-sm font-medium'>Trust us on</h1>

            <section className='flex flex-col md:flex-row gap-7 items-center'>
                <div className='text-center lg:text-right'>
                    <h1 className='font-bold uppercase text-sm'>Instant TopUp</h1>
                    <p className='text-slate-700 text-sm'>Our delivery is automated and at a breeze.</p>
                </div>

                <div className='text-center lg:text-right'>
                    <h1 className='font-bold uppercase text-sm'>MONEY BACK GUARANTEE</h1>
                    <p className='text-slate-700 text-sm'>Didn't get value? We will refund you 100%.</p>
                </div>

                <div className='text-center lg:text-right'>
                    <h1 className='font-bold uppercase text-sm'>24/7 QUALITY SUPPORT</h1>
                    <p className='text-slate-700 text-sm'>Get in touch via phone, email and live chat.</p>
                </div>
            </section>
        </main>
    )
}

export default Guarantee