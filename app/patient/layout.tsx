"use client"
import { ClerkProvider } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import { PatientSidebar } from '@/components/patient-sidebar'

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log("Patient layout rendered")
  
  return (
  <ClerkProvider>
    <div className="min-h-screen bg-background">
      <PatientSidebar />
      <div className="lg:pl-64">
        <main className="p-4 lg:p-8 pt-16 lg:pt-8">
          {children}
        </main>
      </div>
    </div>
    </ClerkProvider>
  )
}