import { SectionContainer } from '@/components/common/section-container';
import { SectionTitle } from '@/components/common/section-title';

export const metadata = {
  title: 'Privacy Policy - Dropbox Draughtsman',
  description: 'Read the Dropbox Draughtsman Privacy Policy to understand how we collect, use, and protect your personal information.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <SectionContainer>
      <SectionTitle>Privacy Policy</SectionTitle>
      <div className="prose prose-invert max-w-none text-muted-foreground">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <p>Dropbox Draughtsman ("us", "we", or "our") operates the Dropbox Draughtsman website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>

        <h3><br/>Information Collection and Use</h3>
        <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
        {/* Add more specific details about data collection */}
        
        <h4><br/>Types of Data Collected</h4>
        <ul>
          <li>Personal Data (e.g., email address, name, phone number)</li>
          <li>Usage Data (e.g., IP address, browser type, pages visited)</li>
          <li>Cookies and Tracking Technologies</li>
        </ul>

        <h3><br/>Use of Data</h3>
        <p>Dropbox Draughtsman uses the collected data for various purposes:</p>
        <ul>
          <li>To provide and maintain the Service</li>
          <li>To notify you about changes to our Service</li>
          <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
          <li>To provide customer care and support</li>
          <li>To provide analysis or valuable information so that we can improve the Service</li>
          <li>To monitor the usage of the Service</li>
          <li>To detect, prevent and address technical issues</li>
        </ul>

        <h3><br/>Data Security</h3>
        <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

        <h3><br/>Changes to This Privacy Policy</h3>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

        <h3><br/>Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <ul>
          <li>By email: dropboxdraughtsman@gmail.com</li>
        </ul>
      </div>
    </SectionContainer>
  );
}
