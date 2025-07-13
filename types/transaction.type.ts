// Transaction types for the application

import { z } from 'zod';

// DTO for deposit transactions
export const DepositDto = z.object({
    amount: z.number({ required_error: "Amount is required" }),
    reference: z.string({ required_error: "Reference is required" }),
    userId: z.string({ required_error: "User ID is required" }),
    status: z.enum(['pending', 'completed', 'failed']).default('pending'),
    type: z.enum(['deposit']).default('deposit'),
    transactionDate: z.date().optional(),
});

// DTO for withdrawal transactions
export const WithdrawalDto = z.object({
    amount: z.number({ required_error: "Amount is required" }),
    reference: z.string({ required_error: "Reference is required" }),
    userId: z.string({ required_error: "User ID is required" }),
    status: z.enum(['pending', 'completed', 'failed']).default('pending'),
    type: z.enum(['withdrawal']).default('withdrawal'),
    transactionDate: z.date().optional(),
});

export const BillPaymentDto = z.object({
    amount: z.number({ required_error: "Amount is required" }),
    type: z.enum(['airtime', 'data', 'electricity', 'tv']).default('airtime'),
    provider: z.string({ required_error: "Provider is required" }),
});


export type DepositInput = z.infer<typeof DepositDto>;
export type WithdrawalInput = z.infer<typeof WithdrawalDto>;
export type BillPaymentInput = z.infer<typeof BillPaymentDto>;