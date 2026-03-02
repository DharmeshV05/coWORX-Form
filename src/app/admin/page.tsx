'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { DataTable } from '@/components/data-table'
import { AdminSeatManager } from '@/components/admin-seat-manager'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock, LogOut, ClipboardList, Armchair } from 'lucide-react'
import type { Inquiry } from '@/types/inquiry'

type AdminTab = 'inquiries' | 'seats'

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<AdminTab>('inquiries')

  // Simple password protection (for demo purposes)
  const ADMIN_PASSWORD = 'coworkx123'

  useEffect(() => {
    // Check if already authenticated in session storage
    const auth = sessionStorage.getItem('admin_authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
      fetchInquiries()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_authenticated', 'true')
      setPasswordError('')
      fetchInquiries()
    } else {
      setPasswordError('Invalid password. Please try again.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_authenticated')
    setPassword('')
  }

  const fetchInquiries = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/inquiry')
      if (!response.ok) {
        throw new Error('Failed to fetch inquiries')
      }
      const data = await response.json()
      setInquiries(data)
    } catch (error) {
      console.error('Error fetching inquiries:', error)
      alert('Failed to fetch inquiries. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inquiry) => inquiry.id !== id))
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
              <p className="text-sm text-muted-foreground">
                Enter your password to access the dashboard
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setPasswordError('')
                    }}
                    className={passwordError ? 'border-destructive' : ''}
                  />
                  {passwordError && (
                    <p className="text-sm text-destructive">{passwordError}</p>
                  )}
                </div>
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                  Login
                </Button>
              </form>
              <div className="mt-4 text-center">
                <Button
                  variant="ghost"
                  onClick={() => router.push('/')}
                  className="text-sm"
                >
                  ← Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage enquiries & seat availability
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => router.push('/')}
                className="flex items-center"
              >
                <span className="hidden sm:inline mr-2">Back to Home</span>
                ←
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 mb-6 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'inquiries'
                ? 'bg-white dark:bg-slate-800 text-orange-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
            >
              <ClipboardList className="h-4 w-4" />
              Enquiries
              {inquiries.length > 0 && (
                <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold px-2 py-0.5 rounded-full">
                  {inquiries.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('seats')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'seats'
                ? 'bg-white dark:bg-slate-800 text-orange-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
            >
              <Armchair className="h-4 w-4" />
              Seat Management
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'inquiries' && (
            <>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading enquiries...</p>
                  </div>
                </div>
              ) : (
                <DataTable
                  inquiries={inquiries}
                  onDelete={handleDeleteInquiry}
                />
              )}
            </>
          )}

          {activeTab === 'seats' && (
            <AdminSeatManager />
          )}
        </div>
      </main >

      {/* Footer */}
      < footer className="bg-slate-900 text-white py-6" >
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} coWORX Admin Dashboard. All rights reserved.
          </p>
        </div>
      </footer >
    </div >
  )
}
