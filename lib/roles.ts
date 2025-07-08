export type UserRole = 'patient' | 'medecin' | 'admin'

export interface RoleConfig {
  name: string
  description: string
  redirectUrl: string
  permissions: string[]
}

export const ROLES: Record<UserRole, RoleConfig> = {
  patient: {
    name: 'Patient',
    description: 'Accès à votre dossier médical personnel',
    redirectUrl: '/patient',
    permissions: [
      'read:own-medical-record',
      'read:own-appointments',
      'create:appointment-request',
      'read:own-prescriptions',
      'read:own-lab-results'
    ]
  },
  medecin: {
    name: 'Médecin',
    description: 'Gestion de vos patients et consultations',
    redirectUrl: '/admin',
    permissions: [
      'read:patient-records',
      'write:patient-records',
      'manage:appointments',
      'create:prescriptions',
      'read:lab-results',
      'manage:consultations'
    ]
  },
  admin: {
    name: 'Administrateur',
    description: 'Administration complète de la plateforme',
    redirectUrl: '/admin',
    permissions: [
      'manage:all-users',
      'manage:system-settings',
      'read:analytics',
      'manage:billing',
      'manage:security',
      'export:data'
    ]
  }
}

export function getRoleConfig(role: UserRole): RoleConfig {
  return ROLES[role]
}

export function hasPermission(userRole: UserRole, permission: string): boolean {
  const roleConfig = getRoleConfig(userRole)
  return roleConfig.permissions.includes(permission)
}

export function getUserRoleFromUrl(url: string): UserRole | null {
  if (url.includes('role=patient')) return 'patient'
  if (url.includes('role=medecin')) return 'medecin' 
  if (url.includes('role=admin')) return 'admin'
  return null
}

export function getRedirectUrlForRole(role: UserRole): string {
  return getRoleConfig(role).redirectUrl
}