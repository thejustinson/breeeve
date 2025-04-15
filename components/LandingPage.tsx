'use client';

import { motion, AnimatePresence } from 'framer-motion';
// import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { joinWaitlist } from '@/app/actions/waitlist';

// FAQ Data
const faqData = [
  {
    icon: "💰",
    title: "Payments & Transactions",
    questions: [
      {
        q: "What is Breeeve?",
        a: "Breeeve is a crypto payment platform that allows freelancers, digital creators, and online merchants to accept USDC payments effortlessly. It simplifies the process by offering payment links, embedded wallets, and automated product delivery—no technical knowledge required."
      },
      {
        q: "How do I get paid with Breeeve?",
        a: [
          "Step 1: Create a payment link from your Breeeve dashboard.",
          "Step 2: Share the link with your customer or client.",
          "Step 3: Once they pay in USDC, the funds reflect instantly in your wallet."
        ]
      },
      {
        q: "Do I need a Web3 wallet to use Breeeve?",
        a: "No. Breeeve provides an embedded wallet for every user, meaning you can receive payments without setting up an external crypto wallet. However, if you already have a Web3 wallet, you can link it to Breeeve for withdrawals."
      },
      {
        q: "What cryptocurrencies does Breeeve support?",
        a: "Currently, Breeeve supports USDC on Solana. More stablecoins and blockchains will be added in the future."
      },
      {
        q: "Is there a transaction fee?",
        a: "Yes, Breeeve charges a small processing fee per transaction. The exact amount depends on the network fees at the time of payment."
      }
    ]
  },
  {
    icon: "🛍️",
    title: "Selling Digital Products",
    questions: [
      {
        q: "Can I sell digital products with Breeeve?",
        a: "Yes! You can attach a link to your digital product when setting up a payment. Once a customer completes their purchase, Breeeve will automatically send them the product link."
      },
      {
        q: "What types of products can I sell?",
        a: "You can sell e-books, courses, templates, software licenses, PDFs, and other downloadable digital products."
      },
      {
        q: "Will I have a store or product listing page?",
        a: "Not yet. The initial focus is on payment links, but we plan to introduce a storefront feature where you can list multiple products in the future."
      }
    ]
  },
  {
    icon: "🔄",
    title: "Withdrawals & Off-Ramping",
    questions: [
      {
        q: "How do I withdraw my USDC?",
        a: "You can send USDC to any external wallet at any time. If you don't have a wallet, Breeeve can guide you in setting one up."
      },
      {
        q: "Can I convert my USDC to fiat (cash)?",
        a: "Breeeve does not handle off-ramping directly. However, we are working on P2P (peer-to-peer) partnerships where you can trade USDC for cash easily."
      },
      {
        q: "Can I use local bank transfers for withdrawals?",
        a: "Not at the moment, but our P2P partners may offer bank withdrawals in the near future."
      }
    ]
  },
  {
    icon: "🛡️",
    title: "Security & Reliability",
    questions: [
      {
        q: "Is Breeeve secure?",
        a: "Yes. Breeeve is built on blockchain technology, ensuring transparent, tamper-proof transactions. Additionally, we use strong encryption and wallet protection to keep your funds safe."
      },
      {
        q: "Can Breeeve hold my funds?",
        a: "No. Breeeve does not custody your funds. Your money is always in your embedded wallet, and you have full control over it."
      },
      {
        q: "What happens if I lose access to my account?",
        a: "If you lose access, you can recover your account via email authentication. We do not store seed phrases, so your wallet remains secure."
      }
    ]
  },
  {
    icon: "🚀",
    title: "Getting Started",
    questions: [
      {
        q: "How do I sign up for Breeeve?",
        a: "You can join the waitlist or sign up when access is available. Registration is simple—just enter your email, create an account, and start accepting payments immediately."
      },
      {
        q: "Is Breeeve available globally?",
        a: "Yes! Breeeve is a global payment solution, and anyone can use it as long as they have access to USDC transactions."
      },
      {
        q: "Can businesses use Breeeve?",
        a: "Absolutely. Breeeve is ideal for freelancers, digital creators, and businesses that want to accept crypto payments without technical complexity."
      }
    ]
  }
];

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string | string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div className="border-b border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left"
      >
        <span className="font-medium text-gray-900">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-purple-light"
        >
          ↓
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-600">
              {Array.isArray(answer) ? (
                <ul className="list-disc pl-4 space-y-2">
                  {answer.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              ) : (
                answer
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await joinWaitlist(email);
      
      if (response.success) {
        setIsSubmitted(true);
      } else {
        setError(response.message);
      }
    } catch {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-white text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-white/60 backdrop-blur-lg border-b border-gray-100/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-20 py-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold"
            >
              <Link href="/">
                <span className="text-gray-900">bree</span>
                <span className="text-purple-light">eve</span>
              </Link>
            </motion.div>

            {/* <div className="flex items-center">
              <Link href="/auth">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-purple-deep hover:bg-purple-light text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Sign In
                </motion.button>
              </Link>
            </div> */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-20">
        {/* Background Pattern - Grid */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle, rgb(107 114 128 / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
            backgroundPosition: '0px 0px',
            zIndex: 5
          }}
        />

        {/* Background Pattern - Bouncing Shapes */}
        <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 10 }}>
          {/* Large Squares */}
          <motion.div
            initial={{ x: -100, y: -100, opacity: 0.3 }}
            animate={{ 
              x: [0, 100, 0, -100, 0],
              y: [0, 100, 200, 100, 0],
              opacity: [0.3, 0.4, 0.3, 0.4, 0.3]
            }}
            whileHover={{ 
              scale: 1.2,
              opacity: 0.6,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-purple-light/30 rounded-lg cursor-pointer pointer-events-auto z-20"
          />
          <motion.div
            initial={{ x: 100, y: 100, opacity: 0.3 }}
            animate={{ 
              x: [0, -100, 0, 100, 0],
              y: [0, -100, -200, -100, 0],
              opacity: [0.3, 0.4, 0.3, 0.4, 0.3]
            }}
            whileHover={{ 
              scale: 1.2,
              opacity: 0.6,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 right-1/4 w-20 sm:w-32 h-20 sm:h-32 bg-purple-deep/30 rounded-lg cursor-pointer pointer-events-auto z-20"
          />
          
          {/* Large Circles */}
          <motion.div
            initial={{ x: 0, y: 0, opacity: 0.3 }}
            animate={{ 
              x: [0, 150, 0, -150, 0],
              y: [0, 200, 0, -200, 0],
              opacity: [0.3, 0.4, 0.3, 0.4, 0.3]
            }}
            whileHover={{ 
              scale: 1.2,
              opacity: 0.6,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
            transition={{ 
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/3 right-1/3 w-24 sm:w-40 h-24 sm:h-40 bg-purple-light/20 rounded-full cursor-pointer pointer-events-auto z-20"
          />
          <motion.div
            initial={{ x: 0, y: 0, opacity: 0.3 }}
            animate={{ 
              x: [0, -200, 0, 200, 0],
              y: [0, -150, 0, 150, 0],
              opacity: [0.3, 0.4, 0.3, 0.4, 0.3]
            }}
            whileHover={{ 
              scale: 1.2,
              opacity: 0.6,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
            transition={{ 
              duration: 35,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/3 left-1/3 w-28 sm:w-48 h-28 sm:h-48 bg-purple-deep/20 rounded-full cursor-pointer pointer-events-auto z-20"
          />
          
          {/* Medium Squares */}
          <motion.div
            initial={{ x: 0, y: 0, opacity: 0.3 }}
            animate={{ 
              x: [0, 100, 0, -100, 0],
              y: [0, -100, 0, 100, 0],
              opacity: [0.3, 0.4, 0.3, 0.4, 0.3]
            }}
            whileHover={{ 
              scale: 1.2,
              opacity: 0.6,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 w-12 sm:w-16 h-12 sm:h-16 bg-purple-light/30 rounded-lg cursor-pointer pointer-events-auto z-20"
          />
          <motion.div
            initial={{ x: 0, y: 0, opacity: 0.3 }}
            animate={{ 
              x: [0, -150, 0, 150, 0],
              y: [0, 150, 0, -150, 0],
              opacity: [0.3, 0.4, 0.3, 0.4, 0.3]
            }}
            whileHover={{ 
              scale: 1.2,
              opacity: 0.6,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
            transition={{ 
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/2 right-1/2 w-14 sm:w-20 h-14 sm:h-20 bg-purple-deep/25 rounded-lg cursor-pointer pointer-events-auto z-20"
          />
          
          {/* Small Circles */}
          <motion.div
            initial={{ x: 0, y: 0, opacity: 0.3 }}
            animate={{ 
              x: [0, 80, 0, -80, 0],
              y: [0, -80, 0, 80, 0],
              opacity: [0.3, 0.4, 0.3, 0.4, 0.3]
            }}
            whileHover={{ 
              scale: 1.2,
              opacity: 0.6,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
            transition={{ 
              duration: 22,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-3/4 left-3/4 w-8 sm:w-12 h-8 sm:h-12 bg-purple-light/25 rounded-full cursor-pointer pointer-events-auto z-20"
          />
          <motion.div
            initial={{ x: 0, y: 0, opacity: 0.3 }}
            animate={{ 
              x: [0, -120, 0, 120, 0],
              y: [0, 120, 0, -120, 0],
              opacity: [0.3, 0.4, 0.3, 0.4, 0.3]
            }}
            whileHover={{ 
              scale: 1.2,
              opacity: 0.6,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
            transition={{ 
              duration: 23,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-3/4 right-3/4 w-10 sm:w-14 h-10 sm:h-14 bg-purple-deep/25 rounded-full cursor-pointer pointer-events-auto z-20"
          />
          <motion.div
            initial={{ x: 0, y: 0, opacity: 0.3 }}
            animate={{ 
              x: [0, 150, 0, -150, 0],
              y: [0, -100, 0, 100, 0],
              opacity: [0.3, 0.4, 0.3, 0.4, 0.3]
            }}
            whileHover={{ 
              scale: 1.2,
              opacity: 0.6,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
            transition={{ 
              duration: 27,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/6 left-1/6 w-12 sm:w-16 h-12 sm:h-16 bg-purple-light/20 rounded-lg cursor-pointer pointer-events-auto z-20"
          />
          <motion.div
            initial={{ x: 0, y: 0, opacity: 0.3 }}
            animate={{ 
              x: [0, -100, 0, 100, 0],
              y: [0, 150, 0, -150, 0],
              opacity: [0.3, 0.4, 0.3, 0.4, 0.3]
            }}
            whileHover={{ 
              scale: 1.2,
              opacity: 0.6,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
            transition={{ 
              duration: 29,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/6 right-1/6 w-10 sm:w-14 h-10 sm:h-14 bg-purple-deep/20 rounded-full cursor-pointer pointer-events-auto z-20"
          />
          <motion.div
            initial={{ x: 0, y: 0, opacity: 0.3 }}
            animate={{ 
              x: [0, 120, 0, -120, 0],
              y: [0, -120, 0, 120, 0],
              opacity: [0.3, 0.4, 0.3, 0.4, 0.3]
            }}
            whileHover={{ 
              scale: 1.2,
              opacity: 0.6,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-5/6 left-5/6 w-8 sm:w-12 h-8 sm:h-12 bg-purple-light/25 rounded-lg cursor-pointer pointer-events-auto z-20"
          />
          <motion.div
            initial={{ x: 0, y: 0, opacity: 0.3 }}
            animate={{ 
              x: [0, -80, 0, 80, 0],
              y: [0, 100, 0, -100, 0],
              opacity: [0.3, 0.4, 0.3, 0.4, 0.3]
            }}
            whileHover={{ 
              scale: 1.2,
              opacity: 0.6,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.9,
              transition: { duration: 0.1 }
            }}
            transition={{ 
              duration: 31,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-5/6 right-5/6 w-12 sm:w-16 h-12 sm:h-16 bg-purple-deep/25 rounded-full cursor-pointer pointer-events-auto z-20"
          />
          
          {/* Gradient overlay - reduced opacity */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/70 pointer-events-none" style={{ zIndex: 15 }} />
        </div>

        <div className="relative max-w-5xl mx-auto py-20" style={{ zIndex: 20 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 bg-purple-light/10 rounded-full"
            >
              <span className="text-purple-deep font-medium">
                💫 Early Access
              </span>
            </motion.div>
            
            <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 tracking-tight">
              Accept USDC Payments{' '}
              <br />
              <span className="text-purple">
                Without The Complexity
                </span>
              </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Accept payments, automate product delivery, and manage earnings with ease. 
              No wallet setup required.
              </p>

              {!isSubmitted ? (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onSubmit={handleSubmit}
                  className="max-w-md mx-auto space-y-4"
                >
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    className={`w-full px-6 py-4 bg-white border ${
                      error ? 'border-red-500' : 'border-gray-200'
                    } rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-light/50 transition-all`}
                      required
                    />
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2"
                      >
                        {error}
                      </motion.p>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 bg-purple-deep hover:bg-purple-light text-white rounded-xl text-lg font-semibold transition-colors duration-200 shadow-lg shadow-purple-light/20 flex items-center justify-center gap-2"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      'Join the Waitlist'
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg backdrop-blur-sm max-w-md mx-auto"
                >
                  <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">You&apos;re on the waitlist!</h3>
                <p className="text-gray-600">
                    We&apos;ll notify you when Breeeve launches. Stay tuned for updates!
                  </p>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      "Just joined the waitlist for @withbreeeve - a fast and simple way to accept crypto payments! 🚀\n\nJoin me and get early access: https://breeeve.vercel.app"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-xl hover:bg-[#1a8cd8] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Share on Twitter
                  </a>
                </motion.div>
              )}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-8 text-sm text-gray-500 flex items-center justify-center gap-8"
            >
              <span className="flex items-center gap-2">
                ✨ No Seed Phrase
              </span>
              <span className="flex items-center gap-2">
                🔒 Secure Transactions
              </span>
              <span className="flex items-center gap-2">
                ⚡️ Instant Payments
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about Breeeve and how it works
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {faqData.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors duration-200
                    ${activeTab === index 
                      ? 'bg-purple-deep text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{category.icon}</span>
                  <span>{category.title}</span>
                </motion.button>
              ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  {faqData[activeTab].questions.map((item, index) => (
                    <FAQItem key={index} question={item.q} answer={item.a} />
                  ))}
              </div>
            </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
