import { useEffect } from "react";

export function useBodyOverflowHidden(active: boolean) {
  useEffect(() => {
    if (active) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [active]);
}
