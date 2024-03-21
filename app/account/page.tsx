import AccountMain from '@/components/account/AccountMain'
import AccountNavbar from '@/components/account/AccountNavbar'
import AccountSidebar from '@/components/account/AccountSidebar'
import AccountTransactions from '@/components/account/AccountTransactions'
import React from 'react'

const page = () => {
  return (
    <main className='w-full flex items-start bg-base-200 h-screen'>
      <AccountSidebar />

      <div className="w-full ml-72">
        <AccountNavbar />
        <AccountMain />
        <AccountTransactions />
      </div>
    </main>
  )
}

export default page