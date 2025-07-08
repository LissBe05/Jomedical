"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  Calendar, 
  FileText, 
  Activity, 
  TrendingUp, 
  TrendingDown,
  Clock,
  AlertCircle,
  CheckCircle,
  UserPlus,
  CalendarPlus,
  FileTextIcon,
  Heart,
  Stethoscope
} from 'lucide-react'

export default function AdminDashboard() {
  console.log("Admin dashboard rendered")

  const stats = [
    {
      title: "Patients Actifs",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Rendez-vous Aujourd'hui",
      value: "23",
      change: "+5%",
      trend: "up", 
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Consultations du Mois",
      value: "342",
      change: "-3%",
      trend: "down",
      icon: Stethoscope,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Dossiers Traités",
      value: "89",
      change: "+18%",
      trend: "up",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ]

  const recentAppointments = [
    { id: 1, patient: "Marie Dubois", time: "09:00", type: "Consultation", status: "confirmé" },
    { id: 2, patient: "Jean Martin", time: "10:30", type: "Suivi", status: "en_attente" },
    { id: 3, patient: "Sophie Bernard", time: "14:00", type: "Contrôle", status: "confirmé" },
    { id: 4, patient: "Paul Durand", time: "15:30", type: "Urgence", status: "urgent" },
    { id: 5, patient: "Claire Lefèvre", time: "16:45", type: "Consultation", status: "confirmé" }
  ]

  const recentActivities = [
    { id: 1, action: "Nouveau patient enregistré", patient: "Emma Rousseau", time: "Il y a 15 min", type: "create" },
    { id: 2, action: "Dossier médical mis à jour", patient: "Pierre Moreau", time: "Il y a 32 min", type: "update" },
    { id: 3, action: "Rendez-vous confirmé", patient: "Julie Petit", time: "Il y a 1h", type: "confirm" },
    { id: 4, action: "Prescription créée", patient: "Marc Girard", time: "Il y a 2h", type: "prescription" },
    { id: 5, action: "Résultats d'analyse ajoutés", patient: "Anne Leroy", time: "Il y a 3h", type: "results" }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmé':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Confirmé</Badge>
      case 'en_attente':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'create':
        return <UserPlus className="h-4 w-4 text-green-600" />
      case 'update':
        return <FileTextIcon className="h-4 w-4 text-blue-600" />
      case 'confirm':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'prescription':
        return <Heart className="h-4 w-4 text-red-600" />
      case 'results':
        return <Activity className="h-4 w-4 text-purple-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Tableau de Bord
          </h1>
          <p className="text-muted-foreground mt-1">
            Vue d'ensemble de votre activité médicale
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm">
            <CalendarPlus className="h-4 w-4 mr-2" />
            Nouveau RDV
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Nouveau Patient
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="flex items-center text-xs">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                )}
                <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">vs. mois dernier</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 lg:w-auto lg:grid-cols-3">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
          <TabsTrigger value="activity">Activité</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Capacity Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-primary" />
                  Capacité de la Semaine
                </CardTitle>
                <CardDescription>
                  Utilisation de vos créneaux de consultation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Lundi</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Mardi</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Mercredi</span>
                    <span className="font-medium">76%</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Jeudi</span>
                    <span className="font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Vendredi</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
                <CardDescription>
                  Accès direct aux fonctions principales
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <UserPlus className="h-6 w-6 text-primary" />
                  <span className="text-sm">Nouveau Patient</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Calendar className="h-6 w-6 text-secondary" />
                  <span className="text-sm">Planifier RDV</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <FileText className="h-6 w-6 text-accent" />
                  <span className="text-sm">Nouveau Dossier</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Heart className="h-6 w-6 text-red-500" />
                  <span className="text-sm">Prescription</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rendez-vous du Jour</CardTitle>
              <CardDescription>
                Planning des consultations d'aujourd'hui
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                        <span className="font-medium text-foreground">
                          {appointment.time}
                        </span>
                        <span className="text-foreground">
                          {appointment.patient}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {appointment.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(appointment.status)}
                      <Button variant="ghost" size="sm">
                        Voir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activité Récente</CardTitle>
              <CardDescription>
                Dernières actions sur la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity.action}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Patient: {activity.patient}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}