import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { Button } from 'components/ui/button';
import Image from 'next/image';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto grid min-h-[572px] w-full max-w-6xl grid-cols-1 grid-rows-2 items-center gap-1 px-6 py-10 md:grid-cols-2 md:grid-rows-1">
          <div>
            <h2 className="font-margarine text-4xl">Lördags lådan</h2>
            <p className="mt-2 text-xl font-bold">
              Våran mest populära snackbox perfekt för att
              <wbr /> avnjuta själv eller med andra vart som hälst.
            </p>
            <Button size="lg" variant="secondary" className="mt-2 font-bold">
              Köp nu
            </Button>
          </div>
          <Image
            src="/lördags-lådan.webp"
            alt="Bild på lördags lådan"
            height={100}
            width={1000}
            className="max-h-[480px] object-contain"
          />
        </div>
      </header>
      <ThreeItemGrid />
      <Suspense>
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
