'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw, RotateCcw, Save, CheckCircle2 } from 'lucide-react'

type SeatStatus = 'available' | 'occupied' | 'reserved' | 'unavailable'

interface Seat {
    id: string
    zone: string
    zoneName: string
    status: SeatStatus
}

const statusOptions: { value: SeatStatus; label: string; color: string; bg: string; emoji: string }[] = [
    { value: 'available', label: 'Available', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700', emoji: '🟢' },
    { value: 'occupied', label: 'Occupied', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700', emoji: '🔴' },
    { value: 'reserved', label: 'Reserved', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700', emoji: '🟡' },
    { value: 'unavailable', label: 'Not Available', color: 'text-slate-500', bg: 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600', emoji: '⚪' },
]

const zoneConfig: Record<string, { label: string; color: string }> = {
    A: { label: 'Zone A — Entrance Side', color: 'border-l-blue-500' },
    B: { label: 'Zone B — Behind Zone A', color: 'border-l-purple-500' },
    C: { label: 'Zone C — Right Wall', color: 'border-l-teal-500' },
    D: { label: 'Zone D — Behind Zone C', color: 'border-l-amber-500' },
    CR: { label: 'Conference Room', color: 'border-l-orange-500' },
}

export function AdminSeatManager() {
    const [seats, setSeats] = useState<Seat[]>([])
    const [originalSeats, setOriginalSeats] = useState<Seat[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)

    const fetchSeats = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/seats')
            if (res.ok) {
                const data = await res.json()
                setSeats(data)
                setOriginalSeats(JSON.parse(JSON.stringify(data)))
                setHasChanges(false)
            }
        } catch (err) {
            console.error('Failed to fetch seats:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchSeats()
    }, [fetchSeats])

    const updateSeat = (seatId: string, newStatus: SeatStatus) => {
        setSeats(prev => {
            const updated = prev.map(s => s.id === seatId ? { ...s, status: newStatus } : s)
            // Check if anything changed from original
            const changed = JSON.stringify(updated) !== JSON.stringify(originalSeats)
            setHasChanges(changed)
            return updated
        })
        setSaved(false)
    }

    const saveAllChanges = async () => {
        setSaving(true)
        try {
            const res = await fetch('/api/seats', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(seats),
            })
            if (res.ok) {
                const data = await res.json()
                setSeats(data)
                setOriginalSeats(JSON.parse(JSON.stringify(data)))
                setHasChanges(false)
                setSaved(true)
                setTimeout(() => setSaved(false), 3000)
            }
        } catch (err) {
            console.error('Failed to save seats:', err)
            alert('Failed to save changes. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    const resetAll = async () => {
        if (!confirm('Are you sure you want to set ALL seats to Available?')) return
        setSaving(true)
        try {
            const res = await fetch('/api/seats', { method: 'DELETE' })
            if (res.ok) {
                const data = await res.json()
                setSeats(data)
                setOriginalSeats(JSON.parse(JSON.stringify(data)))
                setHasChanges(false)
                setSaved(true)
                setTimeout(() => setSaved(false), 3000)
            }
        } catch (err) {
            console.error('Failed to reset seats:', err)
        } finally {
            setSaving(false)
        }
    }

    // Group seats by zone
    const zones = ['A', 'B', 'C', 'D', 'CR']

    const availableCount = seats.filter(s => s.zone !== 'CR' && s.status === 'available').length
    const totalOpen = seats.filter(s => s.zone !== 'CR').length
    const confAvailable = seats.filter(s => s.zone === 'CR' && s.status === 'available').length
    const totalConf = seats.filter(s => s.zone === 'CR').length

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Loading seats...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header bar with counts and actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-sm font-semibold">{availableCount}/{totalOpen} Open</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500" />
                        <span className="text-sm font-semibold">{confAvailable}/{totalConf} Conf</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    {saved && (
                        <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400 font-medium">
                            <CheckCircle2 className="h-4 w-4" />
                            Saved!
                        </span>
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchSeats}
                        disabled={saving}
                    >
                        <RefreshCw className={`h-4 w-4 mr-1 ${saving ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={resetAll}
                        disabled={saving}
                        className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/10"
                    >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Reset All
                    </Button>
                    <Button
                        size="sm"
                        onClick={saveAllChanges}
                        disabled={!hasChanges || saving}
                        className="bg-orange-600 hover:bg-orange-700 text-white"
                    >
                        <Save className="h-4 w-4 mr-1" />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>

            {/* Quick status legend */}
            <div className="flex flex-wrap gap-2">
                {statusOptions.map(opt => (
                    <span key={opt.value} className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border bg-white dark:bg-slate-900">
                        <span>{opt.emoji}</span>
                        <span className={opt.color}>{opt.label}</span>
                    </span>
                ))}
            </div>

            {/* Seat grid by zone */}
            <div className="space-y-4">
                {zones.map(zone => {
                    const zoneSeats = seats.filter(s => s.zone === zone)
                    const cfg = zoneConfig[zone]
                    if (zoneSeats.length === 0) return null

                    return (
                        <div key={zone} className={`border-l-4 ${cfg.color} rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 overflow-hidden`}>
                            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{cfg.label}</h4>
                                <p className="text-xs text-slate-500">
                                    {zoneSeats.filter(s => s.status === 'available').length} of {zoneSeats.length} available
                                </p>
                            </div>
                            <div className="p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {zoneSeats.map(seat => {
                                        const currentOpt = statusOptions.find(o => o.value === seat.status)!
                                        return (
                                            <div
                                                key={seat.id}
                                                className={`flex items-center justify-between gap-3 p-3 rounded-lg border ${currentOpt.bg} transition-all`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">{currentOpt.emoji}</span>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Seat {seat.id}</p>
                                                        <p className={`text-xs font-medium ${currentOpt.color}`}>{currentOpt.label}</p>
                                                    </div>
                                                </div>
                                                <select
                                                    value={seat.status}
                                                    onChange={(e) => updateSeat(seat.id, e.target.value as SeatStatus)}
                                                    className="text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                                                >
                                                    {statusOptions.map(opt => (
                                                        <option key={opt.value} value={opt.value}>
                                                            {opt.emoji} {opt.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
