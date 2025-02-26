import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Keypair } from '@solana/web3.js';
import { encryptWallet } from '@/lib/utils/crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    // Exchange code for session
    const { data: { user }, error: authError } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: code,
    });

    if (authError) throw authError;

    // Check if user exists in our database
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', user?.email)
      .single();

    if (!existingUser) {
      // Generate wallet for new user
      const wallet = Keypair.generate();
      const privateKey = wallet.secretKey.toString();
      const walletAddress = wallet.publicKey.toString();

      // Create user record
      const { data: newUser, error } = await supabase
        .from('users')
        .insert([{
          email: user?.email,
          name: user?.user_metadata.full_name,
          wallet_address: walletAddress,
          wallet_encrypted: encryptWallet(privateKey) // No password for OAuth users
        }])
        .select()
        .single();

      if (error) throw error;

      return NextResponse.json({
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          walletAddress: newUser.wallet_address
        }
      });
    }

    return NextResponse.json({
      user: {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        walletAddress: existingUser.wallet_address
      }
    });

  } catch (error) {
    console.error('Google auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}