import type z from 'zod';

import type { loginInputSchema, passwordResetInputSchema, signupInputSchema } from './validations';

export type SignupInput = z.infer<typeof signupInputSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;
export type PasswordResetInput = z.infer<typeof passwordResetInputSchema>;
