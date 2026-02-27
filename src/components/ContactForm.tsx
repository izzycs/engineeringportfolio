import { useState } from 'react';
import { useStore } from '../store/useStore';

type FormStatus = 'idle' | 'success' | 'error';

export function ContactForm() {
  const showContactForm = useStore((state) => state.showContactForm);
  const setShowContactForm = useStore((state) => state.setShowContactForm);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  if (!showContactForm) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple mailto implementation
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    try {
      // TODO: Replace with Izzy's actual email
      window.location.href = `mailto:izzyamayacs@gmail.com?subject=${subject}&body=${body}`;
      setStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setStatus('idle');
        setShowContactForm(false);
      }, 2000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const isFieldFilled = (field: keyof typeof formData) => formData[field].length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={() => setShowContactForm(false)}
    >
      <div
        className="bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 border-2 border-green-500/50 rounded-xl p-8 max-w-md w-full mx-4 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-gray-400 text-sm mt-1">Let's build something amazing</p>
          </div>
          <button
            onClick={() => setShowContactForm(false)}
            className="text-gray-400 hover:text-white text-3xl leading-none transition-colors hover:rotate-90 duration-300"
          >
            ×
          </button>
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-sm flex items-center gap-2">
            <span className="text-lg">✓</span>
            <span>Message sent! Opening your email client...</span>
          </div>
        )}
        {status === 'error' && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm flex items-center gap-2">
            <span className="text-lg">✕</span>
            <span>Something went wrong. Please try again.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="relative">
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-lg focus:border-green-500 focus:outline-none transition-all peer placeholder-transparent"
              placeholder="Name"
            />
            <label
              htmlFor="name"
              className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                focusedField === 'name' || isFieldFilled('name')
                  ? '-top-2.5 text-xs bg-gray-900 px-2 text-green-400'
                  : 'top-3 text-gray-400'
              }`}
            >
              Name
            </label>
          </div>

          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-lg focus:border-green-500 focus:outline-none transition-all peer placeholder-transparent"
              placeholder="Email"
            />
            <label
              htmlFor="email"
              className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                focusedField === 'email' || isFieldFilled('email')
                  ? '-top-2.5 text-xs bg-gray-900 px-2 text-green-400'
                  : 'top-3 text-gray-400'
              }`}
            >
              Email
            </label>
          </div>

          {/* Message Field */}
          <div className="relative">
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 rounded-lg focus:border-green-500 focus:outline-none transition-all resize-none peer placeholder-transparent"
              placeholder="Message"
            />
            <label
              htmlFor="message"
              className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                focusedField === 'message' || isFieldFilled('message')
                  ? '-top-2.5 text-xs bg-gray-900 px-2 text-green-400'
                  : 'top-3 text-gray-400'
              }`}
            >
              Message
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'success'}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 rounded-lg transition-all font-semibold text-lg shadow-lg hover:shadow-green-500/50 hover:scale-[1.02] active:scale-[0.98] duration-200"
          >
            {status === 'success' ? '✓ Message Sent!' : 'Send Message'}
          </button>
        </form>

        {/* Social Links */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <h3 className="text-sm font-semibold mb-3 text-gray-400">Or connect via:</h3>
          <div className="flex gap-4">
            <a 
              href="https://github.com/izzycs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all text-center border border-gray-700 hover:border-blue-500 hover:text-blue-400"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/izzycs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all text-center border border-gray-700 hover:border-blue-500 hover:text-blue-400"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:izzyamayacs@gmail.com" 
              className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all text-center border border-gray-700 hover:border-green-500 hover:text-green-400"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
