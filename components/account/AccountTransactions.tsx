'use client'
import React, {useEffect, useMemo, useState} from 'react'
import {IUserTrx} from "@/app/interface";
import {getUserTrx} from "@/utils/caller";
import {toast} from "react-toastify";
import Airtime from "@/components/Transactions/Airtime";
import moment from "moment";

const AccountTransactions = () => {
    const [transactions, setTransactions] = useState<IUserTrx[]>([])
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTransactions = useMemo(() => {
        if (!searchQuery) return transactions;

        const query = searchQuery.toLowerCase();
        return transactions.filter(trx =>
            [
                trx._id,
                trx.bill.accountNumber,
                trx.bill.type,
                trx.amount.toString(),
                moment(trx.createdAt).format('DD-MM-YYYY')
            ].some(field =>
                field.toLowerCase().includes(query)
            )
        );
    }, [transactions, searchQuery]);


    useEffect(() => {
        (async () => {
            try {
                const res = await getUserTrx()
                if (res) {
                    setTransactions(res.data)
                }
            } catch (e) {
                toast.error('Error getting user transactions')
            }
        })()
    }, [])
    return (
        <>
            <main className='w-full px-5 mt-10'>
                <div className="w-full flex items-center justify-between">
                    <h2 className='text-2xl font-semibold'>Transaction history</h2>
                    <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="search"
                           name="search" id="search"
                           className='ring-2 ring-gray-200 rounded-lg p-2 px-3 text-sm w-72 outline-none focus:scale-110 duration-700 focus:glass focus:outline-blue-400'
                           placeholder='search for transaction'/>
                </div>

                <section className='w-full grid grid-cols-3 gap-5 my-4'>

                    {filteredTransactions.map(trx => (
                        <Airtime key={trx._id} trx={trx}/>
                    ))
                    }


                </section>
            </main>
        </>
    )
}

export default AccountTransactions