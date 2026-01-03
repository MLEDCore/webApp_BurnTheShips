import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Privacy Policy - BurnTheShips',
  description: 'Privacy Policy for the BurnTheShips application.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="py-4 border-b">
        <div className="container mx-auto px-4 md:px-6 flex justify-start">
             <Button asChild variant="outline">
                <Link href="/">Back to Home</Link>
            </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-primary">Privacy Policy</h1>

        <div className="space-y-8 text-foreground/85">
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold border-b pb-3 mb-4 text-primary/90">1. General Information</h2>
            <p>
              The protection of your personal data is important to me. This website is operated exclusively for private, non-commercial, hobby purposes. Personal data is processed only to the extent technically necessary.
            </p>
            <p>
              The controller responsible for data processing under the General Data Protection Regulation (GDPR) is:
            </p>
            <div className="pl-4 border-l-2 border-accent bg-card p-4 rounded-r-lg">
                <p><strong>Name:</strong> Lucca Lamotte</p>
                <p><strong>Contact:</strong> luccalamotte@gmail.com</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold border-b pb-3 mb-4 text-primary/90">2. Access Data / Server Log Files</h2>
            <p>
              When you access this website, the hosting provider automatically collects and stores information in so-called server log files. This information includes in particular:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>IP address</li>
              <li>Date and time of the request</li>
              <li>Requested page or file</li>
              <li>Browser type and version</li>
              <li>Operating system used</li>
            </ul>
            <p>
              This data is required for technical reasons to ensure the proper delivery, stability, and security of the website.
            </p>
            <p>
              <strong>Legal basis:</strong> Art. 6(1)(f) GDPR (legitimate interest in the secure and reliable operation of the website).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold border-b pb-3 mb-4 text-primary/90">3. Hosting</h2>
            <p>
              This website is hosted by <strong>Vercel, Inc.</strong> (Vercel, 340 S Lemon Ave #4133, Walnut, CA 91789, USA). Vercel processes connection data, including IP addresses, solely to deliver the website
            </p>
            <p>
              Further information about Vercel's data processing can be found here: <a href="https://vercel.com/legal/privacy-policy" target="_blank" className="text-primary underline">Vercel Privacy Policy</a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold border-b pb-3 mb-4 text-primary/90">4. Cookies</h2>
            <p>
              This website does not use cookies that require consent. Only technically necessary processes are used to operate the website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold border-b pb-3 mb-4 text-primary/90">5. External Services and Embedded Content</h2>
            <p>
              This website does not use external services such as analytics tools, advertising services, social media plugins, or embedded third-party content (e.g. YouTube, Google Maps).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold border-b pb-3 mb-4 text-primary/90">6. Contact</h2>
            <p>
              If you contact me via email, the transmitted data will be used solely to process your request and will not be shared with third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold border-b pb-3 mb-4 text-primary/90">7. Rights of Data Subjects</h2>
            <p>
              Under applicable data protection laws, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>request information about your stored personal data</li>
              <li>request correction of inaccurate data</li>
              <li>request deletion of your data</li>
              <li>request restriction of processing</li>
              <li>object to the processing of your data</li>
            </ul>
             <p>
              If you have any questions regarding data protection, you may contact me at any time using the contact details provided above.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold border-b pb-3 mb-4 text-primary/90">8. Changes to This Privacy Policy</h2>
            <p>
              This privacy policy may be updated to reflect technical or legal changes. The current version published on this website shall apply.
            </p>
            <p>
              <em>Last updated: January 2026</em>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
