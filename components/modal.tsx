"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { X } from "@phosphor-icons/react/dist/ssr";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog?.open) dialog?.showModal();
  }, []);

  // Closing navigates back, so the URL leaves /projects/[slug] again.
  const close = useCallback(() => router.back(), [router]);

  return (
    <dialog
      ref={ref}
      onClose={close}
      onClick={(e) => {
        // Clicks on the dialog element itself land on the backdrop area.
        if (e.target === ref.current) close();
      }}
      className="modal-pop m-auto max-h-[90dvh] w-[min(92vw,880px)] overflow-y-auto rounded-3xl bg-cream text-ink shadow-2xl shadow-forest-deep/40 backdrop:bg-forest-deep/60 backdrop:backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close project details"
        className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-cream/90 text-ink transition-transform hover:scale-105 active:scale-95"
      >
        <X size={18} weight="bold" />
      </button>
      {children}
    </dialog>
  );
}
