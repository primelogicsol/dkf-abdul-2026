"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import PremiumHeader from "../../../components/PremiumHeader";
import PremiumFooter from "../../../components/PremiumFooter";
import { submitEngagement } from "@/app/actions/submit-engagement";
import AuthModal from "@/app/components/auth/AuthModal";

interface FieldConfig {
  type: 'input' | 'textarea' | 'select' | 'checkbox' | 'file';
  name: string;
  label: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  accept?: string;
  rows?: number;
  inputType?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  hideForAuth?: boolean; // Hide field for authenticated users
}

interface InputFieldConfig extends FieldConfig {
  type: 'input';
  inputType?: string;
}

interface TextAreaFieldConfig extends FieldConfig {
  type: 'textarea';
  rows?: number;
}

interface SelectFieldConfig extends FieldConfig {
  type: 'select';
  options: { value: string; label: string }[];
}

interface CheckboxFieldConfig extends FieldConfig {
  type: 'checkbox';
}

interface FileFieldConfig extends FieldConfig {
  type: 'file';
  accept?: string;
}

type FieldConfigUnion = InputFieldConfig | TextAreaFieldConfig | SelectFieldConfig | CheckboxFieldConfig | FileFieldConfig;

interface FormConfig {
  title: string;
  description: string;
  sections: {
    title: string;
    icon: React.ReactNode;
    fields: FieldConfig[];
  }[];
}

interface User {
  id: string;
  email: string;
  full_name: string;
}

