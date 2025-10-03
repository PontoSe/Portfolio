"use client";

import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { motion, animate, useReducedMotion } from "framer-motion";
import NavigationBarSection from "@/components/NavigationBarSection";
import Carousel3D from "@/components/Carousel3D";
import data from "@/data/portfolio.json";
import Link from "next/link";

export default function PortfolioPage() {
  const projects = useMemo(() => data, []);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 -> next, -1 -> prev
  const [animating, setAnimating] = useState(false);
  const [shift, setShift] = useState(0); // px shift applied to all slots for connected motion (driven by animate())
  const viewportRef = useRef(null);
  const [viewportW, setViewportW] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1280));
  const prefersReducedMotion = useReducedMotion();

  const count = projects.length;

  const mod = useCallback((n, m) => ((n % m) + m) % m, []);

  // distance each step should travel (22vw approx)
  const stepPx = useMemo(() => 0.22 * viewportW, [viewportW]);

  const baseEase = useMemo(() => [0.22, 1, 0.36, 1], []); // easeOutQuint-ish
  const baseDuration = prefersReducedMotion ? 0.001 : 0.5;

  const runShiftAnimation = useCallback((delta, dir) => {
    setAnimating(true);
    // Drive shift from 0 -> delta with a tween for consistent, fluid motion
    const controls = animate(0, delta, {
      duration: baseDuration,
      ease: baseEase,
      onUpdate: (latest) => setShift(latest),
      onComplete: () => {
        setIndex((i) => mod(i + dir, count));
        setShift(0);
        setAnimating(false);
      },
    });
    return () => controls.stop();
  }, [baseDuration, baseEase, count, mod]);

  const next = useCallback(() => {
    if (animating || count <= 1) return;
    setDirection(1);
    if (prefersReducedMotion) {
      setIndex((i) => mod(i + 1, count));
      return;
    }
    runShiftAnimation(-stepPx, 1);
  }, [animating, count, prefersReducedMotion, stepPx, runShiftAnimation, mod]);

  const prev = useCallback(() => {
    if (animating || count <= 1) return;
    setDirection(-1);
    if (prefersReducedMotion) {
      setIndex((i) => mod(i - 1, count));
      return;
    }
    runShiftAnimation(stepPx, -1);
  }, [animating, count, prefersReducedMotion, stepPx, runShiftAnimation, mod]);

  const getAt = useCallback((offset) => {
    if (count === 0) return null;
    const i = mod(index + offset, count);
    return projects[i];
  }, [count, index, projects, mod]);

  // autoplay every 4s (uses connected shift)
  useEffect(() => {
    if (paused || animating || count <= 1) return;
    const t = setInterval(() => {
      next();
    }, 4000);
    return () => clearInterval(t);
  }, [paused, animating, count, next]);

  // measure viewport width for pixel-based animation
  useEffect(() => {
    const measure = () => {
      const w = viewportRef.current?.getBoundingClientRect?.().width || window.innerWidth || 1280;
      setViewportW(w);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <div className="bg-[#0b0b0b] text-white w-[100vw] h-[100vh] overflow-hidden">
      <NavigationBarSection currentPage="Portfólio" />

      <main
        className="pt-20 h-[calc(100vh-80px)] w-full relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ambient background accents */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-24 w-[40vw] h-[40vw] rounded-full bg-[#14b8a6]/10 blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -right-24 w-[35vw] h-[35vw] rounded-full bg-[#5aa127]/10 blur-3xl animate-pulse" />
        </div>

        <div className="relative h-full w-full flex items-center justify-center">
          <Carousel3D />
        </div>

        {/* tiny indicators */}
        {count > 1 && (
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 border border-white/10 backdrop-blur px-3 py-2 rounded-full">
            {projects.map((p, i) => (
              <button
                key={p.slug}
                onClick={() => !animating && setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === index ? 'bg-[#14b8a6]' : 'bg-white/40 hover:bg-white/60'}`}
                aria-label={`Ir para ${p.name}`}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function KeyboardNav({ onLeft, onRight }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') onLeft?.();
      if (e.key === 'ArrowRight') onRight?.();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onLeft, onRight]);
  return null;
}
