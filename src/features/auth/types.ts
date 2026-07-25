import type z from 'zod';

import type {
  loginInputSchema,
  forgetPasswordInputSchema,
  signupInputSchema,
  resetPasswordInputSchema,
  changePasswordInputSchema,
} from './validations';

export type SignupInput = z.infer<typeof signupInputSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;
export type ForgetPasswordInput = z.infer<typeof forgetPasswordInputSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordInputSchema>;
