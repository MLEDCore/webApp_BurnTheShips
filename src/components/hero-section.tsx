import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  if (!heroImage) {
    return null; // Or a fallback
  }

  return (
    <section id="home" className="relative h-screen w-full">
      <Image
        src={heroImage.imageUrl}
        alt={heroImage.description}
        data-ai-hint={heroImage.imageHint}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        <div className="mb-4 text-sm font-semibold tracking-widest uppercase text-accent">Driver of History, proven since 1519</div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
          No retreat. Only forward.
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-neutral-200">
          Our service is for those ready to commit to a new, focused direction without looking back. It's about bold decisions and unwavering forward momentum.
        </p>
        <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-7 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105">
          <Link href="#contact">Begin Your Journey</Link>
        </Button>
      </div>
    </section>
  );
}
