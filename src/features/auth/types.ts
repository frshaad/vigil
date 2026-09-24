import type z from 'zod';

import type {
  changeNameInputSchema,
  changePasswordInputSchema,
  forgetPasswordInputSchema,
  loginInputSchema,
  resetPasswordInputSchema,
  signupInputSchema,
} from './schemas/credentials';

export type SignupInput = z.infer<typeof signupInputSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;
export type ChangeNameInput = z.infer<typeof changeNameInputSchema>;
export type ForgetPasswordInput = z.infer<typeof forgetPasswordInputSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordInputSchema>;

export type DeviceType =
  | 'Desktop'
  | 'Mobile'
  | 'Tablet'
  | 'TV'
  | 'Wearable'
  | 'Embedded'
  | 'Unknown';
