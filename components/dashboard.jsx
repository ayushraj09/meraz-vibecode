"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Mail, 
  Phone, 
  School, 
  MapPin, 
  Calendar, 
  Trophy, 
  Star,
  LogOut,
  Ticket,
  Clock,
  Award,
  Medal
} from "lucide-react"

export default function Dashboard({ user }) {
  const router = useRouter()
  
  // Get registered events from user data or use mock data
  const [registeredEvents, setRegisteredEvents] = useState(
    user.registeredEvents && user.registeredEvents.length > 0 
      ? user.registeredEvents 
      : [
          {
            id: 1,
            name: "Cosmic Dance Battle",
            category: "Cultural",
            date: "2024-03-15",
            time: "14:00",
            venue: "Main Stage",
            status: "Confirmed",
            rank: 3,
            totalParticipants: 45
          },
          {
            id: 2,
            name: "Hackathon: Code the Galaxy",
            category: "Technical",
            date: "2024-03-16",
            time: "09:00",
            venue: "Innovation Hub",
            status: "Confirmed",
            rank: 12,
            totalParticipants: 120
          },
          {
            id: 3,
            name: "Star Gazing Competition",
            category: "Science",
            date: "2024-03-17",
            time: "20:00",
            venue: "Observatory",
            status: "Pending",
            rank: null,
            totalParticipants: 30
          }
        ]
  )

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const getRankBadge = (rank) => {
    if (!rank) return null
    
    if (rank === 1) {
      return (
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--galaxy-gold)]/20 border border-[var(--galaxy-gold)]/30">
          <Medal className="h-4 w-4 text-[var(--galaxy-gold)]" />
          <span className="text-xs font-semibold text-[var(--galaxy-gold)]">1st Place</span>
        </div>
      )
    } else if (rank === 2) {
      return (
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-400/20 border border-gray-400/30">
          <Medal className="h-4 w-4 text-gray-400" />
          <span className="text-xs font-semibold text-gray-400">2nd Place</span>
        </div>
      )
    } else if (rank === 3) {
      return (
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-600/20 border border-orange-600/30">
          <Medal className="h-4 w-4 text-orange-600" />
          <span className="text-xs font-semibold text-orange-600">3rd Place</span>
        </div>
      )
    } else {
      return (
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--galaxy-purple)]/20 border border-[var(--galaxy-purple)]/30">
          <Award className="h-4 w-4 text-[var(--galaxy-purple)]" />
          <span className="text-xs font-semibold text-[var(--galaxy-purple)]">Rank {rank}</span>
        </div>
      )
    }
  }

  const getStatusBadge = (status) => {
    const colors = {
      Confirmed: "bg-green-500/20 text-green-500 border-green-500/30",
      Pending: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
      Completed: "bg-blue-500/20 text-blue-500 border-blue-500/30"
    }
    
    return (
      <Badge className={`${colors[status]} border`}>
        {status}
      </Badge>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">
                Welcome, {user.name}!
              </h1>
              <p className="text-muted-foreground">
                Your personalized festival dashboard
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="glass border-[var(--galaxy-purple)]/30 hover:border-[var(--galaxy-purple)]"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="glass border border-[var(--galaxy-purple)]/30">
            <TabsTrigger value="profile" className="data-[state=active]:bg-[var(--galaxy-purple)]/20">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-[var(--galaxy-purple)]/20">
              <Ticket className="h-4 w-4 mr-2" />
              My Events
            </TabsTrigger>
            <TabsTrigger value="rankings" className="data-[state=active]:bg-[var(--galaxy-purple)]/20">
              <Trophy className="h-4 w-4 mr-2" />
              Rankings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="glass border-[var(--galaxy-purple)]/30 p-6">
              <h2 className="text-2xl font-bold gradient-text mb-6">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-[var(--galaxy-purple)] mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium text-foreground">{user.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[var(--galaxy-purple)] mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{user.email}</p>
                    </div>
                  </div>
                  
                  {user.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-[var(--galaxy-purple)] mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium text-foreground">{user.phone}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {user.college && (
                    <div className="flex items-start gap-3">
                      <School className="h-5 w-5 text-[var(--galaxy-purple)] mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">College/University</p>
                        <p className="font-medium text-foreground">{user.college}</p>
                      </div>
                    </div>
                  )}
                  
                  {user.year && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-[var(--galaxy-purple)] mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Year of Study</p>
                        <p className="font-medium text-foreground">{user.year}</p>
                      </div>
                    </div>
                  )}
                  
                  {user.city && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-[var(--galaxy-purple)] mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">City</p>
                        <p className="font-medium text-foreground">{user.city}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {user.paymentId && (
                <div className="mt-6 pt-6 border-t border-[var(--galaxy-purple)]/20">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-[var(--galaxy-gold)]" />
                    <span className="text-muted-foreground">Payment ID:</span>
                    <code className="text-xs bg-[var(--galaxy-purple)]/10 px-2 py-1 rounded text-[var(--galaxy-purple)]">
                      {user.paymentId}
                    </code>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* My Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold gradient-text">My Registered Events</h2>
              <Badge className="bg-[var(--galaxy-purple)]/20 text-[var(--galaxy-purple)] border border-[var(--galaxy-purple)]/30">
                {registeredEvents.length} Events
              </Badge>
            </div>

            <div className="grid gap-4">
              {registeredEvents.map((event) => (
                <Card key={event.id} className="glass border-[var(--galaxy-purple)]/30 p-6 hover:border-[var(--galaxy-purple)] transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-1">{event.name}</h3>
                          <p className="text-sm text-muted-foreground">{event.category}</p>
                        </div>
                        {getStatusBadge(event.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[var(--galaxy-cyan)]" />
                          <span className="text-muted-foreground">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[var(--galaxy-pink)]" />
                          <span className="text-muted-foreground">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[var(--galaxy-purple)]" />
                          <span className="text-muted-foreground">{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-[var(--galaxy-gold)]" />
                          <span className="text-muted-foreground">{event.totalParticipants} participants</span>
                        </div>
                      </div>
                    </div>

                    {event.rank && (
                      <div className="md:ml-4">
                        {getRankBadge(event.rank)}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Rankings Tab */}
          <TabsContent value="rankings" className="space-y-6">
            <h2 className="text-2xl font-bold gradient-text mb-4">Competition Rankings</h2>
            
            <div className="grid gap-4">
              {registeredEvents.filter(e => e.rank).map((event) => (
                <Card key={event.id} className="glass border-[var(--galaxy-purple)]/30 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{event.name}</h3>
                      <p className="text-sm text-muted-foreground">{event.category}</p>
                    </div>
                    {getRankBadge(event.rank)}
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Your Position</span>
                      <span className="font-bold text-[var(--galaxy-purple)]">
                        {event.rank} / {event.totalParticipants}
                      </span>
                    </div>

                    <div className="w-full bg-[var(--galaxy-dark)] rounded-full h-2 overflow-hidden border border-[var(--galaxy-purple)]/20">
                      <div 
                        className="h-full bg-gradient-to-r from-[var(--galaxy-purple)] to-[var(--galaxy-cyan)]"
                        style={{ 
                          width: `${100 - (event.rank / event.totalParticipants) * 100}%` 
                        }}
                      />
                    </div>

                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Top {Math.round((event.rank / event.totalParticipants) * 100)}%</span>
                      <span>{event.totalParticipants - event.rank} participants behind</span>
                    </div>
                  </div>
                </Card>
              ))}

              {registeredEvents.filter(e => e.rank).length === 0 && (
                <Card className="glass border-[var(--galaxy-purple)]/30 p-12 text-center">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No rankings available yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Rankings will appear here once competitions begin
                  </p>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