// ... (formConfigs remains the same, just adding hideForAuth to email fields)
const formConfigs: Record<string, Record<string, FormConfig>> = {
  collaboration: {
    'healing-initiatives': {
      title: 'Therapeutic Collaboration',
      description: 'Structured pathway for professional collaboration in healing and counseling initiatives.',
      sections: [
        {
          title: 'Professional Information',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
          fields: [
            { type: 'input', name: 'fullName', label: 'Full Name', placeholder: 'Dr. Jane Smith', icon: getUserIcon(), fullWidth: true },
            { type: 'input', name: 'professionalBackground', label: 'Professional Background', placeholder: 'Describe your professional background', rows: 3, fullWidth: true },
            { type: 'input', name: 'specialization', label: 'Area of Specialization', placeholder: 'e.g., Clinical Psychology, Counseling', icon: getTargetIcon() },
            { type: 'input', name: 'yearsExperience', label: 'Years of Experience', placeholder: '10', inputType: 'number', icon: getTimeIcon() },
            { type: 'input', name: 'country', label: 'Country', placeholder: 'Your country', icon: getGlobeIcon() },
            { type: 'input', name: 'email', label: 'Email Address', placeholder: 'professional@example.com', inputType: 'email', icon: getEmailIcon(), fullWidth: true, hideForAuth: true },
          ],
        },
        {
          title: 'Contribution Details',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          ),
          fields: [
            { type: 'textarea', name: 'proposedContribution', label: 'Proposed Contribution', placeholder: 'Describe your proposed contribution to our healing initiatives (minimum 50 characters)', rows: 5, fullWidth: true },
            { type: 'checkbox', name: 'consent', label: 'I consent to the processing of my information for institutional review purposes', fullWidth: true },
          ],
        },
      ],
    },
    'environmental-programs': {
      title: 'Research & Field Partnership',
      description: 'Structured pathway for environmental research collaboration and field partnership.',
      sections: [
        {
          title: 'Researcher Information',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
          fields: [
            { type: 'input', name: 'fullName', label: 'Full Name', placeholder: 'Dr. Jane Smith', icon: getUserIcon(), fullWidth: true },
            { type: 'input', name: 'institution', label: 'Research Institution', placeholder: 'University or Organization', icon: getBuildingIcon(), fullWidth: true },
            { type: 'input', name: 'fieldOfExpertise', label: 'Field of Expertise', placeholder: 'e.g., Environmental Science, Ecology', icon: getBookIcon() },
            { type: 'input', name: 'fieldExperienceYears', label: 'Field Experience (Years)', placeholder: '10', inputType: 'number', icon: getTimeIcon() },
            { type: 'input', name: 'country', label: 'Country', placeholder: 'Your country', icon: getGlobeIcon() },
            { type: 'input', name: 'email', label: 'Email Address', placeholder: 'researcher@institution.edu', inputType: 'email', icon: getEmailIcon(), fullWidth: true, hideForAuth: true },
          ],
        },
        {
          title: 'Research Proposal',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
          fields: [
            { type: 'textarea', name: 'proposedContribution', label: 'Proposed Environmental Contribution', placeholder: 'Describe your research proposal or field partnership idea (minimum 50 characters)', rows: 5, fullWidth: true },
            { type: 'file', name: 'proposalFile', label: 'Upload Research Proposal (Optional)', accept: '.pdf,.doc,.docx', icon: getUploadIcon(), fullWidth: true },
            { type: 'checkbox', name: 'consent', label: 'I consent to the processing of my information', fullWidth: true },
          ],
        },
      ],
    },
    'youth-engagement': {
      title: 'Mentorship & Educational Involvement',
      description: 'Structured pathway for youth mentorship and educational program participation.',
      sections: [
        {
          title: 'Organization Details',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
          fields: [
            { type: 'input', name: 'fullName', label: 'Full Name', placeholder: 'Your name', icon: getUserIcon(), fullWidth: true },
            { type: 'input', name: 'organization', label: 'Organization', placeholder: 'Your organization or institution', icon: getBuildingIcon(), fullWidth: true },
            { type: 'input', name: 'country', label: 'Country', placeholder: 'Your country', icon: getGlobeIcon() },
            { type: 'input', name: 'email', label: 'Email Address', placeholder: 'your@organization.org', inputType: 'email', icon: getEmailIcon(), fullWidth: true, hideForAuth: true },
          ],
        },
        {
          title: 'Engagement Plan',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
          fields: [
            { type: 'textarea', name: 'youthExperience', label: 'Experience with Youth Programs', placeholder: 'Describe your experience working with youth programs', rows: 4, fullWidth: true },
            { type: 'textarea', name: 'engagementModel', label: 'Proposed Engagement Model', placeholder: 'Describe your proposed mentorship or educational model', rows: 4, fullWidth: true },
            { type: 'select', name: 'areasOfImpact', label: 'Primary Area of Impact', options: [
              { value: 'mentorship', label: 'Mentorship' },
              { value: 'education', label: 'Educational Support' },
              { value: 'leadership', label: 'Leadership Development' },
              { value: 'cultural', label: 'Cultural Reconnection' },
            ], icon: getTargetIcon(), fullWidth: true },
            { type: 'checkbox', name: 'consent', label: 'I consent to the processing of my information', fullWidth: true },
          ],
        },
      ],
    },
    'sufi-music': {
      title: 'Creative Collaboration',
      description: 'Structured pathway for musical and media collaboration.',
      sections: [
        {
          title: 'Artist Information',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
          fields: [
            { type: 'input', name: 'fullName', label: 'Full Name', placeholder: 'Your name', icon: getUserIcon(), fullWidth: true },
            { type: 'select', name: 'role', label: 'Your Role', options: [
              { value: 'singer', label: 'Singer / Vocalist' },
              { value: 'composer', label: 'Composer' },
              { value: 'producer', label: 'Producer' },
              { value: 'researcher', label: 'Researcher' },
              { value: 'other', label: 'Other' },
            ], icon: getMusicIcon(), fullWidth: true },
            { type: 'input', name: 'country', label: 'Country', placeholder: 'Your country', icon: getGlobeIcon() },
            { type: 'input', name: 'email', label: 'Email Address', placeholder: 'artist@example.com', inputType: 'email', icon: getEmailIcon(), fullWidth: true, hideForAuth: true },
          ],
        },
        {
          title: 'Collaboration Details',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>,
          fields: [
            { type: 'input', name: 'portfolioLink', label: 'Portfolio / Website (Optional)', placeholder: 'https://yourportfolio.com', inputType: 'url', icon: getLinkIcon(), fullWidth: true },
            { type: 'textarea', name: 'proposedCollaboration', label: 'Proposed Collaboration', placeholder: 'Describe your proposed collaboration or project idea (minimum 30 characters)', rows: 4, fullWidth: true },
            { type: 'file', name: 'sampleFile', label: 'Upload Audio Sample (Optional)', accept: '.mp3,.wav,.m4a', icon: getUploadIcon(), fullWidth: true },
            { type: 'checkbox', name: 'consent', label: 'I consent to the processing of my information', fullWidth: true },
          ],
        },
      ],
    },
    'sufi-ecommerce': {
      title: 'Economic Participation',
      description: 'Structured pathway for artisan and business participation in ethical commerce.',
      sections: [
        {
          title: 'Business Information',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
          fields: [
            { type: 'input', name: 'fullName', label: 'Full Name', placeholder: 'Your name', icon: getUserIcon(), fullWidth: true },
            { type: 'select', name: 'businessStatus', label: 'Business Status', options: [
              { value: 'artisan', label: 'Artisan / Craftsperson' },
              { value: 'business', label: 'Business Owner' },
              { value: 'cooperative', label: 'Cooperative' },
              { value: 'individual', label: 'Individual Crafter' },
            ], icon: getBuildingIcon(), fullWidth: true },
            { type: 'input', name: 'country', label: 'Country', placeholder: 'Your country', icon: getGlobeIcon() },
            { type: 'input', name: 'email', label: 'Email Address', placeholder: 'business@example.com', inputType: 'email', icon: getEmailIcon(), fullWidth: true, hideForAuth: true },
          ],
        },
        {
          title: 'Production Details',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
          fields: [
            { type: 'input', name: 'craftCategory', label: 'Craft / Service Category', placeholder: 'e.g., Textiles, Pottery, Woodwork', icon: getCraftIcon(), fullWidth: true },
            { type: 'textarea', name: 'productionCapacity', label: 'Production Capacity', placeholder: 'Describe your production capacity and capabilities', rows: 3, fullWidth: true },
            { type: 'select', name: 'complianceStatus', label: 'Certification Status', options: [
              { value: 'certified', label: 'Already Certified' },
              { value: 'in-process', label: 'In Process' },
              { value: 'not-certified', label: 'Not Certified' },
            ], icon: getCheckIcon(), fullWidth: true },
            { type: 'textarea', name: 'proposedParticipation', label: 'Proposed Participation', placeholder: 'Describe how you would like to participate (minimum 30 characters)', rows: 3, fullWidth: true },
            { type: 'checkbox', name: 'consent', label: 'I consent to the processing of my information', fullWidth: true },
          ],
        },
      ],
    },
    'sufi-science': {
      title: 'Research Submission',
      description: 'Structured pathway for academic research collaboration and submission.',
      sections: [
        {
          title: 'Academic Information',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
          fields: [
            { type: 'input', name: 'fullName', label: 'Full Name', placeholder: 'Dr. Jane Smith', icon: getUserIcon(), fullWidth: true },
            { type: 'input', name: 'institution', label: 'Academic Institution', placeholder: 'University or Research Center', icon: getBuildingIcon(), fullWidth: true },
            { type: 'textarea', name: 'academicBackground', label: 'Academic Background', placeholder: 'Describe your academic background and qualifications', rows: 3, fullWidth: true },
            { type: 'input', name: 'areaOfResearch', label: 'Area of Research', placeholder: 'e.g., Consciousness Studies, Environmental Ethics', icon: getTargetIcon() },
            { type: 'input', name: 'country', label: 'Country', placeholder: 'Your country', icon: getGlobeIcon() },
            { type: 'input', name: 'email', label: 'Email Address', placeholder: 'researcher@university.edu', inputType: 'email', icon: getEmailIcon(), fullWidth: true, hideForAuth: true },
          ],
        },
        {
          title: 'Research Abstract',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
          fields: [
            { type: 'textarea', name: 'researchAbstract', label: 'Research Abstract', placeholder: 'Provide a detailed abstract of your research (minimum 150 characters)', rows: 6, fullWidth: true },
            { type: 'file', name: 'researchPaper', label: 'Upload Research Paper (Optional)', accept: '.pdf,.doc,.docx', icon: getUploadIcon(), fullWidth: true },
            { type: 'checkbox', name: 'consent', label: 'I consent to the processing of my information', fullWidth: true },
          ],
        },
      ],
    },
    'interfaith-program': {
      title: 'Interfaith Collaboration',
      description: 'Structured pathway for interfaith dialogue, theological scholarship, and cross-community institutional collaboration.',
      sections: [
        {
          title: 'Organization Information',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
          fields: [
            { type: 'input', name: 'fullName', label: 'Full Name', placeholder: 'Dr. Jane Smith', icon: getUserIcon(), fullWidth: true },
            { type: 'input', name: 'institution', label: 'Religious/Civic Institution', placeholder: 'University, Church, Mosque, Temple, or Organization', icon: getBuildingIcon(), fullWidth: true },
            { type: 'input', name: 'role', label: 'Role/Position', placeholder: 'e.g., Director, Imam, Pastor, Rabbi, Professor', icon: getUserIcon() },
            { type: 'input', name: 'country', label: 'Country', placeholder: 'Your country', icon: getGlobeIcon() },
            { type: 'input', name: 'email', label: 'Email Address', placeholder: 'professional@institution.org', inputType: 'email', icon: getEmailIcon(), fullWidth: true, hideForAuth: true },
          ],
        },
        {
          title: 'Collaboration Proposal',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>,
          fields: [
            { type: 'textarea', name: 'proposedContribution', label: 'Proposed Collaboration', placeholder: 'Describe your proposed interfaith collaboration or dialogue initiative (minimum 50 characters)', rows: 5, fullWidth: true },
            { type: 'checkbox', name: 'consent', label: 'I consent to the processing of my information for institutional review purposes', fullWidth: true },
          ],
        },
      ],
    },
  },
  support: {
    'healing-initiatives': {
      title: 'Program Support',
      description: 'Structured pathway for supporting healing initiatives through resources or volunteering.',
      sections: [
        {
          title: 'Supporter Information',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
          fields: [
            { type: 'input', name: 'fullName', label: 'Full Name', placeholder: 'Your name', icon: getUserIcon(), fullWidth: true },
            { type: 'input', name: 'country', label: 'Country', placeholder: 'Your country', icon: getGlobeIcon() },
            { type: 'input', name: 'email', label: 'Email Address', placeholder: 'your@email.com', inputType: 'email', icon: getEmailIcon(), fullWidth: true, hideForAuth: true },
          ],
        },
        {
          title: 'Support Details',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
          fields: [
            { type: 'select', name: 'supportType', label: 'Type of Support', options: [
              { value: 'volunteer', label: 'Volunteer' },
              { value: 'financial', label: 'Financial Support' },
              { value: 'resources', label: 'Resource Donation' },
              { value: 'expertise', label: 'Professional Expertise' },
            ], icon: getHeartIcon(), fullWidth: true },
            { type: 'textarea', name: 'proposedSupport', label: 'Proposed Support', placeholder: 'Describe how you would like to support our healing initiatives', rows: 4, fullWidth: true },
            { type: 'checkbox', name: 'consent', label: 'I consent to the processing of my information', fullWidth: true },
          ],
        },
      ],
    },
    'sufi-music': {
      title: 'Music Program Support',
      description: 'Structured pathway for supporting Sufi music initiatives through resources, volunteering, or collaboration.',
      sections: [
        {
          title: 'Supporter Information',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
          fields: [
            { type: 'input', name: 'fullName', label: 'Full Name', placeholder: 'Your name', icon: getUserIcon(), fullWidth: true },
            { type: 'input', name: 'country', label: 'Country', placeholder: 'Your country', icon: getGlobeIcon() },
            { type: 'input', name: 'email', label: 'Email Address', placeholder: 'your@email.com', inputType: 'email', icon: getEmailIcon(), fullWidth: true, hideForAuth: true },
          ],
        },
        {
          title: 'Support Details',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>,
          fields: [
            { type: 'select', name: 'supportType', label: 'Type of Support', options: [
              { value: 'volunteer', label: 'Volunteer' },
              { value: 'financial', label: 'Financial Support' },
              { value: 'resources', label: 'Resource Donation' },
              { value: 'expertise', label: 'Professional Expertise' },
              { value: 'promotion', label: 'Music Promotion' },
            ], icon: getHeartIcon(), fullWidth: true },
            { type: 'textarea', name: 'proposedSupport', label: 'Proposed Support', placeholder: 'Describe how you would like to support our Sufi music initiatives', rows: 4, fullWidth: true },
            { type: 'checkbox', name: 'consent', label: 'I consent to the processing of my information', fullWidth: true },
          ],
        },
      ],
    },
    'interfaith-program': {
      title: 'Interfaith Program Support',
      description: 'Structured pathway for supporting interfaith dialogue initiatives through resources, venues, or institutional partnership.',
      sections: [
        {
          title: 'Supporter Information',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
          fields: [
            { type: 'input', name: 'fullName', label: 'Full Name', placeholder: 'Your name', icon: getUserIcon(), fullWidth: true },
            { type: 'input', name: 'country', label: 'Country', placeholder: 'Your country', icon: getGlobeIcon() },
            { type: 'input', name: 'email', label: 'Email Address', placeholder: 'your@email.com', inputType: 'email', icon: getEmailIcon(), fullWidth: true, hideForAuth: true },
          ],
        },
        {
          title: 'Support Details',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
          fields: [
            { type: 'select', name: 'supportType', label: 'Type of Support', options: [
              { value: 'volunteer', label: 'Volunteer' },
              { value: 'financial', label: 'Financial Support' },
              { value: 'venue', label: 'Venue/Space' },
              { value: 'resources', label: 'Resource Donation' },
              { value: 'expertise', label: 'Professional Expertise' },
            ], icon: getHeartIcon(), fullWidth: true },
            { type: 'textarea', name: 'proposedSupport', label: 'Proposed Support', placeholder: 'Describe how you would like to support our interfaith dialogue initiatives', rows: 4, fullWidth: true },
            { type: 'checkbox', name: 'consent', label: 'I consent to the processing of my information', fullWidth: true },
          ],
        },
      ],
    },
  },
  inquiry: {
    'healing-initiatives': {
      title: 'Program Inquiry',
      description: 'General inquiry about healing initiatives and programs.',
      sections: [
        {
          title: 'Contact Information',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
          fields: [
            { type: 'input', name: 'fullName', label: 'Full Name', placeholder: 'Your name', icon: getUserIcon(), fullWidth: true },
            { type: 'input', name: 'organization', label: 'Organization (Optional)', placeholder: 'Your organization', icon: getBuildingIcon(), fullWidth: true },
            { type: 'input', name: 'country', label: 'Country', placeholder: 'Your country', icon: getGlobeIcon() },
            { type: 'input', name: 'email', label: 'Email Address', placeholder: 'your@email.com', inputType: 'email', icon: getEmailIcon(), fullWidth: true, hideForAuth: true },
          ],
        },
        {
          title: 'Inquiry Details',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
          fields: [
            { type: 'textarea', name: 'inquiry', label: 'Your Inquiry', placeholder: 'Please describe your inquiry or question', rows: 5, fullWidth: true },
            { type: 'checkbox', name: 'consent', label: 'I consent to the processing of my information', fullWidth: true },
          ],
        },
      ],
    },
    'interfaith-program': {
      title: 'Interfaith Program Inquiry',
      description: 'General inquiry about interfaith dialogue programs, theological scholarship, or institutional collaboration.',
      sections: [
        {
          title: 'Contact Information',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
          fields: [
            { type: 'input', name: 'fullName', label: 'Full Name', placeholder: 'Your name', icon: getUserIcon(), fullWidth: true },
            { type: 'input', name: 'organization', label: 'Organization (Optional)', placeholder: 'Your organization', icon: getBuildingIcon(), fullWidth: true },
            { type: 'input', name: 'country', label: 'Country', placeholder: 'Your country', icon: getGlobeIcon() },
            { type: 'input', name: 'email', label: 'Email Address', placeholder: 'your@email.com', inputType: 'email', icon: getEmailIcon(), fullWidth: true, hideForAuth: true },
          ],
        },
        {
          title: 'Inquiry Details',
          icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
          fields: [
            { type: 'textarea', name: 'inquiry', label: 'Your Inquiry', placeholder: 'Please describe your inquiry or question', rows: 5, fullWidth: true },
            { type: 'checkbox', name: 'consent', label: 'I consent to the processing of my information', fullWidth: true },
          ],
        },
      ],
    },
  },
};

