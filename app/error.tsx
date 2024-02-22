'use client';

import { Button } from 'components/ui/button';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto my-4 flex max-w-xl flex-col rounded-lg border border-border p-8 md:p-12">
      <h2 className="text-xl font-bold">Åh nej!</h2>
      <p className="my-2">
        Ett problem uppstod med våran storefront. Detta kan vara ett temporärt problem, vänligen
        testa igen.
      </p>
      <Button size="lg" onClick={() => reset()}>
        Försök igen
      </Button>
    </div>
  );
}
