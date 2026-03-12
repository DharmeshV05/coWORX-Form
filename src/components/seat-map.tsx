'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'

type SeatStatus = 'available' | 'occupied' | 'reserved' | 'unavailable'

interface Seat {
    id: string
    zone: string
    zoneName: string
    status: SeatStatus
}

export function SeatMap() {
    const [seats, setSeats] = useState<Seat[]>([])
    const [loading, setLoading] = useState(true)

    const fetchSeats = useCallback(async () => {
        try {
            const res = await fetch('/api/seats')
            if (res.ok) {
                const data = await res.json()
                setSeats(data)
            }
        } catch (err) {
            console.error('Failed to fetch seats:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchSeats()
        // Auto-refresh every 30 seconds for live updates
        const interval = setInterval(fetchSeats, 30000)
        return () => clearInterval(interval)
    }, [fetchSeats])

    const openSeats = useMemo(() => seats.filter(s => s.zone !== 'CR'), [seats])
    const confSeats = useMemo(() => seats.filter(s => s.zone === 'CR'), [seats])
    const openAvail = useMemo(() => openSeats.filter(s => s.status === 'available').length, [openSeats])
    const confAvail = useMemo(() => confSeats.filter(s => s.status === 'available').length, [confSeats])

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500 mx-auto mb-3" />
                    <p className="text-sm text-slate-400">Loading seat availability...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {/* Open Seats Available */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-2xl px-6 py-4 shadow-xl"
            >
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center">
                    <svg className="w-7 h-7 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 18v-2H5V8c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v8h-2v2h-2v-2H9v2H7zm0-8h10V8H7v2zm0 2v2h10v-2H7z" />
                    </svg>
                </div>
                <div>
                    <p className="text-2xl sm:text-3xl font-black text-white">
                        {openAvail} <span className="text-slate-500 text-lg font-semibold">/ {openSeats.length}</span>
                    </p>
                    <p className="text-xs text-slate-400 font-medium">Open Seats Available</p>
                </div>
            </motion.div>

            {/* Conference Seats Available */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4 bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-2xl px-6 py-4 shadow-xl"
            >
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#f5a623]/20 to-[#d4a012]/20 border border-[#f5a623]/30 flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#f5a623]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 12h2v5H7zm4-3h2v8h-2zm4-3h2v11h-2z" />
                    </svg>
                </div>
                <div>
                    <p className="text-2xl sm:text-3xl font-black text-white">
                        {confAvail} <span className="text-slate-500 text-lg font-semibold">/ {confSeats.length}</span>
                    </p>
                    <p className="text-xs text-slate-400 font-medium">Conference Seats Available</p>
                </div>
            </motion.div>
        </div>
    )
}
