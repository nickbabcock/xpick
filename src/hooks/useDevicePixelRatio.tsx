"use client";

import { useEffect, useState } from "react";

export function useDevicePixelRatio() {
  const [pixelRatio, setPixelRatio] = useState(1);
  useEffect(() => {
    setPixelRatio(window.devicePixelRatio);
  }, []);

  // If someone switches to emulation mode, let's follow along
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setPixelRatio(window.devicePixelRatio);
    });
    observer.observe(document.body);

    return () => {
      observer.disconnect();
    };
  }, []);

  return pixelRatio;
}
