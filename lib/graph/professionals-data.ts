// Nujeel Phase 3: Professional Capability Passport — In-Memory Data Layer
// Builds on the existing Phase 2 Technology Graph (seed-data.ts).
// No database required — runs entirely in memory.

import {
  seedDomains, seedCategories, seedVendors, seedProducts,
  seedCapabilities, seedProductCapabilities, seedAliases,
  getDomainById, getVendorById, getProductById,
  getCapabilityById, getProductsByCategory, getVendorProducts,
} from "./seed-data";

function getCategoryById(id: string) { return seedCategories.find(c => c.id === id); }

// ── Enums / types ──────────────────────────────────────────────

export type ProficiencyLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";
export type VerificationStatus = "self_declared" | "pending" | "verified" | "rejected";
export type EvidenceType = "project" | "certificate" | "reference" | "portfolio" | "assessment" | "other";
export type PrivacySetting = "public" | "nujeel_customers" | "anonymous" | "hidden";
export type AvailabilityStatus = "available" | "limited" | "unavailable";
export type WorkAuthorization = "citizen" | "permanent_resident" | "work_visa" | "sponsored_visa" | "unauthorized";
export type WorkPreference = "remote" | "onsite" | "hybrid";
export type TravelAvailability = "not_traveling" | "local_only" | "regional" | "international";

// ── Professional ───────────────────────────────────────────────

export interface Professional {
  id: string;
  user_id?: string;             // future: link to auth user
  name: string;
  headline: string;
  summary: string;
  country: string;
  city: string;
  years_experience: number;
  languages: string[];          // free text, e.g. ["English", "Arabic"]
  industries: string[];         // free text
  countries_worked: string[];   // ISO codes or names
  travel_availability: TravelAvailability;
  work_authorization: WorkAuthorization;
  relocation_preference: boolean;
  work_preference: WorkPreference;
  availability_status: AvailabilityStatus;
  privacy: PrivacySetting;
  created_at: string;           // ISO date
  updated_at: string;
}

// ── Professional Capability (linked to Technology Graph) ─────

export interface ProfessionalCapability {
  id: string;
  professional_id: string;
  // Link to existing Technology Graph entities (optional — can attach to domain/category/vendor/product/capability)
  domain_id?: string;
  category_id?: string;
  vendor_id?: string;
  product_id?: string;
  capability_id?: string;
  // Self-declared proficiency if not linked to a product
  proficiency_level?: ProficiencyLevel;
  years_experience: number;
  project_count: number;
  last_used?: string;           // ISO date
  countries: string[];
  industries: string[];
  project_examples: string[];
  evidence_status: "none" | "partial" | "supported";
  verification_status: VerificationStatus;
  last_confirmed?: string;      // ISO date
  notes?: string;
}

// ── Evidence ───────────────────────────────────────────────────

export interface Evidence {
  id: string;
  professional_id: string;
  capability_id?: string;       // if linked to a specific capability
  professional_capability_id?: string;
  type: EvidenceType;
  title: string;
  description: string;
  source?: string;              // URL or reference
  related_professional_id?: string;
  related_capability_id?: string;
  verification_status: VerificationStatus;
  expiry_date?: string;         // ISO date
  last_confirmed?: string;      // ISO date
  created_at: string;
}

// ── In-memory stores ───────────────────────────────────────────

const professionals: Map<string, Professional> = new Map();
const professionalCapabilities: Map<string, ProfessionalCapability> = new Map();
const evidences: Map<string, Evidence> = new Map();

// ── Seed data ──────────────────────────────────────────────────

function generateId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export function seedSampleProfessional(): Professional {
  const now = new Date().toISOString();
  const prof: Professional = {
    id: "prof_sample_1",
    name: "Ahmed Al-Rashid",
    headline: "Senior Cybersecurity Architect & Cloud Security Consultant",
    summary: "15+ years designing and delivering enterprise security programs across the Middle East, Europe, and North America. Specializes in zero trust architecture, cloud security posture management, and IAM transformation. Former CISO of a regional financial institution.",
    country: "Jordan",
    city: "Amman",
    years_experience: 15,
    languages: ["Arabic", "English"],
    industries: ["Financial Services", "Government", "Healthcare", "Telecommunications"],
    countries_worked: ["JO", "AE", "US", "GB"],
    travel_availability: "international",
    work_authorization: "citizen",
    relocation_preference: true,
    work_preference: "hybrid",
    availability_status: "available",
    privacy: "public",
    created_at: now,
    updated_at: now,
  };
  professionals.set(prof.id, prof);
  return prof;
}

