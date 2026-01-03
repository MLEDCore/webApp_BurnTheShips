
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Legal Notice - BurnTheShips',
  description: 'Legal Notice (Imprint) for the BurnTheShips application.',
};

export default function LegalNoticePage() {
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
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-primary">Legal Notice (Imprint)</h1>

        <div className="space-y-8 text-foreground/85">
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold border-b pb-3 mb-4 text-primary/90">Information according to § 5 TMG and § 18 MStV</h2>
            <p>
              This website is operated exclusively as a private, non-commercial hobby project.
              It does not serve any commercial purposes and does not generate revenue.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold border-b pb-3 mb-4 text-primary/90">Website Operator</h2>
             <div className="pl-4 border-l-2 border-accent bg-card p-4 rounded-r-lg">
                <p><strong>Name:</strong> Lucca Lamotte</p>
                <p><strong>Contact:</strong> luccalamotte@gmail.com</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold border-b pb-3 mb-4 text-primary/90">Responsibility for Content</h2>
            <p>
              The content of this website is created with care and to the best of my knowledge.
              As a private individual, I assume no liability for the accuracy, completeness, or timeliness of the information provided.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold border-b pb-3 mb-4 text-primary/90">External Links</h2>
            <p>
              This website may contain links to external websites of third parties.
              I have no influence over the content of these external sites and therefore assume no liability for them.
              At the time of linking, no illegal content was identifiable.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold border-b pb-3 mb-4 text-primary/90">Copyright</h2>
            <p>
              The content and works created by the website operator on this website are subject to copyright law.
              Any duplication, processing, distribution, or use beyond the scope of copyright law requires prior written consent of the respective author.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold border-b pb-3 mb-4 text-primary/90">Applicable Law</h2>
            <p>
              This website is subject to the laws of the Federal Republic of Germany.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
