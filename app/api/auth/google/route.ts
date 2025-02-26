import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Keypair } from '@solana/web3.js'
import { encryptWallet } from '@/lib/utils/crypto'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/google`
)

export async function GET() {
  try {
    const url = client.generateAuthUrl({
      access_type: 'offline',
      scope: ['email', 'profile'],
      prompt: 'consent'
    })

    return NextResponse.json({ url })
  } catch (error) {
    console.error('Google auth error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
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