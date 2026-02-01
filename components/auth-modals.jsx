"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Mail, Lock, User, Phone, School, MapPin, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import usersData from "@/data/users.json"

export default function AuthModals({ isOpen, onClose, defaultTab = "login" }) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    setActiveTab(defaultTab)
  }, [defaultTab])

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

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
    
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const user = usersData.users.find(
      u => u.email === loginData.email && u.password === loginData.password
    )

    if (!user) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      })
      return
    }

    // Check if non-IIT Bhilai user has completed pass purchase
    if (!user.email.endsWith('@iitbhilai.ac.in') && (!user.passType || !user.paymentId)) {
      toast({
        title: "Registration Incomplete",
        description: "Please complete your pass purchase to access your account. Redirecting to passes page.",
        variant: "destructive",
      })
      
      // Store their login attempt data for pass purchase
      sessionStorage.setItem("pendingRegistration", JSON.stringify({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        college: user.college || "",
        city: user.city || "",
        year: user.year || "",
        password: user.password,
        confirmPassword: user.password,
      }))
      
      onClose()
      setTimeout(() => {
        router.push("/passes")
      }, 1000)
      return
    }

    localStorage.setItem("user", JSON.stringify(user))
    
    toast({
      title: "Login Successful!",
      description: `Welcome back, ${user.name}!`,
    })
    
    setLoginData({ email: "", password: "" })
    onClose()
    
    setTimeout(() => {
      router.push("/dashboard")
      window.location.reload()
    }, 500)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(registerData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    // Check if user is from IIT Bhilai - free registration
    if (registerData.email.endsWith('@iitbhilai.ac.in')) {
      const newUser = {
        id: Date.now(),
        ...registerData,
        passType: "Free Registration",
        passPrice: 0,
        registeredAt: new Date().toISOString(),
        registeredEvents: [],
        isIITBhilaiStudent: true
      }
      
      localStorage.setItem("user", JSON.stringify(newUser))
      
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
      
      toast({
        title: "Registration Successful!",
        description: `Welcome ${newUser.name}! Free registration completed.`,
      })
      
      onClose()
      setTimeout(() => {
        router.push("/dashboard")
        window.location.reload()
      }, 500)
    } else {
      // Store registration data temporarily and redirect to passes page
      sessionStorage.setItem("pendingRegistration", JSON.stringify(registerData))
      
      toast({
        title: "Registration Details Saved",
        description: "Please select a pass to complete your registration.",
      })
      
      onClose()
      setTimeout(() => {
        router.push("/passes")
      }, 500)
    }
  }

  return (
    <>
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
                      placeholder="email@example.com"
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

                <Button
                  type="submit"
                  className="w-full bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80 text-white"
                >
                  Login
                </Button>
              </form>
            </TabsContent>

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
                >
                  {registerData.email.endsWith('@iitbhilai.ac.in') ? "Register (Free)" : "Continue to Pass Selection"}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  {registerData.email.endsWith('@iitbhilai.ac.in') 
                    ? "IIT Bhilai students get free registration" 
                    : "You will need to select a pass"}
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
