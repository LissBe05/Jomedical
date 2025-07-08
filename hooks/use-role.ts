"use client"

import { useUser } from '@clerk/nextjs'
import { UserRole, getRoleConfig, hasPermission } from '@/lib/roles'

export function useRole() {
  const { user } = useUser()
  
  // En production, vous récupéreriez le rôle depuis les métadonnées Clerk
  // Pour cette démo, on détermine le rôle basé sur l'URL actuelle
  const getCurrentRole = (): UserRole => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      if (path.startsWith('/patient')) return 'patient'
      if (path.startsWith('/admin')) return 'medecin' // ou admin selon le contexte
    }
    return 'patient' // rôle par défaut
  }
  
  const role = getCurrentRole()
  const roleConfig = getRoleConfig(role)
  
  const can = (permission: string) => hasPermission(role, permission)
  
  return {
    role,
    roleConfig,
    can,
    isPatient: role === 'patient',
    isMedecin: role === 'medecin',
    isAdmin: role === 'admin',
    user
  }
}