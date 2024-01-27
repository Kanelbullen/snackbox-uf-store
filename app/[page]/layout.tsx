import Footer from 'components/layout/footer';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="w-full">
        <div className="mx-auto max-w-2xl px-8 py-20">
          <Suspense>{children}</Suspense>
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}
