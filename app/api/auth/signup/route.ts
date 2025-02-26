import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Keypair } from '@solana/web3.js'
import { encryptWallet } from '@/lib/utils/crypto'

export async function POST(request: Request) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('Missing Supabase environment variables')
    }

    const supabase = createRouteHandlerClient({ cookies })
    const { email, password, name } = await request.json()

    // Sign up the user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      return NextResponse.json(
        { error: signUpError.message },
        { status: 400 }
      )
    }

    // Generate wallet for new user
    const wallet = Keypair.generate()
    const privateKey = wallet.secretKey.toString()
    const walletAddress = wallet.publicKey.toString()

    // Create user record
    const { data: newUser, error: dbError } = await supabase
      .from('users')
      .insert([{
        id: authData.user?.id,
        email,
        name,
        wallet_address: walletAddress,
        wallet_encrypted: encryptWallet(privateKey)
      }])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to create user record' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        walletAddress: newUser.wallet_address
      }
    })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 