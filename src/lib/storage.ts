import fs from 'fs/promises';
import path from 'path';
import type { Inquiry, CreateInquiryInput } from '@/types/inquiry';

const isVercel = !!process.env.VERCEL;
const DATA_FILE_PATH = isVercel
  ? path.join('/tmp', 'inquiries.json')
  : path.join(process.cwd(), 'data', 'inquiries.json');

// Ensure data directory and file exist
async function ensureDataFile() {
  const dataDir = path.dirname(DATA_FILE_PATH);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }

  try {
    await fs.access(DATA_FILE_PATH);
  } catch {
    if (isVercel) {
      // Try to copy existing data from the bundled project files as a starting point
      try {
        const localPath = path.join(process.cwd(), 'data', 'inquiries.json');
        const localData = await fs.readFile(localPath, 'utf-8');
        await fs.writeFile(DATA_FILE_PATH, localData, 'utf-8');
        return;
      } catch (err) {
        // Fallback if local file not found
      }
    }
    await fs.writeFile(DATA_FILE_PATH, '[]', 'utf-8');
  }
}

// Read all inquiries from JSON file
export async function getInquiries(): Promise<Inquiry[]> {
  await ensureDataFile();
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const inquiries = JSON.parse(data) as Inquiry[];
    // Sort by createdAt descending (newest first)
    return inquiries.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error('Error reading inquiries:', error);
    return [];
  }
}

// Get inquiry by mobile number (for duplicate check)
export async function getInquiryByMobile(mobile: string): Promise<Inquiry | null> {
  const inquiries = await getInquiries();
  return inquiries.find(inquiry => inquiry.mobile === mobile) || null;
}

// Create a new inquiry
export async function createInquiry(input: CreateInquiryInput): Promise<Inquiry> {
  await ensureDataFile();

  const inquiries = await getInquiries();

  // Check for duplicate mobile number
  const existing = inquiries.find(inquiry => inquiry.mobile === input.mobile);
  if (existing) {
    throw new Error('An inquiry with this mobile number already exists.');
  }

  const newInquiry: Inquiry = {
    id: generateId(),
    ...input,
    createdAt: new Date().toISOString(),
  };

  inquiries.push(newInquiry);
  await saveInquiries(inquiries);

  return newInquiry;
}

// Delete an inquiry by ID
export async function deleteInquiry(id: string): Promise<boolean> {
  await ensureDataFile();

  const inquiries = await getInquiries();
  const filtered = inquiries.filter(inquiry => inquiry.id !== id);

  if (filtered.length === inquiries.length) {
    return false; // No inquiry was deleted
  }

  await saveInquiries(filtered);
  return true;
}

// Save inquiries to JSON file
async function saveInquiries(inquiries: Inquiry[]): Promise<void> {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving inquiries:', error);
    if (process.env.VERCEL) {
      console.error('NOTE: You are running on Vercel. Local JSON file storage is NOT persistent. Consider using a database like Supabase or Vercel Postgres.');
    }
    throw error;
  }
}

// Generate unique ID
function generateId(): string {
  return `inquiry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
