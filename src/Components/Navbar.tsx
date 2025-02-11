"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/whitepaper", label: "whitepaper" },
  { href: "/docs", label: "docs" },
  { href: "/roadmap", label: "roadmap" },
  { href: "https://github.com/soralabs", label: "github", external: true },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById("mobile-menu");
      const button = document.getElementById("mobile-menu-button");
      if (
        isMenuOpen &&
        nav &&
        !nav.contains(event.target as Node) &&
        !button?.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 w-full bg-sora-neutral/95 backdrop-blur-md z-50 border-b border-sora-secondary/20">
      <nav className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-lg text-gray-700 transition-colors flex items-center"
        >
          <Image
            src="/logo.png"
            alt="Sora Labs Logo"
            width={32}
            height={32}
            priority
          />
          sora labs
        </Link>

        <div className="hidden md:flex gap-8 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              className="text-gray-700 hover:text-sora-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          id="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg border-sora-secondary/20"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="absolute top-14 left-0 w-full bg-sora-neutral/95 border-b border-sora-secondary/20 md:hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  className="text-gray-700 hover:text-sora-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
