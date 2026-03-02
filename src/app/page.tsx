'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { InquiryForm } from '@/components/inquiry-form'
import { Button } from '@/components/ui/button'
import {
  ArrowRight, Wifi, Coffee, Users, Zap, MapPin, CheckCircle2,
  Crown, Clock, Play, Pause, Star, Quote, Monitor, Shield,
  Phone, Mail, Instagram, ChevronLeft, ChevronRight, X,
  Building2, Sparkles, Heart
} from 'lucide-react'
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

const galleryImages = [
  {
    src: '/images/workspace.png',
    alt: 'coWORX open workspace with ergonomic workstations',
    title: 'Open Workspace',
  },
  {
    src: '/images/meeting-room.png',
    alt: 'Private meeting room and cabin at coWORX',
    title: 'Meeting Room',
  },
  {
    src: '/images/storefront.png',
    alt: 'coWORX coworking space storefront in Global City',
    title: 'Our Space',
  },
  {
    src: '/images/interior-wide.png',
    alt: 'Wide view of coWORX workstations and seating',
    title: 'Workstations',
  },
  {
    src: '/images/workspace.png',
    alt: 'Dedicated desks with glass partitions',
    title: 'Dedicated Desks',
  },
  {
    src: '/images/meeting-room.png',
    alt: 'Private cabins for focused work',
    title: 'Private Cabins',
  },
]

const testimonials = [
  {
    name: 'Riya Sharma',
    role: 'Freelance Designer',
    text: "coWORX has completely transformed how I work. The environment is professional, the coffee is amazing, and I've met incredible collaborators here.",
    rating: 5,
    avatar: 'RS',
  },
  {
    name: 'Arjun Patel',
    role: 'Startup Founder',
    text: 'Best coworking space in Virar! The high-speed internet is a game changer, and the meeting rooms are perfect for client calls.',
    rating: 5,
    avatar: 'AP',
  },
  {
    name: 'Sneha Desai',
    role: 'Content Creator',
    text: 'The energy at coWORX is unmatched. I love the flexible plans and the community events they organize every month.',
    rating: 5,
    avatar: 'SD',
  },
]

