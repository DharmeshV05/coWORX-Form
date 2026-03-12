'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, CheckCircle2, Armchair } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import type { MembershipType } from '@/types/inquiry'

import { motion } from 'framer-motion'

const membershipTypes: MembershipType[] = [
  'Hot Desk',
  'Dedicated Desk',
  'Private Office',
  'Virtual Office',
  'Day Pass / Hourly Access',
  'Day Pass (â‚¹299/day)',
  'Weekly Plan',
  'Monthly Plan',
]

interface AvailableSeat {
  id: string
  zone: string
  zoneName: string
  status: string
}

const zoneLabels: Record<string, string> = {
  A: 'Zone A Â· Entrance',
  B: 'Zone B',
  C: 'Zone C Â· Right Wall',
  D: 'Zone D',
  CR: 'Conference Room',
}

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z
    .string()
    .min(10, 'Mobile number must be 10 digits')
    .max(10, 'Mobile number must be 10 digits')
    .regex(/^\d{10}$/, 'Mobile number must contain only digits'),
  membershipType: z.string().min(1, 'Please select a membership type'),
  startDate: z.string().min(1, 'Please select a start date'),
  seatPreference: z.string().optional(),
  notes: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

interface InquiryFormProps {
  onSuccess?: () => void
}

export function InquiryForm({ onSuccess }: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [availableSeats, setAvailableSeats] = useState<AvailableSeat[]>([])
  const [seatsLoading, setSeatsLoading] = useState(true)
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      mobile: '',
      membershipType: undefined,
      startDate: '',
      seatPreference: '',
      notes: '',
    },
  })

  // Fetch available seats
  const fetchAvailableSeats = async () => {
    setSeatsLoading(true)
    try {
      const res = await fetch('/api/seats')
      if (res.ok) {
        const data: AvailableSeat[] = await res.json()
        setAvailableSeats(data.filter(s => s.status === 'available'))
      }
    } catch (err) {
      console.error('Failed to fetch seats:', err)
    } finally {
      setSeatsLoading(false)
    }
  }

  useEffect(() => {
    fetchAvailableSeats()
  }, [])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          seatPreference: data.seatPreference || undefined,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit inquiry')
      }

      setIsSuccess(true)

      const selectedSeat = data.seatPreference
      toast({
        title: 'Success!',
        description: selectedSeat
          ? `Thank you! Seat ${selectedSeat} has been reserved for you. Our team will contact you shortly.`
          : 'Thank you! Our team will contact you shortly.',
        variant: 'default',
      })

      form.reset()
      // Refresh available seats since one may have been reserved
      fetchAvailableSeats()
      onSuccess?.()
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to submit inquiry',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[500px]"
      >
        <Card className="shadow-2xl border-orange-100 dark:border-orange-900/30 overflow-hidden">
          <CardContent className="pt-12 pb-10 text-center space-y-6">
            <div className="mx-auto w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Successfully Submitted!</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Our representative will contact you on your mobile number shortly.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsSuccess(false)}
              className="mt-4"
            >
              Submit Another Enquiry
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Group available seats by zone for the dropdown
  const seatsByZone = availableSeats.reduce<Record<string, AvailableSeat[]>>((acc, seat) => {
    if (!acc[seat.zone]) acc[seat.zone] = []
    acc[seat.zone].push(seat)
    return acc
  }, {})

  return (
    <Card className="w-full max-w-[500px] shadow-2xl border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl text-center font-extrabold tracking-tight">
          Join coWORX Community
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number *</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="9876543210"
                      maxLength={10}
                      {...field}
                      onChange={(e) => {
                        // Only allow numbers
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                        field.onChange(value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="membershipType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membership Type *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select membership type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {membershipTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Start Date *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Seat Preference Dropdown */}
            <FormField
              control={form.control}
              name="seatPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Armchair className="h-4 w-4 text-[#f5a623]" />
                    Seat Preference (Optional)
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={
                          seatsLoading
                            ? "Loading available seats..."
                            : availableSeats.length === 0
                              ? "No seats available"
                              : "Select your preferred seat"
                        } />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">
                        <span className="text-slate-500">No preference</span>
                      </SelectItem>
                      {Object.entries(seatsByZone).map(([zone, zoneSeats]) => (
                        <div key={zone}>
                          <div className="px-2 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider border-t border-slate-100 dark:border-slate-800 mt-1">
                            {zoneLabels[zone] || zone}
                          </div>
                          {zoneSeats.map(seat => (
                            <SelectItem key={seat.id} value={seat.id}>
                              <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                                Seat {seat.id}
                                <span className="text-xs text-slate-400">Â· {seat.zoneName}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-slate-400 mt-1">
                    {availableSeats.length} seat{availableSeats.length !== 1 ? 's' : ''} available Â· Selecting a seat will reserve it for you
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any specific requirements or questions..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#f5a623] hover:bg-[#d4a012] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Enquiry'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
