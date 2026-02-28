'use client'

import { useState } from 'react'
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
import { Loader2, CheckCircle2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import type { MembershipType } from '@/types/inquiry'

import { motion } from 'framer-motion'

const membershipTypes: MembershipType[] = [
  'Hot Desk',
  'Dedicated Desk',
  'Private Office',
  'Virtual Office',
  'Day Pass / Hourly Access',
  'Weekly Plan',
  'Monthly Plan',
]

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z
    .string()
    .min(10, 'Mobile number must be 10 digits')
    .max(10, 'Mobile number must be 10 digits')
    .regex(/^\d{10}$/, 'Mobile number must contain only digits'),
  membershipType: z.string().min(1, 'Please select a membership type'),
  startDate: z.string().min(1, 'Please select a start date'),
  notes: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

interface InquiryFormProps {
  onSuccess?: () => void
}

export function InquiryForm({ onSuccess }: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      mobile: '',
      membershipType: undefined,
      startDate: '',
      notes: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit inquiry')
      }

      setIsSuccess(true)
      toast({
        title: 'Success!',
        description: 'Thank you! Our team will contact you shortly.',
        variant: 'default',
      })

      form.reset()
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
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
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
