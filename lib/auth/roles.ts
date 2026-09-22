export type AppRole = "ADMIN" | "CUSTOMER_ADMIN" | "CUSTOMER_RECRUITER" | "PROVIDER_ADMIN" | "PROVIDER_MEMBER" | "PROFESSIONAL";

export const ROLES: AppRole[] = [
  "ADMIN",
  "CUSTOMER_ADMIN",
  "CUSTOMER_RECRUITER",
  "PROVIDER_ADMIN",
  "PROVIDER_MEMBER",
  "PROFESSIONAL",
];

export function hasPermission(role: AppRole, permission: string): boolean {
  const rolePermissions: Record<AppRole, string[]> = {
    ADMIN: ["read", "write", "delete", "manage_taxonomy", "manage_organizations", "manage_scoring"],
    CUSTOMER_ADMIN: ["read", "write", "manage_organization", "invite", "import_talent"],
    CUSTOMER_RECRUICER: ["read", "search", "create_requirement", "upload_document", "shortlist"],
    PROVIDER_ADMIN: ["read", "write", "manage_provider", "manage_members"],
    PROVIDER_MEMBER: ["read", "view_own_profile", "update_availability", "confirm_availability"],
    PROFESSIONAL: ["read", "view_own_profile", "update_profile", "manage_privacy", "pulse"],
  };

  return rolePermissions[role]?.includes(permission) ?? false;
}

export function canAccessOrganization(role: AppRole, orgId: string): boolean {
  // RLS handles data-level access; this is for UI-level gating
  return role !== "ADMIN" && role !== "CUSTOMER_ADMIN"; // simplified
}
