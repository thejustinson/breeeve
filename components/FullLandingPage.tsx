'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="bg-white text-purple-deep font-sans">
      {/* Hero Section */}
      <section className="min-h-[90vh] md:min-h-screen py-32 md:py-40 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-grid-pattern opacity-10">
          <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-br from-purple-deep to-purple-light opacity-20 blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-tr from-purple-deep to-purple-light opacity-20 blur-3xl animate-pulse" />
        </div>
        <div className="container relative px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} 
              className="text-center lg:text-left space-y-6 md:space-y-8"
            >
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-block px-4 py-2 sm:px-6 sm:py-3 rounded-3xl bg-purple-deep/10 border border-purple-deep/20 hover:bg-purple-deep/20 transition-colors"
              >
                <span className="text-purple-deep font-medium text-sm sm:text-base">✨ Launch Offer: First month free</span>
              </motion.div>
              
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-purple-deep">
                  Get Paid in a{' '}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-purple-deep to-purple-light bg-clip-text text-transparent">Breeeve</span>
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-deep to-purple-light opacity-30"
                    />
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-purple-deep leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Create payment links in seconds, get paid instantly in crypto.
                  <br className="hidden md:block" />
                  No complicated setup, no hassle.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/auth/signup">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-purple-deep text-purple-light rounded-xl text-lg font-bold shadow-lg shadow-purple-deep/25 hover:shadow-purple-deep/40 transition-all duration-300"
                  >
                    Start Now
                  </motion.button>
                </Link>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto group px-6 sm:px-8 py-4 border border-purple-deep/20 text-purple-deep rounded-xl text-lg font-bold hover:bg-purple-deep/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Watch Demo</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
              
              {/* Trust indicators - Mobile optimized */}
              <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 justify-center lg:justify-start">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-purple-deep bg-gradient-to-r from-purple-deep to-purple-light" />
                    ))}
                  </div>
                  <p className="text-sm">
                    <span className="text-purple-deep font-bold">1,000+</span>
                    <br />active users
                  </p>
                </div>
                <div className="hidden sm:block h-8 w-px bg-purple-deep/10" />
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 sm:w-5 h-4 sm:h-5 text-purple-light" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm">
                    <span className="text-purple-deep font-bold">4.9/5</span>
                    <br />user rating
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Image section - Show on mobile as well */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative h-[300px] sm:h-[400px] lg:h-[600px]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-purple-deep to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-[500px] rounded-2xl overflow-hidden">
                  <Image
                    src="/mockup.jpg"
                    alt="Payment Link Interface"
                    fill
                    className="object-contain drop-shadow-2xl w-full h-full rounded-2xl"
                    priority
                  />
                  <div className="absolute -right-4 sm:-right-20 top-20 bg-purple-deep/5 backdrop-blur-xl rounded-2xl p-4 border border-purple-deep/10 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-purple-light animate-pulse" />
                      <p className="text-sm text-purple-light">Payment Received</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-deep/5 to-transparent" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-purple-deep mb-6">How It Works</h2>
            <p className="text-lg text-purple-deep leading-relaxed max-w-2xl mx-auto">
              Get started with Breeeve in three simple steps. No coding required.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                ),
                title: "Create Payment Link",
                description: "Generate your custom payment link in seconds. Set amount, currency, and description."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                ),
                title: "Share with Customers",
                description: "Share your payment link via email, social media, or embed it on your website."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Get Paid Instantly",
                description: "Receive crypto payments directly to your wallet. No delays, no middlemen."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative p-8 rounded-2xl bg-purple-deep/5 border border-purple-deep/10 backdrop-blur-sm hover:bg-purple-deep/10 transition-colors group"
              >
                <div className="absolute -top-4 left-8 w-12 h-12 bg-purple-light rounded-xl flex items-center justify-center text-purple-deep shadow-lg shadow-purple-deep/25">
                  {step.icon}
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-purple-light mb-4">{step.title}</h3>
                  <p className="text-purple-deep leading-relaxed">{step.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 bg-purple-deep/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Use Breeeve Section */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-deep/5 to-transparent" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-purple-deep mb-6">Why Use Breeeve?</h2>
            <p className="text-lg text-purple-deep leading-relaxed max-w-2xl mx-auto">
              Experience the future of payments with our cutting-edge features.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "💸",
                title: "Instant Crypto Payments",
                description: "Receive payments in seconds, not days. No more waiting for bank transfers."
              },
              {
                icon: "🌐",
                title: "Multi-Currency Support",
                description: "Accept payments in Bitcoin, Ethereum, and other major cryptocurrencies."
              },
              {
                icon: "🔒",
                title: "Bank-Grade Security",
                description: "Your transactions are protected with military-grade encryption."
              },
              {
                icon: "📊",
                title: "Detailed Analytics",
                description: "Track your payments and analyze your business performance in real-time."
              },
              {
                icon: "🔌",
                title: "Easy Integration",
                description: "Integrate with your existing systems using our powerful API."
              },
              {
                icon: "💯",
                title: "No Hidden Fees",
                description: "Transparent pricing with no surprise charges. Pay only for what you use."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-purple-deep/5 border border-purple-deep/10 backdrop-blur-sm hover:bg-purple-deep/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-purple-light mb-3">{feature.title}</h3>
                <p className="text-purple-deep leading-relaxed">{feature.description}</p>
                <div className="absolute inset-0 rounded-2xl bg-purple-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-deep/5 via-purple-deep/10 to-purple-deep/5" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-deep/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-light/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block px-6 py-2 rounded-3xl bg-purple-deep/10 border border-purple-deep/20 mb-8"
            >
              <span className="text-purple-light">🚀 No setup fees • Start for free</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-light mb-6">
              Start Accepting{' '}
              <span className="text-purple-deep">Crypto Payments</span>
              {' '}Today
            </h2>
            
            <p className="text-lg md:text-xl text-purple-deep mb-12 max-w-2xl mx-auto">
              Join thousands of businesses already using Breeeve to accept crypto payments globally.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/auth/signup">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 bg-purple-deep text-purple-light rounded-xl text-lg font-bold shadow-lg shadow-purple-deep/25 hover:shadow-purple-deep/40 transition-all duration-300"
                >
                  Sign Up & Get Started
                </motion.button>
              </Link>
              <Link href="/auth/signin">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 bg-purple-light/5 backdrop-blur-sm border border-purple-deep/20 text-purple-deep rounded-xl text-lg font-bold hover:bg-purple-light/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Sign In</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-purple-deep/10">
              {[
                { label: 'Active Users', value: '10,000+' },
                { label: 'Total Volume', value: '$10M+' },
                { label: 'Countries', value: '150+' },
                { label: 'Success Rate', value: '99.9%' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-purple-light mb-2">{stat.value}</div>
                  <div className="text-sm text-purple-deep leading-relaxed">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
