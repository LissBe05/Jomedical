"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Users, 
  Search, 
  UserPlus, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  FileText,
  Edit,
  MoreHorizontal,
  Eye,
  Heart,
  Activity
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTab, setSelectedTab] = useState('all')
  const { toast } = useToast()

  console.log("Patients page rendered")

  const patients = [
    {
      id: 1,
      firstName: 'Marie',
      lastName: 'Dubois',
      email: 'marie.dubois@email.com',
      phone: '06 12 34 56 78',
      birthDate: '1985-03-15',
      address: '12 rue de la Paix, 75001 Paris',
      bloodType: 'A+',
      status: 'active',
      lastVisit: '2024-12-15',
      nextAppointment: '2025-01-10',
      conditions: ['Hypertension', 'Diabète Type 2'],
      avatar: ''
    },
    {
      id: 2,
      firstName: 'Jean',
      lastName: 'Martin',
      email: 'jean.martin@email.com',
      phone: '06 23 45 67 89',
      birthDate: '1972-08-22',
      address: '45 avenue des Champs, 75008 Paris',
      bloodType: 'O-',
      status: 'active',
      lastVisit: '2024-12-10',
      nextAppointment: '2025-01-05',
      conditions: ['Asthme'],
      avatar: ''
    },
    {
      id: 3,
      firstName: 'Sophie',
      lastName: 'Bernard',
      email: 'sophie.bernard@email.com',
      phone: '06 34 56 78 90',
      birthDate: '1990-11-08',
      address: '78 boulevard Saint-Germain, 75006 Paris',
      bloodType: 'B+',
      status: 'inactive',
      lastVisit: '2024-10-20',
      nextAppointment: null,
      conditions: [],
      avatar: ''
    },
    {
      id: 4,
      firstName: 'Paul',
      lastName: 'Durand',
      email: 'paul.durand@email.com',
      phone: '06 45 67 89 01',
      birthDate: '1965-05-30',
      address: '23 rue de Rivoli, 75004 Paris',
      bloodType: 'AB+',
      status: 'active',
      lastVisit: '2024-12-20',
      nextAppointment: '2025-01-15',
      conditions: ['Cholestérol élevé', 'Arthrite'],
      avatar: ''
    },
    {
      id: 5,
      firstName: 'Claire',
      lastName: 'Lefèvre',
      email: 'claire.lefevre@email.com',
      phone: '06 56 78 90 12',
      birthDate: '1988-12-03',
      address: '156 rue de la République, 75011 Paris',
      bloodType: 'O+',
      status: 'active',
      lastVisit: '2024-12-18',
      nextAppointment: '2025-01-08',
      conditions: ['Migraine chronique'],
      avatar: ''
    }
  ]

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = selectedTab === 'all' || patient.status === selectedTab
    return matchesSearch && matchesTab
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Actif</Badge>
      case 'inactive':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Inactif</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const handleAddPatient = () => {
    toast({
      title: "Nouveau patient ajouté",
      description: "Le patient a été enregistré avec succès.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center">
            <Users className="h-8 w-8 mr-3 text-primary" />
            Gestion des Patients
          </h1>
          <p className="text-muted-foreground mt-1">
            {filteredPatients.length} patient{filteredPatients.length > 1 ? 's' : ''} 
            {searchTerm && ` correspondant à "${searchTerm}"`}
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Nouveau Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ajouter un Nouveau Patient</DialogTitle>
              <DialogDescription>
                Remplissez les informations du patient
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" placeholder="Prénom" />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" placeholder="Nom" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" placeholder="06 12 34 56 78" />
              </div>
              <div>
                <Label htmlFor="birthDate">Date de naissance</Label>
                <Input id="birthDate" type="date" />
              </div>
              <div>
                <Label htmlFor="address">Adresse</Label>
                <Textarea id="address" placeholder="Adresse complète" />
              </div>
              <div>
                <Label htmlFor="bloodType">Groupe sanguin</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un groupe sanguin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="conditions">Conditions médicales</Label>
                <Textarea id="conditions" placeholder="Conditions médicales connues (optionnel)" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Annuler</Button>
              <Button onClick={handleAddPatient}>Ajouter Patient</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un patient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="all">Tous ({patients.length})</TabsTrigger>
            <TabsTrigger value="active">Actifs ({patients.filter(p => p.status === 'active').length})</TabsTrigger>
            <TabsTrigger value="inactive">Inactifs ({patients.filter(p => p.status === 'inactive').length})</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={patient.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getInitials(patient.firstName, patient.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">
                      {patient.firstName} {patient.lastName}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {calculateAge(patient.birthDate)} ans
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(patient.status)}
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-3 w-3 mr-2" />
                  <span className="truncate">{patient.email}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-3 w-3 mr-2" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-2" />
                  <span className="truncate">{patient.address}</span>
                </div>
              </div>

              {/* Medical Info */}
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Groupe sanguin:</span>
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    <Heart className="h-3 w-3 mr-1" />
                    {patient.bloodType}
                  </Badge>
                </div>
                
                {patient.conditions.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Conditions:</span>
                    <div className="flex flex-wrap gap-1">
                      {patient.conditions.slice(0, 2).map((condition, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                      {patient.conditions.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{patient.conditions.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Visit Info */}
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Dernière visite:</span>
                  <span>{new Date(patient.lastVisit).toLocaleDateString('fr-FR')}</span>
                </div>
                {patient.nextAppointment && (
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Prochain RDV:</span>
                    <span className="text-primary font-medium">
                      {new Date(patient.nextAppointment).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="h-3 w-3 mr-1" />
                  Voir
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="h-3 w-3 mr-1" />
                  Modifier
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <FileText className="h-3 w-3 mr-1" />
                  Dossier
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card className="p-8 text-center">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Aucun patient trouvé
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm 
              ? `Aucun patient ne correspond à "${searchTerm}"`
              : "Vous n'avez pas encore de patients enregistrés"
            }
          </p>
          {!searchTerm && (
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Ajouter votre premier patient
                </Button>
              </DialogTrigger>
            </Dialog>
          )}
        </Card>
      )}
    </div>
  )
}