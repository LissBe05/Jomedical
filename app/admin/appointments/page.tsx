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
import { Calendar as CalendarIcon, Clock, Search, Plus, Phone, MapPin, User, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState('today')
  const { toast } = useToast()

  console.log("Appointments page rendered")

  const appointments = [
    {
      id: 1,
      patientName: 'Marie Dubois',
      patientPhone: '06 12 34 56 78',
      date: '2025-01-02',
      time: '09:00',
      duration: 30,
      type: 'Consultation générale',
      status: 'confirmé',
      notes: 'Contrôle de routine',
      avatar: ''
    },
    {
      id: 2,
      patientName: 'Jean Martin',
      patientPhone: '06 23 45 67 89',
      date: '2025-01-02',
      time: '10:30',
      duration: 45,
      type: 'Suivi médical',
      status: 'en_attente',
      notes: 'Suivi hypertension',
      avatar: ''
    },
    {
      id: 3,
      patientName: 'Sophie Bernard',
      patientPhone: '06 34 56 78 90',
      date: '2025-01-02',
      time: '14:00',
      duration: 30,
      type: 'Consultation spécialisée',
      status: 'confirmé',
      notes: 'Résultats examens',
      avatar: ''
    },
    {
      id: 4,
      patientName: 'Paul Durand',
      patientPhone: '06 45 67 89 01',
      date: '2025-01-02',
      time: '15:30',
      duration: 20,
      type: 'Urgence',
      status: 'urgent',
      notes: 'Douleurs thoraciques',
      avatar: ''
    },
    {
      id: 5,
      patientName: 'Claire Lefèvre',
      patientPhone: '06 56 78 90 12',
      date: '2025-01-02',
      time: '16:45',
      duration: 30,
      type: 'Consultation générale',
      status: 'confirmé',
      notes: 'Vaccination',
      avatar: ''
    },
    {
      id: 6,
      patientName: 'Pierre Moreau',
      patientPhone: '06 67 89 01 23',
      date: '2025-01-03',
      time: '09:30',
      duration: 40,
      type: 'Bilan de santé',
      status: 'confirmé',
      notes: 'Bilan annuel complet',
      avatar: ''
    },
    {
      id: 7,
      patientName: 'Julie Petit',
      patientPhone: '06 78 90 12 34',
      date: '2025-01-03',
      time: '11:00',
      duration: 30,
      type: 'Consultation générale',
      status: 'annulé',
      notes: 'Consultation reportée',
      avatar: ''
    }
  ]

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ]

  const getFilteredAppointments = () => {
    const today = new Date().toISOString().split('T')[0]
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowStr = tomorrow.toISOString().split('T')[0]

    return appointments.filter(appointment => {
      const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase())
      let matchesDate = true
      
      switch (selectedDate) {
        case 'today':
          matchesDate = appointment.date === today
          break
        case 'tomorrow':
          matchesDate = appointment.date === tomorrowStr
          break
        case 'week':
          const weekFromNow = new Date()
          weekFromNow.setDate(weekFromNow.getDate() + 7)
          matchesDate = new Date(appointment.date) <= weekFromNow
          break
        default:
          matchesDate = true
      }
      
      return matchesSearch && matchesDate
    })
  }

  const filteredAppointments = getFilteredAppointments()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmé':
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirmé
          </Badge>
        )
      case 'en_attente':
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            En attente
          </Badge>
        )
      case 'urgent':
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Urgent
          </Badge>
        )
      case 'annulé':
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Annulé
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n.charAt(0)).join('')
  }

  const formatTime = (time: string) => {
    return time
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleCreateAppointment = () => {
    toast({
      title: "Rendez-vous créé",
      description: "Le rendez-vous a été planifié avec succès.",
    })
  }

  const getAppointmentsByDate = () => {
    const grouped = filteredAppointments.reduce((acc, appointment) => {
      const date = appointment.date
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(appointment)
      return acc
    }, {} as Record<string, typeof appointments>)
    
    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center">
            <CalendarIcon className="h-8 w-8 mr-3 text-primary" />
            Gestion des Rendez-vous
          </h1>
          <p className="text-muted-foreground mt-1">
            {filteredAppointments.length} rendez-vous 
            {searchTerm && ` correspondant à "${searchTerm}"`}
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Rendez-vous
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Planifier un Nouveau Rendez-vous</DialogTitle>
              <DialogDescription>
                Créez un nouveau rendez-vous pour un patient
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="patient">Patient</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marie">Marie Dubois</SelectItem>
                    <SelectItem value="jean">Jean Martin</SelectItem>
                    <SelectItem value="sophie">Sophie Bernard</SelectItem>
                    <SelectItem value="paul">Paul Durand</SelectItem>
                    <SelectItem value="claire">Claire Lefèvre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div>
                  <Label htmlFor="time">Heure</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Heure" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Durée (minutes)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Durée" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 heure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Type de consultation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Consultation générale</SelectItem>
                      <SelectItem value="suivi">Suivi médical</SelectItem>
                      <SelectItem value="urgence">Urgence</SelectItem>
                      <SelectItem value="bilan">Bilan de santé</SelectItem>
                      <SelectItem value="specialisee">Consultation spécialisée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes (optionnel)</Label>
                <Textarea id="notes" placeholder="Notes sur le rendez-vous" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Annuler</Button>
              <Button onClick={handleCreateAppointment}>Créer Rendez-vous</Button>
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
        <Tabs value={selectedDate} onValueChange={setSelectedDate}>
          <TabsList>
            <TabsTrigger value="today">Aujourd'hui</TabsTrigger>
            <TabsTrigger value="tomorrow">Demain</TabsTrigger>
            <TabsTrigger value="week">Cette semaine</TabsTrigger>
            <TabsTrigger value="all">Tous</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Calendar View */}
      <div className="space-y-6">
        {getAppointmentsByDate().length > 0 ? (
          getAppointmentsByDate().map(([date, dayAppointments]) => (
            <Card key={date}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
                  {formatDate(date)}
                </CardTitle>
                <CardDescription>
                  {dayAppointments.length} rendez-vous prévus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dayAppointments
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((appointment) => (
                    <div 
                      key={appointment.id} 
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                        <div className="flex flex-col items-center text-center min-w-[60px]">
                          <span className="text-lg font-bold text-primary">
                            {formatTime(appointment.time)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {appointment.duration}min
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={appointment.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                              {getInitials(appointment.patientName)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                              <h3 className="font-medium text-foreground">
                                {appointment.patientName}
                              </h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Phone className="h-3 w-3 mr-1" />
                                {appointment.patientPhone}
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <FileText className="h-3 w-3 mr-1" />
                                {appointment.type}
                              </span>
                              {appointment.notes && (
                                <span className="truncate max-w-[200px]">
                                  {appointment.notes}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(appointment.status)}
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            Voir
                          </Button>
                          <Button variant="ghost" size="sm">
                            Modifier
                          </Button>
                          {appointment.status === 'en_attente' && (
                            <Button variant="outline" size="sm" className="text-green-600 border-green-200">
                              Confirmer
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center">
            <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Aucun rendez-vous trouvé
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? `Aucun rendez-vous ne correspond à "${searchTerm}"`
                : "Aucun rendez-vous prévu pour cette période"
              }
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Planifier un rendez-vous
                </Button>
              </DialogTrigger>
            </Dialog>
          </Card>
        )}
      </div>

      {/* Quick Stats */}
      {filteredAppointments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Résumé</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-green-600">
                  {filteredAppointments.filter(a => a.status === 'confirmé').length}
                </div>
                <div className="text-xs text-muted-foreground">Confirmés</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-yellow-600">
                  {filteredAppointments.filter(a => a.status === 'en_attente').length}
                </div>
                <div className="text-xs text-muted-foreground">En attente</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-red-600">
                  {filteredAppointments.filter(a => a.status === 'urgent').length}
                </div>
                <div className="text-xs text-muted-foreground">Urgents</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-600">
                  {filteredAppointments.filter(a => a.status === 'annulé').length}
                </div>
                <div className="text-xs text-muted-foreground">Annulés</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}