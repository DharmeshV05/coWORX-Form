'use client'

import Link from 'next/link'
import Image from 'next/image'
import { DarkModeToggle } from '@/components/dark-mode-toggle'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Space', href: '#gallery' },
  { label: 'Seats', href: '#seats' },
  { label: 'Plans', href: '#plans' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 dark:bg-[#0d2137]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-[#0d2137]/60 transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <Image
            src="/images/coworx.logo.png"
            alt="coWORX Logo"
            width={600}
            height={160}
            className="h-20 md:h-40 w-auto object-contain transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-semibold text-[#2d3748] dark:text-[#edf2f7] hover:text-[#f5a623] dark:hover:text-[#f5a623] transition-colors rounded-lg hover:bg-[#f5a623]/10 dark:hover:bg-[#f5a623]/10"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-4">


          <DarkModeToggle />

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#edf2f7] dark:hover:bg-[#1e3a5f] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-[#0d2137] border-t border-[#edf2f7] dark:border-[#1e3a5f] py-4 px-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm font-semibold text-[#2d3748] dark:text-[#edf2f7] hover:text-[#f5a623] rounded-lg hover:bg-[#f5a623]/10 dark:hover:bg-[#f5a623]/10 transition-colors"
            >
              {link.label}
            </a>
          ))}

        </div>
      )}
    </header>
  )
}
