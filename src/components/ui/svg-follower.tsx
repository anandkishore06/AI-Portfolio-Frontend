"use client";

import type React from "react";
import { useRef, useEffect, useCallback, useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface Point {
  position: Position;
  time: number;
  drift: Position;
  age: number;
  direction: Position;
}

export interface SVGFollowerProps {
  width?: number;
  height?: number;
  colors?: string[];
  removeDelay?: number;
  autoPlay?: boolean;
  className?: string;
  fullScreen?: boolean;
}

export function SVGFollower({
  width = 1400,
  height = 1200,
  colors = ["#4ecdc4", "#ffbd44", "#ff6b6b", "#8b5cf6", "#38bdf8"],
  removeDelay = 350,
  autoPlay = false,
  className = "",
  fullScreen = false,
}: SVGFollowerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const followersRef = useRef<Follower[]>([]);
  const animationRef = useRef<number>();
  const [isRecording, setIsRecording] = useState(false);
  const recordingRef = useRef<Position[]>([]);

  const [dimensions, setDimensions] = useState<{ width: number; height: number }>(() => ({
    width: typeof window !== "undefined" && fullScreen ? window.innerWidth : width,
    height: typeof window !== "undefined" && fullScreen ? window.innerHeight : height,
  }));

  useEffect(() => {
    if (!fullScreen) return;

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fullScreen]);

  class Follower {
    private points: Point[] = [];
    private line: SVGPathElement;
    private color: string;
    private stage: SVGSVGElement;
    private timeouts: ReturnType<typeof setTimeout>[] = [];

    constructor(stage: SVGSVGElement, color: string) {
      this.stage = stage;
      this.color = color;
      this.line = document.createElementNS("http://www.w3.org/2000/svg", "path");
      this.line.style.fill = color;
      this.line.style.stroke = color;
      this.line.style.strokeWidth = "1";
      this.stage.appendChild(this.line);
    }

    private getDrift(): number {
      return (Math.random() - 0.5) * 3;
    }

    public add(position: Position) {
      const direction = { x: 0, y: 0 };
      if (this.points[0]) {
        const dx = position.x - this.points[0].position.x;
        const dy = position.y - this.points[0].position.y;
        const dist = Math.hypot(dx, dy);
        const timeDelta = Date.now() - this.points[0].time;

        // If the cursor jumped across the screen or was idle for a while,
        // clear old points so we don't draw an ugly straight line across the page
        if (dist > 200 || timeDelta > 150) {
          this.points = [];
        } else {
          direction.x = dx * 0.25;
          direction.y = dy * 0.25;
        }
      }

      const point: Point = {
        position: position,
        time: Date.now(),
        drift: {
          x: this.getDrift() + direction.x / 2,
          y: this.getDrift() + direction.y / 2,
        },
        age: 0,
        direction: direction,
      };

      const shapeChance = Math.random();
      const chance = 0.08;
      if (shapeChance < chance) this.makeCircle(point);
      else if (shapeChance < chance * 2) this.makeSquare(point);
      else if (shapeChance < chance * 3) this.makeTriangle(point);

      this.points.unshift(point);
    }

    private createLine(points: Point[]): string {
      if (points.length < 2) return "";
      const path: string[] = ["M"];

      let forward = true;
      let i = 0;

      while (i >= 0) {
        const point = points[i];
        const offsetX = point.direction.x * ((i - points.length) / points.length) * 0.6;
        const offsetY = point.direction.y * ((i - points.length) / points.length) * 0.6;
        const x = point.position.x + (forward ? offsetY : -offsetY);
        const y = point.position.y + (forward ? offsetX : -offsetX);
        point.age += 0.2;

        path.push(String(x + point.drift.x * point.age));
        path.push(String(y + point.drift.y * point.age));

        i += forward ? 1 : -1;
        if (i === points.length) {
          i--;
          forward = false;
        }
      }

      return path.join(" ");
    }

    public trim() {
      const now = Date.now();
      // Remove all expired points (while loop instead of if to prevent point accumulation)
      while (this.points.length > 0 && this.points[this.points.length - 1].time < now - removeDelay) {
        this.points.pop();
      }

      if (this.points.length === 0) {
        this.line.setAttribute("d", "");
      } else {
        this.line.setAttribute("d", this.createLine(this.points));
      }
    }

    public clear() {
      this.points = [];
      this.line.setAttribute("d", "");
    }

    public destroy() {
      this.timeouts.forEach((t) => clearTimeout(t));
      this.timeouts = [];
      this.clear();
      if (this.stage.contains(this.line)) {
        this.stage.removeChild(this.line);
      }
    }

    private makeCircle(point: Point) {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      const radius = (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 0.8;
      circle.setAttribute("r", String(Math.max(radius, 2)));
      circle.style.fill = this.color;
      circle.setAttribute("cx", "0");
      circle.setAttribute("cy", "0");
      this.moveShape(circle, point);
    }

    private makeSquare(point: Point) {
      const size = (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1.2;
      const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      square.setAttribute("width", String(Math.max(size, 3)));
      square.setAttribute("height", String(Math.max(size, 3)));
      square.style.fill = this.color;
      this.moveShape(square, point);
    }

    private makeTriangle(point: Point) {
      const size = (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1.2;
      const s = Math.max(size, 3);
      const triangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      triangle.setAttribute("points", `0,0 ${s},${s / 2} 0,${s}`);
      triangle.style.fill = this.color;
      this.moveShape(triangle, point);
    }

    private moveShape(shape: SVGElement, point: Point) {
      this.stage.appendChild(shape);
      const driftX = point.position.x + point.direction.x * (Math.random() * 20) + point.drift.x * (Math.random() * 10);
      const driftY = point.position.y + point.direction.y * (Math.random() * 20) + point.drift.y * (Math.random() * 10);

      shape.style.transform = `translate(${point.position.x}px, ${point.position.y}px)`;
      shape.style.transition = "all 0.5s ease-out";

      const t1 = setTimeout(() => {
        shape.style.transform = `translate(${driftX}px, ${driftY}px) scale(0) rotate(${Math.random() * 360}deg)`;
        const t2 = setTimeout(() => {
          if (this.stage.contains(shape)) {
            this.stage.removeChild(shape);
          }
        }, 500);
        this.timeouts.push(t2);
      }, 10);
      this.timeouts.push(t1);
    }
  }

  // Global mouse follower for fullScreen mode
  useEffect(() => {
    if (!fullScreen) return;

    let lastX = 0;
    let lastY = 0;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      // Don't add if mouse position didn't actually change
      if (e.clientX === lastX && e.clientY === lastY) return;
      lastX = e.clientX;
      lastY = e.clientY;

      const position: Position = {
        x: e.clientX,
        y: e.clientY,
      };
      followersRef.current.forEach((follower) => follower.add(position));
    };

    const handleMouseLeave = () => {
      followersRef.current.forEach((follower) => follower.clear());
    };

    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("blur", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("blur", handleMouseLeave);
    };
  }, [fullScreen]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (fullScreen) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const position: Position = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      followersRef.current.forEach((follower) => follower.add(position));

      if (isRecording) {
        recordingRef.current.push({
          x: (position.x / width) * 100,
          y: (position.y / height) * 100,
        });
      }
    },
    [width, height, isRecording, fullScreen],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const touch = e.touches[0];
      const position: Position = {
        x: fullScreen ? touch.clientX : touch.clientX - rect.left,
        y: fullScreen ? touch.clientY : touch.clientY - rect.top,
      };

      followersRef.current.forEach((follower) => follower.add(position));

      if (isRecording) {
        recordingRef.current.push({
          x: (position.x / (fullScreen ? dimensions.width : width)) * 100,
          y: (position.y / (fullScreen ? dimensions.height : height)) * 100,
        });
      }
    },
    [width, height, isRecording, fullScreen, dimensions],
  );

  const startRecording = () => {
    recordingRef.current = [];
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    console.log("Recording:", JSON.stringify(recordingRef.current));
  };

  const animate = useCallback(() => {
    followersRef.current.forEach((follower) => follower.trim());
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    const svgEl = svgRef.current;
    svgEl.innerHTML = ""; // Clean any old residual lines or shapes

    // Initialize followers
    followersRef.current = colors.map((color) => new Follower(svgEl, color));

    // Start animation loop
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      followersRef.current.forEach((f) => f.destroy());
      followersRef.current = [];
      svgEl.innerHTML = "";
    };
  }, [colors, animate]);

  if (fullScreen) {
    return (
      <div
        ref={containerRef}
        className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={startRecording}
      onMouseUp={stopRecording}
      onTouchStart={startRecording}
      onTouchEnd={stopRecording}
    >
      <svg ref={svgRef} width={width} height={height} xmlns="http://www.w3.org/2000/svg" className="absolute inset-0" />
    </div>
  );
}
