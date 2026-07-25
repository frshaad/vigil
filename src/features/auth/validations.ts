import z from 'zod';

export const baseSchemaConfig = {
  // Display Name
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 32,

  // Password
  PASSWORD_PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,

  // Email
  MAX_EMAIL_LENGTH: 254,
};

export const displayNameSchema = z
  .string()
  .trim()
  .min(
    baseSchemaConfig.MIN_NAME_LENGTH,
    `Name must be at least ${baseSchemaConfig.MIN_NAME_LENGTH} characters`
  )
  .max(
    baseSchemaConfig.MAX_NAME_LENGTH,
    `Name must be ${baseSchemaConfig.MAX_NAME_LENGTH} characters or fewer`
  );

export const emailSchema = z
  .email({ error: 'Invalid email address' })
  .trim()
  .max(baseSchemaConfig.MAX_EMAIL_LENGTH, 'Email is too long');

export const passwordSchema = z
  .string()
  .min(baseSchemaConfig.MIN_PASSWORD_LENGTH, {
    message: `Password must be at least ${baseSchemaConfig.MIN_PASSWORD_LENGTH} characters long.`,
  })
  .regex(/[A-Z]/u, {
    message: 'Password must contain at least one uppercase letter.',
  })
  .regex(/[a-z]/u, {
    message: 'Password must contain at least one lowercase letter.',
  })
  .regex(/[0-9]/u, {
    message: 'Password must contain at least one number.',
  })
  .regex(/[^A-Za-z0-9]/u, {
    message: 'Password must contain at least one symbol.',
  });

export const signupInputSchema = z
  .object({
    name: displayNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginInputSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean(),
});

export const passwordResetInputSchema = z.object({
  email: emailSchema,
});
