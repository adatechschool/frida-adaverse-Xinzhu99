"use client"
import { useRef } from "react";
export default function ProjectImg({ src, fallback }) {
  const ref = useRef();

  function handleFallback() {
 // Nullify the error event for subsequent calls
    ref.current.onError = null;
    ref.current.src = fallback;
  }

  return <img className="w-60"alt="thumbnail" ref={ref} src={src} onError={handleFallback} />;
}

