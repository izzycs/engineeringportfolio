import { useState } from 'react';
import { useStore } from '../store/useStore';

export function ContactForm() {
  const showContactForm = useStore((state) => state.showContactForm);
  const setShowContactForm = useStore((state) => state.setShowContactForm);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!showContactForm) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mailto implementation
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    // TODO: Replace with Izzy's actual email
    window.location.href = `mailto:TODO-REPLACE-WITH-ACTUAL-EMAIL@example.com?subject=${subject}&body=${body}`;
    setShowContactForm(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={() => setShowContactForm(false)}
    >
      <div
        className="bg-gray-900 border border-green-500 rounded-lg p-6 max-w-md w-full mx-4 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">Get In Touch</h2>
          <button
            onClick={() => setShowContactForm(false)}
            className="text-gray-400 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:border-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:border-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:border-green-500 focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors font-medium"
          >
            Send Message
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <h3 className="text-sm font-semibold mb-3">Connect</h3>
          <div className="flex gap-4">
            <a href="https://github.com/izzycs" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/izzycs" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
              LinkedIn
            </a>
            <a href="mailto:TODO-REPLACE-WITH-ACTUAL-EMAIL@example.com" className="text-blue-400 hover:text-blue-300 transition-colors">
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
