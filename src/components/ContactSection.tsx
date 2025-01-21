import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Loader2, ExternalLink, Github, Linkedin } from 'lucide-react';
import { Toast } from './Toast';
import confetti from 'canvas-confetti';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#3B82F6', '#34D399', '#60A5FA']
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('https://portfolio-chatbot-backend-rwxc.onrender.com/api/contacts/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setToastMessage("Thanks for reaching out! I'll get back to you soon.");
        setToastType('success');
        setFormData({ name: '', email: '', message: '' });
        triggerConfetti();
      } else {
        setToastMessage('Failed to send message. Please try again.');
        setToastType('error');
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
      console.error('Error sending message:', error);
      setToastMessage('Something went wrong. Please try again later.');
      setToastType('error');
    } finally {
      setIsSubmitting(false);
      setShowToast(true);
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      url: 'https://github.com/adityakumar9',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: 'https://linkedin.com/in/aditya-kumar-singh-6b544418b/',
    },
  ];

  return (
    <section 
      ref={ref}
      id="contact" 
      className="relative min-h-screen py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold font-mono flex items-center group">
            <span className="text-emerald-400 mr-2 opacity-70 group-hover:opacity-100 transition-opacity">
              &gt;
            </span>
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              contact
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl">
            Available for freelance projects and full-time opportunities. Let's build something amazing together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-gray-800/20 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-6">Connect With Me</h3>
              
              <div className="space-y-6">
                <motion.a
                  href="mailto:adityakumar950489@gmail.com"
                  className="flex items-center text-gray-300 hover:text-emerald-400 transition-colors group"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>adityakumar950489@gmail.com</span>
                  <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>

                <motion.div
                  className="flex items-center text-gray-300"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mr-4">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span>+91 9113400868</span>
                </motion.div>

                <motion.div
                  className="flex items-center text-gray-300"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mr-4">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span>New Delhi, India</span>
                </motion.div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg bg-gray-800/20 backdrop-blur-sm border border-gray-700/50 
                           hover:border-emerald-500/30 text-gray-300 hover:text-emerald-400 
                           transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <form 
              onSubmit={handleSubmit}
              className="bg-gray-800/20 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 relative overflow-hidden"
            >
              {formStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`absolute inset-x-0 top-0 p-4 text-center text-white
                    ${formStatus === 'success' ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}
                >
                  {formStatus === 'success' ? 'Message sent successfully!' : 'Failed to send message. Please try again.'}
                </motion.div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-1">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder='Aditya Kumar'
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900/50 text-gray-300 rounded-lg 
                             border border-gray-700 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 
                             transition-colors duration-300"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Email</label>
                  <input
                    id="email"
                    placeholder='adityakumar950489@gmail'
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900/50 text-gray-300 rounded-lg 
                             border border-gray-700 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 
                             transition-colors duration-300"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-gray-400 mb-1">Message</label>
                  <textarea
                    id="message"
                    placeholder='Hi, I would like to work with you!'
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-900/50 text-gray-300 rounded-lg 
                             border border-gray-700 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 
                             transition-colors duration-300 resize-none"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg 
                           font-semibold flex items-center justify-center gap-2 hover:opacity-90 
                           transition-all duration-300 disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
          
        </div>

        <AnimatePresence>
          {showToast && (
            <Toast
              message={toastMessage}
              type={toastType}
              onClose={() => setShowToast(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ContactSection;