export function seedSampleCapabilities(profId: string): ProfessionalCapability[] {
  const now = new Date().toISOString();
  const caps: ProfessionalCapability[] = [
    {
      id: generateId("pc"),
      professional_id: profId,
      domain_id: "d1",                          // Cybersecurity
      capability_id: "cap3",                    // Design
      proficiency_level: "Expert",
      years_experience: 12,
      project_count: 40,
      last_used: now,
      countries: ["JO", "AE", "US"],
      industries: ["Financial Services", "Government"],
      project_examples: [
        "Zero Trust Architecture design for a Jordanian bank (2023)",
        "Cloud security posture redesign for a UAE telco (2022)",
        "IAM transformation program for a healthcare consortium (2021)",
      ],
      evidence_status: "partial",
      verification_status: "self_declared",
      last_confirmed: now,
      notes: "Designed security architectures for 15+ enterprise clients across the Middle East.",
    },
    {
      id: generateId("pc"),
      professional_id: profId,
      domain_id: "d1",                          // Cybersecurity
      vendor_id: "v2",                          // Palo Alto Networks
      product_id: "p7",                         // Prisma Cloud
      capability_id: "cap5",                    // Implementation
      proficiency_level: "Expert",
      years_experience: 8,
      project_count: 12,
      last_used: now,
      countries: ["AE", "US"],
      industries: ["Telecommunications", "Financial Services"],
      project_examples: [
        "Prisma Cloud deployment for a UAE telco — 500+ workloads (2022)",
        "Prisma SASE rollout for a US financial services firm (2021)",
      ],
      evidence_status: "partial",
      verification_status: "self_declared",
      last_confirmed: now,
    },
    {
      id: generateId("pc"),
      professional_id: profId,
      domain_id: "d3",                          // Cloud
      capability_id: "cap1",                    // Architecture
      proficiency_level: "Expert",
      years_experience: 10,
      project_count: 25,
      last_used: now,
      countries: ["JO", "AE"],
      industries: ["Government", "Financial Services"],
      project_examples: [
        "Multi-cloud architecture for a Jordanian government entity (2023)",
        "AWS + Azure hybrid design for a financial institution (2022)",
      ],
      evidence_status: "partial",
      verification_status: "self_declared",
      last_confirmed: now,
    },
    {
      id: generateId("pc"),
      professional_id: profId,
      domain_id: "d11",                         // IAM
      capability_id: "cap15",                   // Consulting
      proficiency_level: "Expert",
      years_experience: 15,
      project_count: 30,
      last_used: now,
      countries: ["JO", "AE", "GB"],
      industries: ["Financial Services", "Government", "Healthcare"],
      project_examples: [
        "IAM strategy and roadmap for a Jordanian bank (2023)",
        "SSO/MFA rollout for a UK healthcare organization (2020)",
        "Privileged access management program for a UAE government entity (2019)",
      ],
      evidence_status: "partial",
      verification_status: "self_declared",
      last_confirmed: now,
    },
    {
      id: generateId("pc"),
      professional_id: profId,
      domain_id: "d10",                         // Observability
      vendor_id: "v16",                         // Splunk
      product_id: "p69",                        // Splunk Enterprise
      capability_id: "cap2",                    // Assessment
      proficiency_level: "Advanced",
      years_experience: 6,
      project_count: 8,
      last_used: now,
      countries: ["JO", "AE"],
      industries: ["Financial Services"],
      project_examples: [
        "Splunk SIEM assessment and rollout for a Jordanian bank (2022)",
        "Splunk ITSI implementation for a UAE telco (2021)",
      ],
      evidence_status: "partial",
      verification_status: "self_declared",
      last_confirmed: now,
    },
  ];
  for (const cap of caps) {
    professionalCapabilities.set(cap.id, cap);
  }
  return caps;
}

export function seedSampleEvidence(profId: string): Evidence[] {
  const now = new Date().toISOString();
  const evs: Evidence[] = [
    {
      id: generateId("ev"),
      professional_id: profId,
      type: "certificate",
      title: "CISSP — Certified Information Systems Security Professional",
      description: "ISC2 Certified Information Systems Security Professional. Valid until 2027.",
      verification_status: "self_declared",
      expiry_date: "2027-12-31",
      last_confirmed: now,
      created_at: now,
    },
    {
      id: generateId("ev"),
      professional_id: profId,
      type: "certificate",
      title: "CCSP — Certified Cloud Security Professional",
      description: "ISC2 Certified Cloud Security Professional. Valid until 2026.",
      verification_status: "self_declared",
      expiry_date: "2026-06-30",
      last_confirmed: now,
      created_at: now,
    },
    {
      id: generateId("ev"),
      professional_id: profId,
      type: "certificate",
      title: "AWS Certified Solutions Architect — Professional",
      description: "Amazon Web Services Professional-level certification.",
      verification_status: "self_declared",
      expiry_date: "2026-09-30",
      last_confirmed: now,
      created_at: now,
    },
    {
      id: generateId("ev"),
      professional_id: profId,
      type: "project",
      title: "Zero Trust Architecture — Jordanian Bank",
      description: "Designed and delivered a complete zero trust architecture for a tier-1 Jordanian bank serving 2M+ customers. Included micro-segmentation, identity-aware proxy, and continuous verification.",
      source: "https://example.com/case-study",
      verification_status: "self_declared",
      last_confirmed: now,
      created_at: now,
    },
    {
      id: generateId("ev"),
      professional_id: profId,
      type: "reference",
      title: "Reference: UAE Telco CISO",
      description: "Available upon request — can verify Prisma Cloud deployment leadership.",
      verification_status: "self_declared",
      last_confirmed: now,
      created_at: now,
    },
  ];
  for (const ev of evs) {
    evidences.set(ev.id, ev);
  }
  return evs;
}

