"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { 
  Heart, Shield, Users, FileText, Activity, Stethoscope, Calendar, ChevronRight, 
  Star, ArrowRight, Phone, Mail, MapPin, Clock, MessageCircle, Send, ChevronLeft,
  Play, CheckCircle, Award, TrendingUp, Globe, Lock, Zap, Brain, Smartphone,
  Facebook, Twitter, Instagram, Linkedin, Youtube, ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const { toast } = useToast()

  console.log("Home page rendered")

  const heroSlides = [
    {
      title: "Révolutionnez Votre Pratique Médicale",
      subtitle: "Plateforme complète de gestion des dossiers patients avec IA intégrée",
      description: "Simplifiez votre quotidien avec notre solution tout-en-un : dossiers numériques, planning intelligent, téléconsultation et analyses prédictives.",
      cta: "Découvrir la Solution",
      image: "👨‍⚕️",
      stats: { patients: "50,000+", medecins: "2,500+", consultations: "1M+" }
    },
    {
      title: "Sécurité & Conformité RGPD",
      subtitle: "Protection maximale de vos données médicales sensibles",
      description: "Chiffrement end-to-end, authentification multi-facteurs, sauvegarde automatique et audit trail complet pour une sécurité inégalée.",
      cta: "En Savoir Plus",
      image: "🔒",
      stats: { securite: "99.9%", conformite: "100%", uptime: "99.8%" }
    },
    {
      title: "Intelligence Artificielle Médicale",
      subtitle: "Assistez vos diagnostics avec l'IA de pointe",
      description: "Suggestions diagnostiques intelligentes, détection d'anomalies, prédiction de risques et recommandations thérapeutiques personnalisées.",
      cta: "Essayer l'IA",
      image: "🧠",
      stats: { precision: "94%", gain_temps: "40%", satisfaction: "98%" }
    }
  ]

  const testimonials = [
    {
      name: "Dr. Marie Dubois",
      role: "Médecin Généraliste",
      content: "DossMedical a transformé ma pratique. Je gagne 2h par jour et mes patients sont plus satisfaits. L'interface est intuitive et la sécurité irréprochable.",
      rating: 5,
      avatar: "MD",
      location: "Paris, France"
    },
    {
      name: "Dr. Pierre Moreau",
      role: "Cardiologue",
      content: "L'IA de diagnostic m'aide énormément. Les suggestions sont pertinentes et m'ont déjà permis de détecter des anomalies que j'aurais pu manquer.",
      rating: 5,
      avatar: "PM",
      location: "Lyon, France"
    },
    {
      name: "Dr. Sophie Martin",
      role: "Dermatologue",
      content: "La téléconsultation intégrée est parfaite pour le suivi. Mes patients apprécient la flexibilité et moi la simplicité d'utilisation.",
      rating: 5,
      avatar: "SM",
      location: "Marseille, France"
    },
    {
      name: "Claire Lefèvre",
      role: "Patiente",
      content: "Enfin une plateforme où je peux suivre mes rendez-vous, accéder à mes résultats et communiquer facilement avec mon médecin. Révolutionnaire !",
      rating: 5,
      avatar: "CL",
      location: "Toulouse, France"
    }
  ]

  const newsArticles = [
    {
      id: 1,
      title: "Nouvelle Certification HDS Obtenue",
      excerpt: "DossMedical obtient la certification Hébergeur de Données de Santé, renforçant notre engagement sécuritaire.",
      date: "15 Décembre 2024",
      category: "Sécurité",
      image: "🏆",
      readTime: "3 min"
    },
    {
      id: 2,
      title: "Mise à Jour IA : Diagnostic Dermatologique",
      excerpt: "Notre nouvelle IA peut désormais analyser les lésions cutanées avec 96% de précision.",
      date: "10 Décembre 2024",
      category: "Innovation",
      image: "🔬",
      readTime: "5 min"
    },
    {
      id: 3,
      title: "Partenariat avec l'Ordre des Médecins",
      excerpt: "DossMedical devient partenaire officiel pour la digitalisation des cabinets médicaux français.",
      date: "5 Décembre 2024",
      category: "Partenariat",
      image: "🤝",
      readTime: "4 min"
    }
  ]

  const features = [
    { icon: Users, title: "Gestion Patients", description: "Dossiers complets et historique médical" },
    { icon: Calendar, title: "Planning Intelligent", description: "Automatisation des rendez-vous" },
    { icon: Shield, title: "Sécurité RGPD", description: "Conformité totale et chiffrement" },
    { icon: FileText, title: "Dossiers Numériques", description: "Digitalisation et OCR intelligent" },
    { icon: Activity, title: "Analytics Avancées", description: "Tableaux de bord en temps réel" },
    { icon: Brain, title: "IA Médicale", description: "Assistance diagnostique intelligente" },
    { icon: Smartphone, title: "Téléconsultation", description: "Consultations à distance sécurisées" },
    { icon: Globe, title: "Multi-établissements", description: "Gestion centralisée de vos cabinets" }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Message envoyé !",
      description: "Nous vous recontacterons sous 24h.",
    })
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatMessage.trim()) return
    
    toast({
      title: "Message envoyé",
      description: "Un conseiller va vous répondre rapidement.",
    })
    setChatMessage('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-green-50/20">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">DossMedical</h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">Pro</Badge>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#fonctionnalites" className="text-muted-foreground hover:text-foreground transition-colors">Fonctionnalités</a>
              <a href="#avis" className="text-muted-foreground hover:text-foreground transition-colors">Témoignages</a>
              <a href="#actualites" className="text-muted-foreground hover:text-foreground transition-colors">Actualités</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">Connexion</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Choisir votre profil</DialogTitle>
                    <DialogDescription>
                      Connectez-vous selon votre rôle pour accéder à votre espace personnel
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Link href="/sign-in?role=patient">
                      <Button variant="outline" className="w-full h-16 flex flex-col">
                        <Users className="h-6 w-6 mb-1" />
                        <span className="font-medium">Patient</span>
                        <span className="text-xs text-muted-foreground">Accéder à mon dossier</span>
                      </Button>
                    </Link>
                    <Link href="/sign-in?role=medecin">
                      <Button variant="outline" className="w-full h-16 flex flex-col">
                        <Stethoscope className="h-6 w-6 mb-1" />
                        <span className="font-medium">Médecin</span>
                        <span className="text-xs text-muted-foreground">Gérer mes patients</span>
                      </Button>
                    </Link>
                    <Link href="/sign-in?role=admin">
                      <Button variant="outline" className="w-full h-16 flex flex-col">
                        <Shield className="h-6 w-6 mb-1" />
                        <span className="font-medium">Administrateur</span>
                        <span className="text-xs text-muted-foreground">Administration complète</span>
                      </Button>
                    </Link>
                  </div>
                </DialogContent>
              </Dialog>
              <Button size="sm">Démo Gratuite</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Carousel */}
      <section className="relative py-12 sm:py-20 lg:py-28 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {heroSlides.map((slide, index) => (
              <div 
                key={index}
                className={`transition-all duration-1000 ${
                  index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute inset-0'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <Badge variant="secondary" className="inline-flex">
                        Nouveauté {index + 1}/3
                      </Badge>
                      <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground">
                        {slide.title}
                      </h2>
                      <h3 className="text-xl sm:text-2xl text-primary font-semibold">
                        {slide.subtitle}
                      </h3>
                      <p className="text-lg text-muted-foreground max-w-xl">
                        {slide.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button size="lg" className="text-lg px-8">
                        {slide.cta}
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                      <Button variant="outline" size="lg" className="text-lg px-8">
                        <Play className="h-5 w-5 mr-2" />
                        Voir la démo
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4">
                      {Object.entries(slide.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-primary">{value}</div>
                          <div className="text-sm text-muted-foreground capitalize">{key.replace('_', ' ')}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-9xl sm:text-[12rem] lg:text-[15rem] opacity-80">
                      {slide.image}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Carousel Controls */}
            <div className="flex justify-center space-x-2 mt-8">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-primary' : 'bg-primary/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fonctionnalites" className="py-16 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Fonctionnalités</Badge>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Tout ce dont vous avez besoin
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Une plateforme complète qui révolutionne la pratique médicale moderne
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary">
                <CardHeader className="text-center">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-8 w-8 text-primary mx-auto" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="avis" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Témoignages</Badge>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ils nous font confiance
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Plus de 2,500 professionnels utilisent déjà DossMedical
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="actualites" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Actualités</Badge>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Dernières nouveautés
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Restez informé des dernières innovations et mises à jour
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsArticles.map((article) => (
              <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <div className="text-4xl mb-4">{article.image}</div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    {article.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {article.excerpt}
                  </p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary">
                    Lire la suite
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Contact</Badge>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Parlons de votre projet
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Notre équipe d'experts vous accompagne dans votre transformation digitale
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Téléphone</h4>
                    <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-muted-foreground">contact@dossmedical.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Adresse</h4>
                    <p className="text-muted-foreground">123 Avenue de la Santé<br />75015 Paris, France</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Horaires</h4>
                    <p className="text-muted-foreground">Lun - Ven : 9h - 18h<br />Support 24h/7j</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Demander une démo</CardTitle>
                <CardDescription>
                  Remplissez ce formulaire et nous vous recontacterons sous 24h
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email professionnel</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" />
                  </div>
                  <div>
                    <Label htmlFor="role">Votre rôle</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medecin">Médecin</SelectItem>
                        <SelectItem value="directeur">Directeur d'établissement</SelectItem>
                        <SelectItem value="admin">Administrateur</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Décrivez vos besoins..." />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer la demande
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary p-2 rounded-lg">
                  <Stethoscope className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">DossMedical</span>
              </div>
              <p className="text-muted-foreground text-sm">
                La plateforme de référence pour la gestion des dossiers médicaux. 
                Sécurisée, intuitive et conforme RGPD.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                <Youtube className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Médecins généralistes</a></li>
                <li><a href="#" className="hover:text-foreground">Spécialistes</a></li>
                <li><a href="#" className="hover:text-foreground">Cliniques privées</a></li>
                <li><a href="#" className="hover:text-foreground">Hôpitaux</a></li>
                <li><a href="#" className="hover:text-foreground">Maisons médicales</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground">Formation</a></li>
                <li><a href="#" className="hover:text-foreground">Support</a></li>
                <li><a href="#" className="hover:text-foreground">API</a></li>
                <li><a href="#" className="hover:text-foreground">Sécurité</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">À propos</a></li>
                <li><a href="#" className="hover:text-foreground">Carrières</a></li>
                <li><a href="#" className="hover:text-foreground">Partenaires</a></li>
                <li><a href="#" className="hover:text-foreground">Conformité</a></li>
                <li><a href="#" className="hover:text-foreground">Mentions légales</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2025 DossMedical. Tous droits réservés. Plateforme certifiée HDS.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Badge variant="outline" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                RGPD Compliant
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Award className="h-3 w-3 mr-1" />
                Certifié HDS
              </Badge>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen ? (
          <Card className="w-80 h-96 flex flex-col shadow-2xl">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <CardTitle className="text-sm">Support DossMedical</CardTitle>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => setChatOpen(false)}
                >
                  ×
                </Button>
              </div>
              <CardDescription className="text-primary-foreground/80 text-xs">
                En ligne • Réponse sous 2 min
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                <p className="font-medium">Support DossMedical</p>
                <p className="text-muted-foreground text-xs mt-1">
                  Bonjour ! Comment puis-je vous aider aujourd'hui ?
                </p>
              </div>
              <div className="text-right">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg inline-block text-sm max-w-[70%]">
                  Bonjour, j'aimerais en savoir plus sur vos tarifs
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                <p className="text-muted-foreground text-xs">
                  Parfait ! Je vais vous mettre en contact avec un conseiller spécialisé. 
                  Quel est votre secteur d'activité ?
                </p>
              </div>
            </CardContent>
            <div className="p-4 border-t">
              <form onSubmit={handleChatSubmit} className="flex space-x-2">
                <Input 
                  placeholder="Tapez votre message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="text-sm"
                />
                <Button type="submit" size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>
        ) : (
          <Button 
            onClick={() => setChatOpen(true)}
            className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
}