// Icon helper functions
function getUserIcon() { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>; }
function getEmailIcon() { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>; }
function getGlobeIcon() { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; }
function getTimeIcon() { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; }
function getTargetIcon() { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>; }
function getBuildingIcon() { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>; }
function getBookIcon() { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>; }
function getUploadIcon() { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>; }
function getMusicIcon() { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>; }
function getLinkIcon() { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>; }
function getCraftIcon() { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; }
function getCheckIcon() { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; }
function getHeartIcon() { return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>; }

export default function EngagePage() {
  const params = useParams();
  const program = params.program as string;
  const formType = params.formType as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [isCheckingSubmission, setIsCheckingSubmission] = useState(true);
  
  // Auth modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<"signin" | "signup">("signin");

  const config = formConfigs[formType]?.[program] || formConfigs['collaboration']?.['healing-initiatives'];

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    mode: 'onChange',
  });

  // Check authentication and submission status
  useEffect(() => {
    const checkAuthAndSubmission = async () => {
      // First check localStorage for existing session
      const localSession = localStorage.getItem("user_session");
      
      if (localSession) {
        try {
          const userData = JSON.parse(localSession);
          console.log('[Form] Found session in localStorage:', userData);
          setUser(userData);
          // User is authenticated from localStorage, check submission status
          await checkSubmissionStatus(userData.id, userData.email);
          setIsLoading(false);
          setIsCheckingSubmission(false);
          return;
        } catch (error) {
          console.error('[Form] Failed to parse localStorage session:', error);
          localStorage.removeItem("user_session");
        }
      }

      // No localStorage session - validate with server
      try {
        console.log('[Form] No localStorage session, validating with server...');
        const response = await fetch('/api/auth/session');

        if (!response.ok) {
          // Not authenticated - show auth modal
          console.log('[Form] Not authenticated, showing auth modal');
          setTimeout(() => {
            setAuthInitialTab("signin");
            setIsAuthModalOpen(true);
          }, 500);
          setIsLoading(false);
          setIsCheckingSubmission(false);
          return;
        }

        const userData = await response.json();
        console.log('[Form] Validated user:', userData);

        // Update localStorage with validated user
        localStorage.setItem("user_session", JSON.stringify(userData));
        setUser(userData);

        // Check submission status
        await checkSubmissionStatus(userData.id, userData.email);
      } catch (error) {
        console.error('[Form] Session validation error:', error);
        localStorage.removeItem("user_session");
        setTimeout(() => {
          setAuthInitialTab("signin");
          setIsAuthModalOpen(true);
        }, 500);
      } finally {
        setIsLoading(false);
        setIsCheckingSubmission(false);
      }
    };

    checkAuthAndSubmission();
  }, [program, formType]);

  const checkSubmissionStatus = async (userId: string, userEmail?: string) => {
    try {
      console.log('[Form] Checking submission status for user:', userId, 'email:', userEmail);
      const url = `/api/engagement/check?program_type=${encodeURIComponent(program)}&form_type=${encodeURIComponent(formType)}&user_id=${encodeURIComponent(userId)}${userEmail ? `&user_email=${encodeURIComponent(userEmail)}` : ''}`;
      console.log('[Form] Fetching:', url);
      
      const response = await fetch(url);
      console.log('[Form] Response status:', response.status);
      
      if (response.status === 404) {
        // User doesn't exist in database - clear stale session
        console.log('[Form] User not found in DB - clearing stale session');
        localStorage.removeItem("user_session");
        setAuthInitialTab("signin");
        setIsAuthModalOpen(true);
        return;
      }
      
      if (response.ok) {
        const data = await response.json();
        console.log('[Form] Check result:', data);
        if (data.alreadySubmitted) {
          console.log('[Form] User already submitted - setting alreadySubmitted to true');
          setAlreadySubmitted(true);
        } else {
          console.log('[Form] User has not submitted yet');
        }
      } else {
        const errorData = await response.json();
        console.error('[Form] Check failed:', errorData);
      }
    } catch (error) {
      console.error('[Form] Error checking submission status:', error);
    }
  };

  // Check by email only (for cross-browser detection)
  const checkSubmissionByEmail = async (email: string) => {
    try {
      console.log('[Form] Checking submission by email:', email);
      const url = `/api/engagement/check-by-email?program_type=${encodeURIComponent(program)}&form_type=${encodeURIComponent(formType)}&email=${encodeURIComponent(email)}`;
      console.log('[Form] Fetching:', url);
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log('[Form] Email check result:', data);
        if (data.alreadySubmitted) {
          console.log('[Form] Email already submitted - setting alreadySubmitted to true');
          setAlreadySubmitted(true);
        }
      }
    } catch (error) {
      console.error('[Form] Error checking submission by email:', error);
    }
  };

  // Handle auth modal close - revalidate session
  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
    // Revalidate session after modal closes
    setTimeout(async () => {
      try {
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const userData = await response.json();
          localStorage.setItem("user_session", JSON.stringify(userData));
          setUser(userData);
          if (userData.id && userData.email) {
            checkSubmissionStatus(userData.id, userData.email);
          }
        }
      } catch (error) {
        console.error('[Form] Revalidation error:', error);
      }
    }, 500);
  };

  // Set user data in form when available
  useEffect(() => {
    if (user) {
      setValue('fullName', user.full_name);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    setIsSubmitting(true);
    console.log('[Engagement Form] Submitting data:', data);
    try {
      // Auto-attach user email if logged in
      const formData = {
        ...data,
        email: user?.email || data.email,
        fullName: user?.full_name || data.fullName,
      };
      console.log('[Engagement Form] Form data with user info:', formData);

      const result = await submitEngagement(program, formType, formData);
      console.log('[Engagement Form] Submission result:', result);
      
      if (result.success) {
        console.log('[Engagement Form] Setting success state');
        setIsSuccess(true);
      } else {
        console.error('[Engagement Form] Submission failed:', result.error);
        alert('Submission failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('[Engagement Form] Submit error:', error);
      alert('An error occurred during submission');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || isCheckingSubmission) {
    return (
      <div className="min-h-screen bg-[#1C2340] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#AAB3CF]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1C2340]">
      <PremiumHeader />
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleAuthModalClose}
        initialTab={authInitialTab}
      />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C2340] via-[#1C2340] to-[#151A30]" />

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A85C]/10 rounded-full blur-[140px]"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#C5A85C] to-transparent mx-auto mb-8"
          />

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-4xl md:text-5xl text-white mb-6"
          >
            Engage — {program.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[#AAB3CF] text-xl leading-relaxed"
          >
            Structured participation pathway for responsible institutional engagement.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium max-w-4xl">
          {/* Program Framing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-2xl text-white mb-4">{config.title}</h2>
            <div className="gold-divider mx-auto mb-6" />
            <p className="text-[#AAB3CF] leading-relaxed">{config.description}</p>
          </motion.div>

          {isSuccess ? (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-12 text-center"
            >
              <div className="w-20 h-20 bg-[#C5A85C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">Submission Recorded</h3>
              <p className="text-[#AAB3CF] leading-relaxed mb-8">
                Your submission has been recorded and will undergo institutional review.
              </p>
              <Link
                href={`/legacy-projects/${program}`}
                className="inline-flex items-center text-[#C5A85C] hover:text-white transition-colors"
              >
                <span>Back to Program</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ) : !user ? (
            /* Not Logged In - Show Sign In Prompt */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-12 text-center"
            >
              <div className="w-20 h-20 bg-[#C5A85C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">Sign In Required</h3>
              <p className="text-[#AAB3CF] leading-relaxed mb-8">
                You must be signed in to submit a form. Please sign in or create an account to continue.
              </p>
              <button
                onClick={() => {
                  setAuthInitialTab("signin");
                  setIsAuthModalOpen(true);
                }}
                className="px-8 py-3 bg-gradient-to-r from-[#C5A85C] via-[#D4BE90] to-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)]"
              >
                Sign In
              </button>
              <p className="text-[#AAB3CF] text-sm mt-4">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setAuthInitialTab("signin");
                    setIsAuthModalOpen(true);
                  }}
                  className="text-[#C5A85C] hover:underline font-medium"
                >
                  Sign In
                </button>
              </p>
            </motion.div>
          ) : alreadySubmitted ? (
            /* Already Submitted State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-12 text-center"
            >
              <div className="w-20 h-20 bg-[#C5A85C]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">Already Submitted</h3>
              <p className="text-[#AAB3CF] leading-relaxed mb-8">
                You have already submitted a form for this program. Each user can only submit one form per program type.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  href={`/legacy-projects/${program}`}
                  className="inline-flex items-center text-[#C5A85C] hover:text-white transition-colors"
                >
                  <span>Back to Program</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <button
                  onClick={() => {
                    if (user) {
                      setAlreadySubmitted(false);
                      checkSubmissionStatus(user.id);
                    }
                  }}
                  className="px-4 py-2 bg-[#C5A85C]/20 border border-[#C5A85C]/40 text-[#C5A85C] rounded-lg hover:bg-[#C5A85C]/30 transition-all text-sm"
                >
                  Recheck Status
                </button>
              </div>
            </motion.div>
          ) : (
            /* Form */
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-10"
            >
              {config.sections.map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl overflow-hidden"
                >
                  {/* Section Header */}
                  <div className="bg-[#1C2340] px-8 py-5 border-b border-[#C5A85C]/15">
                    <div className="flex items-center gap-3">
                      <div className="text-[#C5A85C]">
                        {section.icon}
                      </div>
                      <h3 className="font-serif text-lg text-white">{section.title}</h3>
                    </div>
                  </div>

                  {/* Section Fields */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {section.fields.map((field) => {
                        // Hide email field for authenticated users
                        if (field.hideForAuth && user && field.name === 'email') {
                          return null;
                        }

                        const isEmailDisabled = field.hideForAuth && user && field.name === 'email';

                        return (
                          <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
                            {field.type === 'input' && (
                              <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[#C9CCD6] text-sm font-medium">
                                  {field.icon && <span className="text-[#C5A85C]">{field.icon}</span>}
                                  {field.label}
                                </label>
                                <input
                                  type={field.inputType || 'text'}
                                  placeholder={field.placeholder}
                                  disabled={!!isEmailDisabled}
                                  {...register(field.name, {
                                    required: `${field.label} is required`,
                                    ...(field.name === 'email' && { pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } }),
                                    ...(field.name === 'proposedContribution' && { minLength: { value: 50, message: 'Minimum 50 characters required' } }),
                                    ...(field.name === 'researchAbstract' && { minLength: { value: 150, message: 'Minimum 150 characters required' } }),
                                  })}
                                  className={`w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white placeholder-[#AAB3CF]/50 focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all ${errors[field.name] ? 'border-red-500/40' : ''} ${isEmailDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                />
                                {field.hideForAuth && user && field.name === 'email' && (
                                  <p className="text-[#C5A85C] text-xs">Your email ({user.email}) will be automatically attached</p>
                                )}
                                {errors[field.name] && (
                                  <p className="text-red-400 text-xs flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                    {errors[field.name]?.message as string}
                                  </p>
                                )}
                              </div>
                            )}

                            {field.type === 'textarea' && (
                              <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[#C9CCD6] text-sm font-medium">
                                  {field.icon && <span className="text-[#C5A85C]">{field.icon}</span>}
                                  {field.label}
                                </label>
                                <textarea
                                  placeholder={field.placeholder}
                                  rows={field.rows || 4}
                                  {...register(field.name, {
                                    required: `${field.label} is required`,
                                    ...(field.name === 'proposedContribution' && { minLength: { value: 50, message: 'Minimum 50 characters required' } }),
                                    ...(field.name === 'researchAbstract' && { minLength: { value: 150, message: 'Minimum 150 characters required' } }),
                                  })}
                                  className={`w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white placeholder-[#AAB3CF]/50 focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all resize-none ${errors[field.name] ? 'border-red-500/40' : ''}`}
                                />
                                {errors[field.name] && (
                                  <p className="text-red-400 text-xs flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                    {errors[field.name]?.message as string}
                                  </p>
                                )}
                              </div>
                            )}

                            {field.type === 'select' && field.options && (
                              <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[#C9CCD6] text-sm font-medium">
                                  {field.icon && <span className="text-[#C5A85C]">{field.icon}</span>}
                                  {field.label}
                                </label>
                                <div className="relative">
                                  <select
                                    {...register(field.name, { required: `${field.label} is required` })}
                                    className={`w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all appearance-none ${errors[field.name] ? 'border-red-500/40' : ''}`}
                                  >
                                    <option value="">Select an option</option>
                                    {field.options.map((option) => (
                                      <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                  </select>
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#C5A85C]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                  </div>
                                </div>
                                {errors[field.name] && (
                                  <p className="text-red-400 text-xs flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                    {errors[field.name]?.message as string}
                                  </p>
                                )}
                              </div>
                            )}

                            {field.type === 'checkbox' && (
                              <div className="space-y-2">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                  <div className="relative mt-0.5">
                                    <input
                                      type="checkbox"
                                      {...register(field.name, { required: 'You must consent to proceed' })}
                                      className="sr-only peer"
                                    />
                                    <div className="w-5 h-5 border-2 border-white/20 rounded peer-checked:border-[#C5A85C] peer-checked:bg-[#C5A85C] transition-all"></div>
                                    <svg className="absolute top-0.5 left-0.5 w-4 h-4 text-[#1C2340] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                  </div>
                                  <span className="text-[#C9CCD6] text-sm group-hover:text-white transition-colors">{field.label}</span>
                                </label>
                                {errors[field.name] && (
                                  <p className="text-red-400 text-xs flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                    {errors[field.name]?.message as string}
                                  </p>
                                )}
                              </div>
                            )}

                            {field.type === 'file' && (
                              <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[#C9CCD6] text-sm font-medium">
                                  {field.icon && <span className="text-[#C5A85C]">{field.icon}</span>}
                                  {field.label}
                                </label>
                                <div className="relative">
                                  <input
                                    type="file"
                                    accept={field.accept}
                                    {...register(field.name)}
                                    className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#C5A85C]/20 file:text-[#C5A85C] file:hover:bg-[#C5A85C]/30 file:cursor-pointer"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#C5A85C] via-[#D4BE90] to-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-[length:200%_100%] animate-gradient"
                >
                  {isSubmitting && (
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </motion.div>
            </motion.form>
          )}

          {/* Institutional Closing */}
          {!isSuccess && !alreadySubmitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 text-center"
            >
              <p className="text-[#AAB3CF] text-sm">
                All submissions undergo institutional review before consideration.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}
