"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, MapPin, Phone, Mail, Trophy, ChevronRight, X, Users, IndianRupee, UserPlus, Minus, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import eventsData from "@/data/events.json"

function EventModal({ event, onClose, onRegister }) {
  const [showRegistration, setShowRegistration] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  if (!event) return null

  useEffect(() => {
    // Check if user is already registered for this event
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      const registered = user.registeredEvents?.some(reg => reg.eventId === event.id)
      setIsRegistered(registered)
    }
  }, [event.id])

  const handleRegistrationSuccess = () => {
    setShowRegistration(false)
    setIsRegistered(true)
    // Could add confetti or success animation here
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto glow-border">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-6 sm:p-8">
            {/* Category badge */}
            <span className="inline-block px-3 py-1 text-xs font-medium bg-[var(--galaxy-purple)]/20 text-[var(--galaxy-purple)] rounded-full mb-4">
              {event.category}
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text">
              {event.name}
            </h2>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {event.description}
            </p>

            {/* Event details */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="w-5 h-5 text-[var(--galaxy-cyan)]" />
                <div>
                  <p className="text-foreground font-medium">{event.date}</p>
                  <p className="text-sm">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-[var(--galaxy-pink)]" />
                <div>
                  <p className="text-foreground font-medium">{event.venue}</p>
                  <p className="text-sm">Event Venue</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Users className="w-5 h-5 text-[var(--galaxy-gold)]" />
                <div>
                  <p className="text-foreground font-medium">
                    {event.teamSize === 'individual' ? 'Individual' : 'Team (2-4 members)'}
                  </p>
                  <p className="text-sm">Team Size</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <IndianRupee className="w-5 h-5 text-[var(--galaxy-green)]" />
                <div>
                  <p className="text-foreground font-medium">
                    {event.registrationFee === 0 ? 'Free' : `₹${event.registrationFee}`}
                  </p>
                  <p className="text-sm">Registration Fee</p>
                </div>
              </div>
            </div>

            {/* Prize Pool */}
            <div className="mb-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Trophy className="w-5 h-5 text-[var(--galaxy-gold)]" />
                <div>
                  <p className="text-foreground font-medium">Prize Pool</p>
                  <p className="text-sm">{event.prizePool}</p>
                </div>
              </div>
            </div>

            {/* Contact info */}
            <div className="border-t border-border pt-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Contact Person</h3>
              <div className="flex flex-col gap-2">
                <p className="text-foreground font-medium">{event.contact.name}</p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{event.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{event.contact.email}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-4">
              {isRegistered ? (
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  disabled
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Registered
                </Button>
              ) : (
                <Button 
                  className="flex-1 bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80 text-white"
                  onClick={() => setShowRegistration(true)}
                >
                  Register Now
                  {event.registrationFee > 0 && ` - ₹${event.registrationFee}`}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showRegistration && (
        <EventRegistrationModal
          event={event}
          onClose={() => setShowRegistration(false)}
          onSuccess={handleRegistrationSuccess}
        />
      )}
    </>
  )
}

function EventCard({ event, onClick }) {
  const categoryColors = {
    Technical: "bg-[var(--galaxy-purple)]/20 text-[var(--galaxy-purple)]",
    Cultural: "bg-[var(--galaxy-pink)]/20 text-[var(--galaxy-pink)]",
    Gaming: "bg-[var(--galaxy-cyan)]/20 text-[var(--galaxy-cyan)]",
  }

  return (
    <div
      className="glass rounded-2xl p-6 glow-border group cursor-pointer hover:scale-[1.02] transition-all duration-300"
      onClick={() => onClick(event)}
    >
      <div className="flex items-start justify-between mb-4">
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            categoryColors[event.category] || categoryColors.Technical
          }`}
        >
          {event.category}
        </span>
        <Trophy className="w-5 h-5 text-[var(--galaxy-gold)]" />
      </div>

      <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-[var(--galaxy-purple)] transition-colors">
        {event.name}
      </h3>

      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {event.description}
      </p>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{event.venue}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{event.teamSize === 'individual' ? 'Individual' : 'Team (2-4)'}</span>
        </div>
        <div className="flex items-center gap-1">
          <IndianRupee className="w-4 h-4" />
          <span>{event.registrationFee === 0 ? 'Free' : `₹${event.registrationFee}`}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-[var(--galaxy-gold)] font-semibold text-lg">
          {event.prizePool}
        </div>
        <span className="flex items-center gap-1 text-[var(--galaxy-purple)] group-hover:gap-2 transition-all">
          View Details
          <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  )
}

function EventRegistrationModal({ event, onClose, onSuccess }) {
  const [teamName, setTeamName] = useState('')
  const [teamMembers, setTeamMembers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const userData = localStorage.getItem("user")
    if (!userData) {
      toast({
        title: "Authentication Required",
        description: "Please login to register for events.",
        variant: "destructive",
      })
      onClose()
      return
    }

    if (event) {
      const minMembers = event.teamSize === 'individual' ? 1 : 2
      const initialMembers = Array.from({ length: minMembers }, () => ({
        id: Math.random(),
        name: '',
        phone: ''
      }))
      setTeamMembers(initialMembers)
    }
  }, [event, onClose, toast])

  if (!event) return null

  const addTeamMember = () => {
    if (teamMembers.length < 4) {
      setTeamMembers([...teamMembers, {
        id: Math.random(),
        name: '',
        phone: ''
      }])
    }
  }

  const removeTeamMember = (id) => {
    const minMembers = event.teamSize === 'individual' ? 1 : 2
    if (teamMembers.length > minMembers) {
      setTeamMembers(teamMembers.filter(member => member.id !== id))
    }
  }

  const updateTeamMember = (id, field, value) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ))
  }

  const validateForm = () => {
    // Check team name for team events
    if (event.teamSize !== 'individual' && (!teamName || teamName.trim() === '')) {
      toast({
        title: "Missing Team Name",
        description: "Please enter a team name",
        variant: "destructive",
      })
      return false
    }
    
    // Check required fields for each team member
    for (let i = 0; i < teamMembers.length; i++) {
      const member = teamMembers[i]
      if (!member.name || member.name.trim() === '') {
        toast({
          title: "Missing Name",
          description: `Please fill in name for team member ${i + 1}`,
          variant: "destructive",
        })
        return false
      }
      if (!member.phone || member.phone.trim() === '') {
        toast({
          title: "Missing Phone Number",
          description: `Please fill in phone number for team member ${i + 1}`,
          variant: "destructive",
        })
        return false
      }
    }
    return true
  }

  const initiatePayment = async () => {
    if (event.registrationFee === 0) {
      // Free event - register directly
      await registerForEvent()
      return
    }

    try {
      // Load Razorpay script if not already loaded
      if (typeof window.Razorpay === 'undefined') {
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        document.body.appendChild(script)
        
        await new Promise((resolve, reject) => {
          script.onload = resolve
          script.onerror = reject
        })
      }
      
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
      
      const options = {
        key: razorpayKey || "rzp_test_1DP5mmOlF5G5ag",
        amount: event.registrationFee * 100, // Convert to paise
        currency: "INR",
        name: "Event Registration",
        description: `${event.name} - ${event.category}`,
        handler: async function (response) {
          await registerForEvent(response.razorpay_payment_id)
        },
        prefill: {
          name: teamMembers[0]?.name || '',
          email: teamMembers[0]?.email || '',
          contact: teamMembers[0]?.phone || '',
        },
        theme: {
          color: "#8b5cf6",
        },
        modal: {
          ondismiss: function() {
            toast({
              title: "Payment Cancelled",
              description: "Event registration cancelled.",
              variant: "destructive",
            })
          }
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      toast({
        title: "Payment Error",
        description: error.message || "Failed to initiate payment.",
        variant: "destructive",
      })
    }
  }

  const registerForEvent = async (paymentId = null) => {
    try {
      setIsLoading(true)
      
      // Get current user
      const userData = localStorage.getItem("user")
      if (!userData) {
        toast({
          title: "Authentication Required",
          description: "Please login to register for events.",
          variant: "destructive",
        })
        return
      }

      const user = JSON.parse(userData)
      
      // Create registration data
      const registration = {
        eventId: event.id,
        eventName: event.name,
        teamName: event.teamSize !== 'individual' ? teamName : null,
        teamMembers: teamMembers,
        registrationFee: event.registrationFee,
        paymentId: paymentId,
        registeredAt: new Date().toISOString(),
        status: 'registered'
      }

      // Update user's registered events
      const updatedUser = {
        ...user,
        registeredEvents: [...(user.registeredEvents || []), registration]
      }
      
      localStorage.setItem("user", JSON.stringify(updatedUser))

      toast({
        title: "Registration Successful!",
        description: `You have successfully registered for ${event.name}`,
      })

      onSuccess()
      onClose()
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register for event.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    
    initiatePayment()
  }

  const renderFormField = (member, field, index) => {
    const fieldLabels = {
      name: 'Full Name',
      phone: 'Phone Number'
    }

    return (
      <div key={field} className="space-y-2">
        <Label htmlFor={`member-${index}-${field}`} className="text-foreground">
          {fieldLabels[field]} <span className="text-red-500">*</span>
        </Label>
        <Input
          id={`member-${index}-${field}`}
          type={field === 'phone' ? 'tel' : 'text'}
          placeholder={`Enter ${fieldLabels[field].toLowerCase()}`}
          className="glass border-[var(--galaxy-purple)]/30 focus:border-[var(--galaxy-purple)]"
          value={member[field] || ''}
          onChange={(e) => updateTeamMember(member.id, field, e.target.value)}
          required
        />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative glass rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto glow-border">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 gradient-text">
            Register for {event.name}
          </h2>
          
          <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {event.teamSize === 'individual' ? 'Individual' : 'Team (2-4 members)'}
            </span>
            <span className="flex items-center gap-1">
              <IndianRupee className="w-4 h-4" />
              {event.registrationFee === 0 ? 'Free' : `₹${event.registrationFee}`}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Team Name Field for team events */}
            {event.teamSize !== 'individual' && (
              <div className="space-y-2">
                <Label htmlFor="team-name" className="text-foreground">
                  Team Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="team-name"
                  type="text"
                  placeholder="Enter your team name"
                  className="glass border-[var(--galaxy-purple)]/30 focus:border-[var(--galaxy-purple)]"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                />
              </div>
            )}

            {teamMembers.map((member, index) => (
              <div key={member.id} className="border border-[var(--galaxy-purple)]/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    {event.teamSize === 'individual' ? 'Participant Details' : `Team Member ${index + 1}`}
                  </h3>
                  {event.teamSize !== 'individual' && teamMembers.length > 2 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTeamMember(member.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderFormField(member, 'name', index)}
                  {renderFormField(member, 'phone', index)}
                </div>
              </div>
            ))}

            {event.teamSize !== 'individual' && teamMembers.length < 4 && (
              <Button
                type="button"
                variant="outline"
                onClick={addTeamMember}
                className="border-[var(--galaxy-purple)] text-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)] hover:text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
            )}

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : event.registrationFee === 0 ? 'Register' : `Pay ₹${event.registrationFee} & Register`}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function Events() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showAllEvents, setShowAllEvents] = useState(false)

  let filteredEvents =
    activeCategory === "All"
      ? eventsData.events
      : eventsData.events.filter((event) => event.category === activeCategory)
  
  // Limit to 8 events unless "View All" is clicked
  if (!showAllEvents && activeCategory === "All") {
    filteredEvents = filteredEvents.slice(0, 8)
  }

  return (
    <section id="events" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 stars-bg opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--galaxy-cyan)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-medium text-[var(--galaxy-pink)] uppercase tracking-wider mb-4">
            Explore & Participate
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Stellar Events</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover over 50 events across technical, cultural, and gaming categories.
            There&apos;s something for everyone!
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {eventsData.categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category)
                setShowAllEvents(false)
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-[var(--galaxy-purple)] text-white"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={setSelectedEvent}
            />
          ))}
        </div>

        {/* View all CTA */}
        {activeCategory === "All" && !showAllEvents && eventsData.events.length > 8 && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-[var(--galaxy-purple)] text-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)] hover:text-white bg-transparent"
              onClick={() => setShowAllEvents(true)}
            >
              View All Events ({eventsData.events.length})
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  )
}
