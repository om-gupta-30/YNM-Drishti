import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Phone, Linkedin, Facebook, Instagram, MapPin, Mail } from 'lucide-react';

/* Social media links configuration */
const SOCIAL_LINKS = [
  {
    id: 'phone',
    icon: Phone,
    href: 'tel:+1234567890',
    label: 'Call Us',
    color: '#25D366',
    hoverBg: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
  },
  {
    id: 'linkedin',
    icon: Linkedin,
    href: 'https://linkedin.com',
    label: 'LinkedIn',
    color: '#0A66C2',
    hoverBg: 'linear-gradient(135deg, #0A66C2 0%, #004182 100%)',
  },
  {
    id: 'facebook',
    icon: Facebook,
    href: 'https://facebook.com',
    label: 'Facebook',
    color: '#1877F2',
    hoverBg: 'linear-gradient(135deg, #1877F2 0%, #0D5BB5 100%)',
  },
  {
    id: 'instagram',
    icon: Instagram,
    href: 'https://instagram.com',
    label: 'Instagram',
    color: '#E4405F',
    hoverBg: 'linear-gradient(135deg, #E4405F 0%, #C13584 50%, #F77737 100%)',
  },
  {
    id: 'whatsapp',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    href: 'https://wa.me/1234567890',
    label: 'WhatsApp',
    color: '#25D366',
    hoverBg: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
  },
  {
    id: 'email',
    icon: Mail,
    href: 'mailto:contact@ynmdrishti.com',
    label: 'Email',
    color: '#EA4335',
    hoverBg: 'linear-gradient(135deg, #EA4335 0%, #FBBC05 50%, #34A853 100%)',
  },
  {
    id: 'location',
    icon: MapPin,
    href: 'https://maps.google.com',
    label: 'Location',
    color: '#EA4335',
    hoverBg: 'linear-gradient(135deg, #EA4335 0%, #C5221F 100%)',
  },
];

/* Individual social button with hover state */
const SocialButton = ({ social }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = social.icon;

  return (
    <motion.a
      href={social.href}
      target={social.id !== 'phone' && social.id !== 'email' ? '_blank' : undefined}
      rel={social.id !== 'phone' && social.id !== 'email' ? 'noopener noreferrer' : undefined}
      className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
      style={{
        background: isHovered 
          ? social.hoverBg 
          : 'linear-gradient(135deg, rgba(26, 40, 71, 0.95) 0%, rgba(44, 62, 90, 0.95) 100%)',
        border: `2px solid ${isHovered ? social.color : 'rgba(212, 175, 55, 0.4)'}`,
        boxShadow: isHovered 
          ? `0 4px 20px rgba(0, 0, 0, 0.4), 0 0 20px ${social.color}60`
          : '0 4px 15px rgba(0, 0, 0, 0.3), 0 0 10px rgba(212, 175, 55, 0.1)',
      }}
      variants={{
        open: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        },
        closed: {
          opacity: 0,
          y: 20,
          scale: 0.8,
          transition: { duration: 0.2 },
        },
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      title={social.label}
      aria-label={social.label}
    >
      <IconComponent 
        className="w-5 h-5" 
        style={{ color: '#ffffff' }} 
      />
    </motion.a>
  );
};

const SocialFloat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col-reverse items-center gap-3">
      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #FFD700 0%, #E6B800 100%)',
          border: '2px solid rgba(255, 215, 0, 0.8)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 215, 0, 0.3)',
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: '0 4px 25px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 215, 0, 0.5)',
        }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close social menu' : 'Open social menu'}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-navy-900" style={{ color: '#0A1628' }} />
          ) : (
            <Plus className="w-6 h-6 text-navy-900" style={{ color: '#0A1628' }} />
          )}
        </motion.div>
      </motion.button>

      {/* Social Links */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-col gap-3"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: {
                transition: { staggerChildren: 0.05, delayChildren: 0.05 },
              },
              closed: {
                transition: { staggerChildren: 0.03, staggerDirection: -1 },
              },
            }}
          >
            {SOCIAL_LINKS.map((social) => (
              <SocialButton key={social.id} social={social} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialFloat;
