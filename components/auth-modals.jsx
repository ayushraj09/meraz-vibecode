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
import { Mail, Lock, User, Phone, School, MapPin, Calendar, CheckCircle2, XCircle, Check, Star, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import usersData from "@/data/users.json"
import passesData from "@/data/passes.json"

export default function AuthModals({ isOpen, onClose, defaultTab = "login" }) {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const { toast } = useToast()
  const router = useRouter()
  const [isPaymentLoading, setIsPaymentLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [selectedPass, setSelectedPass] = useState(null)
  const [showPassSelection, setShowPassSelection] = useState(false)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => {
      console.log("Razorpay SDK loaded successfully")
    }
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK")
    }
    document.body.appendChild(script)
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

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

  const initiatePayment = async (pass) => {
    setIsPaymentLoading(true)
    
    try {
      if (!pass || !pass.price) {
        console.error("Pass or price not provided:", pass)
        toast({
          title: "Error",
          description: "Please select a valid pass",
          variant: "destructive",
        })
        setIsPaymentLoading(false)
        return
      }
      
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
      
      // Check if Razorpay script is loaded
      if (typeof window.Razorpay === 'undefined') {
        console.error("Razorpay SDK not loaded")
        toast({
          title: "Payment Error",
          description: "Payment gateway not initialized. Please refresh the page and try again.",
          variant: "destructive",
        })
        setIsPaymentLoading(false)
        return
      }

      console.log("Razorpay Key:", razorpayKey ? "Key Present" : "Using Test Key")
      console.log("Selected Pass:", pass)
      console.log("Payment Amount:", pass.price * 100)

      const options = {
        key: razorpayKey || "rzp_test_1DP5mmOlF5G5ag",
        amount: pass.price * 100, // Convert to paise
        currency: "INR",
        name: "Festival Registration",
        description: `${pass.name} - ${pass.description}`,
        image: "/logo.png",
        handler: async function (response) {
          console.log("Payment Success:", response)
          const newUser = {
            id: Date.now(),
            ...registerData,
            passType: pass.name,
            passPrice: pass.price,
            paymentId: response.razorpay_payment_id,
            registeredAt: new Date().toISOString(),
            registeredEvents: []
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
          
          setIsPaymentLoading(false)
          setShowPassSelection(false)
          setSelectedPass(null)
          setPaymentStatus('success')
          setShowPaymentDialog(true)
        },
        prefill: {
          name: registerData.name,
          email: registerData.email,
          contact: registerData.phone,
        },
        theme: {
          color: "#8b5cf6",
        },
        modal: {
          ondismiss: function() {
            console.log("Payment modal dismissed")
            setIsPaymentLoading(false)
            setPaymentStatus('failed')
            setShowPaymentDialog(true)
          },
          escape: false,
          backdropclose: false
        }
      }

      console.log("Initiating Razorpay with options:", options)
      const rzp = new window.Razorpay(options)
      
      rzp.on('payment.failed', function (response) {
        console.error("Payment Failed:", response)
        setIsPaymentLoading(false)
        setPaymentStatus('failed')
        setShowPaymentDialog(true)
      })
      
      rzp.open()
    } catch (error) {
      console.error("Payment Error:", error)
      setIsPaymentLoading(false)
      toast({
        title: "Payment Error",
        description: error.message || "Failed to initiate payment. Please try again.",
        variant: "destructive",
      })
      setPaymentStatus('failed')
      setShowPaymentDialog(true)
    }
  }

  const handlePaymentDialogClose = () => {
    setShowPaymentDialog(false)
    if (paymentStatus === 'success') {
      onClose()
      setTimeout(() => {
        router.push("/dashboard")
        window.location.reload()
      }, 300)
    }
    setPaymentStatus(null)
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

    initiatePayment()
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
                  disabled={isPaymentLoading}
                >
                  {isPaymentLoading ? "Processing..." : registerData.email.endsWith('@iitbhilai.ac.in') ? "Register (Free)" : "Continue to Pass Selection"}
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

      {/* Pass Selection Dialog */}
      <AlertDialog open={showPassSelection} onOpenChange={setShowPassSelection}>
        <AlertDialogContent className="bg-[var(--galaxy-dark)] border-[var(--galaxy-purple)]/30 max-w-4xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl gradient-text">
              Select Your Festival Pass
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Choose the perfect pass for your cosmic journey
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="grid md:grid-cols-3 gap-4 my-6">
            {passesData.passes.map((pass) => {
              const colorClasses = {
                cyan: "border-[var(--galaxy-cyan)] hover:bg-[var(--galaxy-cyan)]/10",
                purple: "border-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/10",
                gold: "border-[var(--galaxy-gold)] hover:bg-[var(--galaxy-gold)]/10",
              }
              const isSelected = selectedPass?.id === pass.id
              
              return (
                <div
                  key={pass.id}
                  onClick={() => setSelectedPass(pass)}
                  className={`relative cursor-pointer glass rounded-xl p-4 border-2 transition-all ${
                    isSelected 
                      ? `${colorClasses[pass.color]} ring-2 ring-offset-2 ring-offset-[var(--galaxy-dark)]` 
                      : 'border-[var(--galaxy-purple)]/30 hover:border-[var(--galaxy-purple)]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -top-2 -right-2">
                      <CheckCircle2 className="h-6 w-6 text-green-500 bg-[var(--galaxy-dark)] rounded-full" />
                    </div>
                  )}
                  
                  <div className="text-center mb-3">
                    <Sparkles className={`w-8 h-8 mx-auto mb-2 text-[var(--galaxy-${pass.color})]`} />
                    <h3 className="text-lg font-bold text-foreground">{pass.name}</h3>
                    <p className="text-xs text-muted-foreground">{pass.description}</p>
                  </div>
                  
                  <div className="text-center mb-3">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-muted-foreground line-through text-sm">
                        ₹{pass.originalPrice}
                      </span>
                      <span className={`text-2xl font-bold text-[var(--galaxy-${pass.color})]`}>
                        ₹{pass.price}
                      </span>
                    </div>
                  </div>
                  
                  <ul className="space-y-1 text-xs">
                    {pass.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <Check className={`w-3 h-3 shrink-0 mt-0.5 text-[var(--galaxy-${pass.color})]`} />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
          
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowPassSelection(false)
                setSelectedPass(null)
              }}
              className="border-[var(--galaxy-purple)]/30"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedPass) {
                  completeRegistration(selectedPass)
                } else {
                  toast({
                    title: "Please select a pass",
                    description: "Choose a festival pass to continue",
                    variant: "destructive",
                  })
                }
              }}
              disabled={!selectedPass || isPaymentLoading}
              className="bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80 text-white"
            >
              {isPaymentLoading ? "Processing Payment..." : `Proceed to Payment (₹${selectedPass?.price || 0})`}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Payment Status Dialog */}
      <AlertDialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <AlertDialogContent className="bg-[var(--galaxy-dark)] border-[var(--galaxy-purple)]/30">
          <AlertDialogHeader>
            <div className="flex justify-center mb-4">
              {paymentStatus === 'success' ? (
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500" />
              )}
            </div>
            <AlertDialogTitle className="text-center text-2xl">
              {paymentStatus === 'success' ? 'Payment Successful!' : 'Payment Failed'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              {paymentStatus === 'success' 
                ? 'Your registration is complete! Welcome to the festival. You will be redirected to your dashboard.' 
                : 'Your payment could not be processed. Please try again or contact support if the issue persists.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              onClick={handlePaymentDialogClose}
              className={paymentStatus === 'success' 
                ? "bg-green-500 hover:bg-green-600 text-white w-full" 
                : "bg-[var(--galaxy-purple)] hover:bg-[var(--galaxy-purple)]/80 text-white w-full"}
            >
              {paymentStatus === 'success' ? 'Go to Dashboard' : 'Try Again'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
