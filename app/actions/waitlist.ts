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

// Initialize Supabase client with runtime config
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function joinWaitlist(email: string): Promise<WaitlistResponse> {
  try {
    // Validate email
    const validatedEmail = emailSchema.parse(email);

    // Check if email already exists
    const { data: existingEntry, error: checkError } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', validatedEmail)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingEntry) {
      return {
        success: false,
        message: 'This email is already on the waitlist!'
      };
    }

    // Insert new entry
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert([
        {
          email: validatedEmail,
          created_at: new Date().toISOString()
        }
      ]);

    if (insertError) {
      console.error('Insert Error:', insertError);
      throw insertError;
    }

    return {
      success: true,
      message: "You're on the list! We'll notify you when we launch."
    };

  } catch (error) {
    console.error('Waitlist Error:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Please enter a valid email address'
      };
    }

    return {
      success: false,
      message: 'Something went wrong. Please try again later.'
    };
  }
} 