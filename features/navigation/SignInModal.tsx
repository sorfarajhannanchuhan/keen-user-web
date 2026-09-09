"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, User, Mail, ShieldCheck, ArrowRight, Lock, CheckCircle2 } from "lucide-react";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-brand-linen-dark border border-brand-sand shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 z-10">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-brand-linen border-b border-brand-sand flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-gold/15 flex items-center justify-center border border-brand-gold/30">
              <User className="w-4 h-4 text-brand-gold" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium text-brand-charcoal">
                Atelier Client Access
              </h3>
              <p className="text-[10px] text-brand-charcoal-muted uppercase tracking-wider">
                Sign in to manage orders & saved textiles
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-brand-charcoal-muted hover:text-brand-charcoal rounded-full border border-brand-sand hover:border-brand-gold transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">
          {isSuccess ? (
            <div className="py-10 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
              <h4 className="font-serif text-xl text-brand-charcoal font-normal">
                Welcome back to KEEN CHIT
              </h4>
              <p className="text-xs text-brand-charcoal-muted">
                Your luxury atelier preferences have been restored.
              </p>
            </div>
          ) : (
            <>
              {/* Login Method Toggle */}
              <div className="grid grid-cols-2 p-1 bg-brand-linen border border-brand-sand rounded-none text-xs uppercase tracking-wider font-semibold">
                <button
                  type="button"
                  onClick={() => setMethod("phone")}
                  className={`py-2 text-center transition-all cursor-pointer ${
                    method === "phone"
                      ? "bg-brand-gold text-[#0E1410] shadow-sm font-bold"
                      : "text-brand-charcoal-muted hover:text-brand-charcoal"
                  }`}
                >
                  Mobile Number
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("email")}
                  className={`py-2 text-center transition-all cursor-pointer ${
                    method === "email"
                      ? "bg-brand-gold text-[#0E1410] shadow-sm font-bold"
                      : "text-brand-charcoal-muted hover:text-brand-charcoal"
                  }`}
                >
                  Email Address
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {method === "phone" ? (
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase tracking-wider text-brand-charcoal-muted font-medium">
                      Phone Number (Bangladesh)
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-xs text-brand-charcoal-muted font-mono font-medium">
                        +880
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="17XXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-14 pr-3 py-2.5 bg-brand-linen text-brand-charcoal text-xs border border-brand-sand focus:border-brand-gold focus:outline-none tracking-wider font-mono"
                      />
                    </div>
                    <span className="text-[10px] text-brand-charcoal-muted/80 block">
                      We will send a 4-digit verification code via SMS.
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] uppercase tracking-wider text-brand-charcoal-muted font-medium">
                        Email Address
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-3 w-4 h-4 text-brand-charcoal-muted" />
                        <input
                          type="email"
                          required
                          placeholder="client@luxuryhome.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 bg-brand-linen text-brand-charcoal text-xs border border-brand-sand focus:border-brand-gold focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] uppercase tracking-wider text-brand-charcoal-muted font-medium">
                        Password
                      </label>
                      <div className="relative flex items-center">
                        <Lock className="absolute left-3 w-4 h-4 text-brand-charcoal-muted" />
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 bg-brand-linen text-brand-charcoal text-xs border border-brand-sand focus:border-brand-gold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-gold hover:bg-brand-gold-hover text-[#0E1410] py-3 text-xs uppercase tracking-widest font-bold shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span className="animate-spin text-sm">⏳</span>
                  ) : (
                    <>
                      <span>Continue Securely</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Social / Direct options */}
              <div className="pt-2 border-t border-brand-sand/60 space-y-2.5 text-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-2.5 bg-brand-linen hover:bg-brand-sand/40 border border-brand-sand text-xs text-brand-charcoal font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="flex items-center justify-between text-[11px] pt-2 text-brand-charcoal-muted">
                  <Link
                    href="/admin"
                    onClick={onClose}
                    className="flex items-center gap-1 hover:text-brand-gold transition-colors font-medium"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Atelier Admin Portal</span>
                  </Link>

                  <a
                    href="https://wa.me/8801700000000?text=Hello%20KEEN%20CHIT,%20I%20need%20help%20with%20my%20account."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-gold transition-colors"
                  >
                    Need Help?
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
