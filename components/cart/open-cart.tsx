import clsx from 'clsx';
import { ShoppingBag } from 'lucide-react';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <>
      <ShoppingBag
        className={clsx(
          'h-4 text-foreground transition-all ease-in-out hover:scale-110 ',
          className
        )}
        size={16}
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 flex h-4 w-4 items-center justify-center rounded bg-secondary text-[11px] font-medium text-secondary-foreground">
          {quantity}
        </div>
      ) : null}
    </>
  );
}
