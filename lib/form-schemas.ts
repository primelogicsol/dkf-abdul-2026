import { z } from 'zod';

// Base schemas
const nameSchema = z.string().min(2, 'Full name must be at least 2 characters');
const emailSchema = z.string().email('Please provide a valid email address');
const countrySchema = z.string().min(2, 'Country is required');
const citySchema = z.string().min(1, 'City is required');
const genderSchema = z.enum(['male', 'female']);

// Program-specific schemas
export const healingCollaborationSchema = z.object({
  fullName: nameSchema,
  professionalBackground: z.string().min(10, 'Please describe your professional background'),
  specialization: z.string().min(5, 'Area of specialization is required'),
  country: countrySchema,
  city: citySchema,
  gender: genderSchema,
  email: emailSchema,
  yearsExperience: z.string().min(1, 'Years of experience is required'),
  proposedContribution: z.string().min(50, 'Minimum 50 characters required'),
  consent: z.boolean().refine(val => val === true, 'You must consent to proceed'),
});

export const environmentalCollaborationSchema = z.object({
  fullName: nameSchema,
  institution: z.string().min(5, 'Institution is required'),
  fieldOfExpertise: z.string().min(5, 'Field of expertise is required'),
  country: countrySchema,
  city: citySchema,
  gender: genderSchema,
  email: emailSchema,
  fieldExperienceYears: z.string().min(1, 'Years of experience is required'),
  proposedContribution: z.string().min(50, 'Minimum 50 characters required'),
  proposalFile: z.any().optional(),
  consent: z.boolean().refine(val => val === true, 'You must consent to proceed'),
});

export const youthCollaborationSchema = z.object({
  fullName: nameSchema,
  organization: z.string().min(5, 'Organization is required'),
  country: countrySchema,
  city: citySchema,
  gender: genderSchema,
  email: emailSchema,
  youthExperience: z.string().min(10, 'Please describe your experience with youth programs'),
  engagementModel: z.string().min(20, 'Please describe your proposed engagement model'),
  areasOfImpact: z.string().min(1, 'Please select an area of impact'),
  consent: z.boolean().refine(val => val === true, 'You must consent to proceed'),
});

export const musicCollaborationSchema = z.object({
  fullName: nameSchema,
  role: z.string().min(1, 'Please select your role'),
  country: countrySchema,
  city: citySchema,
  gender: genderSchema,
  email: emailSchema,
  portfolioLink: z.string().url('Please provide a valid URL').optional().or(z.literal('')),
  proposedCollaboration: z.string().min(30, 'Minimum 30 characters required'),
  sampleFile: z.any().optional(),
  consent: z.boolean().refine(val => val === true, 'You must consent to proceed'),
});

export const ecommerceCollaborationSchema = z.object({
  fullName: nameSchema,
  businessStatus: z.string().min(1, 'Please select your status'),
  country: countrySchema,
  city: citySchema,
  gender: genderSchema,
  email: emailSchema,
  craftCategory: z.string().min(5, 'Craft/Service category is required'),
  productionCapacity: z.string().min(10, 'Please describe your production capacity'),
  complianceStatus: z.string().min(1, 'Please select compliance status'),
  proposedParticipation: z.string().min(30, 'Minimum 30 characters required'),
  consent: z.boolean().refine(val => val === true, 'You must consent to proceed'),
});

export const scienceCollaborationSchema = z.object({
  fullName: nameSchema,
  institution: z.string().min(5, 'Institution is required'),
  academicBackground: z.string().min(20, 'Please describe your academic background'),
  country: countrySchema,
  city: citySchema,
  gender: genderSchema,
  email: emailSchema,
  areaOfResearch: z.string().min(5, 'Area of research is required'),
  researchAbstract: z.string().min(150, 'Minimum 150 characters required'),
  researchPaper: z.any().optional(),
  consent: z.boolean().refine(val => val === true, 'You must consent to proceed'),
});

// Support form schemas
export const healingSupportSchema = z.object({
  fullName: nameSchema,
  country: countrySchema,
  city: citySchema,
  gender: genderSchema,
  email: emailSchema,
  supportType: z.string().min(1, 'Please select a support type'),
  proposedSupport: z.string().min(20, 'Please describe your proposed support'),
  consent: z.boolean().refine(val => val === true, 'You must consent to proceed'),
});

export const musicSupportSchema = z.object({
  fullName: nameSchema,
  country: countrySchema,
  city: citySchema,
  gender: genderSchema,
  email: emailSchema,
  supportType: z.string().min(1, 'Please select a support type'),
  proposedSupport: z.string().min(20, 'Please describe your proposed support'),
  consent: z.boolean().refine(val => val === true, 'You must consent to proceed'),
});

export const interfaithSupportSchema = z.object({
  fullName: nameSchema,
  country: countrySchema,
  city: citySchema,
  gender: genderSchema,
  email: emailSchema,
  supportType: z.string().min(1, 'Please select a support type'),
  proposedSupport: z.string().min(20, 'Please describe your proposed support'),
  consent: z.boolean().refine(val => val === true, 'You must consent to proceed'),
});

// Inquiry form schemas
export const healingInquirySchema = z.object({
  fullName: nameSchema,
  organization: z.string().optional(),
  country: countrySchema,
  city: citySchema,
  gender: genderSchema,
  email: emailSchema,
  inquiry: z.string().min(20, 'Please describe your inquiry'),
  consent: z.boolean().refine(val => val === true, 'You must consent to proceed'),
});

export const interfaithInquirySchema = z.object({
  fullName: nameSchema,
  organization: z.string().optional(),
  country: countrySchema,
  city: citySchema,
  gender: genderSchema,
  email: emailSchema,
  inquiry: z.string().min(20, 'Please describe your inquiry'),
  consent: z.boolean().refine(val => val === true, 'You must consent to proceed'),
});

// Interfaith program schemas
export const interfaithCollaborationSchema = z.object({
  fullName: nameSchema,
  institution: z.string().min(5, 'Institution is required'),
  role: z.string().min(3, 'Role/Position is required'),
  country: countrySchema,
  city: citySchema,
  gender: genderSchema,
  email: emailSchema,
  proposedContribution: z.string().min(50, 'Minimum 50 characters required'),
  consent: z.boolean().refine(val => val === true, 'You must consent to proceed'),
});

// Type exports
export type HealingCollaborationInput = z.infer<typeof healingCollaborationSchema>;
export type EnvironmentalCollaborationInput = z.infer<typeof environmentalCollaborationSchema>;
export type YouthCollaborationInput = z.infer<typeof youthCollaborationSchema>;
export type MusicCollaborationInput = z.infer<typeof musicCollaborationSchema>;
export type EcommerceCollaborationInput = z.infer<typeof ecommerceCollaborationSchema>;
export type ScienceCollaborationInput = z.infer<typeof scienceCollaborationSchema>;
