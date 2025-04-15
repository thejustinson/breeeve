import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm"
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-purple-deep">
            Bree<span className="bg-gradient-to-r from-purple-deep to-purple-light bg-clip-text text-transparent">eve</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How it Works</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-4 py-2 text-purple-deep hover:text-purple-light transition-colors"
          >
            Sign In
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-purple-deep to-purple-light text-white rounded-3xl font-semibold hover:shadow-lg hover:shadow-purple-deep/25 transition-all"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="text-purple-deep hover:text-purple-light transition-colors"
    >
      {children}
    </Link>
  );
} 