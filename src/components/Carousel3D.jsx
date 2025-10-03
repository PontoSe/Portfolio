import React, { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import data from "@/data/portfolio.json";

// Posições: leftOut, left, center, right, rightOut
const getCardStates = (length, centerIdx) => {
  // Retorna um array de posições para cada card
  // Exemplo: [leftOut, left, center, right, rightOut, out, ...]
  const states = Array(length).fill("out");
  if (length === 0) return states;
  states[centerIdx] = "center";
  states[(centerIdx - 1 + length) % length] = "left";
  states[(centerIdx + 1) % length] = "right";
  states[(centerIdx - 2 + length) % length] = "leftOut";
  states[(centerIdx + 2) % length] = "rightOut";
  return states;
};

export default function Carousel3D() {
  const [center, setCenter] = useState(0);
  const length = data.length;
  const inactivityTimerRef = useRef(null);
  const autoplayRef = useRef(null);
  const isAutoplayingRef = useRef(false);

  const INACTIVITY_MS = 4000; // time of inactivity to start autoplay
  const AUTOPLAY_INTERVAL_MS = 4000; // autoplay step interval

  // Navegação por teclado
  useEffect(() => {
    const handler = (e) => {
      // consider keyboard navigation as user activity
      handleUserActivity();
      if (e.key === "ArrowLeft") goLeft();
      if (e.key === "ArrowRight") goRight();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line
  }, [center, length]);

  // start inactivity timer on mount
  useEffect(() => {
    resetInactivityTimer();
    return () => {
      clearInactivityTimer();
      stopAutoplay();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  };

  const resetInactivityTimer = () => {
    clearInactivityTimer();
    // stop autoplay while user is active
    stopAutoplay();
    inactivityTimerRef.current = setTimeout(() => {
      startAutoplay();
    }, INACTIVITY_MS);
  };

  const startAutoplay = () => {
    if (autoplayRef.current) return;
    autoplayRef.current = setInterval(() => {
      goRight();
    }, AUTOPLAY_INTERVAL_MS);
    isAutoplayingRef.current = true;
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    isAutoplayingRef.current = false;
  };

  const handleUserActivity = () => {
    // Called on any user interaction to stop autoplay and reset inactivity timer
    stopAutoplay();
    resetInactivityTimer();
  };

  const goLeft = useCallback(() => setCenter((c) => (c - 1 + length) % length), [length]);
  const goRight = useCallback(() => setCenter((c) => (c + 1) % length), [length]);

  const states = getCardStates(length, center);

  // Responsividade: define valores de deslocamento/escala/rotação por posição
  const getStyle = (pos) => {
    switch (pos) {
      case "center":
        return {
          transform:
            "translateX(0) scale(1) rotateY(0deg)",
          opacity: 1,
          zIndex: 30,
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)",
        };
      case "left":
        return {
          transform:
            "translateX(-38vw) scale(0.82) rotateY(22deg)",
          opacity: 0.7,
          zIndex: 20,
        };
      case "right":
        return {
          transform:
            "translateX(38vw) scale(0.82) rotateY(-22deg)",
          opacity: 0.7,
          zIndex: 20,
        };
      case "leftOut":
        return {
          transform:
            "translateX(-70vw) scale(0.6) rotateY(40deg)",
          opacity: 0,
          zIndex: 10,
          pointerEvents: "none",
        };
      case "rightOut":
        return {
          transform:
            "translateX(70vw) scale(0.6) rotateY(-40deg)",
          opacity: 0,
          zIndex: 10,
          pointerEvents: "none",
        };
      default:
        return {
          transform: "translateX(0) scale(0.5) rotateY(0deg)",
          opacity: 0,
          zIndex: 1,
          pointerEvents: "none",
        };
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center py-8 select-none">
      {/* Botão esquerda */}
      <button
        aria-label="Anterior"
        onClick={() => { handleUserActivity(); goLeft(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-black rounded-full p-3 md:p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        &#8592;
      </button>

      {/* Carrossel */}
  <div
    className="relative flex items-center justify-center w-full max-w-5xl h-[58vh] sm:h-[62vh] md:h-[70vh] max-h-[680px]"
    onPointerDown={handleUserActivity}
    onPointerMove={handleUserActivity}
    onTouchStart={handleUserActivity}
  >
        {data.map((item, i) => {
          const pos = states[i];
          const transformStyle = getStyle(pos);
          const baseStyle = {
            transition: "transform 0.6s cubic-bezier(.77,0,.18,1), opacity 0.5s cubic-bezier(.77,0,.18,1)",
            position: "absolute",
            top: 0,
            left: "50%",
            height: "100%",
            overflow: "hidden",
            transform: `translate(-50%, 0) ${transformStyle.transform.replace('translateX', ' translateX')}`,
            opacity: transformStyle.opacity,
            zIndex: transformStyle.zIndex,
            pointerEvents: transformStyle.pointerEvents || 'auto',
          };

          const isCenter = pos === "center";

          return (
            <div key={item.slug} style={baseStyle} tabIndex={isCenter ? 0 : -1} aria-hidden={!isCenter}>
              <Link
                href={`/portfolio/${item.slug}`}
                className={`pointer-events-auto group block w-[88vw] sm:w-[80vw] md:w-[64vw] max-w-[980px] h-[58vh] sm:h-[62vh] md:h-[70vh] max-h-[680px] rounded-[28px] overflow-hidden relative shadow-2xl ${isCenter ? 'ring-1 ring-white/10' : ''}`}
              >
                <div className="absolute inset-0">
                  <img
                    src={item.assets.profile}
                    alt={item.alt || `Imagem do projeto ${item.name}`}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-transform duration-700 ${isCenter ? 'group-hover:scale-105' : ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-black/50 border border-white/10 px-3 py-1 text-[11px] tracking-wider uppercase">
                    <span className="block w-1.5 h-1.5 rounded-full bg-[#14b8a6]" />
                    Projeto
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] transform transition-transform duration-500 will-change-transform group-hover:translate-y-[-2px]">{item.name}</h3>
                  <p className="text-sm md:text-base text-white/80 line-clamp-2 transition-opacity duration-500 group-hover:opacity-100">{item.subtitle}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Botão direita */}
      <button
        aria-label="Próximo"
        onClick={() => { handleUserActivity(); goRight(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-black rounded-full p-3 md:p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        &#8594;
      </button>
    </div>
  );
}
