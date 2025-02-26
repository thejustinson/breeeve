import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Keypair } from '@solana/web3.js';
import { hashPassword, encryptWallet } from '@/lib/utils/crypto';
import { UserSignup } from '@/lib/types/auth';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(request: Request) {
  try {
    const body: UserSignup = await request.json();
    const { email, password, name } = body;

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Generate wallet
    const wallet = Keypair.generate();
    const privateKey = wallet.secretKey.toString();
    const walletAddress = wallet.publicKey.toString();

    // Create user record
    const userData = {
      email,
      name,
      wallet_address: walletAddress,
      wallet_encrypted: encryptWallet(privateKey, password),
      ...(password && { password_hash: await hashPassword(password) })
    };

    const { data: user, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();

    if (error) throw error;

    // Create session
    const { data: session, error: sessionError } = await supabase.auth.signUp({
      email,
      password: password || Math.random().toString(36),
    });

    if (sessionError) throw sessionError;

    return NextResponse.json({
      session: session,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        walletAddress: user.wallet_address
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 