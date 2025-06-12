import { SectionContainer } from '@/components/common/section-container';
import { SectionTitle } from '@/components/common/section-title';

export const metadata = {
  title: 'Privacy Policy - CircuitFlow',
  description: 'Read the CircuitFlow Privacy Policy to understand how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <SectionContainer>
      <SectionTitle>Privacy Policy</SectionTitle>
      <div className="prose prose-invert max-w-none text-muted-foreground">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <p>CircuitFlow ("us", "we", or "our") operates the CircuitFlow website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>

        <h3>Information Collection and Use</h3>
        <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
        {/* Add more specific details about data collection */}
        
        <h4>Types of Data Collected</h4>
        <ul>
          <li>Personal Data (e.g., email address, name, phone number)</li>
          <li>Usage Data (e.g., IP address, browser type, pages visited)</li>
          <li>Cookies and Tracking Technologies</li>
        </ul>

        <h3>Use of Data</h3>
        <p>CircuitFlow uses the collected data for various purposes:</p>
        <ul>
          <li>To provide and maintain the Service</li>
          <li>To notify you about changes to our Service</li>
          <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
          <li>To provide customer care and support</li>
          <li>To provide analysis or valuable information so that we can improve the Service</li>
          <li>To monitor the usage of the Service</li>
          <li>To detect, prevent and address technical issues</li>
        </ul>

        <h3>Data Security</h3>
        <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

        <h3>Changes to This Privacy Policy</h3>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

        <h3>Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <ul>
          <li>By email: privacy@circuitflow.co.ke</li>
        </ul>
      </div>
    </SectionContainer>
  );
}
