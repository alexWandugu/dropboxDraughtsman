import Link from 'next/link';
import { Logo } from '@/components/logo';
import { footerNavItems } from '@/data/navigation';
import { NewsletterForm } from '@/components/newsletter-form';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/40">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Logo className="mb-4" />
            <p className="text-sm text-muted-foreground">
              Powering your electrical design expertise in Kenya through innovative training and expert consultation.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-headline font-semibold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              {footerNavItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-headline font-semibold mb-4 text-primary">Contact Us</h3>
            <address className="text-sm text-muted-foreground not-italic space-y-1">
              <p>123 Building Building, Along Thika Road, Juja, Kiambu, Kenya</p>
              <p>Email: <a href="mailto:dropboxdraughtsman@gmail.com" className="hover:text-primary">dropboxdraughtsman@gmail.com</a></p>
              <p>Phone: <a href="tel:+254795474704" className="hover:text-primary">+254 795 474 704</a></p>
            </address>
          </div>
          <div>
            <h3 className="text-lg font-headline font-semibold mb-4 text-primary">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-2">Stay updated with our latest news and offers.</p>
            <NewsletterForm />
            {/* Social media icons - Add actual SVG icons or Lucide icons if preferred */}
            {/* <div className="flex space-x-4 mt-4">
              {socialLinks.map(link => (
                <Link key={link.name} href={link.href} className="text-muted-foreground hover:text-primary">
                  <img src={link.icon} alt={link.name} className="h-6 w-6" />
                </Link>
              ))}
            </div> */}
          </div>
        </div>
        <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Dropbox Draughtsman Design. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
