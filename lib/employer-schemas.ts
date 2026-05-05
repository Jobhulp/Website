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

export const companySizeEnum = z.enum([
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1000+',
]);

export const workTypeEnum = z.enum(['fulltime', 'parttime', 'freelance', 'internship']);
export const remotePreferenceEnum = z.enum(['onsite', 'hybrid', 'remote', 'flexible']);
export const salaryTypeEnum = z.enum(['yearly', 'monthly', 'hourly']);
export const experienceLevelEnum = z.enum(['junior', 'medior', 'senior']);

export const proficiencyLevelEnum = z.enum([
  'informed',
  'beginner',
  'advanced',
  'expert',
  'master',
]);

// -------------------------------------------------------------
// Employer profile
// -------------------------------------------------------------

export const companyInfoFormSchema = z.object({
  companyName: z.string().min(2).max(255),
  vatNumber: optionalText(50),
  industry: optionalText(100),
  companySize: companySizeEnum.optional().nullable(),
  foundedYear: z
    .number()
    .int()
    .min(1700)
    .max(new Date().getFullYear())
    .optional()
    .nullable()
    .or(z.nan().transform(() => null)),
  websiteUrl: optionalUrl,
  linkedinUrl: optionalUrl,
});

export type CompanyInfoFormValues = z.infer<typeof companyInfoFormSchema>;

export const companyAddressFormSchema = z.object({
  streetAddress: optionalText(255),
  city: optionalText(100),
  postalCode: optionalText(20),
  country: z.string().max(100).default('België'),
});

export type CompanyAddressFormValues = z.infer<typeof companyAddressFormSchema>;

export const companyAboutFormSchema = z.object({
  description: optionalText(5000),
  cultureDescription: optionalText(2000),
  benefits: z.array(z.string().min(1).max(100)).max(20),
});

export type CompanyAboutFormValues = z.infer<typeof companyAboutFormSchema>;

// -------------------------------------------------------------
// Jobs
// -------------------------------------------------------------

export const jobFormSchema = z
  .object({
    title: z.string().min(2, 'Minimaal 2 tekens').max(255),
    description: z
      .string()
      .min(20, 'Geef een duidelijke omschrijving (min. 20 tekens)')
      .max(10000),
    responsibilities: optionalText(5000),
    requirements: optionalText(5000),
    benefits: optionalText(2000),

    workType: workTypeEnum,
    remotePreference: remotePreferenceEnum,
    minHoursPerWeek: z
      .number()
      .int()
      .min(0)
      .max(80)
      .optional()
      .nullable()
      .or(z.nan().transform(() => null)),
    maxHoursPerWeek: z
      .number()
      .int()
      .min(0)
      .max(80)
      .optional()
      .nullable()
      .or(z.nan().transform(() => null)),

    streetAddress: optionalText(255),
    city: optionalText(100),
    postalCode: optionalText(20),
    country: z.string().max(100).default('België'),

    salaryMin: z
      .number()
      .int()
      .min(0)
      .max(10_000_000)
      .optional()
      .nullable()
      .or(z.nan().transform(() => null)),
    salaryMax: z
      .number()
      .int()
      .min(0)
      .max(10_000_000)
      .optional()
      .nullable()
      .or(z.nan().transform(() => null)),
    salaryType: salaryTypeEnum.default('monthly'),
    salaryNegotiable: z.boolean().default(false),

    requiredExperienceLevel: experienceLevelEnum.optional().nullable(),
    closesAt: dateString,
  })
  .refine(
    (d) => d.salaryMin == null || d.salaryMax == null || d.salaryMax >= d.salaryMin,
    { message: 'Maximum salaris moet groter zijn dan minimum', path: ['salaryMax'] },
  )
  .refine(
    (d) =>
      d.minHoursPerWeek == null ||
      d.maxHoursPerWeek == null ||
      d.maxHoursPerWeek >= d.minHoursPerWeek,
    { message: 'Maximum uren moet groter zijn dan minimum', path: ['maxHoursPerWeek'] },
  );

export type JobFormValues = z.infer<typeof jobFormSchema>;
