import React from 'react'

const Guarantee = () => {
  return (
    <main className='flex items-center justify-between my-7 px-60'>
        <h1 className='uppercase text-gray-400 text-sm font-medium'>Trust us on</h1>

        <section className='flex gap-7 items-center'>
            <div>
                <h1 className='font-bold uppercase text-sm'>Instant TopUp</h1>
                <p className='text-slate-700 text-sm'>Our delivery is automated and at a breeze.</p>
            </div>
            
            <div>
                <h1 className='font-bold uppercase text-sm'>MONEY BACK GUARANTEE</h1>
                <p className='text-slate-700 text-sm'>Didn't get value? We will refund you 100%.</p>
            </div>
            
            <div>
                <h1 className='font-bold uppercase text-sm'>24/7 QUALITY SUPPORT</h1>
                <p className='text-slate-700 text-sm'>Get in touch via phone, email and live chat.</p>
            </div>
        </section>
    </main>
  )
}

export default Guarantee