import { NextRequest, NextResponse } from 'next/server';
import { getSeats, updateSeatStatus, updateAllSeats, resetAllSeats } from '@/lib/seat-storage';
import type { SeatStatus } from '@/lib/seat-storage';

// GET /api/seats — Get all seats
export async function GET() {
    try {
        const seats = await getSeats();
        return NextResponse.json(seats);
    } catch (error) {
        console.error('Error fetching seats:', error);
        return NextResponse.json({ error: 'Failed to fetch seats' }, { status: 500 });
    }
}

// PUT /api/seats — Update one seat or all seats
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        // If body is an array, update all seats at once
        if (Array.isArray(body)) {
            const seats = await updateAllSeats(body);
            return NextResponse.json(seats);
        }

        // Single seat update: { seatId, status }
        const { seatId, status } = body;

        if (!seatId || !status) {
            return NextResponse.json({ error: 'Missing seatId or status' }, { status: 400 });
        }

        const validStatuses: SeatStatus[] = ['available', 'occupied', 'reserved', 'unavailable'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
                { status: 400 }
            );
        }

        const updated = await updateSeatStatus(seatId, status);
        if (!updated) {
            return NextResponse.json({ error: 'Seat not found' }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error updating seat:', error);
        return NextResponse.json({ error: 'Failed to update seat' }, { status: 500 });
    }
}

// DELETE /api/seats — Reset all seats to available
export async function DELETE() {
    try {
        const seats = await resetAllSeats();
        return NextResponse.json(seats);
    } catch (error) {
        console.error('Error resetting seats:', error);
        return NextResponse.json({ error: 'Failed to reset seats' }, { status: 500 });
    }
}
