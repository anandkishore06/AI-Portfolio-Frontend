import { useEffect, useRef, useState } from "react";

const MouseGlow = () => {
  const trailRef = useRef<HTMLDivElement>(null);
  const [hue, setHue] = useState(0);

  useEffect(() => {
    let animationFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      const trail = trailRef.current;
      if (!trail) return;

      const { clientX, clientY } = e;
      trail.style.left = `${clientX}px`;
      trail.style.top = `${clientY}px`;
    };

    const animateHue = () => {
      setHue((prevHue) => (prevHue + 1) % 360);
      animationFrame = requestAnimationFrame(animateHue);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrame = requestAnimationFrame(animateHue);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={trailRef}
      className="fixed z-50 pointer-events-none w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-30 transition-transform duration-200 ease-out"
      style={{
        background: `radial-gradient(circle, hsl(${hue}, 100%, 70%) 0%, transparent 70%)`,
      }}
    />
  );
};

export default MouseGlow;
