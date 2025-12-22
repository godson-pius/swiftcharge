export interface IUser {
    details: {
        _id: string;
        fullname: string;
        username: string;
        email: string;
        phone: string;
        address: string;
        refId?: string;
        parentId?: string | null;
        isActive: boolean;
        role: "user" | "admin" | string; // adjust as needed
        balance: number;
        firstDeposit: boolean;
        lastLogin: string | null;
        accounts: any[]; // Replace `any` with a specific type if available
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
    refs: [{
        id: string;
        fullname: string;
        username: string;
        email: string;
        phone: string;
    }];
    token: string;
}

export interface ITransaction {
    code: string;
    content: {
        transactions: {
            status: string;
            product_name: string;
            unique_element: string;
            unit_price: string;
            quantity: number;
            service_verification: string | null;
            channel: string;
            commission: number;
            total_amount: number;
            discount: number | null;
            type: string;
            email: string;
            phone: string;
            name: string | null;
            convinience_fee: number;
            amount: string;
            platform: string;
            method: string;
            transactionId: string;
            commission_details: {
                amount: number;
                rate: string;
                rate_type: string;
                computation_type: string;
            };
        };
    };
    response_description: string;
    requestId: string;
    amount: number;
    transaction_date: string;
    purchased_code: string;
    exchangeReference: string;
    arrearsBalance: string | null;
    appliedToArrears: string | null;
    wallet: string | null;
    vat: number;
    invoiceNumber: string;
    appliedToWallet: string | null;
    units: number;
    Token: string;
    mainToken: string;
    kct1: string | null;
    kct2: string | null;
}

export interface IVariation {
    name: string;
    variation_code: string;
    variation_amount: string;
    fixedPrice: string;
}

export interface IUserTrx {
    _id: string;
    userId: string;
    type: string;
    amount: number;
    status: "success" | "failed";
    reference: string;
    description: string;
    bill: {
        type: string;
        provider: string;
        accountNumber: string;
    }
    createdAt: string;
    updatedAt: string;
}