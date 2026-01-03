import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Compass, Sailboat, Anchor } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const services = [
  {
    icon: <Compass className="h-10 w-10 text-accent" />,
    title: "Discovery & Strategy",
    description: "We help you define your 'new world'—a clear, compelling vision for your future. Together, we'll chart the course and prepare for the journey ahead.",
    imageId: "service-compass",
  },
  {
    icon: <Sailboat className="h-10 w-10 text-accent" />,
    title: "Execution & Commitment",
    description: "This is the moment of truth. We guide you through the process of 'burning your ships'—making irreversible commitments that eliminate the possibility of retreat.",
    imageId: "service-map",
  },
  {
    icon: <Anchor className="h-10 w-10 text-accent" />,
    title: "Support & Accountability",
    description: "Once you've set sail, we're your first mates. We provide ongoing support and accountability to ensure you stay the course and navigate the challenges of your new path.",
    imageId: "service-anchor",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold">What We Offer</h2>
          <p className="mt-4 text-lg text-foreground/80">
            A three-step process to leave the old behind and embrace your uncharted future.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {services.map((service) => {
            const image = PlaceHolderImages.find(img => img.id === service.imageId);
            return (
              <Card key={service.title} className="flex flex-col overflow-hidden border-2 border-transparent hover:border-accent transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 bg-card">
                {image && (
                  <div className="aspect-video relative">
                     <Image
                      src={image.imageUrl}
                      alt={image.description}
                      data-ai-hint={image.imageHint}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardHeader className="items-start gap-4">
                  <div className="bg-accent/20 p-3 rounded-full">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-foreground/70">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
