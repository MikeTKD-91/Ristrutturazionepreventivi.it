"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Wrench, MapPin, Gift, Newspaper } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/servizi/", label: "Servizi", icon: Wrench },
  { href: "/zone-servite/", label: "Zone Servite", icon: MapPin },
  { href: "/bonus-ristrutturazione/", label: "Bonus", icon: Gift },
  { href: "/blog/", label: "Blog", icon: Newspaper },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-navy shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-orange flex items-center justify-center">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg leading-tight">
                Ristrutturazione
              </span>
              <span className="text-orange text-sm font-semibold leading-tight">
                Preventivi.it
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-white/90 hover:text-orange transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-navy border-t border-white/10"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-white/90 hover:text-orange hover:bg-white/5 rounded-lg transition-colors"
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}