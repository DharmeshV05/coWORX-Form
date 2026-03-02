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

const statusConfig: Record<SeatStatus, { color: string; bg: string; border: string; glow: string; label: string; emoji: string }> = {
    available: { color: 'text-green-400', bg: 'bg-green-500/15', border: 'border-green-500/40', glow: 'shadow-green-500/20', label: 'Available', emoji: '🟢' },
    occupied: { color: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/40', glow: 'shadow-red-500/20', label: 'Occupied', emoji: '🔴' },
    reserved: { color: 'text-yellow-400', bg: 'bg-yellow-500/15', border: 'border-yellow-500/40', glow: 'shadow-yellow-500/20', label: 'Reserved', emoji: '🟡' },
    unavailable: { color: 'text-slate-500', bg: 'bg-slate-500/10', border: 'border-slate-600/30', glow: 'shadow-slate-500/10', label: 'Not Available', emoji: '⚪' },
}

function SeatButton({ seat, index }: { seat: Seat; index: number }) {
    const [hovered, setHovered] = useState(false)
    const cfg = statusConfig[seat.status]

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.03 * index }}
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Tooltip */}
            {hovered && (
                <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap"
                >
                    <div className="bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl border border-slate-700">
                        Seat {seat.id} — {cfg.label}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 border-r border-b border-slate-700 rotate-45" />
                    </div>
                </motion.div>
            )}

            <motion.button
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`
          relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl
          ${cfg.bg} ${cfg.border} border-2
          flex items-center justify-center
          transition-all duration-200 cursor-pointer
          shadow-lg ${cfg.glow}
          backdrop-blur-sm
          group
        `}
            >
                <div className="flex flex-col items-center gap-0.5">
                    <svg
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${cfg.color} transition-colors`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M7 18v-2H5V8c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v8h-2v2h-2v-2H9v2H7zm0-8h10V8H7v2zm0 2v2h10v-2H7z" />
                    </svg>
                    <span className={`text-[9px] sm:text-[10px] font-bold ${cfg.color} leading-none`}>
                        {seat.id}
                    </span>
                </div>

                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${seat.status === 'available' ? 'bg-green-500' :
                        seat.status === 'occupied' ? 'bg-red-500' :
                            seat.status === 'reserved' ? 'bg-yellow-500' :
                                'bg-slate-500'
                    } border-2 border-slate-900 shadow-md`}>
                    {seat.status === 'available' && (
                        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40" />
                    )}
                </div>
            </motion.button>
        </motion.div>
    )
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

    const zoneA = seats.filter(s => s.zone === 'A')
    const zoneB = seats.filter(s => s.zone === 'B')
    const zoneC = seats.filter(s => s.zone === 'C')
    const zoneD = seats.filter(s => s.zone === 'D')
    const zoneCR = seats.filter(s => s.zone === 'CR')

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
        <div className="space-y-10">
            {/* ── Availability Counters ── */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
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

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-4 bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-2xl px-6 py-4 shadow-xl"
                >
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 flex items-center justify-center">
                        <svg className="w-7 h-7 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
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

            {/* ── Seat Layout ── */}
            <div className="relative max-w-3xl mx-auto">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-slate-800/40 to-slate-900/60 border border-slate-700/30 -m-4 sm:-m-6" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-slate-600 font-bold">
                    ↑ Entrance
                </div>

                <div className="relative z-10 pt-8 pb-6 px-2 sm:px-6 space-y-6">
                    {/* Zone A */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-5 w-1 rounded-full bg-blue-500" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">Zone A</span>
                            <span className="text-[10px] text-slate-500">· Entrance Side</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                            {zoneA.map((seat, i) => <SeatButton key={seat.id} seat={seat} index={i} />)}
                        </div>
                    </div>

                    {/* Zone B */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-5 w-1 rounded-full bg-purple-500" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">Zone B</span>
                            <span className="text-[10px] text-slate-500">· Behind Zone A</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                            {zoneB.map((seat, i) => <SeatButton key={seat.id} seat={seat} index={i + 6} />)}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-4 opacity-30">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-500 to-transparent" />
                        <span className="text-[9px] uppercase tracking-widest text-slate-500">Aisle</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-500 to-transparent" />
                    </div>

                    {/* Zone C */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-5 w-1 rounded-full bg-teal-500" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">Zone C</span>
                            <span className="text-[10px] text-slate-500">· Right Wall</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                            {zoneC.map((seat, i) => <SeatButton key={seat.id} seat={seat} index={i + 7} />)}
                        </div>
                    </div>

                    {/* Zone D */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-5 w-1 rounded-full bg-amber-500" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Zone D</span>
                            <span className="text-[10px] text-slate-500">· Behind Zone C</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                            {zoneD.map((seat, i) => <SeatButton key={seat.id} seat={seat} index={i + 10} />)}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-4 opacity-30">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
                        <span className="text-[9px] uppercase tracking-widest text-orange-400">Conference Room</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
                    </div>

                    {/* Conference Room */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-5 w-1 rounded-full bg-orange-500" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">Conference Room</span>
                            <span className="text-[10px] text-slate-500">· 4 Seats</span>
                        </div>
                        <div className="flex justify-center">
                            <div className="relative flex items-center gap-2 sm:gap-3">
                                {zoneCR.slice(0, 2).map((seat, i) => <SeatButton key={seat.id} seat={seat} index={i + 16} />)}
                                <div className="w-12 sm:w-16 h-8 rounded-lg bg-slate-700/50 border border-slate-600/40 flex items-center justify-center mx-1">
                                    <span className="text-[8px] text-slate-500 font-bold uppercase">Table</span>
                                </div>
                                {zoneCR.slice(2, 4).map((seat, i) => <SeatButton key={seat.id} seat={seat} index={i + 18} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Legend ── */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-3 sm:gap-5"
            >
                {Object.entries(statusConfig).map(([key, cfg]) => (
                    <div key={key} className="flex items-center gap-2 bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 px-3 py-1.5 rounded-full">
                        <span className="text-sm">{cfg.emoji}</span>
                        <span className="text-xs font-semibold text-slate-300">{cfg.label}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
