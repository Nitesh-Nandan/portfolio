import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
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

  return (
    <section id="contact" className="min-h-screen bg-gradient-to-br from-neutral to-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Get In Touch</h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and design.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white rounded-xl shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-secondary mb-6">Send me a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject" className="block text-sm font-medium text-secondary mb-2">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {contactMutation.isPending ? 'Sending...' : 'Send Message'}
                  <Mail className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="bg-white rounded-xl shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-secondary mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted">Email</p>
                      <p className="font-medium text-secondary">john.doe@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted">Phone</p>
                      <p className="font-medium text-secondary">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted">Location</p>
                      <p className="font-medium text-secondary">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-white rounded-xl shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-secondary mb-6">Connect With Me</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="flex items-center justify-center p-4 bg-neutral rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    asChild
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="text-primary h-6 w-6 mr-3" />
                      <span className="font-medium text-secondary">LinkedIn</span>
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center p-4 bg-neutral rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    asChild
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Github className="text-primary h-6 w-6 mr-3" />
                      <span className="font-medium text-secondary">GitHub</span>
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center p-4 bg-neutral rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    asChild
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Twitter className="text-primary h-6 w-6 mr-3" />
                      <span className="font-medium text-secondary">Twitter</span>
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center p-4 bg-neutral rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    asChild
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Mail className="text-primary h-6 w-6 mr-3" />
                      <span className="font-medium text-secondary">Email</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Availability Status */}
            <Card className="bg-white rounded-xl shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-secondary mb-6">Availability</h3>
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-green-700 font-medium">Available for new projects</span>
                </div>
                <p className="text-muted">
                  I'm currently accepting new freelance projects and collaborations. Let's discuss how I can help bring your ideas to life!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