// ── Read helpers ───────────────────────────────────────────────

export function getProfessionalById(id: string): Professional | undefined {
  return professionals.get(id);
}

export function getProfessionalCapabilities(profId: string): ProfessionalCapability[] {
  return [...professionalCapabilities.values()]
    .filter(c => c.professional_id === profId)
    .sort((a, b) => {
      const aName = a.capability_id ? (seedCapabilities.find(c => c.id === a.capability_id)?.name ?? "") :
        a.product_id ? (seedProducts.find(p => p.id === a.product_id)?.name ?? "") :
        a.vendor_id ? (seedVendors.find(v => v.id === a.vendor_id)?.name ?? "") : "";
      const bName = b.capability_id ? (seedCapabilities.find(c => c.id === b.capability_id)?.name ?? "") :
        b.product_id ? (seedProducts.find(p => p.id === b.product_id)?.name ?? "") :
        b.vendor_id ? (seedVendors.find(v => v.id === b.vendor_id)?.name ?? "") : "";
      return aName.localeCompare(bName);
    });
}

export function getCapabilityEvidence(capId: string): Evidence[] {
  return [...evidences.values()].filter(e => e.capability_id === capId || e.professional_capability_id === capId);
}

export function getProfessionalEvidence(profId: string): Evidence[] {
  return [...evidences.values()]
    .filter(e => e.professional_id === profId)
    .sort((a, b) => {
      const order = { certificate: 0, project: 1, reference: 2, portfolio: 3, assessment: 4, other: 5 };
      return (order[a.type] ?? 99) - (order[b.type] ?? 99);
    });
}

export function getEvidenceById(id: string): Evidence | undefined {
  return evidences.get(id);
}

export function getAllProfessionals(): Professional[] {
  return [...professionals.values()].sort((a, b) =>
    a.name.localeCompare(b.name));
}

// ── Write helpers ──────────────────────────────────────────────

export function createProfessional(data: Omit<Professional, "id" | "created_at" | "updated_at">): Professional {
  const now = new Date().toISOString();
  const prof: Professional = {
    ...data,
    id: generateId("prof"),
    created_at: now,
    updated_at: now,
  };
  professionals.set(prof.id, prof);
  return prof;
}

export function updateProfessional(id: string, data: Partial<Omit<Professional, "id" | "created_at">>): Professional | undefined {
  const existing = professionals.get(id);
  if (!existing) return undefined;
  const updated: Professional = {
    ...existing,
    ...data,
    updated_at: new Date().toISOString(),
  };
  professionals.set(id, updated);
  return updated;
}

export function deleteProfessional(id: string): boolean {
  if (!professionals.has(id)) return false;
  // Clean up capabilities and evidence
  for (const [key, cap] of professionalCapabilities.entries()) {
    if (cap.professional_id === id) professionalCapabilities.delete(key);
  }
  for (const [key, ev] of evidences.entries()) {
    if (ev.professional_id === id) evidences.delete(key);
  }
  professionals.delete(id);
  return true;
}

export function addProfessionalCapability(data: Omit<ProfessionalCapability, "id">): ProfessionalCapability {
  const cap: ProfessionalCapability = {
    ...data,
    id: generateId("pc"),
  };
  professionalCapabilities.set(cap.id, cap);
  return cap;
}

export function updateProfessionalCapability(id: string, data: Partial<Omit<ProfessionalCapability, "id">>): ProfessionalCapability | undefined {
  const existing = professionalCapabilities.get(id);
  if (!existing) return undefined;
  const updated: ProfessionalCapability = {
    ...existing,
    ...data,
  };
  professionalCapabilities.set(id, updated);
  return updated;
}

export function deleteProfessionalCapability(id: string): boolean {
  return professionalCapabilities.delete(id);
}

export function addEvidence(data: Omit<Evidence, "id" | "created_at">): Evidence {
  const ev: Evidence = {
    ...data,
    id: generateId("ev"),
    created_at: new Date().toISOString(),
  };
  evidences.set(ev.id, ev);
  return ev;
}

export function updateEvidence(id: string, data: Partial<Omit<Evidence, "id" | "created_at">>): Evidence | undefined {
  const existing = evidences.get(id);
  if (!existing) return undefined;
  const updated: Evidence = {
    ...existing,
    ...data,
  };
  evidences.set(id, updated);
  return updated;
}

export function deleteEvidence(id: string): boolean {
  return evidences.delete(id);
}

// ── Auto-seed on first import ──────────────────────────────────

seedSampleProfessional();
seedSampleCapabilities("prof_sample_1");
seedSampleEvidence("prof_sample_1");
