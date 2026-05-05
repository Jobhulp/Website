import { z } from 'zod';

const optionalText = (max: number) =>
  z.string().max(max).optional().nullable().or(z.literal(''));

const optionalUrl = z
  .string()
  .url('Ongeldige URL')
  .max(500)
  .optional()
  .nullable()
  .or(z.literal(''));

const dateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Datum moet in formaat YYYY-MM-DD zijn')
  .optional()
  .nullable()
  .or(z.literal(''));

export const workTypeEnum = z.enum(['fulltime', 'parttime', 'freelance', 'internship']);
export const remotePreferenceEnum = z.enum(['onsite', 'hybrid', 'remote', 'flexible']);
export const salaryTypeEnum = z.enum(['yearly', 'monthly', 'hourly']);

export const personalInfoFormSchema = z.object({
  firstName: z.string().min(2, 'Minimaal 2 tekens').max(100),
  lastName: z.string().min(2, 'Minimaal 2 tekens').max(100),
  phone: optionalText(30),
  dateOfBirth: dateString,
  bio: optionalText(2000),
  linkedinUrl: optionalUrl,
  portfolioUrl: optionalUrl,
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoFormSchema>;

export const locationFormSchema = z.object({
  streetAddress: optionalText(255),
  city: optionalText(100),
  postalCode: optionalText(20),
  country: z.string().max(100).default('België'),
});

export type LocationFormValues = z.infer<typeof locationFormSchema>;

export const preferencesFormSchema = z
  .object({
    desiredSalaryMin: z
      .number()
      .int()
      .min(0)
      .max(1_000_000)
      .optional()
      .nullable()
      .or(z.nan().transform(() => null)),
    desiredSalaryMax: z
      .number()
      .int()
      .min(0)
      .max(1_000_000)
      .optional()
      .nullable()
      .or(z.nan().transform(() => null)),
    desiredSalaryType: salaryTypeEnum.default('monthly'),
    workTypes: z.array(workTypeEnum).max(4),
    remotePreference: remotePreferenceEnum.optional().nullable(),
    willingToRelocate: z.boolean(),
    maxCommuteKm: z
      .number()
      .int()
      .min(0)
      .max(1000)
      .optional()
      .nullable()
      .or(z.nan().transform(() => null)),
    availableFrom: dateString,
    isSearchable: z.boolean(),
  })
  .refine(
    (d) =>
      d.desiredSalaryMin == null ||
      d.desiredSalaryMax == null ||
      d.desiredSalaryMax >= d.desiredSalaryMin,
    { message: 'Maximum salaris moet groter zijn dan minimum', path: ['desiredSalaryMax'] },
  );

export type PreferencesFormValues = z.infer<typeof preferencesFormSchema>;

export const educationFormSchema = z
  .object({
    institutionName: z.string().min(1, 'Verplicht').max(255),
    degree: optionalText(255),
    fieldOfStudy: optionalText(255),
    description: optionalText(2000),
    startDate: dateString,
    endDate: dateString,
    isCurrent: z.boolean().default(false),
  })
  .refine((d) => !d.isCurrent || !d.endDate, {
    message: 'Een huidige opleiding mag geen einddatum hebben',
    path: ['endDate'],
  });

export type EducationFormValues = z.infer<typeof educationFormSchema>;

export const experienceFormSchema = z
  .object({
    companyName: z.string().min(1, 'Verplicht').max(255),
    jobTitle: z.string().min(1, 'Verplicht').max(255),
    description: optionalText(2000),
    location: optionalText(255),
    startDate: dateString,
    endDate: dateString,
    isCurrent: z.boolean().default(false),
  })
  .refine((d) => !d.isCurrent || !d.endDate, {
    message: 'Huidige functie mag geen einddatum hebben',
    path: ['endDate'],
  });

export type ExperienceFormValues = z.infer<typeof experienceFormSchema>;
