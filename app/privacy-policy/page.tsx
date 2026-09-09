import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | KEEN CHIT Atelier",
  description: "Privacy and data protection policy for KEEN CHIT clients and patrons.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-brand-linen min-h-screen py-16 md:py-24 border-b border-brand-sand text-brand-charcoal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-brand-gold transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="border-b border-brand-sand pb-8 mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold block mb-2">
            LEGAL & CLIENT PRIVACY
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-charcoal font-normal">
            Privacy Policy
          </h1>
          <p className="text-xs text-stone-400 mt-2 font-light">
            Effective Date: March 2026 • Last Updated: Today
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
          
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
              1. Our Commitment to Client Confidentiality
            </h2>
            <p>
              At <strong>KEEN CHIT Atelier</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Atelier&rdquo;), we respect the privacy of our discerning clientele. We treat your personal and transactional information with the highest degree of discretion, confidentiality, and security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
              2. Information We Collect
            </h2>
            <p>When you acquire pieces from our collections or consult with our bespoke concierge, we collect necessary details to fulfill your requests:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-400">
              <li><strong>Contact Information:</strong> Name, delivery address, phone number, and email address.</li>
              <li><strong>Order History:</strong> Specific textile items, fabric specifications, dimensions, and custom tailoring notes.</li>
              <li><strong>Concierge Communications:</strong> Inquiries submitted via our website forms or official WhatsApp concierge desk.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
              3. Purpose of Processing
            </h2>
            <p>Your details are used solely to:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-400">
              <li>Process, tailor, and dispatch your luxury cushion and textile orders.</li>
              <li>Coordinate white-glove courier delivery to your residence across Bangladesh.</li>
              <li>Provide personalized post-purchase care and laundering support.</li>
              <li>Deliver private invitations to limited-edition fabric drops (only if enrolled in the Private Register).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
              4. Third-Party Disclosures & Courier Logistics
            </h2>
            <p>
              We <strong>never</strong> sell, rent, or trade your personal data to external advertisers. The only third parties who receive your contact details are our bonded white-glove courier and delivery partners within Bangladesh (such as courier staff delivering to your physical address) strictly for delivery fulfillment purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
              5. Data Security
            </h2>
            <p>
              All customer transmissions are protected using modern TLS/SSL encryption. We do not store raw card credentials on our servers; payments are processed securely through accredited banking and mobile payment gateways.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-medium">
              6. Your Rights & Concierge Inquiries
            </h2>
            <p>
              You may request an update, deletion, or copy of your personal data at any time by contacting our atelier concierge at:
            </p>
            <div className="p-4 bg-brand-linen-dark border border-brand-sand space-y-1 text-xs text-stone-300">
              <div><strong className="text-brand-gold">Email:</strong> privacy@keenchit.com</div>
              <div><strong className="text-brand-gold">Concierge WhatsApp:</strong> +880 1700-000000</div>
              <div><strong className="text-brand-gold">Design Studio:</strong> Gulshan & Banani, Dhaka, Bangladesh</div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
