import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { createClient } from "@supabase/supabase-js"

// Add this before the check
console.log('Environment check:', {
  hasClientId: !!process.env.GOOGLE_CLIENT_ID,
  hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
  clientIdLength: process.env.GOOGLE_CLIENT_ID?.length,
  secretLength: process.env.GOOGLE_CLIENT_SECRET?.length
});

// Add more detailed error message
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error('Missing environment variables:', {
    clientId: !!process.env.GOOGLE_CLIENT_ID,
    clientSecret: !!process.env.GOOGLE_CLIENT_SECRET
  });
  throw new Error('Missing Google OAuth credentials - check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET');
}

// Create Supabase client with proper error handling
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? '', // Use service role key instead of anon key
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  debug: true, // Enable debug messages
  callbacks: {
    async signIn({ user, account, profile }) {
      // Log authentication details to console
      // console.log('SignIn Callback - User Email:', user.email);
      // console.log('SignIn Callback - Account:', account);
      // console.log('SignIn Callback - Profile:', profile);

      // console.log('SignIn Callback - Supabase Client:', supabase);

      // console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
      // console.log("Supabase Anon Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      // console.log("Supabase:", supabase)

      console.log(account, profile)

      const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', user.email)
      .single();

      if (error) {
        console.error('Error fetching user:', error);
      }else{
        console.log('User found:', data);
      }

      // Always return true to complete sign in
      return true;
    },
    async session({ session }) {
      // Just return the session without modification
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.provider = account.provider;
        token.providerId = profile.sub;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
});

export { handler as GET, handler as POST };