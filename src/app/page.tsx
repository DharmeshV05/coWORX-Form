'use client'

import { useState, useRef, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { InquiryForm } from '@/components/inquiry-form'
import { Button } from '@/components/ui/button'
import { ArrowRight, Wifi, Coffee, Users, Zap, MapPin, CheckCircle2, Crown, Clock } from 'lucide-react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const plans = [
  { name: 'Daily', duration: '2 Hours', price: 100, popular: false },
  { name: 'Weekly', duration: 'Mon-Fri (a week)', price: 1199, popular: false },
  { name: 'Weekend', duration: 'Every Sat-Sun (4 weekends)', price: 1499, popular: false },
  { name: 'Half Month', duration: '15 Days', price: 2299, popular: false },
  { name: 'Monthly', duration: '30 Days', price: 3499, popular: true },
  { name: 'Team of 2', duration: '30 Days', price: 6499, popular: false },
  { name: 'Team of 4', duration: '30 Days', price: 12499, popular: false },
]

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const plansRef = useRef<HTMLDivElement>(null)
  const plansInView = useInView(plansRef, { once: true, margin: '-80px' })

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [showForm])

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-orange-100 selection:text-orange-900">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-20 md:py-32">
          {/* Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-400 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-400 blur-[120px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider mb-6">
                  <MapPin className="h-3 w-3" />
                  Global City, Virar West
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  Work Smart. <span className="text-orange-600">Grow Together.</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
              >
                Experience premium coworking designed for productivity,
                collaboration, and community.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white text-lg px-10 py-7 shadow-xl shadow-orange-500/20 active:scale-95 transition-all"
                  onClick={() => setShowForm(true)}
                >
                  Join coWORX Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  No long-term commitment
                </div>
              </motion.div>
            </div>

            {/* Features Glass Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-20 max-w-5xl mx-auto"
            >
              {[
                { icon: Wifi, label: '100 Mbps WiFi', sub: 'Blazing Fast' },
                { icon: Coffee, label: 'Unlimited Coffee', sub: 'Stay Energized' },
                { icon: Users, label: 'Meeting Rooms', sub: 'Professional Space' },
                { icon: Zap, label: 'Power Backup', sub: '24/7 Connectivity' }
              ].map((feature, i) => (
                <div key={i} className="group p-6 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1">
                  <div className="h-12 w-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="font-bold text-sm md:text-base text-slate-900 dark:text-white">{feature.label}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{feature.sub}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Plans Section */}
        <section id="plans" className="relative py-20 md:py-32 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-10">
            <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-orange-300 blur-[100px]" />
            <div className="absolute bottom-[10%] left-[-5%] w-[25%] h-[25%] rounded-full bg-amber-300 blur-[100px]" />
          </div>

          <div ref={plansRef} className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={plansInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center mb-14 md:mb-20"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider mb-5">
                <Crown className="h-3 w-3" />
                Flexible Plans
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                Choose Your <span className="text-orange-600">Perfect Plan</span>
              </h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                From daily passes to team packages — pick the plan that fits your work style and budget.
              </p>
            </motion.div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 max-w-7xl mx-auto">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={plansInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className={`group relative flex flex-col rounded-2xl p-6 md:p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${plan.popular
                      ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-500/25 ring-2 ring-orange-400/50 scale-[1.03] z-10'
                      : 'bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-xl'
                    }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white dark:bg-slate-950 text-orange-600 dark:text-orange-400 text-[11px] font-extrabold uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                      <Crown className="h-3 w-3" />
                      Most Popular
                    </div>
                  )}

                  {/* Plan Name */}
                  <h3 className={`text-xl font-bold mb-1.5 ${plan.popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                    {plan.name}
                  </h3>

                  {/* Duration */}
                  <div className={`flex items-center gap-1.5 text-sm mb-6 ${plan.popular ? 'text-orange-100' : 'text-slate-500 dark:text-slate-400'}`}>
                    <Clock className="h-3.5 w-3.5" />
                    {plan.duration}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-sm font-semibold ${plan.popular ? 'text-orange-100' : 'text-slate-500 dark:text-slate-400'}`}>₹</span>
                    <span className={`text-4xl md:text-5xl font-black tracking-tight ${plan.popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                      {plan.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className={`w-full h-px mb-6 ${plan.popular ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700/50'}`} />

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {[
                      'High-Speed WiFi',
                      'AC Workspace',
                      'Unlimited Coffee & Tea',
                      plan.name.startsWith('Team') ? `${plan.name.split('of ')[1]} Dedicated Seats` : 'Flexible Seating'
                    ].map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5">
                        <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${plan.popular ? 'text-orange-100' : 'text-orange-500 dark:text-orange-400'}`} />
                        <span className={`text-sm ${plan.popular ? 'text-orange-50' : 'text-slate-600 dark:text-slate-300'}`}>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    size="lg"
                    className={`w-full font-bold active:scale-95 transition-all ${plan.popular
                        ? 'bg-white text-orange-600 hover:bg-orange-50 shadow-lg'
                        : 'bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-500/10'
                      }`}
                    onClick={() => setShowForm(true)}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Bottom Note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={plansInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-center text-sm text-slate-500 dark:text-slate-400 mt-12 max-w-lg mx-auto"
            >
              All plans include complimentary access to common areas, power backup, and a vibrant community of professionals.
            </motion.p>
          </div>
        </section>

        {/* Inquiry Form Section */}
        <AnimatePresence>
          {showForm && (
            <motion.section
              ref={formRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="py-16 md:py-24 bg-background relative"
            >
              <div className="container mx-auto px-4">
                <div className="flex flex-col items-center">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">
                      Reserve Your Spot
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                      Fill out the form below and our community manager will reach out within 24 hours.
                    </p>
                  </div>
                  <InquiryForm onSuccess={() => {
                    // Maybe show a success message or close form
                  }} />
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Tagline Section */}
        {!showForm && (
          <section className="py-24 md:py-32 bg-background border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
                Empowering Your Work Life.
              </h2>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12">
                Join a community of professionals, entrepreneurs, and innovators
                in a workspace designed for productivity and collaboration.
              </p>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-orange-200 dark:border-orange-900/50 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                onClick={() => setShowForm(true)}
              >
                Reserve Your Spot Today
              </Button>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <p className="font-extrabold text-2xl mb-4 tracking-tighter">
            <span className="text-orange-500">co</span>
            <span className="text-slate-300">WORX</span>
          </p>
          <div className="flex items-center gap-2 text-slate-400 mb-8 text-sm">
            <MapPin className="h-4 w-4" />
            <span>R-Tech Park, Global City, Virar West, Maharashtra</span>
          </div>
          <div className="w-full max-w-md h-px bg-slate-800 mb-8" />
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} coWORX Coworking Spaces. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
