'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { addYears, getYear, getMonth, getDate, format, getDaysInMonth } from 'date-fns';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  commitment: z.string().min(10, { message: 'Commitment must be at least 10 characters.' }),
  goalDate: z.date({
    required_error: "A goal date is required.",
    invalid_type_error: "That's not a valid date.",
  }).refine(date => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  }, {
    message: "The date must be in the future."
  }).refine(date => {
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    return date <= oneYearFromNow;
  }, {
    message: "The date must be within one year from now."
  }),
  successMeasurement: z.string().min(10, { message: 'Success measurement must be at least 10 characters.' }),
  commitmentAmount: z.coerce.number().min(20, { message: 'Commitment must be at least 20€.' }).max(500, { message: 'Commitment cannot exceed 500€.' }),
  ageVerification: z.literal(true, {
    errorMap: () => ({ message: "You must confirm you are 18 or older." }),
  }),
});

type DateParts = {
  day: number | null;
  month: number | null;
  year: number | null;
};

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateParts, setDateParts] = useState<DateParts>({ day: null, month: null, year: null });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      commitment: '',
      successMeasurement: '',
      commitmentAmount: 20,
      ageVerification: false,
    },
  });

  useEffect(() => {
    const { day, month, year } = dateParts;
    if (day !== null && month !== null && year !== null) {
      const newDate = new Date(year, month, day);
      // Check if the constructed date is valid (e.g. not Feb 30)
      if (newDate.getFullYear() === year && newDate.getMonth() === month && newDate.getDate() === day) {
        form.setValue('goalDate', newDate, { shouldValidate: true });
      } else {
        form.setError('goalDate', { type: 'manual', message: 'The selected date is invalid.' });
      }
    }
  }, [dateParts, form]);

  const currentYear = getYear(new Date());
  const years = [currentYear, currentYear + 1];
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: format(new Date(2000, i, 1), 'MMM'),
  }));

  const daysInMonth = dateParts.year !== null && dateParts.month !== null ? getDaysInMonth(new Date(dateParts.year, dateParts.month)) : 31;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, goalDate: values.goalDate.toISOString() }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong. Please try again.');
      }

      form.reset();
      setDateParts({ day: null, month: null, year: null });
      toast({
        title: 'Message Sent!',
        description: "We've received your inquiry and will get back to you shortly.",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast({
        title: 'Error Sending Message',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold">Start Your Journey</h2>
          <p className="mt-4 text-lg text-foreground/80">
            Ready to make a change? Fill out the form below to start the conversation.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto mt-16 shadow-xl border-border bg-card">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} className="text-base py-6" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} className="text-base py-6"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="commitment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Please define your smart Goal as clear as you can.</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., I will learn to code by building one new project every month of 2026."
                          rows={5}
                          {...field}
                          className="text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="goalDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">I will have reached my goal on this date</FormLabel>
                      <div className="grid grid-cols-3 gap-3">
                        <Select
                          onValueChange={(value) => setDateParts(p => ({ ...p, day: parseInt(value, 10) }))}
                          value={dateParts.day?.toString() ?? ''}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Day" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {days.map(day => <SelectItem key={day} value={day.toString()}>{day}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <Select
                          onValueChange={(value) => setDateParts(p => ({...p, month: parseInt(value, 10)}))}
                          value={dateParts.month?.toString() ?? ''}
                        >
                          <FormControl>
                             <SelectTrigger>
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {months.map(month => <SelectItem key={month.value} value={month.value.toString()}>{month.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <Select
                          onValueChange={(value) => setDateParts(p => ({...p, year: parseInt(value, 10)}))}
                           value={dateParts.year?.toString() ?? ''}
                        >
                          <FormControl>
                             <SelectTrigger>
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {years.map(year => <SelectItem key={year} value={year.toString()}>{year}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="successMeasurement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">How exactly will you measure your success?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., I will have a portfolio of 12 completed projects."
                          rows={5}
                          {...field}
                          className="text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="commitmentAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">My Commitment</FormLabel>
                      <FormDescription>
                        Please commit between 20 and 500€ to your endeavor.
                      </FormDescription>
                      <FormControl>
                        <div className="flex items-center gap-4 pt-2">
                           <Slider
                            min={20}
                            max={500}
                            step={1}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            className="w-full"
                          />
                           <div className="relative w-28">
                            <Input
                              type="number"
                              min={20}
                              max={500}
                              value={field.value}
                              onChange={e => {
                                const value = e.target.value;
                                if (value === '') {
                                  field.onChange('');
                                } else {
                                  const numValue = Number(value);
                                  if (!isNaN(numValue)) {
                                    field.onChange(numValue);
                                  }
                                }
                              }}
                              onBlur={(e) => {
                                let value = parseFloat(e.target.value);
                                if (isNaN(value) || value < 20) {
                                  value = 20;
                                } else if (value > 500) {
                                  value = 500;
                                }
                                field.onChange(value);
                              }}
                              className="pr-6 text-base text-right appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                           </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ageVerification"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                       <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I confirm that I am 18 years of age or older.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-7"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
