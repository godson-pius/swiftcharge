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
        role: 'user' | 'admin' | string; // adjust as needed
        balance: number;
        firstDeposit: boolean;
        lastLogin: string | null;
        accounts: any[]; // Replace `any` with a specific type if available
        createdAt: string;
        updatedAt: string;
        __v: number;
    },
    token: string;

}