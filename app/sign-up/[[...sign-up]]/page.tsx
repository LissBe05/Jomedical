"use client"

import { SignUp } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Users, Stethoscope, Shield } from 'lucide-react'

export default function Page() {
  const searchParams = useSearchParams()
  const role = searchParams.get('role') || 'patient'
  
  console.log("Sign-up page rendered with role:", role)
  
  const getRoleInfo = (role: string) => {
    switch (role) {
      case 'patient':
        return {
          icon: Users,
          title: 'Créer un Compte Patient',
          description: 'Créez votre dossier médical personnel',
          redirectUrl: '/patient'
        }
      case 'medecin':
        return {
          icon: Stethoscope,
          title: 'Créer un Compte Médecin',
          description: 'Rejoignez notre réseau de professionnels',
          redirectUrl: '/medecin'
        }
      case 'admin':
        return {
          icon: Shield,
          title: 'Créer un Compte Administrateur',
          description: 'Administration de votre établissement',
          redirectUrl: '/admin'
        }
      default:
        return {
          icon: Users,
          title: 'Créer un Compte',
          description: 'Rejoignez la plateforme DossMedical',
          redirectUrl: '/register'
        }
    }
  }
  
  const roleInfo = getRoleInfo(role)
  const IconComponent = roleInfo.icon
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-blue-50/30 to-green-50/20 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <IconComponent className="h-8 w-8 text-primary" />
            </div>
          </div>
          <Badge variant="secondary" className="mb-3 capitalize">
            {role}
          </Badge>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {roleInfo.title}
          </h1>
          <p className="text-muted-foreground">
            {roleInfo.description}
          </p>
        </div>
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
              card: 'shadow-xl border border-border',
              headerTitle: 'text-foreground',
              headerSubtitle: 'text-muted-foreground',
            }
          }}
          redirectUrl={roleInfo.redirectUrl}
        />
      </div>
    </div>
  )
}