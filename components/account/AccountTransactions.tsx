import React from 'react'
import { IoRepeat, IoRepeatOutline, IoShield, IoShieldCheckmark } from 'react-icons/io5'

const AccountTransactions = () => {
  return (
    <>
      <main className='w-full px-5 mt-10'>
        <div className="w-full flex items-center justify-between">
          <h2 className='text-2xl font-semibold'>Transaction history</h2>
          <input type="search" name="search" id="search" className='ring-2 ring-gray-200 rounded-lg p-2 px-3 text-sm w-72 outline-none focus:scale-110 duration-700 focus:glass focus:outline-blue-400' placeholder='search for transaction' />
        </div>

        <section className='w-full grid grid-cols-3 gap-5 my-4'>

          <div className='card bg-white p-5 overflow-hidden w-full'>
            <span className='badge-success w-5 h-5 rounded-full absolute -top-1 left-0 z-50'></span>
            <div className=''>
              <h3 className='text-md font-medium'>648c14db63-a7fd-43</h3>
              <p className='text-xs text-purple-600'>Transaction Id</p>
            </div>

            <div className='flex mt-5 gap-2 text-lg font-semibold items-center'>
              <p>sent to</p>
              <IoRepeat size={40} />
              <p>08029929234</p>
            </div>

            <h2 className='font-bold'>$ 234</h2>

            <IoShieldCheckmark className='absolute -right-8 opacity-15' color='green' size={130} />

          </div>

          <div className='card bg-white p-5 overflow-hidden w-full'>
            <span className='badge-success w-5 h-5 rounded-full absolute -top-1 left-0 z-50'></span>
            <div className=''>
              <h3 className='text-md font-medium'>648c14db63-a7fd-43</h3>
              <p className='text-xs text-purple-600'>Transaction Id</p>
            </div>

            <div className='flex mt-5 gap-2 text-lg font-semibold items-center'>
              <p>sent to</p>
              <IoRepeat size={40} />
              <p>08029929234</p>
            </div>

            <h2 className='font-bold'>$ 234</h2>

            <IoShieldCheckmark className='absolute -right-8 opacity-15' color='green' size={130} />
          </div>

          <div className='card bg-white p-5 overflow-hidden w-full'>
            <span className='badge-error w-5 h-5 rounded-full absolute -top-1 left-0 z-50'></span>
            <div className=''>
              <h3 className='text-md font-medium'>648c14db63-a7fd-43</h3>
              <p className='text-xs text-purple-600'>Transaction Id</p>
            </div>

            <div className='flex mt-5 gap-2 text-lg font-semibold items-center'>
              <p>sent to</p>
              <IoRepeat size={40} />
              <p>08029929234</p>
            </div>

            <h2 className='font-bold'>$ 234</h2>

            <IoShield className='absolute -right-8 opacity-15' color='red' size={130} />
          </div>

          <div className='card bg-white p-5 overflow-hidden w-full'>
            <span className='badge-success w-5 h-5 rounded-full absolute -top-1 left-0 z-50'></span>
            <div className=''>
              <h3 className='text-md font-medium'>648c14db63-a7fd-43</h3>
              <p className='text-xs text-purple-600'>Transaction Id</p>
            </div>

            <div className='flex mt-5 gap-2 text-lg font-semibold items-center'>
              <p>sent to</p>
              <IoRepeat size={40} />
              <p>08029929234</p>
            </div>

            <h2 className='font-bold'>$ 234</h2>

            <IoShieldCheckmark className='absolute -right-8 opacity-15' color='green' size={130} />
          </div>

          <div className='card bg-white p-5 overflow-hidden w-full'>
            <span className='badge-success w-5 h-5 rounded-full absolute -top-1 left-0 z-50'></span>
            <div className=''>
              <h3 className='text-md font-medium'>648c14db63-a7fd-43</h3>
              <p className='text-xs text-purple-600'>Transaction Id</p>
            </div>

            <div className='flex mt-5 gap-2 text-lg font-semibold items-center'>
              <p>sent to</p>
              <IoRepeat size={40} />
              <p>08029929234</p>
            </div>

            <h2 className='font-bold'>$ 234</h2>

            <IoShieldCheckmark className='absolute -right-8 opacity-15' color='green' size={130} />
          </div>

          <div className='card bg-white p-5 overflow-hidden w-full'>
            <span className='badge-success w-5 h-5 rounded-full absolute -top-1 left-0 z-50'></span>
            <div className=''>
              <h3 className='text-md font-medium'>648c14db63-a7fd-43</h3>
              <p className='text-xs text-purple-600'>Transaction Id</p>
            </div>

            <div className='flex mt-5 gap-2 text-lg font-semibold items-center'>
              <p>sent to</p>
              <IoRepeat size={40} />
              <p>08029929234</p>
            </div>

            <h2 className='font-bold'>$ 234</h2>

            <IoShieldCheckmark className='absolute -right-8 opacity-15' color='green' size={130} />
          </div>

        </section>
      </main>
    </>
  )
}

export default AccountTransactions