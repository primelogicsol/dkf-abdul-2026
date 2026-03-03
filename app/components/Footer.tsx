import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
}

const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "The Foundation", href: "/foundation" },
  { label: "The Life and Work", href: "/life-and-work" },
  { label: "Core Principles", href: "/core-principles" },
  { label: "The Circle", href: "/the-circle" },
  { label: "Global Presence", href: "/global-presence" },
  { label: "Contact", href: "/contact" },
];

const institutionalInfo: NavItem[] = [
  { label: "Establishment", href: "/foundation/establishment" },
  { label: "Mission", href: "/foundation/mission" },
  { label: "Governance", href: "/foundation/governance" },
  { label: "Legal Structure", href: "/foundation/legal-structure" },
  { label: "Participation Guidelines", href: "/the-circle/participation-guidelines" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#161B33] text-white">
      {/* Top gold line */}
      <div className="h-[1px] bg-[#D4AF37]/30 w-full" />
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1 — Foundation Identity */}
          <div>
            <h3 className="text-white font-serif text-lg uppercase tracking-wider mb-4">
              Dr. Ghulam Mohammad Kumar Foundation
            </h3>
            <p className="text-[#C9CCD6] text-sm leading-relaxed mb-6">
              A structured institutional framework established to document continuity, 
              preserve disciplined orientation, and support responsible participation 
              across regions.
            </p>
            <div className="text-[#C9CCD6] text-xs space-y-1">
              <p>Established 2024</p>
              <p>Registered Jurisdiction</p>
            </div>
          </div>

          {/* Column 2 — Primary Navigation */}
          <div>
            <h4 className="text-white text-sm uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <nav className="space-y-3">
              {primaryNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-[#C9CCD6] text-sm hover:text-white transition-colors relative group"
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute bottom-0 left-0 h-[1px] bg-[#D4AF37] w-0 group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 — Institutional Information */}
          <div>
            <h4 className="text-white text-sm uppercase tracking-wider mb-4">
              Institutional Information
            </h4>
            <nav className="space-y-3">
              {institutionalInfo.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-[#C9CCD6] text-sm hover:text-white transition-colors relative group"
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute bottom-0 left-0 h-[1px] bg-[#D4AF37] w-0 group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="text-white text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-white mb-1">General Enquiries</p>
                <a 
                  href="mailto:info@drkumarfoundation.org" 
                  className="text-[#C9CCD6] hover:text-white transition-colors relative group"
                >
                  <span className="relative">
                    info@drkumarfoundation.org
                    <span className="absolute bottom-0 left-0 h-[1px] bg-[#D4AF37] w-0 group-hover:w-full transition-all duration-300" />
                  </span>
                </a>
              </div>
              <div>
                <p className="text-white mb-1">Foundation Office</p>
                <p className="text-[#C9CCD6]">City, Country</p>
              </div>
              <div>
                <p className="text-white mb-1">Administrative Matters</p>
                <a 
                  href="mailto:admin@drkumarfoundation.org" 
                  className="text-[#C9CCD6] hover:text-white transition-colors relative group"
                >
                  <span className="relative">
                    admin@drkumarfoundation.org
                    <span className="absolute bottom-0 left-0 h-[1px] bg-[#D4AF37] w-0 group-hover:w-full transition-all duration-300" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Footer Strip */}
      <div className="bg-[#0F1326]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-[#C9CCD6]">
              © {currentYear} Dr. Ghulam Mohammad Kumar Foundation
            </p>
            <div className="flex items-center space-x-6">
              <Link 
                href="/privacy-policy" 
                className="text-[#C9CCD6] hover:text-white transition-colors relative group"
              >
                <span className="relative">
                  Privacy Policy
                  <span className="absolute bottom-0 left-0 h-[1px] bg-[#D4AF37] w-0 group-hover:w-full transition-all duration-300" />
                </span>
              </Link>
              <Link 
                href="/terms-of-use" 
                className="text-[#C9CCD6] hover:text-white transition-colors relative group"
              >
                <span className="relative">
                  Terms of Use
                  <span className="absolute bottom-0 left-0 h-[1px] bg-[#D4AF37] w-0 group-hover:w-full transition-all duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
