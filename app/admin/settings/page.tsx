"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  Calendar,
  Mail,
  Phone,
  Building,
  Globe,
  Lock,
  Key,
  Download,
  Upload,
  Trash2,
  Save,
  Eye,
  EyeOff
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()

  console.log("Settings page rendered")

  const handleSave = (section: string) => {
    toast({
      title: "Paramètres sauvegardés",
      description: `Les paramètres de ${section} ont été mis à jour avec succès.`,
    })
  }

  const notificationSettings = [
    { id: 'appointments', label: 'Nouveaux rendez-vous', description: 'Recevoir une notification pour chaque nouveau rendez-vous', enabled: true },
    { id: 'reminders', label: 'Rappels automatiques', description: 'Notifications 24h avant un rendez-vous', enabled: true },
    { id: 'patients', label: 'Nouveaux patients', description: 'Alerte lors de l\'enregistrement d\'un nouveau patient', enabled: false },
    { id: 'urgent', label: 'Urgences médicales', description: 'Notifications prioritaires pour les urgences', enabled: true },
    { id: 'results', label: 'Résultats d\'analyses', description: 'Notification quand de nouveaux résultats arrivent', enabled: true },
    { id: 'system', label: 'Mises à jour système', description: 'Informations sur les mises à jour et maintenance', enabled: false }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center">
          <Settings className="h-8 w-8 mr-3 text-primary" />
          Paramètres
        </h1>
        <p className="text-muted-foreground mt-1">
          Gérez vos préférences et la configuration de votre compte
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="profile" className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-1">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-1">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center space-x-1">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Apparence</span>
          </TabsTrigger>
          <TabsTrigger value="clinic" className="flex items-center space-x-1">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Cabinet</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center space-x-1">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Données</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Informations Personnelles
              </CardTitle>
              <CardDescription>
                Gérez vos informations personnelles et professionnelles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                    MD
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Changer la photo
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" defaultValue="Martin" />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" defaultValue="Dubois" />
                </div>
                <div>
                  <Label htmlFor="title">Titre professionnel</Label>
                  <Input id="title" defaultValue="Dr." />
                </div>
                <div>
                  <Label htmlFor="specialty">Spécialité</Label>
                  <Input id="specialty" defaultValue="Médecine générale" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="martin.dubois@dossmedical.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" defaultValue="01 23 45 67 89" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="bio">Biographie professionnelle</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Décrivez votre parcours et vos spécialisations..."
                  defaultValue="Médecin généraliste avec 15 ans d'expérience, spécialisé dans la médecine préventive et le suivi des maladies chroniques."
                />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave('profil')}>
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Préférences de Notifications
              </CardTitle>
              <CardDescription>
                Configurez quand et comment vous souhaitez être notifié
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {notificationSettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">{setting.label}</h4>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                    <Switch defaultChecked={setting.enabled} />
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium text-foreground mb-4">Méthodes de notification</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Notifications email</span>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Notifications SMS</span>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Notifications navigateur</span>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave('notifications')}>
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Sécurité et Confidentialité
              </CardTitle>
              <CardDescription>
                Protégez votre compte et vos données médicales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                  <div className="relative">
                    <Input 
                      id="currentPassword" 
                      type={showPassword ? "text" : "password"}
                      placeholder="Entrez votre mot de passe actuel"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium text-foreground mb-4 flex items-center">
                  <Key className="h-4 w-4 mr-2" />
                  Authentification à deux facteurs
                </h4>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h5 className="font-medium">2FA activée</h5>
                    <p className="text-sm text-muted-foreground">
                      Protection supplémentaire pour votre compte médical
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Activé
                  </Badge>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium text-foreground mb-4">Sessions actives</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <h5 className="text-sm font-medium">Session actuelle</h5>
                      <p className="text-xs text-muted-foreground">
                        Chrome sur Windows • Paris, France • Il y a 5 minutes
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Actuelle
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <h5 className="text-sm font-medium">iPhone Safari</h5>
                      <p className="text-xs text-muted-foreground">
                        Safari sur iOS • Paris, France • Il y a 2 heures
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Déconnecter
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave('sécurité')}>
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clinic Settings */}
        <TabsContent value="clinic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Informations du Cabinet
              </CardTitle>
              <CardDescription>
                Configurez les informations de votre cabinet médical
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clinicName">Nom du cabinet</Label>
                  <Input id="clinicName" defaultValue="Cabinet Dr. Dubois" />
                </div>
                <div>
                  <Label htmlFor="siret">SIRET</Label>
                  <Input id="siret" defaultValue="12345678901234" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input id="address" defaultValue="123 Avenue de la République, 75011 Paris" />
                </div>
                <div>
                  <Label htmlFor="clinicPhone">Téléphone</Label>
                  <Input id="clinicPhone" defaultValue="01 23 45 67 89" />
                </div>
                <div>
                  <Label htmlFor="clinicEmail">Email</Label>
                  <Input id="clinicEmail" defaultValue="contact@cabinet-dubois.fr" />
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium text-foreground mb-4 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Horaires d'ouverture
                </h4>
                <div className="space-y-3">
                  {[
                    { day: 'Lundi', hours: '09:00 - 18:00' },
                    { day: 'Mardi', hours: '09:00 - 18:00' },
                    { day: 'Mercredi', hours: '09:00 - 18:00' },
                    { day: 'Jeudi', hours: '09:00 - 18:00' },
                    { day: 'Vendredi', hours: '09:00 - 17:00' },
                    { day: 'Samedi', hours: 'Fermé' },
                    { day: 'Dimanche', hours: 'Fermé' }
                  ].map((schedule) => (
                    <div key={schedule.day} className="flex items-center justify-between">
                      <span className="text-sm font-medium w-20">{schedule.day}</span>
                      <Input className="w-40" defaultValue={schedule.hours} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave('cabinet')}>
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Management */}
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Gestion des Données
              </CardTitle>
              <CardDescription>
                Exportez, importez et gérez vos données médicales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Exportation des données</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Exporter tous les patients
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Exporter les rendez-vous
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Exporter les dossiers médicaux
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Importation des données</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="h-4 w-4 mr-2" />
                      Importer des patients
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="h-4 w-4 mr-2" />
                      Importer des rendez-vous
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium text-foreground mb-4 text-red-600">Zone de danger</h4>
                <div className="space-y-3">
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <h5 className="font-medium text-red-800 mb-2">Suppression des données</h5>
                    <p className="text-sm text-red-600 mb-3">
                      Cette action supprimera définitivement toutes vos données. Cette action est irréversible.
                    </p>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer toutes les données
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Apparence
              </CardTitle>
              <CardDescription>
                Personnalisez l'apparence de votre interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Thème</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <div className="w-full h-20 bg-white border rounded mb-2"></div>
                    <p className="text-sm text-center">Clair</p>
                  </div>
                  <div className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <div className="w-full h-20 bg-slate-900 border rounded mb-2"></div>
                    <p className="text-sm text-center">Sombre</p>
                  </div>
                  <div className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50 border-primary">
                    <div className="w-full h-20 bg-gradient-to-br from-white to-slate-100 border rounded mb-2"></div>
                    <p className="text-sm text-center">Auto</p>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-base font-medium">Langue</Label>
                <Select defaultValue="fr">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-base font-medium">Format de date</Label>
                <Select defaultValue="dd/mm/yyyy">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => handleSave('apparence')}>
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}