import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

function ThreeItemGridItem({ item }: { item: Product }) {
  return (
    <div>
      <Link className="group relative block" href={`/product/${item.handle}`}>
        <div className="aspect-square w-full overflow-clip rounded-sm">
          <Image
            src={item.featuredImage?.url ? item.featuredImage.url : ''}
            alt={item.title}
            sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
            width={item.featuredImage?.width ? item.featuredImage.width : 0}
            height={item.featuredImage?.height ? item.featuredImage.height : 0}
          />
        </div>

        <div className="mt-2 flex justify-between gap-2">
          <span className="font-bold underline-offset-4 group-hover:underline">{item.title}</span>
          <Price
            className=" text-muted-foreground"
            amount={item.priceRange.maxVariantPrice.amount}
            currencyCode={item.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </Link>
      <AddToCart
        className="mt-3"
        variants={item.variants}
        availableForSale={item.availableForSale}
      />
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items'
  });

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-4 pt-12">
      <h2 className="text-2xl font-bold text-secondary">Snackbox, vi gör hälsosamt gott.</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {firstProduct && <ThreeItemGridItem item={firstProduct} />}
        {secondProduct && <ThreeItemGridItem item={secondProduct} />}
        {thirdProduct && <ThreeItemGridItem item={thirdProduct} />}
      </div>
    </section>
  );
}
