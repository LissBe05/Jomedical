"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  FileText, 
  User, 
  TestTube, 
  Pill, 
  Video, 
  MessageSquare, 
  Settings, 
  Menu, 
  X,
  Heart,
  Activity,
  Bell,
  Download,
  Phone
} from 'lucide-react'
import { UserButton } from '@clerk/nextjs'

interface PatientSidebarProps {
  className?: string
}

const menuItems = [
  {
    title: "Tableau de Bord",
    href: "/patient",
    icon: Activity,
    badge: null
  },
  {
    title: "Mes Rendez-vous",
    href: "/patient/appointments",
    icon: Calendar,
    badge: "2"
  },
  {
    title: "Mon Dossier",
    href: "/patient/medical-record",
    icon: FileText,
    badge: null
  },
  {
    title: "Résultats d'Examens",
    href: "/patient/results",
    icon: TestTube,
    badge: "3"
  },
  {
    title: "Mes Ordonnances",
    href: "/patient/prescriptions",
    icon: Pill,
    badge: null
  },
  {
    title: "Téléconsultations",
    href: "/patient/teleconsultations",
    icon: Video,
    badge: null
  },
  {
    title: "Messages",
    href: "/patient/messages",
    icon: MessageSquare,
    badge: "1"
  },
  {
    title: "Documents",
    href: "/patient/documents",
    icon: Download,
    badge: null
  },
  {
    title: "Contacts",
    href: "/patient/contacts",
    icon: Phone,
    badge: null
  },
  {
    title: "Notifications",
    href: "/patient/notifications",
    icon: Bell,
    badge: "5"
  },
  {
    title: "Mon Profil",
    href: "/patient/profile",
    icon: User,
    badge: null
  },
  {
    title: "Paramètres",
    href: "/patient/settings",
    icon: Settings,
    badge: null
  }
]

export function PatientSidebar({ className }: PatientSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  console.log("Patient sidebar rendered, current path:", pathname)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="bg-primary p-2 rounded-lg">
            <Heart className="h-6 w-6 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-lg">DossMedical</h1>
              <p className="text-xs text-muted-foreground">Espace Patient</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isCollapsed ? "px-2" : "px-3",
                    isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                  )}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                  {!isCollapsed && (
                    <>
                      <span className="truncate">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* User Section */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-3">
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "h-8 w-8"
              }
            }}
          />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                Claire Martin
              </p>
              <p className="text-xs text-muted-foreground truncate">
                Patient #P2025001
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="outline"
        size="sm"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 bg-card border-r transition-all duration-300",
        isCollapsed ? "lg:w-16" : "lg:w-64",
        className
      )}>
        <SidebarContent />
        <Button
          variant="ghost"
          size="sm"
          className="absolute -right-3 top-20 bg-background border rounded-full p-1 h-6 w-6"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu className="h-3 w-3" />
        </Button>
      </div>

      {/* Mobile Sidebar */}
      <div className={cn(
        "lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-300",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </div>
    </>
  )
}