'use client'

import Link from 'next/link'
import { DarkModeToggle } from '@/components/dark-mode-toggle'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60 transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-2xl md:text-3xl font-black tracking-tighter transition-transform group-hover:scale-105">
            <span className="text-orange-600">co</span>
            <span className="text-slate-800 dark:text-slate-200">WORX</span>
          </span>
        </Link>

        {/* Right side - Dark mode toggle and Admin link */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-sm font-semibold hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600">
              Dashboard
            </Button>
          </Link>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  )
}
