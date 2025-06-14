import { ConsultationForm } from '@/components/consultation-form';
import { SectionContainer } from '@/components/common/section-container';
import { SectionTitle } from '@/components/common/section-title';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Consultation - Dropbox Draughtsman',
  description: 'Request expert consultation for your electrical design projects. Contact Dropbox Draughtsman for personalized advice and solutions.',
};

export default function ConsultationPage() {
  return (
    <SectionContainer>
      <SectionTitle subtitle="Let Our Experts Guide Your Next Project">
        Request a Consultation
      </SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-headline font-semibold mb-4 text-primary">Get in Touch</h3>
            <p className="text-muted-foreground mb-6">
              We're here to help with all your electrical design needs. Reach out to us through any of the channels below, or use the form to send a detailed inquiry.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Our Office</h4>
                  <p className="text-muted-foreground">123 Building Building, Along Thika Road, Juja, Kiambu, Kenya</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Email Us</h4>
                  <a href="mailto:dropboxdraughtsman@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">dropboxdraughtsman@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Call Us</h4>
                  <a href="tel:+254795474704" className="text-muted-foreground hover:text-primary transition-colors">+254 795 474 704</a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-headline font-semibold mb-4 text-primary">Office Hours</h3>
            <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM</p>
            <p className="text-muted-foreground">Saturday: 10:00 AM - 2:00 PM (By Appointment)</p>
            <p className="text-muted-foreground">Sunday: Closed</p>
          </div>
        </div>
        <div>
          <ConsultationForm />
        </div>
      </div>
    </SectionContainer>
  );
}
