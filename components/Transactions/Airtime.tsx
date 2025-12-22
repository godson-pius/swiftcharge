import React, {useRef, useState} from 'react'
import {IoRepeat, IoShield, IoShieldCheckmark} from "react-icons/io5";
import {IUserTrx} from "@/app/interface";
import moment from "moment";
import Modal from "@/components/Modal";
import {FiXCircle} from "react-icons/fi";
import {useReactToPrint} from "react-to-print";

interface IProps {
    trx: IUserTrx
}

type RowProps = {
    label: string;
    value: string;
    valueClass?: string;
};

function ReceiptRow({label, value, valueClass = ""}: RowProps) {
    return (
        <div className="flex items-start justify-between gap-4">
            <span className="text-gray-500">{label}</span>
            <span className={`text-right text-gray-900 ${valueClass}`}>
        {value}
      </span>
        </div>
    );
}

const Airtime = ({trx}: IProps) => {
    const [details, setDetails] = useState<IUserTrx>();
    const [detailsModalIsVisible, setDetailsModalIsVisible] = useState<boolean>(false);
    const receiptRef = useRef<HTMLDivElement>(null);


    let message = "";
    switch (trx.bill.type) {
        case "electricity-bill":
            message = `Electricity purchase for`
            break;
        case "tv-subscription":
            message = `TV subscription for`
            break;
        default:
            message = `Sent ${trx.bill.type} to`
    }

    const handlePrint = useReactToPrint({
        contentRef: receiptRef,
        documentTitle: `Receipt-${trx._id}`,
    });
    return (
        <>
            <div className='card bg-white p-5 overflow-hidden w-full cursor-pointer duration-700 hover:scale-105'
                 onClick={() => {
                     setDetailsModalIsVisible(true)
                     setDetails(trx)
                 }}>
                <span
                    className={`${trx.status == "success" ? 'badge-success' : 'badge-error'} w-5 h-5 rounded-full absolute -top-1 left-0 z-50`}></span>
                <div className=''>
                    <h3 className='text-md font-medium'>{trx._id}</h3>
                    <p className='text-xs text-purple-600'>Transaction Id</p>
                </div>

                <div className='flex mt-5 gap-2 text-lg font-semibold items-center'>
                    <p>{message}</p>
                    <IoRepeat size={40}/>
                    <p>{trx.bill.accountNumber}</p>
                </div>

                <p className='text-xs font-bold'>{moment(trx.createdAt).format('DD-MM-YYYY')} | {moment(trx.createdAt).format('HH:MM A')}</p>
                <div className='flex justify-between items-center'>
                    <h2 className={`mt-2 font-bold ${trx.status == "success" ? 'text-gray-500' : 'text-red-500'}`}>${trx.amount}</h2>
                    <h2 className={`mt-2 font-medium text-xs ${trx.status == "success" ? 'text-green-500' : 'text-red-500'}`}>{trx.status}</h2>
                </div>

                {trx.status == "success" ? (
                    <IoShieldCheckmark className='absolute -right-8 opacity-15' color='green' size={130}/>
                ) : (
                    <IoShield className='absolute -right-8 opacity-15' color='red' size={130}/>
                )}

            </div>

            <Modal isOpen={detailsModalIsVisible}>
                <div className={'px-1'} ref={receiptRef}>
                    {/* Header */}
                    <div className="flex items-center justify-between border-b pb-3">
                        <h2 className="text-lg font-semibold">Transaction Receipt</h2>
                        <div>
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                                trx.status === "success"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                          {trx.status.toUpperCase()}
                        </span>
                            <FiXCircle onClick={() => setDetailsModalIsVisible(false)}
                                       className={'size-6 float-end text-gray-500 duration-500 hover:text-black cursor-pointer hover:scale-105 ml-2'}/>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col gap-3 mt-5 text-sm">
                        <ReceiptRow label="Transaction ID" value={trx._id}/>
                        <ReceiptRow label="Reference" value={trx.reference}/>
                        <ReceiptRow label="Transaction Type" value={trx.type}/>
                        <ReceiptRow label="Description" value={trx.description}/>
                        <ReceiptRow
                            label="Amount"
                            value={`₦${trx.amount.toLocaleString()}`}
                            valueClass="font-semibold text-base"
                        />
                        <ReceiptRow
                            label="Date"
                            value={new Date(trx.createdAt).toLocaleString()}
                        />
                    </div>

                    {/* Bill Information */}
                    <div className="mt-6 border-t pt-4">
                        <h3 className="mb-3 text-sm font-semibold text-gray-700">
                            Bill Details
                        </h3>

                        <div className="flex flex-col gap-3 text-sm">
                            <ReceiptRow label="Bill Type" value={trx.bill.type}/>
                            <ReceiptRow label="Provider" value={trx.bill.provider}/>
                            <ReceiptRow label="Account Number" value={trx.bill.accountNumber}/>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex gap-3 print:hidden">
                        <button
                            onClick={handlePrint}
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                        >
                            Print
                        </button>

                        <button
                            onClick={handlePrint}
                            className="flex-1 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default Airtime
