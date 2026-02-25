import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

// Social media icons as SVG components
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const GoogleMapsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 0C7.802 0 4.403 3.399 4.403 7.597c0 5.668 7.597 16.403 7.597 16.403s7.597-10.735 7.597-16.403C19.597 3.399 16.198 0 12 0zm0 11.199a3.602 3.602 0 110-7.204 3.602 3.602 0 010 7.204z"/>
  </svg>
);

const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Leadership', href: '/leadership' },
  { name: 'Clients', href: '/clients' },
  { name: 'Contact', href: '/contact' },
];

const solutions = [
  { name: 'Solutions', href: '/solutions' },
  { name: 'Technology', href: '/technology' },
  { name: 'Global Partnerships', href: '/partnerships' },
  { name: 'Investor Relations', href: '/investors' },
];

const socialLinks = [
  { icon: LinkedInIcon, label: 'LinkedIn', hoverColor: '#0A66C2', href: '#' },
  { icon: WhatsAppIcon, label: 'WhatsApp', hoverColor: '#25D366', href: '#' },
  { icon: InstagramIcon, label: 'Instagram', hoverColor: '#E4405F', href: '#' },
  { icon: FacebookIcon, label: 'Facebook', hoverColor: '#1877F2', href: '#' },
  { icon: GoogleMapsIcon, label: 'Google Maps', hoverColor: '#EA4335', href: '#' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative" style={{ backgroundColor: '#0A1628' }}>
      {/* Top Gold Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Company Info */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4 sm:mb-6 min-h-[44px] flex items-center">
              <motion.img
                src="/logo.png"
                alt="YNM Drishti"
                className="w-[100px] sm:w-[120px] h-auto"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.2))',
                }}
                whileHover={{ scale: 1.02 }}
              />
            </Link>
            
            <h3 className="text-gold-400 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
              AI-Powered Road Intelligence
            </h3>
            
            <p className="text-[#8BA3C7] text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-xs">
              Revolutionizing infrastructure monitoring with cutting-edge AI technology 
              for safer, smarter roads.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ease-out text-gray-400 hover:scale-110 active:scale-95"
                  style={{
                    backgroundColor: 'rgba(26, 40, 71, 0.8)',
                    border: '1px solid rgba(139, 163, 199, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = social.hoverColor;
                    e.currentTarget.style.borderColor = social.hoverColor;
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.boxShadow = `0 0 20px ${social.hoverColor}50`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(26, 40, 71, 0.8)';
                    e.currentTarget.style.borderColor = 'rgba(139, 163, 199, 0.2)';
                    e.currentTarget.style.color = '#9ca3af';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4 sm:mb-6 text-gold-400 text-base sm:text-lg lg:text-xl">
              Quick Links
            </h4>
            <ul className="space-y-2.5 sm:space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href}>
                    <motion.div
                      className="text-[#8BA3C7] hover:text-gold-300 transition-colors duration-300 flex items-center gap-2 group text-sm sm:text-base py-1 min-h-[44px] sm:min-h-0 active:text-gold-400"
                      whileHover={{ x: 4 }}
                    >
                      <span 
                        className="w-1.5 h-1.5 rounded-full bg-gold-500/50 group-hover:bg-gold-400 transition-colors duration-300 flex-shrink-0"
                      />
                      {link.name}
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-4 sm:mb-6 text-gold-400 text-base sm:text-lg lg:text-xl">
              Explore
            </h4>
            <ul className="space-y-2.5 sm:space-y-4">
              {solutions.map((item) => (
                <li key={item.name}>
                  <Link to={item.href}>
                    <motion.div
                      className="text-[#8BA3C7] hover:text-gold-300 transition-colors duration-300 flex items-center gap-2 group text-sm sm:text-base py-1 min-h-[44px] sm:min-h-0 active:text-gold-400"
                      whileHover={{ x: 4 }}
                    >
                      <span 
                        className="w-1.5 h-1.5 rounded-full bg-gold-500/50 group-hover:bg-gold-400 transition-colors duration-300 flex-shrink-0"
                      />
                      {item.name}
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold mb-4 sm:mb-6 text-gold-400 text-base sm:text-lg lg:text-xl">
              Contact Us
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {/* Email */}
              <li>
                <a
                  href="mailto:info@ynmdrishti.com"
                  className="flex items-start gap-2 sm:gap-3 text-[#8BA3C7] hover:text-gold-300 transition-colors duration-300 group py-1 active:text-gold-400 text-left"
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300"
                    style={{
                      background: 'rgba(212, 175, 55, 0.1)',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                    }}
                  >
                    <Mail className="w-4 h-4 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-navy-500 mb-0.5">Email</p>
                    <p className="text-sm sm:text-base">info@ynmdrishti.com</p>
                  </div>
                </a>
              </li>

              {/* Phone */}
              <li>
                <a
                  href="tel:+919999999999"
                  className="flex items-start gap-2 sm:gap-3 text-[#8BA3C7] hover:text-gold-300 transition-colors duration-300 group py-1 active:text-gold-400 text-left"
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300"
                    style={{
                      background: 'rgba(212, 175, 55, 0.1)',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                    }}
                  >
                    <Phone className="w-4 h-4 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-navy-500 mb-0.5">Phone</p>
                    <p className="text-sm sm:text-base">+91 99999 99999</p>
                  </div>
                </a>
              </li>

              {/* Address */}
              <li>
                <div className="flex items-start gap-2 sm:gap-3 text-[#8BA3C7] py-1">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: 'rgba(212, 175, 55, 0.1)',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                    }}
                  >
                    <MapPin className="w-4 h-4 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-navy-500 mb-0.5">Address</p>
                    <p className="text-sm sm:text-base">Hyderabad, India</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800">
        {/* Gold accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            {/* Copyright */}
            <p className="text-[#8BA3C7] text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} YNM Drishti. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-3 sm:gap-2 text-xs sm:text-sm">
              <Link
                to="/privacy"
                className="text-[#8BA3C7] hover:text-gold-300 transition-colors duration-300 py-1 min-h-[44px] sm:min-h-0 flex items-center active:text-gold-400"
              >
                Privacy Policy
              </Link>
              <span className="text-navy-600">|</span>
              <Link
                to="/terms"
                className="text-[#8BA3C7] hover:text-gold-300 transition-colors duration-300 py-1 min-h-[44px] sm:min-h-0 flex items-center active:text-gold-400"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.5) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Bottom gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(212, 175, 55, 0.03) 0%, transparent 100%)',
        }}
      />
    </footer>
  );
};

export default Footer;
