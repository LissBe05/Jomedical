'use client'

import { useUser } from '@clerk/nextjs'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { CalendarDays, Stethoscope, Clock } from 'lucide-react'

const appointments = [
  {
    id: 1,
    doctor: 'Dr. Paul Nzoghe',
    specialty: 'Cardiologue',
    date: '2025-07-10',
    time: '14:30',
    status: 'Confirmé',
  },
  {
    id: 2,
    doctor: 'Dr. Marie Okwé',
    specialty: 'Dermatologue',
    date: '2025-07-15',
    time: '09:00',
    status: 'En attente',
  },
  {
    id: 3,
    doctor: 'Dr. Alain Mabika',
    specialty: 'Généraliste',
    date: '2025-07-20',
    time: '11:00',
    status: 'Annulé',
  },
]

export default function PatientAppointmentsPage() {
  const { user } = useUser()

  if (!user) return <div className="p-6 text-center">Chargement...</div>

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Mes Rendez-vous
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {appointments.map((rdv) => (
          <Card key={rdv.id} className="border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-medical-blue-600" />
                {rdv.doctor}
              </CardTitle>
              <p className="text-sm text-gray-500">{rdv.specialty}</p>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-gray-400" />
                <span>Date : {rdv.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>Heure : {rdv.time}</span>
              </div>
              <div>
                Statut :{' '}
                <span
                  className={`font-semibold ${
                    rdv.status === 'Confirmé'
                      ? 'text-green-600'
                      : rdv.status === 'Annulé'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {rdv.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
