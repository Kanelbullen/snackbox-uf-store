import { AddToCart } from 'components/cart/add-to-cart';
import Grid from 'components/grid';
import Price from 'components/price';
import { Product } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link className="group relative block" href={`/product/${product.handle}`}>
            <div className="aspect-square w-full overflow-clip rounded-sm">
              <Image
                src={product.featuredImage?.url ? product.featuredImage.url : ''}
                alt=""
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
                width={product.featuredImage?.width ? product.featuredImage.width : 0}
                height={product.featuredImage?.height ? product.featuredImage.height : 0}
              />
            </div>

            <div className="mt-2 flex flex-wrap justify-between gap-2">
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
        </Grid.Item>
      ))}
    </>
  );
}
