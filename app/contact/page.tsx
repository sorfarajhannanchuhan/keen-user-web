"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, PhoneCall, Mail, MapPin, Check, Send, Sparkles } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    inquiryType: "bespoke",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-brand-linen min-h-screen py-16 md:py-24 border-b border-brand-sand text-brand-charcoal">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-brand-gold transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-brand-sand pb-8 mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold block mb-2">
            CONCIERGE & BESPOKE TAILORING
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-charcoal font-normal">
            Contact & Bespoke Commissions
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-2 font-light max-w-xl leading-relaxed">
            Whether you require custom dimensions for an architectural sofa, interior design trade consultations, or private fabric viewings, our concierge is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-brand-linen-dark border border-brand-sand space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-bold block">
                ATELIER CONCIERGE DESK
              </span>

              <div className="space-y-4 text-xs sm:text-sm text-stone-300">
                <div className="flex items-start gap-3">
                  <PhoneCall className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-brand-charcoal">WhatsApp Direct:</div>
                    <a
                      href="https://wa.me/8801700000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline font-medium"
                    >
                      +880 1700-000000 (Instant Chat)
                    </a>
                    <div className="text-[11px] text-stone-400">Available 10:00 AM – 9:00 PM</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-brand-charcoal">Email Inquiries:</div>
                    <a href="mailto:atelier@keenchit.com" className="text-stone-300 hover:text-brand-gold">
                      atelier@keenchit.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-brand-charcoal">Design Studio:</div>
                    <p className="text-stone-400 font-light">
                      Road 11, Banani / Gulshan-2 Design Quarter, Dhaka, Bangladesh
                    </p>
                    <div className="text-[11px] text-stone-500 mt-0.5">Private visits by prior appointment only</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-brand-sand">
                <a
                  href="https://wa.me/8801700000000?text=Hello%20KEEN%20CHIT,%20I%20would%20like%20to%20consult%20on%20bespoke%20cushions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Start WhatsApp Consultation</span>
                </a>
              </div>
            </div>

            <div className="p-6 bg-brand-linen-dark border border-brand-sand space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-1.5 font-semibold text-brand-charcoal">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>Trade Program for Interior Designers</span>
              </div>
              <p className="font-light leading-relaxed">
                We partner with architects and interior design firms across Bangladesh and internationally. Trade pricing, custom fabric sourcing, and prototype sampling are available.
              </p>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-8 bg-brand-linen-dark border border-brand-sand text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-950/60 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-brand-charcoal">
                  Inquiry Received
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 max-w-sm mx-auto font-light">
                  Thank you, <strong>{formData.name}</strong>. Our atelier manager will review your request and contact you via {formData.phone || formData.email} within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-brand-gold text-[#0E1410] text-xs uppercase tracking-widest font-bold hover:bg-brand-gold-hover"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 bg-brand-linen-dark border border-brand-sand shadow-sm space-y-5">
                <h3 className="font-serif text-2xl text-brand-charcoal font-normal">
                  Submit a Bespoke or General Inquiry
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block uppercase tracking-wider text-stone-300 mb-1 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Farhana Rahman"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-brand-linen-dark/80 border border-brand-sand px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase tracking-wider text-stone-300 mb-1 font-medium">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="01700-000000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-brand-linen-dark/80 border border-brand-sand px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-stone-300 mb-1 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="farhana@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-brand-linen-dark/80 border border-brand-sand px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-stone-300 mb-1 font-medium">
                      Nature of Consultation
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-brand-linen-dark/80 border border-brand-sand px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                    >
                      <option value="bespoke">Custom Sizing / Bespoke Cushions</option>
                      <option value="trade">Interior Designer / Trade Collaboration</option>
                      <option value="curtains">Upcoming Curtains / Quilts Early Access</option>
                      <option value="general">General Client Care</option>
                    </select>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-stone-300 mb-1 font-medium">
                      Message / Specifications *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please describe your room dimensions, desired fabric tones (linen, velvet, silk), or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-brand-linen-dark/80 border border-brand-sand px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-gold hover:bg-brand-gold-hover text-[#0E1410] py-4 text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-luxury flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#0E1410]" />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
