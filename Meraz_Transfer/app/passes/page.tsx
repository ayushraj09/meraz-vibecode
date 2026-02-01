'use client'

import { motion } from 'framer-motion'
import { Check, Star, Sparkles, Crown } from 'lucide-react'
import toast from 'react-hot-toast'

interface PassFeature {
  included: boolean
  text: string
}

interface Pass {
  id: string
  name: string
  price: string
  originalPrice?: string
  icon: any
  color: string
  popular?: boolean
  features: PassFeature[]
}

const passes: Pass[] = [
  {
    id: 'single',
    name: 'Single Day Pass',
    price: '₹299',
    originalPrice: '₹399',
    icon: Star,
    color: 'from-blue-600 to-cyan-600',
    features: [
      { included: true, text: 'Access to all events for one day' },
      { included: true, text: 'Entry to cultural performances' },
      { included: true, text: 'Food court access' },
      { included: false, text: 'Priority seating' },
      { included: false, text: 'Meet & Greet with celebrities' },
      { included: false, text: 'Exclusive merchandise' },
    ],
  },
  {
    id: 'three-day',
    name: 'Three-Day Pass',
    price: '₹699',
    originalPrice: '₹999',
    icon: Sparkles,
    color: 'from-primary-600 to-accent-600',
    popular: true,
    features: [
      { included: true, text: 'Access to all events for 3 days' },
      { included: true, text: 'Entry to all cultural performances' },
      { included: true, text: 'Food court access with discounts' },
      { included: true, text: 'Complimentary festival t-shirt' },
      { included: true, text: 'Workshop participation' },
      { included: false, text: 'Meet & Greet with celebrities' },
    ],
  },
  {
    id: 'vip',
    name: 'VIP Pass',
    price: '₹1,499',
    originalPrice: '₹1,999',
    icon: Crown,
    color: 'from-purple-600 to-pink-600',
    features: [
      { included: true, text: 'All Three-Day Pass benefits' },
      { included: true, text: 'Priority entry to all events' },
      { included: true, text: 'Exclusive VIP seating area' },
      { included: true, text: 'Meet & Greet with celebrity performers' },
      { included: true, text: 'Exclusive VIP merchandise kit' },
      { included: true, text: 'Backstage access (selected events)' },
    ],
  },
]

export default function PassesPage() {
  const handlePurchase = (passName: string) => {
    toast.success(`${passName} added to cart! Redirecting to payment...`, {
      duration: 3000,
      icon: '🎫',
    })
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Festival Passes
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4">
            Choose the perfect pass for your Meraz 2026 experience
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 glass-dark rounded-full">
            <Sparkles className="text-accent-400" size={20} />
            <span className="text-accent-400 font-semibold">Early Bird Discount - Save up to 25%!</span>
          </div>
        </motion.div>

        {/* Passes Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {passes.map((pass, index) => (
            <motion.div
              key={pass.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative glass-dark rounded-3xl p-8 ${
                pass.popular ? 'ring-2 ring-primary-500 scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {pass.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}

              {/* Icon */}
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${pass.color} mx-auto mb-6 flex items-center justify-center`}>
                <pass.icon className="w-10 h-10" />
              </div>

              {/* Pass Name */}
              <h3 className="text-2xl font-bold text-center mb-2">{pass.name}</h3>

              {/* Price */}
              <div className="text-center mb-6">
                {pass.originalPrice && (
                  <div className="text-gray-500 line-through text-lg">{pass.originalPrice}</div>
                )}
                <div className="text-5xl font-bold gradient-text">{pass.price}</div>
                <div className="text-gray-400 text-sm mt-2">per person</div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {pass.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                        feature.included ? 'bg-green-600' : 'bg-gray-600'
                      }`}
                    >
                      {feature.included && <Check size={16} />}
                      {!feature.included && <span className="text-xs">×</span>}
                    </div>
                    <span
                      className={`text-sm ${
                        feature.included ? 'text-gray-300' : 'text-gray-500'
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Purchase Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePurchase(pass.name)}
                className={`w-full py-4 rounded-full font-bold text-lg bg-gradient-to-r ${pass.color} glow`}
              >
                Get {pass.name}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Important Information */}
          <div className="glass-dark p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 gradient-text">Important Information</h3>
            <ul className="space-y-3 text-gray-400">
              <li>• Valid student ID required at entry</li>
              <li>• Passes are non-refundable and non-transferable</li>
              <li>• Early bird prices valid till February 28, 2026</li>
              <li>• Group discounts available (5+ people)</li>
              <li>• Lost passes cannot be replaced</li>
              <li>• Age limit: 16+ years</li>
            </ul>
          </div>

          {/* How to Register */}
          <div className="glass-dark p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 gradient-text">How to Register</h3>
            <ol className="space-y-3 text-gray-400 list-decimal list-inside">
              <li>Select your preferred pass</li>
              <li>Create an account or login</li>
              <li>Fill in your details</li>
              <li>Make payment online</li>
              <li>Receive confirmation email with QR code</li>
              <li>Show QR code at entry</li>
            </ol>
          </div>

          {/* Payment Methods */}
          <div className="glass-dark p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 gradient-text">Payment Methods</h3>
            <div className="space-y-3 text-gray-400">
              <p>We accept all major payment methods:</p>
              <ul className="space-y-2">
                <li>• Credit/Debit Cards</li>
                <li>• UPI (GPay, PhonePe, Paytm)</li>
                <li>• Net Banking</li>
                <li>• Digital Wallets</li>
              </ul>
              <p className="text-sm text-primary-400 mt-4">
                🔒 All transactions are secure and encrypted
              </p>
            </div>
          </div>

          {/* Contact for Bulk */}
          <div className="glass-dark p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 gradient-text">Group & College Registration</h3>
            <p className="text-gray-400 mb-4">
              Planning to bring your whole college crew? We offer special group discounts for 5+ people 
              and exclusive rates for college delegations.
            </p>
            <p className="text-gray-300 font-semibold mb-2">Contact us for bulk bookings:</p>
            <p className="text-sm text-gray-400">📧 passes@meraziitbhilai.ac.in</p>
            <p className="text-sm text-gray-400">📱 +91 98765 00000</p>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 glass-dark p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-bold mb-6 gradient-text">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Can I upgrade my pass later?</h4>
              <p className="text-gray-400">Yes, you can upgrade your pass by paying the difference amount before the festival starts.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Is accommodation included?</h4>
              <p className="text-gray-400">Accommodation is not included in the pass price. However, we can arrange basic dormitory-style accommodation at additional cost.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">What if I can't attend all three days?</h4>
              <p className="text-gray-400">Three-day passes are non-refundable, but you can transfer them to another person with prior approval.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
