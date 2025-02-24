'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add password reset logic here
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative p-8 sm:p-12"
    >
      <Link href="/" className="block text-center mb-8">
        <span className="text-2xl font-black text-white">
          Bree<span className="text-accent-text">eve</span>
        </span>
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Reset your password</h1>
        <p className="text-foreground/80">We&apos;ll send you instructions to reset your password</p>
      </div>

      {!isSubmitted ? (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="max-w-sm mx-auto space-y-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent-text/50"
            required
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-accent text-accent-text rounded-xl font-medium transition-all"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-accent-text/30 border-t-accent-text rounded-full animate-spin" />
            ) : (
              'Send Reset Instructions'
            )}
          </motion.button>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-foreground/80"
        >
          Check your email for password reset instructions. Don&apos;t forget to check your spam folder!
        </motion.div>
      )}

      <div className="mt-8 text-center">
        <p className="text-sm text-foreground">
          Remember your password?{' '}
          <Link href="/auth/signin" className="text-accent-text hover:text-white font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
} 