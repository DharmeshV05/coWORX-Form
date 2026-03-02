import fs from 'fs/promises';
import path from 'path';

export type SeatStatus = 'available' | 'occupied' | 'reserved' | 'unavailable';

export interface Seat {
    id: string;
    zone: string;
    zoneName: string;
    status: SeatStatus;
}

const SEATS_FILE = path.join(process.cwd(), 'data', 'seats.json');

const DEFAULT_SEATS: Seat[] = [
    { id: 'A1', zone: 'A', zoneName: 'Entrance Side', status: 'available' },
    { id: 'A2', zone: 'A', zoneName: 'Entrance Side', status: 'available' },
    { id: 'A3', zone: 'A', zoneName: 'Entrance Side', status: 'available' },
    { id: 'A4', zone: 'A', zoneName: 'Entrance Side', status: 'available' },
    { id: 'A5', zone: 'A', zoneName: 'Entrance Side', status: 'available' },
    { id: 'A6', zone: 'A', zoneName: 'Entrance Side', status: 'available' },
    { id: 'B1', zone: 'B', zoneName: 'Behind Zone A', status: 'available' },
    { id: 'C1', zone: 'C', zoneName: 'Right Wall', status: 'available' },
    { id: 'C2', zone: 'C', zoneName: 'Right Wall', status: 'available' },
    { id: 'C3', zone: 'C', zoneName: 'Right Wall', status: 'available' },
    { id: 'D1', zone: 'D', zoneName: 'Behind Zone C', status: 'available' },
    { id: 'D2', zone: 'D', zoneName: 'Behind Zone C', status: 'available' },
    { id: 'D3', zone: 'D', zoneName: 'Behind Zone C', status: 'available' },
    { id: 'D4', zone: 'D', zoneName: 'Behind Zone C', status: 'available' },
    { id: 'D5', zone: 'D', zoneName: 'Behind Zone C', status: 'available' },
    { id: 'D6', zone: 'D', zoneName: 'Behind Zone C', status: 'available' },
    { id: 'CR1', zone: 'CR', zoneName: 'Conference Room', status: 'available' },
    { id: 'CR2', zone: 'CR', zoneName: 'Conference Room', status: 'available' },
    { id: 'CR3', zone: 'CR', zoneName: 'Conference Room', status: 'available' },
    { id: 'CR4', zone: 'CR', zoneName: 'Conference Room', status: 'available' },
];

async function ensureSeatsFile() {
    const dataDir = path.dirname(SEATS_FILE);
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }

    try {
        await fs.access(SEATS_FILE);
    } catch {
        await fs.writeFile(SEATS_FILE, JSON.stringify(DEFAULT_SEATS, null, 2), 'utf-8');
    }
}

// Get all seats
export async function getSeats(): Promise<Seat[]> {
    await ensureSeatsFile();
    try {
        const data = await fs.readFile(SEATS_FILE, 'utf-8');
        return JSON.parse(data) as Seat[];
    } catch {
        return DEFAULT_SEATS;
    }
}

// Update a single seat's status
export async function updateSeatStatus(seatId: string, status: SeatStatus): Promise<Seat | null> {
    await ensureSeatsFile();
    const seats = await getSeats();
    const seatIndex = seats.findIndex(s => s.id === seatId);

    if (seatIndex === -1) return null;

    seats[seatIndex].status = status;
    await fs.writeFile(SEATS_FILE, JSON.stringify(seats, null, 2), 'utf-8');
    return seats[seatIndex];
}

// Update multiple seats at once
export async function updateAllSeats(seats: Seat[]): Promise<Seat[]> {
    await ensureSeatsFile();
    await fs.writeFile(SEATS_FILE, JSON.stringify(seats, null, 2), 'utf-8');
    return seats;
}

// Reset all seats to available
export async function resetAllSeats(): Promise<Seat[]> {
    await ensureSeatsFile();
    const seats = await getSeats();
    const resetSeats = seats.map(s => ({ ...s, status: 'available' as SeatStatus }));
    await fs.writeFile(SEATS_FILE, JSON.stringify(resetSeats, null, 2), 'utf-8');
    return resetSeats;
}
