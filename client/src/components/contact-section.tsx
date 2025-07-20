import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Linkedin, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { usePersonalInfo, useContactContent } from "@/hooks/use-data-queries";
import type { InsertContactMessage } from "@shared/schema";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: personalInfo, loading: personalInfoLoading, error: personalInfoError } = usePersonalInfo();
  const { data: contactContent, isLoading: contactContentLoading, error: contactContentError } = useContactContent();

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Show loading state while fetching data
  const isLoading = personalInfoLoading || contactContentLoading;
  if (isLoading) {
    return (
      <section id="contact" className="section-padding" style={{ backgroundColor: '#f1f5f9' }}>
        <div className="container-width">
          <div className="text-center mb-20">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Get In Touch</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Loading contact information...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show error state if data fails to load
  const hasError = personalInfoError || contactContentError;
  if (hasError) {
    return (
      <section id="contact" className="section-padding" style={{ backgroundColor: '#f1f5f9' }}>
        <div className="container-width">
          <div className="text-center mb-20">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Get In Touch</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Unable to load contact information. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Extract contact info with fallbacks
  const contactInfo = personalInfo || {};
  const email = contactInfo.email || 'niteshnitp5686@gmail.com';
  const phone = contactInfo.phone || '+91 9955328756';
  const location = contactInfo.location || 'Bengaluru, Karnataka, India';
  const availability = contactInfo.availability || 'available';
  const availabilityMessage = contactInfo.availabilityMessage || 'Available for new projects';

  // Content with fallbacks
  const content = contactContent || {
    heading: 'Get In Touch',
    subheading: "I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and system design.",
    formTitle: 'Send me a message',
    connectTitle: 'Connect',
    contactInfoTitle: 'Get in touch',
    statusMessage: 'Feel free to reach out if you need my skills or have an exciting project to collaborate on.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/niteshnandan',
      github: '#',
      email: `mailto:${email}`
    }
  };

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: '#f1f5f9' }}>
      <div className="container-width">
        <div className="text-center mb-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {content.heading}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {content.subheading}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">{content.formTitle}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div>
                <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell me about your project or just say hello..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                />
              </div>
              
              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {contactMutation.isPending ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">{content.contactInfoTitle}</h3>
              <div className="space-y-5">
                <div className="group">
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <a 
                    href={`mailto:${email}`}
                    className="text-gray-900 font-medium hover:text-blue-600 transition-colors duration-200"
                  >
                    {email}
                  </a>
                </div>
                {phone && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <a 
                      href={`tel:${phone}`}
                      className="text-gray-900 font-medium hover:text-blue-600 transition-colors duration-200"
                    >
                      {phone}
                    </a>
                  </div>
                )}
                {location && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Location</p>
                    <p className="text-gray-900 font-medium">{location}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">{content.connectTitle}</h3>
              <div className="flex items-center gap-4">
                {content.socialLinks?.linkedin && (
                  <a
                    href={content.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 group"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                )}
                {content.socialLinks?.github && (
                  <a
                    href={content.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 group"
                    title="GitHub"
                  >
                    <Github className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                )}
                <a
                  href={`mailto:${email}`}
                  className="p-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-all duration-200 group"
                  title="Email"
                >
                  <Mail className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <div className="flex items-center mb-3">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  availability === 'available' ? 'bg-green-500' : 
                  availability === 'busy' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="text-gray-900 font-medium text-sm">{availabilityMessage}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {content.statusMessage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
