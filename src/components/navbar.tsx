'use client'

import Link from 'next/link'
import { DarkModeToggle } from '@/components/dark-mode-toggle'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Space', href: '#gallery' },
  { label: 'Seats', href: '#seats' },
  { label: 'Plans', href: '#plans' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60 transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-2xl md:text-3xl font-black tracking-tighter transition-transform group-hover:scale-105">
            <span className="text-orange-600">co</span>
            <span className="text-slate-800 dark:text-slate-200">WORX</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/30"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-sm font-semibold hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600">
              Dashboard
            </Button>
          </Link>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
          <DarkModeToggle />

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-4 px-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-600 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-600 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      )}
    </header>
  )
}
