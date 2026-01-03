import { Ship, Twitter, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#1E293B] text-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <Ship className="h-7 w-7 text-accent" />
            BurnTheShips
          </Link>

          <div className="flex items-center gap-4">
            <Link href="#" className="text-white/70 hover:text-white transition-colors">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-white/70 hover:text-white transition-colors">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="text-white/70 hover:text-white transition-colors">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} BurnTheShips. All rights reserved. | <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link> | <Link href="/legal" className="underline hover:text-white">Legal Notice</Link></p>
          <p className="mt-2">Portfolio-Project (Mockup)</p>
        </div>
      </div>
    </footer>
  );
}
