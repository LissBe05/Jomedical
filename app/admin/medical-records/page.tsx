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
  FileText, 
  Search, 
  Plus, 
  Calendar, 
  User, 
  Download, 
  Eye, 
  Edit, 
  Paperclip,
  Heart,
  Activity,
  Pill,
  TestTube,
  Stethoscope,
  AlertTriangle
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function MedicalRecordsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const { toast } = useToast()

  console.log("Medical records page rendered")

  const medicalRecords = [
    {
      id: 1,
      patientName: 'Marie Dubois',
      patientId: 'P001',
      recordType: 'consultation',
      title: 'Consultation de routine',
      date: '2024-12-15',
      doctor: 'Dr. Martin Dubois',
      summary: 'Contrôle général, tension artérielle normale, patient en bonne santé',
      diagnoses: ['Bonne santé générale'],
      prescriptions: ['Vitamine D - 1000 UI/jour'],
      attachments: 2,
      priority: 'normal',
      avatar: ''
    },
    {
      id: 2,
      patientName: 'Jean Martin',
      patientId: 'P002',
      recordType: 'urgence',
      title: 'Consultation d\'urgence - Douleurs thoraciques',
      date: '2024-12-20',
      doctor: 'Dr. Sophie Leroux',
      summary: 'Patient présentant des douleurs thoraciques, ECG normal, stress diagnostiqué',
      diagnoses: ['Stress aigu', 'Anxiété'],
      prescriptions: ['Magnésium 300mg - 2x/jour', 'Repos recommandé'],
      attachments: 5,
      priority: 'urgent',
      avatar: ''
    },
    {
      id: 3,
      patientName: 'Sophie Bernard',
      patientId: 'P003',
      recordType: 'analyse',
      title: 'Résultats d\'analyses sanguines',
      date: '2024-12-18',
      doctor: 'Dr. Martin Dubois',
      summary: 'Analyses complètes, cholestérol légèrement élevé, recommandations diététiques',
      diagnoses: ['Hypercholestérolémie légère'],
      prescriptions: ['Régime pauvre en graisses saturées'],
      attachments: 3,
      priority: 'normal',
      avatar: ''
    },
    {
      id: 4,
      patientName: 'Paul Durand',
      patientId: 'P004',
      recordType: 'suivi',
      title: 'Suivi diabète type 2',
      date: '2024-12-10',
      doctor: 'Dr. Claire Moreau',
      summary: 'Glycémie stable, HbA1c à 7.2%, ajustement du traitement',
      diagnoses: ['Diabète type 2 - stable'],
      prescriptions: ['Metformine 850mg - 2x/jour', 'Insuline ajustée'],
      attachments: 1,
      priority: 'élevé',
      avatar: ''
    },
    {
      id: 5,
      patientName: 'Claire Lefèvre',
      patientId: 'P005',
      recordType: 'vaccination',
      title: 'Vaccination grippe saisonnière',
      date: '2024-12-05',
      doctor: 'Dr. Martin Dubois',
      summary: 'Vaccination antigrippale administrée, aucune réaction adverse',
      diagnoses: ['Prévention grippe'],
      prescriptions: [],
      attachments: 1,
      priority: 'normal',
      avatar: ''
    }
  ]

  const recordTypes = [
    { value: 'all', label: 'Tous les types', count: medicalRecords.length },
    { value: 'consultation', label: 'Consultations', count: medicalRecords.filter(r => r.recordType === 'consultation').length },
    { value: 'urgence', label: 'Urgences', count: medicalRecords.filter(r => r.recordType === 'urgence').length },
    { value: 'analyse', label: 'Analyses', count: medicalRecords.filter(r => r.recordType === 'analyse').length },
    { value: 'suivi', label: 'Suivis', count: medicalRecords.filter(r => r.recordType === 'suivi').length },
    { value: 'vaccination', label: 'Vaccinations', count: medicalRecords.filter(r => r.recordType === 'vaccination').length }
  ]

  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || record.recordType === selectedFilter
    return matchesSearch && matchesFilter
  })

  const getRecordTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation':
        return <Stethoscope className="h-4 w-4" />
      case 'urgence':
        return <AlertTriangle className="h-4 w-4" />
      case 'analyse':
        return <TestTube className="h-4 w-4" />
      case 'suivi':
        return <Activity className="h-4 w-4" />
      case 'vaccination':
        return <Heart className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getRecordTypeBadge = (type: string) => {
    const configs = {
      consultation: { label: 'Consultation', className: 'bg-blue-100 text-blue-800' },
      urgence: { label: 'Urgence', className: 'bg-red-100 text-red-800' },
      analyse: { label: 'Analyse', className: 'bg-purple-100 text-purple-800' },
      suivi: { label: 'Suivi', className: 'bg-green-100 text-green-800' },
      vaccination: { label: 'Vaccination', className: 'bg-orange-100 text-orange-800' }
    }
    
    const config = configs[type as keyof typeof configs] || { label: type, className: 'bg-gray-100 text-gray-800' }
    
    return (
      <Badge variant="secondary" className={config.className}>
        {getRecordTypeIcon(type)}
        <span className="ml-1">{config.label}</span>
      </Badge>
    )
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>
      case 'élevé':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Élevé</Badge>
      case 'normal':
        return <Badge variant="outline">Normal</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n.charAt(0)).join('')
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleCreateRecord = () => {
    toast({
      title: "Dossier médical créé",
      description: "Le nouveau dossier a été enregistré avec succès.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center">
            <FileText className="h-8 w-8 mr-3 text-primary" />
            Dossiers Médicaux
          </h1>
          <p className="text-muted-foreground mt-1">
            {filteredRecords.length} dossier{filteredRecords.length > 1 ? 's' : ''} 
            {searchTerm && ` correspondant à "${searchTerm}"`}
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Dossier
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Créer un Nouveau Dossier Médical</DialogTitle>
              <DialogDescription>
                Enregistrez une consultation, analyse ou intervention
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <Label htmlFor="recordType">Type de dossier</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="urgence">Urgence</SelectItem>
                      <SelectItem value="analyse">Analyse</SelectItem>
                      <SelectItem value="suivi">Suivi</SelectItem>
                      <SelectItem value="vaccination">Vaccination</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="title">Titre du dossier</Label>
                <Input id="title" placeholder="Ex: Consultation de routine, Analyses sanguines..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div>
                  <Label htmlFor="priority">Priorité</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Priorité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="élevé">Élevé</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="summary">Résumé</Label>
                <Textarea id="summary" placeholder="Résumé de la consultation ou de l'intervention" className="min-h-[80px]" />
              </div>
              <div>
                <Label htmlFor="diagnoses">Diagnostics</Label>
                <Textarea id="diagnoses" placeholder="Diagnostics établis (un par ligne)" />
              </div>
              <div>
                <Label htmlFor="prescriptions">Prescriptions</Label>
                <Textarea id="prescriptions" placeholder="Médicaments et posologie (un par ligne)" />
              </div>
              <div>
                <Label htmlFor="attachments">Pièces jointes</Label>
                <Input id="attachments" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, images, documents Word acceptés
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Annuler</Button>
              <Button onClick={handleCreateRecord}>Créer Dossier</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par patient ou titre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {recordTypes.map(type => (
              <SelectItem key={type.value} value={type.value}>
                {type.label} ({type.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.length > 0 ? (
          filteredRecords
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((record) => (
              <Card key={record.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={record.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {getInitials(record.patientName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                          <CardTitle className="text-lg">{record.title}</CardTitle>
                          {getRecordTypeBadge(record.recordType)}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {record.patientName} (ID: {record.patientId})
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(record.date)}
                          </div>
                          <div className="flex items-center">
                            <Stethoscope className="h-3 w-3 mr-1" />
                            {record.doctor}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(record.priority)}
                      {record.attachments > 0 && (
                        <Badge variant="outline" className="flex items-center">
                          <Paperclip className="h-3 w-3 mr-1" />
                          {record.attachments}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <CardDescription className="text-sm">
                      {record.summary}
                    </CardDescription>
                  </div>
                  
                  {record.diagnoses.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
                        <Activity className="h-3 w-3 mr-1" />
                        Diagnostics
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {record.diagnoses.map((diagnosis, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {diagnosis}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {record.prescriptions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
                        <Pill className="h-3 w-3 mr-1" />
                        Prescriptions
                      </h4>
                      <div className="space-y-1">
                        {record.prescriptions.map((prescription, index) => (
                          <div key={index} className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                            {prescription}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 pt-2 border-t">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      Consulter
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Modifier
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Exporter
                    </Button>
                    {record.attachments > 0 && (
                      <Button size="sm" variant="outline">
                        <Paperclip className="h-3 w-3 mr-1" />
                        Pièces jointes ({record.attachments})
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
        ) : (
          <Card className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Aucun dossier trouvé
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? `Aucun dossier ne correspond à "${searchTerm}"`
                : "Aucun dossier médical enregistré"
              }
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Créer le premier dossier
                </Button>
              </DialogTrigger>
            </Dialog>
          </Card>
        )}
      </div>

      {/* Quick Stats */}
      {filteredRecords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Statistiques des Dossiers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
              {recordTypes.filter(type => type.value !== 'all').map(type => (
                <div key={type.value} className="space-y-1">
                  <div className="text-xl font-bold text-primary">
                    {type.count}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {type.label}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}