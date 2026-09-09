"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X, Send, Phone } from "lucide-react";
import { useMoreDrawer } from "@/features/navigation";

interface Message {
  id: string;
  sender: "concierge" | "user";
  text: string;
  timestamp: string;
}

interface AuraChatWidgetProps {
  position?: "bottom-right" | "bottom-left";
}

/**
 * Signature ChatBox Mark (Proportionally synchronized with Main Chat Box Geometry)
 * - 42% arch radii on top-left, top-right, bottom-right
 * - 10% speech-bubble tail on bottom-left
 * - Proportional inner white speech bubble with 2 golden bars (=)
 */
function ChatBoxMark({
  size = 36,
  showActiveDot = true,
  className = "",
}: {
  size?: number;
  showActiveDot?: boolean;
  className?: string;
}) {
  const rOuter = Math.round(size * 0.42);
  const rTail = Math.max(2.5, Math.round(size * 0.10));
  const wSize = Math.round(size * 0.46);
  const wRadius = Math.round(wSize * 0.42);
  const wTail = Math.max(1.8, Math.round(wSize * 0.10));
  const lWidth = Math.round(wSize * 0.54);
  const lHeight = Math.max(1.4, Math.round((wSize * 0.08) * 10) / 10);
  const lGap = Math.max(1.4, Math.round((wSize * 0.10) * 10) / 10);

  // Scaled active dot (proportional to mark size)
  const dotSize = Math.max(6, Math.round(wSize * 0.46));
  const borderWidth = Math.max(1.5, Math.round((dotSize * 0.22) * 10) / 10);

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 shadow-sm ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${rOuter}px ${rOuter}px ${rOuter}px ${rTail}px`,
        background: "linear-gradient(135deg, #FAD64B 0%, #ECC73F 45%, #D4AF37 100%)",
        boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.5), 0 2px 6px rgba(0, 0, 0, 0.12)",
      }}
    >
      {/* Inner White Speech Bubble with matching geometry */}
      <div
        className="relative bg-white shadow-xs flex flex-col items-center justify-center"
        style={{
          width: `${wSize}px`,
          height: `${wSize}px`,
          borderRadius: `${wRadius}px ${wRadius}px ${wRadius}px ${wTail}px`,
          gap: `${lGap}px`,
        }}
      >
        {/* Active Online Indicator Dot (ss 1 type: vibrant green with crisp white ring) */}
        {showActiveDot && (
          <span
            className="absolute z-10 flex items-center justify-center"
            style={{
              top: `-${Math.round(dotSize * 0.35)}px`,
              right: `-${Math.round(dotSize * 0.35)}px`,
              width: `${dotSize}px`,
              height: `${dotSize}px`,
            }}
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span
              className="relative inline-flex rounded-full bg-[#22C55E] shadow-xs"
              style={{
                width: `${dotSize}px`,
                height: `${dotSize}px`,
                border: `${borderWidth}px solid #FFFFFF`,
              }}
            />
          </span>
        )}

        <span
          className="bg-[#D4AF37] rounded-full block"
          style={{ width: `${lWidth}px`, height: `${lHeight}px` }}
        />
        <span
          className="bg-[#D4AF37] rounded-full block"
          style={{ width: `${lWidth}px`, height: `${lHeight}px` }}
        />
      </div>
    </div>
  );
}

