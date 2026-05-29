import { HeroSection } from '@/components/sections/HeroSection';
import { Ticker } from '@/components/sections/Ticker';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { DestaqueSection } from '@/components/sections/DestaqueSection';
import { InstagramSection } from '@/components/sections/InstagramSection';
import { WhySection } from '@/components/sections/WhySection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <Ticker />
      <ProductsSection />
      <DestaqueSection />
      <InstagramSection />
      <WhySection />
      <ContactSection />
    </>
  );
}
