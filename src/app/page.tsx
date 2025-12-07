import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { Sponsors } from '@/components/home/sponsors';

export default function Home() {
  return (
    <main>
      <Hero />
      <Sponsors />
      <About />
    </main>
  );
}
