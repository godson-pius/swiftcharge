import AccountMain from '@/components/account/AccountMain'
import AccountNavbar from '@/components/account/AccountNavbar'
import AccountQuicklink from '@/components/account/AccountQuicklink'
import AccountSidebar from '@/components/account/AccountSidebar'
import AccountTransactions from '@/components/account/AccountTransactions'
import React from 'react'

const page = () => {
  return (
    <main className='w-full flex flex-col lg:flex-row items-start bg-base-200 min-h-screen'>
      <AccountSidebar />

      <div className="w-full flex-1 lg:ml-72">
        <AccountNavbar />
        <AccountMain />
        <AccountQuicklink /> <hr className='mx-10 mt-10' />
        <AccountTransactions />
      </div>
    </main>
  )
}

export default page