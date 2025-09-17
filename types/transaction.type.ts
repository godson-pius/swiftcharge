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
    identifier: z
    .enum(['airtime', 'data', 'electricity-bill', 'tv-subscription', 'education', 'other-services', 'insurance'])
    .refine(val => ['airtime', 'data', 'electricity-bill', 'tv-subscription', 'education', 'other-services', 'insurance'].includes(val), {
      message: "Invalid service identifier. Please choose a valid service."
    }),
    serviceId: z.string({ required_error: "ServiceId is required" }),
    variationCode: z.string().optional(),
    phone: z
        .string({ required_error: "Phone number is required" })
        .regex(/^\d+$/, "Phone number must be a string of digits") // Only digits allowed
        .min(10, "Phone number must be at least 10 digits") // You can adjust this based on your requirement
        .max(15, "Phone number must not exceed 11 digits"), // Limit the maximum length as needed
});

    // request_id, serviceID, phone, billersCode, variation_code, amount

export type DepositInput = z.infer<typeof DepositDto>;
export type WithdrawalInput = z.infer<typeof WithdrawalDto>;
export type BillPaymentInput = z.infer<typeof BillPaymentDto>;