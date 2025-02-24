'use client';

import { motion } from 'framer-motion';
// import Image from 'next/image';
// import Link from 'next/link';
import { useState } from 'react';
import { joinWaitlist } from '@/app/actions/waitlist';

const faqs = [
  {
    question: "What is Breeeve?",
    answer: "Breeeve is a fast and simple way to receive crypto payments in Nigeria. Whether you're a business owner, freelancer, or content creator, Breeeve lets you accept USDC payments instantly without the hassle of traditional banking."
  },
  {
    question: "Why should I join the waitlist?",
    answer: "By joining the waitlist, you'll:\n• Get early access to Breeeve before the public launch.\n• Enjoy zero transaction fees for early users.\n• Be the first to experience a fast, secure, and hassle-free way to accept crypto payments."
  },
  {
    question: "Do I need a crypto wallet to sign up?",
    answer: "No, you don't need a crypto wallet to sign up. You can register using your email or Google account and start receiving payments right away."
  },
  {
    question: "How does Breeeve help me get paid?",
    answer: "Breeeve makes it easy to receive payments in USDC from customers, clients, and buyers:\n\n• You get a simple payment link to share with customers.\n• Payments are instant and final, with no chargebacks or bank delays.\n• You can withdraw your earnings easily when needed."
  },
  {
    question: "When will Breeeve launch?",
    answer: "We're starting with early access for Nigerians, and waitlist members will get first priority. Join now to secure your spot!"
  },
  {
    question: "Who can use Breeeve?",
    answer: "Breeeve is built for entrepreneurs, businesses, and creators, and customers can send you payments from anywhere in the world."
  },
  {
    question: "What cryptocurrency does Breeeve support?",
    answer: "For now, we are starting with USDC (a stablecoin that is always equal to $1 USD) to ensure fast and stable transactions."
  },
  {
    question: "Is Breeeve safe?",
    answer: "Yes! Breeeve follows strict security measures to keep your funds and data safe. We never store sensitive financial information."
  },
  {
    question: "How will I know when I get early access?",
    answer: "You'll get an email notification when your early access is ready. Make sure to use your best email when signing up!"
  }
];

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-background text-foreground font-lato">
      <section className="min-h-screen py-32 md:py-40 flex items-center gradient-bg relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-accent/20 blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-start/20 blur-3xl animate-pulse" />
        </div>

        <div className="container relative px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Launch Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent-text/20 mb-8"
            >
              <span className="text-accent-text">🚀 Launching Soon</span>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Accept Crypto Payments in a{' '}
                <span className="relative inline-block">
                  <span className="text-accent-text">Breeeve</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute bottom-0 left-0 w-full h-1 bg-accent-text/30"
                  />
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
                A fast and simple way to receive USDC payments for your business. No wallet needed, 
                instant payments, zero hassle.
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
                      className={`w-full px-6 py-4 bg-white/5 border ${
                        error ? 'border-red-500' : 'border-white/10'
                      } rounded-xl text-white placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent-text/50 transition-all`}
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
                    className="w-full py-4 px-6 bg-accent text-accent-text rounded-xl font-bold shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300 flex items-center justify-center gap-2"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-accent-text/30 border-t-accent-text rounded-full animate-spin" />
                    ) : (
                      'Join the Waitlist'
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm max-w-md mx-auto"
                >
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
                  <p className="text-foreground/80">
                    We'll notify you when Breeeve launches. Stay tuned for updates!
                  </p>
                </motion.div>
              )}

              {/* FAQ Section */}
              <div className="pt-16 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <span className="font-medium text-white">{faq.question}</span>
                        <svg
                          className={`w-5 h-5 transform transition-transform ${
                            openFaq === index ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {openFaq === index && (
                        <div className="px-6 pb-4 text-foreground/80 whitespace-pre-line">
                          {faq.answer.replace(/'/g, "&apos;")}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
