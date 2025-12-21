import React from 'react'
import {IoRepeat, IoShield, IoShieldCheckmark} from "react-icons/io5";
import {IUserTrx} from "@/app/interface";
import moment from "moment";

interface IProps {
    trx: IUserTrx
}

const Airtime = ({trx}: IProps) => {
    return (
        <>
            <div className='card bg-white p-5 overflow-hidden w-full'>
                <span className={`${trx.status == "success" ? 'badge-success' : 'badge-error'} w-5 h-5 rounded-full absolute -top-1 left-0 z-50`}></span>
                <div className=''>
                    <h3 className='text-md font-medium'>{trx._id}</h3>
                    <p className='text-xs text-purple-600'>Transaction Id</p>
                </div>

                <div className='flex mt-5 gap-2 text-lg font-semibold items-center'>
                    <p>sent {trx.bill.type} to</p>
                    <IoRepeat size={40} />
                    <p>{trx.bill.accountNumber}</p>
                </div>

                <p className='text-xs font-bold'>{moment(trx.createdAt).format('DD-MM-YYYY')} | {moment(trx.createdAt).format('HH:MM A')}</p>
                <h2 className='mt-2 font-bold text-gray-500'>${trx.amount}</h2>

                {trx.status == "success" ? (
                    <IoShieldCheckmark className='absolute -right-8 opacity-15' color='green' size={130} />
                ) : (
                    <IoShield className='absolute -right-8 opacity-15' color='red' size={130} />
                )}

            </div>
        </>
    )
}
export default Airtime
