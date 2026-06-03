import { useState } from 'react';
import { Bell, X } from 'lucide-react';

export function HomeAlertBanner({
  message,
}: {
  message: string;
}) {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div className="border-b border-amber-400/20 bg-amber-400/10">
      <div className="mx-auto flex max-w-7xl items-start justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3 text-sm text-amber-50">
          <Bell className="mt-0.5 size-4 shrink-0 text-amber-300" aria-hidden="true" />
          <p>{message}</p>
        </div>
        <button
          type="button"
          className="rounded-full p-1 text-amber-100/70 transition-colors hover:bg-white/10 hover:text-amber-50"
          onClick={() => setVisible(false)}
          aria-label="Dismiss alert"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
