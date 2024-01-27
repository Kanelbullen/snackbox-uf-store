import clsx from 'clsx';
import { X } from 'lucide-react';

export default function CloseCart({ className }: { className?: string }) {
  return (
    <div>
      <X size={24} className={clsx('h-6 transition-all ease-in-out hover:scale-110 ', className)} />
    </div>
  );
}
