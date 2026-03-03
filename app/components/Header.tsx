"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const menuItems: MenuItem[] = [
  { label: "Home", href: "/" },
  {
    label: "The Foundation",
    href: "/foundation",
    children: [
      { label: "Establishment", href: "/foundation#establishment" },
      { label: "Purpose", href: "/foundation#purpose" },
      { label: "Mission", href: "/foundation#mission" },
      { label: "Objectives", href: "/foundation#objectives" },
      { label: "Governance", href: "/foundation#governance" },
      { label: "Legal Structure", href: "/foundation#legal-structure" },
    ],
  },
  {
    label: "The Life and Work",
    href: "/life-and-work",
    children: [
      { label: "Early Life", href: "/life-and-work/early-life" },
      { label: "Medical Practice", href: "/life-and-work/medical-practice" },
      { label: "The Turning Point", href: "/life-and-work/the-turning-point" },
      { label: "Years of Solitude", href: "/life-and-work/years-of-solitude" },
      { label: "Return to Community", href: "/life-and-work/return-to-community" },
      { label: "Continuing Presence", href: "/life-and-work/continuing-presence" },
    ],
  },
  {
    label: "Core Principles",
    href: "/core-principles",
    children: [
      { label: "Self-Awareness", href: "/core-principles/self-awareness" },
      { label: "Inner Discipline", href: "/core-principles/inner-discipline" },
      { label: "Reflective Silence", href: "/core-principles/reflective-silence" },
      { label: "Ethical Conduct", href: "/core-principles/ethical-conduct" },
      { label: "Shared Responsibility", href: "/core-principles/shared-responsibility" },
    ],
  },
  {
    label: "The Circle",
    href: "/the-circle",
    children: [
      { label: "Overview", href: "/the-circle" },
      { label: "Members Directory", href: "/the-circle/members-directory" },
      { label: "Registration", href: "/the-circle/registration" },
      { label: "Participation Guidelines", href: "/the-circle/participation-guidelines" },
    ],
  },
  {
    label: "Global Presence",
    href: "/global-presence",
    children: [
      { label: "Overview", href: "/global-presence/#overview" },
      { label: "Regions", href: "/global-presence/#regions" },
      { label: "Global Map", href: "/global-presence/#global-map" },
      { label: "Gatherings", href: "/global-presence/#gatherings" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#1a1f3a]" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 border-2 border-[#D4AF37] flex items-center justify-center">
                <span className="text-[#D4AF37] font-serif text-xl font-bold">D</span>
              </div>
              <span className="text-white font-serif text-lg tracking-wide">Dr. Kumar</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <div key={item.label} className="relative group">
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className={`flex items-center space-x-1 py-2 text-sm tracking-wide transition-colors ${
                          isActive(item.href) || item.children.some(child => isActive(child.href))
                            ? "text-white"
                            : "text-white"
                        }`}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            openDropdown === item.label ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Dropdown */}
                      <div className={`absolute top-full left-0 pt-2 transition-opacity duration-200 ${
                        openDropdown === item.label ? "opacity-100 visible" : "opacity-0 invisible"
                      }`}>
                        <div className="bg-[#242B4A] min-w-[220px]">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className={`block px-4 py-3 text-sm text-white hover:bg-[#2d3559] transition-colors border-l-2 border-transparent hover:border-[#D4AF37] ${
                                isActive(child.href) ? "bg-[#2d3559] border-[#D4AF37]" : ""
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`relative py-2 text-sm tracking-wide text-white group ${
                        isActive(item.href) ? "active" : ""
                      }`}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <span className={`absolute bottom-0 left-0 h-[1px] bg-[#D4AF37] transition-all duration-300 ${
                        isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                      }`} />
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-white"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
        isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Slide-in Panel */}
        <div className={`absolute top-0 right-0 h-full w-[280px] bg-[#1a1f3a] transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="flex items-center justify-between p-6 border-b border-[#2d3559]">
            <span className="text-white font-serif text-lg">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white p-2"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="p-6">
            {menuItems.map((item, index) => (
              <div key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="flex items-center justify-between w-full py-4 text-left text-white border-b border-[#2d3559]"
                    >
                      <span className="text-base">{item.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openDropdown === item.label && (
                      <div className="pl-4 py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block py-3 text-sm text-white border-l-2 border-transparent hover:border-[#D4AF37] ${
                              isActive(child.href) ? "border-[#D4AF37]" : ""
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-4 text-white border-b border-[#2d3559] ${
                        isActive(item.href) ? "text-[#D4AF37]" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  </>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-20" />
    </>
  );
}
