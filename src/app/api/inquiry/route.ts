import { NextRequest, NextResponse } from 'next/server';
import { getInquiries, createInquiry } from '@/lib/storage';
import type { CreateInquiryInput } from '@/types/inquiry';

// GET /api/inquiry - Get all inquiries
export async function GET() {
  try {
    const inquiries = await getInquiries();
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

// POST /api/inquiry - Create a new inquiry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, mobile, membershipType, startDate, notes } = body;

    // Validate required fields
    if (!name || !mobile || !membershipType || !startDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate mobile number (10 digits)
    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { error: 'Mobile number must be 10 digits' },
        { status: 400 }
      );
    }

    const input: CreateInquiryInput = {
      name,
      mobile,
      membershipType,
      startDate,
      notes: notes || undefined,
    };

    const inquiry = await createInquiry(input);
    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'An inquiry with this mobile number already exists.') {
      return NextResponse.json(
        { error: 'An inquiry with this mobile number already exists.' },
        { status: 409 }
      );
    }
    
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to create inquiry' },
      { status: 500 }
    );
  }
}
