'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-background border-t border-white/10 py-12 md:py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="inline-block mb-4">
            <span className="text-2xl font-black text-white">
              Bree<span className="text-accent-text">eve</span>
            </span>
          </Link>
          <p className="text-foreground/80 max-w-md mb-6">
            Join our waitlist today and be among the first to experience fast, secure, and hassle-free USDC payments. Early users get zero transaction fees!
          </p>
          <a
            href="https://twitter.com/withbreeeve"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/80 hover:text-white transition-colors mb-8"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <div className="text-sm text-foreground/60">
            © {new Date().getFullYear()} Breeeve. All rights reserved.
          </div>
        </div>
      </div>
    </motion.footer>
  );
} 