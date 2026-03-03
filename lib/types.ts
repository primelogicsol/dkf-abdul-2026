import {
  Member,
  Registration,
  FoundationGovernance,
  Region,
  Gathering,
  PrinciplePage,
  FoundationSection,
  User,
  AuditLog,
  MemberVersion,
  ResonatedQuality,
  VisibilityStatus,
  ReviewStatus,
  UserRole,
} from '@prisma/client';

// Export all types
export type {
  Member,
  Registration,
  FoundationGovernance,
  Region,
  Gathering,
  PrinciplePage,
  FoundationSection,
  User,
  AuditLog,
  MemberVersion,
  ResonatedQuality,
  VisibilityStatus,
  ReviewStatus,
  UserRole,
};

// Member with country relation
export type MemberWithCountry = Member & {
  country_ref: Region | null;
};

// Registration with country relation
export type RegistrationWithCountry = Registration & {
  country_ref: Region | null;
};

// Gathering with region relation
export type GatheringWithRegion = Gathering & {
  region: Region | null;
};

// Audit log with user relation
export type AuditLogWithUser = AuditLog & {
  user: User;
};

// Member version with member relation
export type MemberVersionWithMember = MemberVersion;

// Create DTOs
export interface CreateMemberDTO {
  full_name: string;
  country: string;
  city?: string;
  profession: string;
  year_connected: number;
  first_encounter: string;
  resonated_quality: ResonatedQuality;
  life_changes: string;
  continuing_engagement: string;
  photo_url?: string;
  media_url?: string;
  approved?: boolean;
  visibility_status?: VisibilityStatus;
}

export interface CreateRegistrationDTO {
  full_name: string;
  country: string;
  profession: string;
  year_connected: number;
  first_encounter: string;
  resonated_quality: ResonatedQuality;
  life_changes: string;
  continuing_engagement: string;
  consent_accepted: boolean;
}

export interface CreateGovernanceDTO {
  full_name: string;
  role_title: string;
  bio_summary?: string;
  term_start?: Date;
  term_end?: Date;
  display_order?: number;
  is_active?: boolean;
}

export interface CreateRegionDTO {
  continent: string;
  country: string;
}

export interface CreateGatheringDTO {
  year: number;
  location_city: string;
  location_country: string;
  description?: string;
  related_region?: string;
}

export interface CreatePrinciplePageDTO {
  title: string;
  definition: string;
  context?: string;
  practical_implication?: string;
  selected_words?: string;
  display_order?: number;
}

export interface CreateFoundationSectionDTO {
  section_name: string;
  content: string;
  display_order?: number;
}

export interface CreateUserDTO {
  email: string;
  password_hash: string;
  full_name: string;
  role?: UserRole;
  is_active?: boolean;
}

export interface CreateAuditLogDTO {
  action: string;
  entity_type: string;
  entity_id: string;
  user_id: string;
  user_email: string;
  user_role: string;
  changes?: string;
  ip_address?: string;
}

export interface CreateMemberVersionDTO {
  member_id: string;
  full_name: string;
  country: string;
  city?: string;
  profession: string;
  year_connected: number;
  first_encounter: string;
  resonated_quality: ResonatedQuality;
  life_changes: string;
  continuing_engagement: string;
  photo_url?: string;
  media_url?: string;
  version_number: number;
  created_by: string;
}

// Update DTOs
export interface UpdateMemberDTO {
  full_name?: string;
  country?: string;
  city?: string;
  profession?: string;
  year_connected?: number;
  first_encounter?: string;
  resonated_quality?: ResonatedQuality;
  life_changes?: string;
  continuing_engagement?: string;
  photo_url?: string;
  media_url?: string;
  approved?: boolean;
  visibility_status?: VisibilityStatus;
}

export interface UpdateRegistrationDTO {
  review_status?: ReviewStatus;
  reviewed_by?: string;
  reviewed_at?: Date;
}

export interface UpdateGovernanceDTO {
  full_name?: string;
  role_title?: string;
  bio_summary?: string;
  term_start?: Date;
  term_end?: Date;
  display_order?: number;
  is_active?: boolean;
}

export interface UpdateRegionDTO {
  continent?: string;
  country?: string;
}

export interface UpdateGatheringDTO {
  year?: number;
  location_city?: string;
  location_country?: string;
  description?: string;
  related_region?: string;
}

export interface UpdatePrinciplePageDTO {
  definition?: string;
  context?: string;
  practical_implication?: string;
  selected_words?: string;
  display_order?: number;
}

export interface UpdateFoundationSectionDTO {
  content?: string;
  display_order?: number;
}

export interface UpdateUserDTO {
  full_name?: string;
  role?: UserRole;
  is_active?: boolean;
}

// Query params types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface MemberFilters {
  country?: string;
  profession?: string;
  year_connected?: number;
  resonated_quality?: ResonatedQuality;
  approved?: boolean;
  visibility_status?: VisibilityStatus;
  search?: string;
}

export interface RegistrationFilters {
  review_status?: ReviewStatus;
  country?: string;
  search?: string;
}

export interface GovernanceFilters {
  is_active?: boolean;
  role_title?: string;
}

export interface GatheringFilters {
  year?: number;
  related_region?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
