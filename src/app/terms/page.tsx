import { SectionContainer } from '@/components/common/section-container';
import { SectionTitle } from '@/components/common/section-title';

export const metadata = {
  title: 'Terms of Service - CircuitFlow',
  description: 'Read the CircuitFlow Terms of Service. By using our services, you agree to these terms.',
};

export default function TermsPage() {
  return (
    <SectionContainer>
      <SectionTitle>Terms of Service</SectionTitle>
      <div className="prose prose-invert max-w-none text-muted-foreground">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Dropbox Draughtsman website (the "Service") operated by Dropbox Draughtsman ("us", "we", or "our").</p>

        <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.</p>

        <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>

        <h3><br/>Services</h3>
        <p>Dropbox Draughtsman provides electrical design training programs, consultation services, and a resource library. Detailed descriptions of services are available on our website.</p>
        
        <h3><br/>User Accounts</h3>
        <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>

        <h3><br/>Intellectual Property</h3>
        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Dropbox Draughtsman and its licensors. The Service is protected by copyright, trademark, and other laws of both Kenya and foreign countries.</p>

        <h3><br/>Limitation of Liability</h3>
        <p>In no event shall Dropbox Draughtsman, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

        <h3><br/>Governing Law</h3>
        <p>These Terms shall be governed and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions.</p>
        
        <h3><br/>Changes</h3>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

        <h3><br/>Contact Us</h3>
        <p>If you have any questions about these Terms, please contact us:</p>
        <ul>
          <li>By email: dropboxdraughtsman@gmail.com</li>
        </ul>
      </div>
    </SectionContainer>
  );
}
