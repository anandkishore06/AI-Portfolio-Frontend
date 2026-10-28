import { useEffect, useRef } from "react";

const MouseGlow = () => {
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const trail = trailRef.current;
      if (!trail) return;

      const { clientX, clientY } = e;
      trail.style.left = `${clientX}px`;
      trail.style.top = `${clientY}px`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={trailRef}
      className="fixed z-0 pointer-events-none w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-15 dark:opacity-20 transition-all duration-300 ease-out"
      style={{
        background:
          "radial-gradient(circle, rgba(78, 205, 196, 0.4) 0%, rgba(255, 189, 68, 0.15) 50%, transparent 75%)",
      }}
    />
  );
};

export default MouseGlow;
