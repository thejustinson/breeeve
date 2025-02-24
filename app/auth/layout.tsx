import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication - Breeeve',
  description: 'Sign in or create your Breeeve account',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative py-16 px-4 sm:px-6 lg:px-8">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-gradient-start/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gradient-start/20 via-transparent to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-accent/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-start/20 blur-3xl animate-pulse delay-1000" />
      </div>
      
      {/* Content */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl" />
        {children}
      </div>
    </div>
  )
} 