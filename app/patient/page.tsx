"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar,
  FileText,
  Clock,
  Heart,
  Activity,
  Pill,
  TestTube,
  Download,
  Eye,
  Phone,
  Video,
  MessageSquare,
  Bell,
  User,
  Shield,
  Settings
} from 'lucide-react'
import { useUser } from '@clerk/nextjs'

export default function PatientDashboard() {
  const { user } = useUser()
  
  console.log("Patient dashboard rendered")

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Marie Dubois",
      specialty: "Médecin généraliste",
      date: "2025-01-05",
      time: "14:30",
      type: "Consultation",
      location: "Cabinet Dr. Dubois, Paris",
      status: "confirmé"
    },
    {
      id: 2,
      doctor: "Dr. Pierre Moreau",
      specialty: "Cardiologue",
      date: "2025-01-10",
      time: "10:00",
      type: "Suivi cardiologique",
      location: "Clinique du Cœur, Lyon",
      status: "confirmé"
    }
  ]

  const medicalHistory = [
    {
      id: 1,
      date: "2024-12-15",
      doctor: "Dr. Marie Dubois",
      type: "Consultation générale",
      diagnosis: "Contrôle de routine",
      prescription: "Vitamine D 1000 UI/jour"
    },
    {
      id: 2,
      date: "2024-11-20",
      doctor: "Dr. Pierre Moreau",
      type: "Consultation cardiologique",
      diagnosis: "Hypertension légère",
      prescription: "Lisinopril 10mg/jour"
    },
    {
      id: 3,
      date: "2024-10-10",
      doctor: "Dr. Sophie Martin",
      type: "Analyse sanguine",
      diagnosis: "Cholestérol élevé",
      prescription: "Statines + régime"
    }
  ]

  const labResults = [
    {
      id: 1,
      name: "Bilan sanguin complet",
      date: "2024-12-10",
      status: "Disponible",
      urgent: false
    },
    {
      id: 2,
      name: "ECG de repos",
      date: "2024-11-15",
      status: "Disponible",
      urgent: false
    },
    {
      id: 3,
      name: "Radio thorax",
      date: "2024-10-05",
      status: "Disponible",
      urgent: true
    }
  ]

  const prescriptions = [
    {
      id: 1,
      medication: "Lisinopril 10mg",
      dosage: "1 comprimé par jour",
      doctor: "Dr. Pierre Moreau",
      startDate: "2024-11-20",
      endDate: "2025-02-20",
      status: "Actif"
    },
    {
      id: 2,
      medication: "Vitamine D 1000 UI",
      dosage: "1 gélule par jour",
      doctor: "Dr. Marie Dubois",
      startDate: "2024-12-15",
      endDate: "2025-03-15",
      status: "Actif"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmé':
        return <Badge className="bg-green-100 text-green-800">Confirmé</Badge>
      case 'en_attente':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case 'Actif':
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>
      case 'Disponible':
        return <Badge className="bg-blue-100 text-blue-800">Disponible</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-green-50/20">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Bonjour, {user?.firstName || 'Patient'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Votre espace personnel DossMedical
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Prendre RDV</h3>
                <p className="text-sm text-muted-foreground">Planifier une consultation</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <Video className="h-8 w-8 text-secondary mx-auto mb-2" />
                <h3 className="font-semibold">Téléconsultation</h3>
                <p className="text-sm text-muted-foreground">Consultation à distance</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-8 w-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold">Messages</h3>
                <p className="text-sm text-muted-foreground">Contacter mon médecin</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <Download className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold">Téléchargements</h3>
                <p className="text-sm text-muted-foreground">Mes documents</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="appointments" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
              <TabsTrigger value="results">Résultats</TabsTrigger>
              <TabsTrigger value="prescriptions">Ordonnances</TabsTrigger>
            </TabsList>

            {/* Upcoming Appointments */}
            <TabsContent value="appointments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    Prochains Rendez-vous
                  </CardTitle>
                  <CardDescription>
                    Vos consultations programmées
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="space-y-2 sm:space-y-1 mb-4 sm:mb-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-foreground">{appointment.doctor}</h3>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        <p className="text-sm">{appointment.type}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(appointment.date).toLocaleDateString('fr-FR')}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {appointment.time}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{appointment.location}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-3 w-3 mr-1" />
                          Appeler
                        </Button>
                        <Button variant="outline" size="sm">
                          <Video className="h-3 w-3 mr-1" />
                          Visio
                        </Button>
                        <Button variant="outline" size="sm">Modifier</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Medical History */}
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    Historique Médical
                  </CardTitle>
                  <CardDescription>
                    Vos consultations et diagnostics passés
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {medicalHistory.map((record) => (
                    <div key={record.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{record.type}</h3>
                          <p className="text-sm text-muted-foreground">{record.doctor}</p>
                        </div>
                        <div className="text-sm text-muted-foreground mt-2 sm:mt-0">
                          {new Date(record.date).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">Diagnostic : </span>
                          <span className="text-sm text-muted-foreground">{record.diagnosis}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Prescription : </span>
                          <span className="text-sm text-muted-foreground">{record.prescription}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Voir détails
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Télécharger
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Lab Results */}
            <TabsContent value="results" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TestTube className="h-5 w-5 mr-2 text-primary" />
                    Résultats d'Examens
                  </CardTitle>
                  <CardDescription>
                    Vos analyses et examens médicaux
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {labResults.map((result) => (
                    <div key={result.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="space-y-1 mb-4 sm:mb-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-foreground">{result.name}</h3>
                          {result.urgent && <Badge variant="destructive" className="text-xs">Urgent</Badge>}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(result.date).toLocaleDateString('fr-FR')}
                          </span>
                          {getStatusBadge(result.status)}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Consulter
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Télécharger
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Prescriptions */}
            <TabsContent value="prescriptions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Pill className="h-5 w-5 mr-2 text-primary" />
                    Mes Ordonnances
                  </CardTitle>
                  <CardDescription>
                    Vos traitements en cours et passés
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {prescriptions.map((prescription) => (
                    <div key={prescription.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{prescription.medication}</h3>
                          <p className="text-sm text-muted-foreground">Prescrit par {prescription.doctor}</p>
                        </div>
                        {getStatusBadge(prescription.status)}
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">Posologie : </span>
                          <span className="text-sm text-muted-foreground">{prescription.dosage}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Début : {new Date(prescription.startDate).toLocaleDateString('fr-FR')}</span>
                          <span>Fin : {new Date(prescription.endDate).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Télécharger
                        </Button>
                        <Button variant="outline" size="sm">
                          Renouveler
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}