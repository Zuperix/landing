"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground mb-12">Last updated: March 29, 2024</p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to Zuperix. We are committed to protecting your personal information and your right to privacy. 
                  If you have any questions or concerns about our policy or our practices with regards to your personal information, 
                  please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We collect personal information that you voluntarily provide to us when you register on the Services, 
                  express an interest in obtaining information about us or our products and Services, when you participate 
                  in activities on the Services or otherwise when you contact us.
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                  <li>Personal Information Provided by You: We collect names; email addresses; usernames; passwords; and other similar information.</li>
                  <li>Payment Data: If you make purchases, we collect data necessary to process your payment.</li>
                  <li>Automatically Collected Information: We automatically collect certain information when you visit, use, or navigate the Services.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use personal information collected via our Services for a variety of business purposes described below. 
                  We process your personal information for these purposes in reliance on our legitimate business interests, 
                  in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Sharing Your Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We only share information with your consent, to comply with laws, to provide you with services, 
                  to protect your rights, or to fulfill business obligations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We aim to protect your personal information through a system of organizational and technical security measures. 
                  However, despite our safeguards and efforts to secure your information, no electronic transmission over the 
                  Internet or information storage technology can be guaranteed to be 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions or comments about this policy, you may email us at privacy@zuperix.com.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
