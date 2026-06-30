import { HeroSection } from '@/components/sections/HeroSection';
import { Ticker } from '@/components/sections/Ticker';
import { CategorySection } from '@/components/sections/CategorySection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { ShippingSection } from '@/components/sections/ShippingSection';
import { InstagramSection } from '@/components/sections/InstagramSection';
import { WhySection } from '@/components/sections/WhySection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <Ticker />
      <CategorySection />
      <ProductsSection />
      <ShippingSection />
      <InstagramSection />
      <WhySection />
      <ContactSection />
    </>
  );
}
