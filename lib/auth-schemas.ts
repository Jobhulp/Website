import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Wachtwoord moet minimaal 8 tekens zijn')
  .regex(/[A-Z]/, 'Minimaal 1 hoofdletter')
  .regex(/[0-9]/, 'Minimaal 1 cijfer');

export const loginFormSchema = z.object({
  email: z.string().email('Ongeldig emailadres'),
  password: z.string().min(1, 'Wachtwoord is verplicht'),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const registerCandidateFormSchema = z
  .object({
    firstName: z.string().min(2, 'Voornaam moet minimaal 2 tekens zijn').max(100),
    lastName: z.string().min(2, 'Achternaam moet minimaal 2 tekens zijn').max(100),
    email: z.string().email('Ongeldig emailadres'),
    password: passwordSchema,
    passwordConfirm: z.string(),
  })
  .refine((d) => d.password === d.passwordConfirm, {
    message: 'Wachtwoorden komen niet overeen',
    path: ['passwordConfirm'],
  });

export type RegisterCandidateFormValues = z.infer<typeof registerCandidateFormSchema>;

export const registerEmployerFormSchema = z
  .object({
    companyName: z.string().min(2, 'Bedrijfsnaam moet minimaal 2 tekens zijn').max(255),
    email: z.string().email('Ongeldig emailadres'),
    password: passwordSchema,
    passwordConfirm: z.string(),
  })
  .refine((d) => d.password === d.passwordConfirm, {
    message: 'Wachtwoorden komen niet overeen',
    path: ['passwordConfirm'],
  });

export type RegisterEmployerFormValues = z.infer<typeof registerEmployerFormSchema>;

export const forgotPasswordFormSchema = z.object({
  email: z.string().email('Ongeldig emailadres'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;

export const resetPasswordFormSchema = z
  .object({
    password: passwordSchema,
    passwordConfirm: z.string(),
  })
  .refine((d) => d.password === d.passwordConfirm, {
    message: 'Wachtwoorden komen niet overeen',
    path: ['passwordConfirm'],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;
