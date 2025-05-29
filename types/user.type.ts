import { z } from "zod";

// DTO for creating a user
export const CreateUserDto = z.object({
  fullname: z.string({ required_error: "Fullname is required" }),
  username: z.string({ required_error: "Username is required" }).min(3),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }).min(6),
  phone: z.string({ required_error: "Phone is required" }),
  address: z.string().optional(),
  role: z.enum(['user', 'admin']).default('user'),
  refCode: z.string().optional(), // For referral system, optional
});

export const LoginUserDto = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }).min(6),
});

// DTO for updating a user
export const UpdateUserDto = z.object({
  fullname: z.string().optional(),
  username: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  avatar: z.string().optional(),
  isActive: z.boolean().optional(),
  lastLogin: z.date().optional(),
  emailVerified: z.boolean().optional(),
});

export type LoginUserInput = z.infer<typeof LoginUserDto>;
export type CreateUserInput = z.infer<typeof CreateUserDto>;
export type UpdateUserInput = z.infer<typeof UpdateUserDto>;