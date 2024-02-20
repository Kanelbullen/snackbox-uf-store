import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { Button } from 'components/ui/button';
import { getCollectionProducts } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description:
    'Vi är ett ungdomsföretag som vill göra det lättare att äta nyttigt. Vi säljer färdigkomponerade lådor med nyttigare alternativ.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const heroProduct = await getCollectionProducts({ collection: 'hidden-hero-product' });

  return (
    <>
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-1 md:grid md:grid-cols-2 md:grid-rows-1">
          <div className="px-6 pb-8 pt-16 md:pb-0 md:pt-0">
            <h2 className="font-margarine text-4xl">{heroProduct[0]?.title}</h2>
            <p className="mt-2 text-xl font-bold">{heroProduct[0]?.description}</p>
            <Button size="lg" variant="secondary" className="mt-2 font-bold" asChild>
              <Link href={`/product/${heroProduct[0]?.handle}`}>Köp nu</Link>
            </Button>
          </div>
          <Image
            src={heroProduct[0]?.featuredImage.url ? heroProduct[0].featuredImage.url : ''}
            alt={`Bild på ${heroProduct[0]?.title}`}
            height={1000}
            width={1000}
            className="mt-3 max-h-[480px] object-contain md:mt-0 md:max-h-none md:w-full"
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
