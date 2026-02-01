"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Lock, User, Phone, School, MapPin, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function AuthModals({ isOpen, onClose, defaultTab = "login" }) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const { toast } = useToast()
  const router = useRouter()
  const [isPaymentLoading, setIsPaymentLoading] = useState(false)

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    city: "",
    year: "",
    password: "",
    confirmPassword: "",
  })

  const handleLogin = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    // Simulate login - In production, this would validate against backend
    const mockUser = { name: "User", email: loginData.email }
    localStorage.setItem("user", JSON.stringify(mockUser))
    
    toast({
      title: "Login Successful!",
      description: "Welcome back to the cosmic celebration!",
    })
    
    // Reset form
    setLoginData({ email: "", password: "" })
    onClose()
    
    // Redirect to dashboard after brief delay
    setTimeout(() => {
      router.push("/dashboard")
    }, 500)
  }

  const initiatePayment = async () => {
    setIsPaymentLoading(true)
    
    try {
      // In production, you would create order on backend
      // For now, using test mode with a fixed amount
      const options = {
        key: "rzp_test_1234567890", // Replace with your test key
        amount: 49900, // ₹499 in paise
        currency: "INR",
        name: "Festival Registration",
        description: "Registration Fee - Access to all events",
        image: "/logo.png",
        handler: async function (response) {
          // Payment successful
          const userData = {
            ...registerData,
            paymentId: response.razorpay_payment_id,
            registeredAt: new Date().toISOString(),
          }
          
          // Store user data in localStorage (in production, send to backend)
          localStorage.setItem("user", JSON.stringify(userData))
          
          toast({
            title: "Registration Successful!",
            description: "Payment completed! Welcome to the festival!",
          })
          
          // Reset form
          setRegisterData({
            name: "",
            email: "",
            phone: "",
            college: "",
            city: "",
            year: "",
            password: "",
            confirmPassword: "",
          })
          
          setIsPaymentLoading(false)
          onClose()
          
          // Redirect to dashboard
          setTimeout(() => {
            router.push("/dashboard")
          }, 500)
        },
        prefill: {
          name: registerData.name,
          email: registerData.email,
          contact: registerData.phone,
        },
        theme: {
          color: "#8b5cf6", // Galaxy purple
        },
        modal: {
          ondismiss: function() {
            setIsPaymentLoading(false)
            toast({
              title: "Payment Cancelled",
              description: "Registration was cancelled. Please try again.",
              variant: "destructive",
            })
          }
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      setIsPaymentLoading(false)
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    
    // Validation
    if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (registerData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(registerData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    // Proceed to payment
    initiatePayment()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-[var(--galaxy-dark)] border-[var(--galaxy-purple)]/30">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">
            {activeTab === "login" ? "Welcome Back" : "Join the Celebration"}
          </DialogTitle>
          <DialogDescription>
            {activeTab === "login" 
              ? "Login to access your festival dashboard" 
              : "Create an account to register for events"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 glass">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-foreground">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10 glass border-[var(--galaxy-purple)]/30 focus:border-[var(--galaxy-purple)]"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 glass border-[var(--galaxy-purple)]/30 focus:border-[var(--galaxy-purple)]"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-[var(--galaxy-purple)]" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-[var(--galaxy-purple)] hover:text-[var(--galaxy-cyan)] transition-colors">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80 text-white"
              >
                Login
              </Button>
            </form>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="register-name" className="text-foreground">
                  Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10 glass border-[var(--galaxy-purple)]/30 focus:border-[var(--galaxy-purple)]"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-foreground">
                    Email *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="email@example.com"
                      className="pl-10 glass border-[var(--galaxy-purple)]/30 focus:border-[var(--galaxy-purple)]"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-phone" className="text-foreground">
                    Phone
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="pl-10 glass border-[var(--galaxy-purple)]/30 focus:border-[var(--galaxy-purple)]"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="register-college" className="text-foreground">
                    College/University
                  </Label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-college"
                      type="text"
                      placeholder="IIT Bhilai"
                      className="pl-10 glass border-[var(--galaxy-purple)]/30 focus:border-[var(--galaxy-purple)]"
                      value={registerData.college}
                      onChange={(e) => setRegisterData({ ...registerData, college: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-year" className="text-foreground">
                    Year of Study
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-year"
                      type="text"
                      placeholder="2nd Year"
                      className="pl-10 glass border-[var(--galaxy-purple)]/30 focus:border-[var(--galaxy-purple)]"
                      value={registerData.year}
                      onChange={(e) => setRegisterData({ ...registerData, year: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-city" className="text-foreground">
                  City
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-city"
                    type="text"
                    placeholder="Bhilai"
                    className="pl-10 glass border-[var(--galaxy-purple)]/30 focus:border-[var(--galaxy-purple)]"
                    value={registerData.city}
                    onChange={(e) => setRegisterData({ ...registerData, city: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-foreground">
                    Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 glass border-[var(--galaxy-purple)]/30 focus:border-[var(--galaxy-purple)]"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-confirm" className="text-foreground">
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 glass border-[var(--galaxy-purple)]/30 focus:border-[var(--galaxy-purple)]"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80 text-white"
                disabled={isPaymentLoading}
              >
                {isPaymentLoading ? "Processing Payment..." : "Proceed to Payment (₹499)"}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                You will be redirected to Razorpay for secure payment
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
