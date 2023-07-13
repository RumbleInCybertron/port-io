"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(true);

  const path = usePathname();
  const onDismiss = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) { onDismiss(); router.push(path); }
      }
    },
    [onDismiss, overlay, wrapper, router, path]
  );

  // const onKeyDown = useCallback(
  //   (e: React.KeyboardEvent<HTMLDivElement>) => {
  //     if (e.key === "Escape") onDismiss();
  //   },
  //   [onDismiss]
  // );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onDismiss();
      router.push(path); }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onDismiss, path, router]);

  return (
    <>
      {isModalOpen && (
        <div
          ref={overlay}
          className="fixed bottom-0 left-0 right-0 top-0 z-10 mx-auto bg-black/60"
          onClick={onClick}
        >
          <div
            ref={wrapper}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-6"
          >
            {children}
          </div>
        </div>)}
    </>
  );
}