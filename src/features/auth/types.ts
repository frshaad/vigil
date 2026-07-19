import type z from 'zod';

import type { loginInputSchema, signupInputSchema } from './validations';

export type SignupInput = z.infer<typeof signupInputSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;