export default function AuraChatWidget({
  position = "bottom-right",
}: AuraChatWidgetProps) {
  const pathname = usePathname();
  const { isMoreDrawerOpen } = useMoreDrawer();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname?.startsWith("/admin")) {
    return null;
  }
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      sender: "concierge",
      text: "Welcome to KEEN CHIT Atelier. How may our artisans assist your home sanctuary today?",
      timestamp: "Just now",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
      timestamp: "Now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      let reply =
        "Thank you for contacting KEEN CHIT Atelier. For instant fabric consultation, bespoke dimensions, or custom order queries, our concierge is directly available on WhatsApp.";

      const lower = text.toLowerCase();
      if (lower.includes("dimension") || lower.includes("size") || lower.includes("custom")) {
        reply =
          "We offer custom sizing for all Belgian linen, Italian velvet, and Nakshi cushions. You can specify any dimension (Square, Lumbar, or Bench) directly with our concierge.";
      } else if (lower.includes("delivery") || lower.includes("shipping") || lower.includes("dhaka")) {
        reply =
          "Inside Dhaka deliveries take 24–48 hours (৳80, or Free on orders over ৳3,000) in 100% reusable linen dust bags. Outside Dhaka takes 3–4 business days.";
      } else if (lower.includes("fabric") || lower.includes("care") || lower.includes("clean")) {
        reply =
          "Our pure organic Belgian linen is pre-washed and softens with every wash. For raw silk and Italian velvet cushions, professional dry cleaning is recommended.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "concierge",
          text: reply,
          timestamp: "Just now",
        },
      ]);
      setIsTyping(false);
    }, 850);
  };

  const positionClasses =
    position === "bottom-left" ? "bottom-20 md:bottom-8 left-5 sm:left-6" : "bottom-20 md:bottom-8 right-5 sm:right-6";

  return (
    <aside
      aria-label="Atelier Concierge Chat"
      className={`fixed ${positionClasses} z-50 select-none flex flex-col transition-all duration-300 ${
        isMoreDrawerOpen ? "opacity-0 pointer-events-none translate-x-6 scale-95" : "opacity-100 translate-x-0 scale-100"
      } ${
        position === "bottom-left" ? "items-start" : "items-end"
      }`}
    >
      {/* ====================================================================
          EXPANDED CHAT WINDOW (Image 2 Theme with refined generous spacing)
          ==================================================================== */}
      {isOpen && (
        <div
          className={`mb-4 w-[92vw] sm:w-[390px] h-[530px] max-h-[78vh] bg-brand-linen-dark/95 backdrop-blur-2xl border border-brand-sand rounded-[28px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300 ${
            position === "bottom-left" ? "self-start origin-bottom-left" : "self-end origin-bottom-right"
          }`}
          style={{
            boxShadow:
              "0 25px 60px -15px rgba(0, 0, 0, 0.4), 0 0 35px -10px rgba(212, 175, 55, 0.25)",
          }}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-brand-linen border-b border-brand-sand flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Signature Chatbox Shape Concierge Avatar */}
              <ChatBoxMark size={36} className="transition-transform hover:scale-105" />

              <div>
                <h3 className="font-jost text-base tracking-wider uppercase text-brand-charcoal font-semibold">
                  KEEN CHIT Atelier
                </h3>
                <span className="text-[10px] text-emerald-500 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  Concierge Online • Active
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-brand-charcoal-muted hover:text-brand-charcoal rounded-full hover:bg-brand-sand/50 transition-colors cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* WhatsApp Direct Callout Banner */}
          <div className="bg-brand-linen/80 border-b border-brand-sand/60 px-4 py-2 flex items-center justify-between text-xs text-brand-charcoal">
            <span className="text-[11px] text-brand-charcoal flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              VIP WhatsApp Atelier
            </span>
            <a
              href="https://wa.me/8801700000000?text=Hello%20KEEN%20CHIT%20Atelier,%20I%20would%20like%20assistance."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase font-bold text-emerald-600 dark:text-emerald-400 hover:underline tracking-wider"
            >
              Open WhatsApp →
            </a>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <div
                  key={m.id}
                  className={`flex items-end gap-2 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Bot Avatar (Signature Chatbox Shape) */}
                  {!isUser && (
                    <ChatBoxMark size={24} className="mb-0.5" />
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[80%] px-4 py-3 leading-relaxed shadow-sm ${
                      isUser
                        ? "bg-brand-gold text-[#0E1410] font-medium rounded-2xl rounded-br-[4px]"
                        : "bg-brand-linen text-brand-charcoal border border-brand-sand rounded-2xl rounded-bl-[4px]"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-end gap-2 justify-start">
                <ChatBoxMark size={24} className="mb-0.5" />
                <div
                  className="bg-brand-linen border border-brand-sand px-3.5 py-2.5 rounded-2xl rounded-bl-[4px] flex flex-col justify-center gap-1.5 shadow-sm min-w-[50px] min-h-[32px]"
                  title="Concierge is thinking..."
                >
                  {/* Dynamic Thinking Line 1 */}
                  <span
                    className="h-[2px] rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF5C0] to-[#D4AF37] animate-thinking-line-1 block"
                    style={{
                      boxShadow: "0 0 5px rgba(212, 175, 55, 0.45)",
                    }}
                  />
                  {/* Dynamic Thinking Line 2 */}
                  <span
                    className="h-[2px] rounded-full bg-gradient-to-r from-[#C29325] via-[#FFE885] to-[#D4AF37] animate-thinking-line-2 block"
                    style={{
                      boxShadow: "0 0 5px rgba(212, 175, 55, 0.45)",
                    }}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Consultation Chips */}
          <div className="px-4 py-2 bg-brand-linen/50 border-t border-brand-sand flex gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleSendMessage("What are your custom dimension options?")}
              className="px-2.5 py-1 bg-brand-linen-dark hover:bg-brand-sand text-brand-charcoal-muted hover:text-brand-charcoal text-[10px] rounded-full whitespace-nowrap border border-brand-sand transition-colors cursor-pointer"
            >
              📏 Custom Sizing
            </button>
            <button
              onClick={() => handleSendMessage("How fast is delivery across Bangladesh?")}
              className="px-2.5 py-1 bg-brand-linen-dark hover:bg-brand-sand text-brand-charcoal-muted hover:text-brand-charcoal text-[10px] rounded-full whitespace-nowrap border border-brand-sand transition-colors cursor-pointer"
            >
              🚚 Delivery Times
            </button>
            <button
              onClick={() => handleSendMessage("How should I wash Belgian linen cushions?")}
              className="px-2.5 py-1 bg-brand-linen-dark hover:bg-brand-sand text-brand-charcoal-muted hover:text-brand-charcoal text-[10px] rounded-full whitespace-nowrap border border-brand-sand transition-colors cursor-pointer"
            >
              🧼 Fabric Care
            </button>
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-brand-linen border-t border-brand-sand flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about custom fabric or size..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 bg-brand-linen-dark text-brand-charcoal text-xs px-4 py-2.5 rounded-full border border-brand-sand focus:outline-none focus:border-brand-gold placeholder:text-brand-charcoal-muted/60"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="w-9 h-9 rounded-full bg-brand-gold text-[#0E1410] flex items-center justify-center hover:bg-brand-gold-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer shadow-md"
              aria-label="Send Message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* ====================================================================
          FLOATING TRIGGER BUTTON: 
          IMAGE 1 TEARDROP SPEECH BUBBLE SHAPE + ROTATING GOLDEN AURA GLOW BEAM!
          ==================================================================== */}
      <div className="flex items-center">

        {/* ====================================================================
            CRISP OUTLINE FLUID GRAVITATIONAL WATER-PRESSURE ANIMATION:
            - Animation strictly on the 2.5px outline (no outer blur/overflow)
            - Pure brand luxury gold gradient (White shimmer -> Champagne -> Royal Gold -> Warm Amber)
            - Fluid gravity + water-pressure physics:
                * Flows gracefully across the top crest
                * Cascades rapidly down the right side under gravity
                * Pools fluidly into bottom-left without pausing or freezing
                * Rises steadily up the left side under water pressure
            - Authentic Image 1 teardrop speech bubble with double lines (=)
            ==================================================================== */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-label="Open Atelier Concierge Chat"
          className="relative p-[2.5px] overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer block shadow-luxury"
          style={{
            width: "66px",
            height: "66px",
            borderRadius: "28px 28px 28px 7px",
            background: "rgba(20, 26, 22, 0.4)",
          }}
        >
          {/* Rotating Brand Gold Gradient Light Beam strictly within the 2.5px outline (White Head Leading Clockwise) */}
          <div
            className="absolute inset-[-150%] animate-aura-gravity-fluid pointer-events-none"
            style={{
              background:
                "conic-gradient(from 0deg at 50% 50%, transparent 0deg, #C29325 14deg, #D4AF37 28deg, #F5D042 42deg, #FBF3D5 52deg, #FFFFFF 60deg, transparent 63deg, transparent 360deg)",
            }}
          />

          {/* Inner Golden Face matching media_1788637189818.png */}
          <div
            className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #FAD64B 0%, #ECC73F 45%, #D4AF37 100%)",
              borderRadius: "25.5px 25.5px 25.5px 5px",
              boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.5), 0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            {/* Subtle Polished Glass Rim */}
            <div
              className="absolute inset-[1.5px] pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity"
              style={{
                borderRadius: "24px 24px 24px 4px",
                border: "1px solid rgba(255, 255, 255, 0.65)",
              }}
            />

            {isOpen ? (
              <X className="w-6 h-6 text-[#0E1410] transition-transform duration-300 group-hover:rotate-90 stroke-[2.2]" />
            ) : (
              /* Scaled & Adjusted White Speech Bubble: Perfectly Proportioned with 2 Golden Bars */
              <div
                className="relative w-[30px] h-[30px] bg-white shadow-sm flex flex-col items-center justify-center gap-[2.5px] transition-transform duration-300 group-hover:scale-105"
                style={{ borderRadius: "13px 13px 13px 3.5px" }}
              >
                {/* Active Online Indicator Dot (ss 1 type: vibrant green with crisp white ring) */}
                <span className="absolute -top-1 -right-1 flex h-3 w-3 z-10">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#22C55E] border-2 border-white shadow-xs" />
                </span>

                {/* 2 Golden Lines matching user image */}
                <span className="w-[15px] h-[2px] bg-[#D4AF37] rounded-full" />
                <span className="w-[15px] h-[2px] bg-[#D4AF37] rounded-full" />
              </div>
            )}
          </div>
        </button>
      </div>
    </aside>
  );
}
