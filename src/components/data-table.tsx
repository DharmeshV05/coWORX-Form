'use client'

import { useState } from 'react'
import type { Inquiry, MembershipType } from '@/types/inquiry'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Download, Trash2, FileSpreadsheet } from 'lucide-react'
import * as XLSX from 'xlsx'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const membershipTypes: MembershipType[] = [
  'Hot Desk',
  'Dedicated Desk',
  'Private Office',
  'Virtual Office',
  'Day Pass / Hourly Access',
  'Weekly Plan',
  'Monthly Plan',
]

interface DataTableProps {
  inquiries: Inquiry[]
  onDelete?: (id: string) => void
}

export function DataTable({ inquiries, onDelete }: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')

  // Filter inquiries based on search and membership type
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.mobile.includes(searchQuery)

    const matchesFilter =
      filterType === 'all' || inquiry.membershipType === filterType

    return matchesSearch && matchesFilter
  })

  // Export to Excel
  const handleExportToExcel = () => {
    const exportData = filteredInquiries.map((inquiry) => ({
      Name: inquiry.name,
      Mobile: inquiry.mobile,
      'Membership Type': inquiry.membershipType,
      'Start Date': inquiry.startDate,
      Notes: inquiry.notes || '',
      'Submitted Date': new Date(inquiry.createdAt).toLocaleDateString(),
    }))

    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Enquiries')

    // Set column widths
    const wscols = [
      { wch: 20 }, // Name
      { wch: 15 }, // Mobile
      { wch: 25 }, // Membership Type
      { wch: 15 }, // Start Date
      { wch: 30 }, // Notes
      { wch: 15 }, // Submitted Date
    ]
    ws['!cols'] = wscols

    XLSX.writeFile(wb, 'coWORX-Enquiries.xlsx')
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/inquiry/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete inquiry')
      }

      onDelete?.(id)
    } catch (error) {
      console.error('Error deleting inquiry:', error)
      alert('Failed to delete inquiry. Please try again.')
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-2xl">
            Enquiries ({filteredInquiries.length})
          </CardTitle>
          <Button
            onClick={handleExportToExcel}
            className="bg-green-600 hover:bg-green-700"
            disabled={filteredInquiries.length === 0}
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export to Excel
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filter */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or mobile..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {membershipTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Empty State */}
        {filteredInquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileSpreadsheet className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No enquiries found</h3>
            <p className="text-muted-foreground">
              {inquiries.length === 0
                ? 'No enquiries submitted yet. Check back later!'
                : 'Try adjusting your search or filter criteria.'}
            </p>
          </div>
        ) : (
          /* Table */
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Name</TableHead>
                  <TableHead className="min-w-[120px]">Mobile</TableHead>
                  <TableHead className="min-w-[200px]">Membership Type</TableHead>
                  <TableHead className="min-w-[130px]">Start Date</TableHead>
                  <TableHead className="min-w-[150px] hidden sm:table-cell">
                    Submitted At
                  </TableHead>
                  <TableHead className="min-w-[80px] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="font-medium">
                      {inquiry.name}
                    </TableCell>
                    <TableCell>{inquiry.mobile}</TableCell>
                    <TableCell>{inquiry.membershipType}</TableCell>
                    <TableCell>{inquiry.startDate}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete this enquiry?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently
                              delete the enquiry from{' '}
                              <strong>{inquiry.name}</strong>.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(inquiry.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