const stats = [
  { number: '50+', label: 'Active Members' },
  { number: '100', label: 'Mbps WiFi' },
  { number: '24/7', label: 'Power Backup' },
  { number: '4.9★', label: 'Google Rating' },
]

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const formRef = useRef<HTMLDivElement>(null)
  const plansRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const plansInView = useInView(plansRef, { once: true, margin: '-80px' })
  const galleryInView = useInView(galleryRef, { once: true, margin: '-80px' })
  const aboutInView = useInView(aboutRef, { once: true, margin: '-80px' })
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: '-80px' })

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [showForm])

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-orange-100 selection:text-orange-900">
      <Navbar />

      <main className="flex-1">
        {/* ========== HERO SECTION with Video Background ========== */}
        <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster="/images/interior-wide.png"
            >
              <source
                src="https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4"
                type="video/mp4"
              />
            </video>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          </div>

          {/* Video Play/Pause Control */}
          <button
            onClick={toggleVideo}
            className="absolute bottom-6 right-6 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            aria-label={isVideoPlaying ? 'Pause Video' : 'Play Video'}
          >
            {isVideoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>

          {/* Hero Content */}
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="max-w-5xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6">
                  <MapPin className="h-3.5 w-3.5 text-orange-400" />
                  Global City, Virar West
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05]">
                  Work Smart.{' '}
                  <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                    Grow Together.
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed"
              >
                Experience premium coworking designed for productivity,
                collaboration, and community in the heart of Virar.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white text-lg px-10 py-7 shadow-2xl shadow-orange-500/30 active:scale-95 transition-all rounded-full"
                  onClick={() => setShowForm(true)}
                >
                  Join coWORX Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-white border-white/30 bg-white/5 backdrop-blur-md hover:bg-white/15 text-lg px-10 py-7 rounded-full transition-all"
                  onClick={() => {
                    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Explore Space
                </Button>
              </motion.div>

              {/* Stats Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12 pt-8 border-t border-white/10"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl md:text-3xl font-extrabold text-white">{stat.number}</p>
                    <p className="text-xs md:text-sm text-white/60 mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
            >
              <div className="w-1 h-2.5 rounded-full bg-white/60" />
            </motion.div>
          </div>
        </section>

        {/* ========== FEATURES SECTION ========== */}
        <section className="relative py-16 md:py-24 bg-white dark:bg-slate-950 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 dark:opacity-5">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-400 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-400 blur-[120px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider mb-5">
                <Sparkles className="h-3 w-3" />
                All Inclusive
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                Everything You <span className="text-orange-600">Need</span>
              </h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                From lightning-fast internet to unlimited beverages — we've got your workspace covered.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
              {[
                { icon: Wifi, label: '100 Mbps WiFi', sub: 'Blazing fast fiber optic internet', color: 'from-blue-500 to-cyan-500' },
                { icon: Coffee, label: 'Unlimited Coffee', sub: 'Premium coffee & beverages 24/7', color: 'from-amber-500 to-orange-500' },
                { icon: Users, label: 'Meeting Rooms', sub: 'Professional spaces for 4-10 people', color: 'from-purple-500 to-pink-500' },
                { icon: Zap, label: 'Power Backup', sub: 'UPS + Generator for zero downtime', color: 'from-green-500 to-emerald-500' },
                { icon: Monitor, label: 'Ergonomic Setup', sub: 'Premium chairs & adjustable desks', color: 'from-indigo-500 to-blue-500' },
                { icon: Shield, label: 'Secure Access', sub: 'CCTV surveillance & keycard entry', color: 'from-red-500 to-rose-500' },
                { icon: Building2, label: 'Prime Location', sub: 'R-Tech Park, Global City Virar', color: 'from-teal-500 to-cyan-500' },
                { icon: Heart, label: 'Community', sub: 'Networking events & workshops', color: 'from-pink-500 to-rose-500' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 * i }}
                  className="group p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5"
                >
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-sm md:text-base text-slate-900 dark:text-white">{feature.label}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{feature.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== EARLY JOINER PRICING SECTION ========== */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          {/* Background matching branding */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#1a2744] to-[#0f1b33]" />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-orange-500/10 blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-amber-500/10 blur-[100px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
              {/* Left - Image */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-orange-500/20">
                  <Image
                    src="/images/workspace.png"
                    alt="coWORX workspace - Early Joiner offer"
                    width={700}
                    height={500}
                    className="w-full h-72 md:h-96 object-cover"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-2 md:-left-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 z-10">
                  <Sparkles className="h-5 w-5" />
                  <div>
                    <p className="text-sm font-bold">Limited Time Offer</p>
                    <p className="text-[10px] text-orange-100">For Early Joiners Only</p>
                  </div>
                </div>
              </motion.div>

              {/* Right - Content */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
                  <Crown className="h-3.5 w-3.5" />
                  Early Joiner Exclusive
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Early Joiner{' '}
                  <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Pricing</span>
                </h2>
                <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                  &ldquo;Work smarter, connect deeper, grow faster — start your journey with us.&rdquo;
                </p>

                {/* Benefits */}
                <div className="space-y-3 pt-2">
                  {[
                    { label: 'Free AI Credits*', icon: Zap },
                    { label: 'Unlimited Coffee', icon: Coffee },
                    { label: 'Meeting Room Access', icon: Users },
                    { label: 'High-Speed Wi-Fi (100 Mbps)', icon: Wifi },
                  ].map((benefit) => (
                    <div key={benefit.label} className="flex items-center gap-3 bg-gradient-to-r from-orange-500/90 to-amber-500/90 rounded-xl px-5 py-3 shadow-lg shadow-orange-500/10">
                      <benefit.icon className="h-5 w-5 text-white flex-shrink-0" />
                      <span className="text-white font-semibold text-sm md:text-base">{benefit.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-6 rounded-full shadow-xl shadow-orange-500/25 active:scale-95 transition-all font-bold"
                    onClick={() => setShowForm(true)}
                  >
                    Book Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <a
                    href="https://wa.me/919272707827?text=Hi%20I%27m%20interested%20in%20coWORX%20early%20joiner%20pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-green-500/40 bg-green-500/10 text-green-400 hover:bg-green-500/20 hover:text-green-300 px-8 py-6 rounded-full transition-all font-bold"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      WhatsApp Us
                    </Button>
                  </a>
                </div>

                <p className="text-xs text-slate-500">
                  * Terms and conditions apply. Visit <a href="https://coworx.app" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">coworx.app</a> for details.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========== ABOUT / SHOWCASE SECTION with Images ========== */}
        <section ref={aboutRef} className="relative py-20 md:py-32 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-7xl mx-auto">
              {/* Image Collage */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src="/images/interior-wide.png"
                        alt="coWORX modern workspace"
                        width={600}
                        height={400}
                        className="w-full h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src="/images/meeting-room.png"
                        alt="coWORX private cabin"
                        width={600}
                        height={300}
                        className="w-full h-32 md:h-40 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src="/images/storefront.png"
                        alt="coWORX storefront"
                        width={600}
                        height={300}
                        className="w-full h-32 md:h-40 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src="/images/workspace.png"
                        alt="coWORX collaborative workspace"
                        width={600}
                        height={400}
                        className="w-full h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-2 md:-right-4 bg-orange-600 text-white px-5 py-3 rounded-xl shadow-2xl shadow-orange-500/30 flex items-center gap-2 z-10">
                  <Star className="h-5 w-5 fill-white" />
                  <div>
                    <p className="text-sm font-bold">4.9 Rating</p>
                    <p className="text-[10px] text-orange-100">Google Reviews</p>
                  </div>
                </div>
              </motion.div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider">
                  <Building2 className="h-3 w-3" />
                  About coWORX
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  More Than Just a{' '}
                  <span className="text-orange-600">Workspace</span>
                </h2>
                <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  coWORX is a premium coworking space nestled in the heart of Global City, Virar West.
                  We've built a space where freelancers, startups, and remote teams can thrive — surrounded
                  by like-minded professionals in an environment designed for focus and creativity.
                </p>
                <ul className="space-y-3">
                  {[
                    'Air-conditioned, beautifully designed interiors',
                    'Comfortable ergonomic seating for long work hours',
                    'Professional-grade meeting rooms with AV setup',
                    'Community kitchen with unlimited beverages',
                    'Regular networking events and workshops',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base text-slate-700 dark:text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 rounded-full shadow-xl shadow-orange-500/20 active:scale-95 transition-all mt-4"
                  onClick={() => setShowForm(true)}
                >
                  Book a Free Tour
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========== VIDEO SHOWCASE ========== */}
        <section className="relative py-20 md:py-32 bg-white dark:bg-slate-950 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider mb-5">
                <Play className="h-3 w-3" />
                Virtual Tour
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                Take a <span className="text-orange-600">Virtual Tour</span>
              </h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                See what makes coWORX the most loved coworking space in Virar. Explore our beautiful interiors.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-800/50">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full aspect-video object-cover"
                  poster="/images/workspace.png"
                >
                  <source
                    src="https://videos.pexels.com/video-files/6774204/6774204-hd_1920_1080_25fps.mp4"
                    type="video/mp4"
                  />
                </video>
                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-6 text-white">
                  <p className="text-sm font-bold">coWORX Workspace Walkthrough</p>
                  <p className="text-xs text-white/70">Explore our premium coworking facilities</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========== GALLERY SECTION ========== */}
        <section id="gallery" ref={galleryRef} className="relative py-20 md:py-32 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 dark:opacity-5">
            <div className="absolute top-[30%] right-[-5%] w-[30%] h-[30%] rounded-full bg-orange-300 blur-[100px]" />
            <div className="absolute bottom-[10%] left-[-5%] w-[25%] h-[25%] rounded-full bg-amber-300 blur-[100px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={galleryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center mb-14 md:mb-20"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider mb-5">
                <Sparkles className="h-3 w-3" />
                Our Space
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                Explore Our <span className="text-orange-600">Beautiful Space</span>
              </h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                Designed for focus, comfort, and collaboration — take a peek at where the magic happens.
              </p>
            </motion.div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
              {galleryImages.map((image, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={galleryInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                  onClick={() => setSelectedImage(i)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="w-full h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-5">
                      <p className="text-white font-bold text-lg">{image.title}</p>
                      <p className="text-white/70 text-sm">{image.alt}</p>
                    </div>
                  </div>
                  {/* Corner badge */}
                  <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    View
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {selectedImage !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedImage(null)}
              >
                <button
                  className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-50"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-8 w-8" />
                </button>
                <button
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-50 p-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length)
                  }}
                >
                  <ChevronLeft className="h-10 w-10" />
                </button>
                <button
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-50 p-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage((prev) => (prev! + 1) % galleryImages.length)
                  }}
                >
                  <ChevronRight className="h-10 w-10" />
                </button>
                <motion.div
                  key={selectedImage}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="max-w-5xl w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={galleryImages[selectedImage].src}
                    alt={galleryImages[selectedImage].alt}
                    width={1400}
                    height={900}
                    className="w-full rounded-2xl shadow-2xl object-cover"
                  />
                  <div className="text-center mt-4">
                    <p className="text-white font-bold text-xl">{galleryImages[selectedImage].title}</p>
                    <p className="text-white/60 text-sm mt-1">{galleryImages[selectedImage].alt}</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ========== PLANS SECTION ========== */}
        <section id="plans" className="relative py-20 md:py-32 bg-white dark:bg-slate-950 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 dark:opacity-5">
            <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-orange-300 blur-[100px]" />
            <div className="absolute bottom-[10%] left-[-5%] w-[25%] h-[25%] rounded-full bg-amber-300 blur-[100px]" />
          </div>

          <div ref={plansRef} className="container mx-auto px-4 relative z-10">
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
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white dark:bg-slate-950 text-orange-600 dark:text-orange-400 text-[11px] font-extrabold uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                      <Crown className="h-3 w-3" />
                      Most Popular
                    </div>
                  )}

                  <h3 className={`text-xl font-bold mb-1.5 ${plan.popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                    {plan.name}
                  </h3>

                  <div className={`flex items-center gap-1.5 text-sm mb-6 ${plan.popular ? 'text-orange-100' : 'text-slate-500 dark:text-slate-400'}`}>
                    <Clock className="h-3.5 w-3.5" />
                    {plan.duration}
                  </div>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-sm font-semibold ${plan.popular ? 'text-orange-100' : 'text-slate-500 dark:text-slate-400'}`}>₹</span>
                    <span className={`text-4xl md:text-5xl font-black tracking-tight ${plan.popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                      {plan.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className={`w-full h-px mb-6 ${plan.popular ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700/50'}`} />

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

                  <Button
                    size="lg"
                    className={`w-full font-bold active:scale-95 transition-all rounded-xl ${plan.popular
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

        {/* ========== TESTIMONIALS SECTION ========== */}
        <section ref={testimonialsRef} className="relative py-20 md:py-32 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center mb-14 md:mb-20"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider mb-5">
                <Star className="h-3 w-3" />
                Testimonials
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                What Our <span className="text-orange-600">Members Say</span>
              </h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                Don't just take our word for it — hear from the professionals who chose coWORX.
              </p>
            </motion.div>

            {/* Testimonials Carousel */}
            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200/60 dark:border-slate-800/60 relative"
                >
                  <Quote className="absolute top-6 right-6 h-12 w-12 text-orange-100 dark:text-orange-900/30" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array(testimonials[currentTestimonial].rating).fill(0).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8 italic">
                    &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{testimonials[currentTestimonial].name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${i === currentTestimonial ? 'w-8 bg-orange-600' : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-orange-300'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========== LOCATION / MAP SECTION ========== */}
        <section className="relative py-20 md:py-32 bg-white dark:bg-slate-950 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider mb-5">
                <MapPin className="h-3 w-3" />
                Location
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                Find Us <span className="text-orange-600">Here</span>
              </h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                Conveniently located in R-Tech Park, Global City, Virar West — easily accessible via road & rail.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60 dark:border-slate-800/60 min-h-[350px]"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3760.025!2d72.80!3d19.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI4JzEyLjAiTiA3MsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '350px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="coWORX Location Map"
                />
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col justify-center space-y-6"
              >
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/60">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Visit Us</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900 dark:text-white">Address</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">R-Tech Park, Global City, Virar West, Maharashtra 401303</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900 dark:text-white">Phone</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">+91 92727 07827</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900 dark:text-white">Email</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">hello@coworx.app</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900 dark:text-white">Hours</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Mon–Sat: 8:00 AM – 10:00 PM</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Sunday: By appointment</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 rounded-full shadow-xl shadow-orange-500/20 active:scale-95 transition-all w-full"
                  onClick={() => setShowForm(true)}
                >
                  Get Directions & Book a Visit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========== CTA SECTION ========== */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/interior-wide.png"
              alt="coWORX coworking space"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-amber-600/90" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              <h2 className="text-3xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Ready to Transform Your Work Life?
              </h2>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                Join hundreds of professionals who've already made the switch to productive,
                collaborative coworking at coWORX.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-orange-600 hover:bg-orange-50 text-lg px-10 py-7 shadow-2xl font-bold active:scale-95 transition-all rounded-full"
                  onClick={() => setShowForm(true)}
                >
                  Reserve Your Spot Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========== INQUIRY FORM SECTION ========== */}
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
      </main>

      {/* ========== FOOTER ========== */}
      <footer className="bg-slate-950 text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-12">
            {/* Brand */}
            <div>
              <p className="font-extrabold text-3xl mb-4 tracking-tighter">
                <span className="text-orange-500">co</span>
                <span className="text-slate-300">WORX</span>
              </p>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Premium coworking space designed for productivity, collaboration, and community in the heart of Global City, Virar West.
              </p>
              <p className="text-orange-400 text-sm font-semibold mt-2">coworx.app</p>
              <div className="flex gap-3 mt-4">
                <a href="https://instagram.com/coworx.app" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-slate-800 hover:bg-orange-600 flex items-center justify-center transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="https://wa.me/919272707827" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-slate-800 hover:bg-green-600 flex items-center justify-center transition-colors">
                  <Phone className="h-4 w-4" />
                </a>
                <a href="mailto:hello@coworx.app" className="h-10 w-10 rounded-full bg-slate-800 hover:bg-orange-600 flex items-center justify-center transition-colors">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'Our Space', 'Plans', 'Contact'].map((link) => (
                  <li key={link}>
                    <a
                      href={link === 'Home' ? '#' : link === 'Our Space' ? '#gallery' : link === 'Plans' ? '#plans' : '#'}
                      className="text-slate-400 hover:text-orange-400 text-sm transition-colors"
                      onClick={(e) => {
                        if (link === 'Contact') {
                          e.preventDefault()
                          setShowForm(true)
                        }
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <div className="space-y-3 text-sm text-slate-400">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-orange-500 flex-shrink-0" />
                  <span>R-Tech Park, Global City, Virar West, Maharashtra</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-orange-500" />
                  <span>+91 92727 07827</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-orange-500" />
                  <span>hello@coworx.app</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs">
              © {new Date().getFullYear()} coWORX Coworking Spaces. All rights reserved.
            </p>
            <p className="text-slate-600 text-xs">
              Designed with ❤️ for the community
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919272707827?text=Hi%20I%27m%20interested%20in%20coWORX%20coworking%20space"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 group"
      >
        <div className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl shadow-green-500/30 transition-all duration-300 hover:scale-105 active:scale-95">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="text-sm font-bold hidden sm:inline">WhatsApp Us</span>
        </div>
      </a>
    </div>
  )
}
