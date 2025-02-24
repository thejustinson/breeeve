'use server';

import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Type for the response
type WaitlistResponse = {
  success: boolean;
  message: string;
};

// Email validation schema
const emailSchema = z.string().email('Please enter a valid email address');

// Database types
type WaitlistEntry = {
  id: number;
  email: string;
  created_at: string;
};

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function joinWaitlist(email: string): Promise<WaitlistResponse> {
  try {
    // Validate email
    const validatedEmail = emailSchema.parse(email);

    // Check if email already exists
    const { data: existingEntry } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', validatedEmail)
      .single();

    if (existingEntry) {
      return {
        success: false,
        message: 'This email is already on the waitlist!'
      };
    }

    // Insert new entry
    const { error } = await supabase
      .from('waitlist')
      .insert([
        {
          email: validatedEmail,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) throw error;

    return {
      success: true,
      message: "You're on the list! We'll notify you when we launch."
    };

  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Please enter a valid email address'
      };
    }

    console.error('Waitlist Error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again later.'
    };
  }
} 