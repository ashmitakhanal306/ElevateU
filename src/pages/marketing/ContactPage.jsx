import React from 'react';
import SEO from '../../components/SEO';
import MarketingPageLayout from '../../components/layout/MarketingPageLayout';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <SEO title="Contact Us" description="Get in touch with the ElevateU team for questions, feedback, or support." />
      <MarketingPageLayout 
      title="Contact Us" 
      subtitle="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form */}
        <Card className="lg:col-span-2 p-8">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Your Name</label>
                <Input placeholder="John Doe" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
                <Input type="email" placeholder="john@example.com" className="w-full" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Subject</label>
              <Input placeholder="How can we help?" className="w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Message</label>
              <textarea 
                rows={6}
                className="w-full px-4 py-2 border border-border rounded-lg bg-bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <Button variant="primary" type="submit" className="w-full sm:w-auto px-8">
              Send Message
            </Button>
          </form>
        </Card>

        {/* Sidebar */}
        <div className="space-y-8">
          <Card className="p-8">
            <h3 className="text-lg font-bold text-text-primary mb-6">Contact Information</h3>
            <div className="space-y-6 text-text-secondary">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-text-primary">Email</div>
                  <div>support@elevateu.in</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-text-primary">Phone</div>
                  <div>+91 98765 43210</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-text-primary">Office</div>
                  <div>4th Floor, Cyber Hub, DLF Phase 2, Gurugram, Haryana 122002</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MarketingPageLayout>
    </>
  );
}
