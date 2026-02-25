import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2, Target, Lightbulb, Users } from 'lucide-react';

const highlights = [
  'State-of-the-art deep learning models',
  'Real-time processing capabilities',
  'Comprehensive infrastructure coverage',
  'Seamless system integration',
  'Continuous model improvements',
  'Enterprise-grade security',
];

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To revolutionize road safety through intelligent infrastructure detection, making transportation safer for everyone.',
  },
  {
    icon: Lightbulb,
    title: 'Our Vision',
    description: 'A world where every road is monitored, maintained, and optimized using cutting-edge AI technology.',
  },
  {
    icon: Users,
    title: 'Our Impact',
    description: 'Empowering transportation authorities and organizations to make data-driven decisions for road safety.',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy-900" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-gold-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-navy-600/10 to-transparent rounded-full blur-3xl" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image/Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-navy-600/10 rounded-3xl blur-2xl" />
              
              {/* Main Image Container */}
              <motion.div
                className="relative z-10 glass-card rounded-3xl p-8 glow-effect"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/logo-bg.png"
                  alt="YNM Drishti Logo"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-4 shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-gold-400 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-navy-900" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Trusted</p>
                    <p className="text-navy-500 text-sm">AI Solution</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-navy-800 border border-gold-500/20 text-gold-300 text-sm font-medium mb-6">
              About Us
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Pioneering the Future of{' '}
              <span className="gradient-text">Road Intelligence</span>
            </h2>

            <p className="text-lg text-navy-500 mb-8 leading-relaxed">
              YNM Drishti represents the next generation of road infrastructure 
              monitoring systems. Our AI-powered platform combines advanced computer 
              vision, deep learning, and geospatial analytics to provide unprecedented 
              insights into road conditions and infrastructure health.
            </p>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  <span className="text-navy-500">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mt-20"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="glass-card rounded-2xl p-6 text-center group hover:border-gold-500/30 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <value.icon className="w-8 h-8 text-navy-900" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
              <p className="text-navy-500">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
