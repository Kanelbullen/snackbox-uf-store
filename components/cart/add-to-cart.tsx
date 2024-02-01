'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import LoadingDots from 'components/loading-dots';
import { Button, ButtonProps } from 'components/ui/button';
import { ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

interface SubmitButtonProps extends ButtonProps {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}

interface AddToCartButtonProps extends ButtonProps {
  availableForSale: boolean;
  variants: ProductVariant[];
}

function SubmitButton({
  availableForSale,
  selectedVariantId,
  className,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <Button aria-disabled className={clsx('w-full', disabledClasses, className)} {...props}>
        Slut i lager
      </Button>
    );
  }

  if (!selectedVariantId) {
    return (
      <Button
        aria-label="Vänligen välj ett alternativ"
        aria-disabled
        className={clsx('relative w-full', disabledClasses, className)}
        {...props}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Lägg i påse
      </Button>
    );
  }

  return (
    <Button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Lägg i påse"
      aria-disabled={pending}
      className={clsx(
        'relative w-full',
        {
          'hover:opacity-90': true,
          disabledClasses: pending
        },
        className
      )}
      {...props}
    >
      <div className="absolute left-0 ml-4">
        {pending ? <LoadingDots className="mb-3 bg-white" /> : <PlusIcon className="h-5" />}
      </div>
      Lägg i påse
    </Button>
  );
}

export function AddToCart({
  variants,
  availableForSale,
  className,
  ...props
}: AddToCartButtonProps) {
  const [message, formAction] = useFormState(addItem, null);
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);

  return (
    <form action={actionWithVariant}>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        className={className}
        {...props}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
