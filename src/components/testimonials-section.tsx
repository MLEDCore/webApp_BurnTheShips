import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { testimonials } from '@/lib/placeholder-images';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-secondary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold">Success Stories</h2>
          <p className="mt-4 text-lg text-foreground/80">
            Hear from leaders who took the leap and never looked back.
          </p>
        </div>

        <Carousel
          opts={{ align: 'start', loop: true }}
          className="w-full max-w-5xl mx-auto mt-16"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => {
              const avatar = PlaceHolderImages.find((img) => img.id === testimonial.avatarId);
              return (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-2 h-full">
                    <Card className="h-full bg-background shadow-lg flex flex-col">
                      <CardContent className="p-8 flex flex-col items-center text-center flex-grow">
                        {avatar && (
                           <Image
                            src={avatar.imageUrl}
                            alt={`Avatar of ${testimonial.name}`}
                            data-ai-hint={avatar.imageHint}
                            width={80}
                            height={80}
                            className="rounded-full mb-6 border-4 border-accent"
                          />
                        )}
                        <blockquote className="text-lg font-medium text-foreground/90 flex-grow">"{testimonial.quote}"</blockquote>
                        <div className="mt-6">
                          <p className="font-bold text-primary text-xl">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
