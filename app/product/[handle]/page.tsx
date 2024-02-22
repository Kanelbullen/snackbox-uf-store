import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { AddToCart } from 'components/cart/add-to-cart';
import Footer from 'components/layout/footer';
import Price from 'components/price';
import { Gallery } from 'components/product/gallery';
import { ProductDescription } from 'components/product/product-description';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct, getProductRecommendations } from 'lib/shopify';
import { Image as ImageType } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const {
    url,
    width,
    height,
    altText: alt
  } = product.featuredImage
    ? product.featuredImage
    : {
        url: '',
        width: 0,
        height: 0,
        altText: ''
      } || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage?.url ? product.featuredImage.url : '',
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="mx-auto mt-8 max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-border bg-background p-8 md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Gallery
              images={product.images.map((image: ImageType) => ({
                src: image.url,
                altText: image.altText
              }))}
            />
          </div>

          <div className="basis-full lg:basis-2/6">
            <ProductDescription product={product} />
          </div>
        </div>
        <Suspense>
          <RelatedProducts id={product.id} />
        </Suspense>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="mx-auto max-w-6xl py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li key={product.handle}>
            <Link className="group relative block" href={`/product/${product.handle}`}>
              <div className="aspect-square w-full max-w-80 overflow-clip rounded-sm">
                <Image
                  src={product.featuredImage?.url ? product.featuredImage.url : ''}
                  alt=""
                  sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
                  width={product.featuredImage?.width ? product.featuredImage.width : 0}
                  height={product.featuredImage?.height ? product.featuredImage.height : 0}
                />
              </div>

              <div className="mt-2 flex justify-between gap-2">
                <span className="font-bold underline-offset-4 group-hover:underline">
                  {product.title}
                </span>
                <Price
                  className="text-muted-foreground"
                  amount={product.priceRange.maxVariantPrice.amount}
                  currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                />
              </div>
            </Link>
            <AddToCart
              className="mt-3"
              variants={product.variants}
              availableForSale={product.availableForSale}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
