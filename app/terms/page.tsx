"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function TermsPage() {
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
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">Terms of Service</h1>
            <p className="text-muted-foreground mb-12">Last updated: March 29, 2024</p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using our Services, you agree to be bound by these Terms. 
                  If you disagree with any part of the terms, then you may not access the Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The Service and its original content, features, and functionality are and will remain the exclusive 
                  property of Zuperix and its licensors.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. 
                  You agree to accept responsibility for all activities that occur under your account or password.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Platform Analytics & Session Recording</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To monitor system stability, optimize usability, and diagnose platform issues, we employ session recording and behavioral tracking technologies, specifically Microsoft Clarity.
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                  <li><strong>Purpose:</strong> These tools are used strictly to identify usability issues, track rendering errors, and analyze user engagement patterns to improve the platform interface and user experience.</li>
                  <li><strong>Restrictions:</strong> Recording is configured to omit and mask all sensitive information, including passwords, payment details, and private vault content. The resulting data is solely for internal development, debugging, and product improvement purposes.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall Zuperix, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                  be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, 
                  loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed and construed in accordance with the laws of the country in which Zuperix 
                  is headquartered, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                  If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions or comments about these Terms, you may email us at legal@zuperix.com.
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
