import React, { useState, useCallback, useEffect } from "react";
import data from "@/data/portfolio.json";

// Define as posições possíveis
const POSITIONS = ["left", "center", "right", "out"];

function getCardState(length, centerIdx) {
  // Retorna um array de objetos { idx, pos } para os cards visíveis e "fora"
  // Exemplo: [left, center, right, out, out, ...]
  const states = Array(length).fill("out");
  if (length === 0) return states;
  states[centerIdx] = "center";
  states[(centerIdx - 1 + length) % length] = "left";
  states[(centerIdx + 1) % length] = "right";
  // O resto permanece "out"
  return states;
}

export default function CarouselReal() {
  const [center, setCenter] = useState(0);
  const length = data.length;

  // Navegação por teclado
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") goLeft();
      if (e.key === "ArrowRight") goRight();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line
  }, [center, length]);

  const goLeft = useCallback(() => setCenter((c) => (c - 1 + length) % length), [length]);
  const goRight = useCallback(() => setCenter((c) => (c + 1) % length), [length]);

  const states = getCardState(length, center);

  return (
    <div className="relative w-full flex flex-col items-center py-8 select-none">
      {/* Botão esquerda */}
      <button
        aria-label="Anterior"
        onClick={goLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black rounded-full p-3 shadow focus:outline-none focus:ring-2 focus:ring-cyan-600"
      >
        &#8592;
      </button>

      {/* Carrossel */}
      <div className="relative flex items-center justify-center w-full max-w-4xl h-[340px] sm:h-[400px]">
        {data.map((item, i) => {
          const pos = states[i];
          // Definições de estilo por posição
          let style = "";
          let z = 1;
          if (pos === "center") {
            style = "translate-x-0 scale-100 opacity-100";
            z = 30;
          } else if (pos === "left") {
            style = "-translate-x-40 scale-80 opacity-70";
            z = 20;
          } else if (pos === "right") {
            style = "translate-x-40 scale-80 opacity-70";
            z = 20;
          } else {
            // "out"
            style = `${i < center ? "-translate-x-80" : "translate-x-80"} scale-60 opacity-0 pointer-events-none`;
            z = 10;
          }

          return (
            <div
              key={item.slug}
              className={`absolute top-0 left-1/2 w-[70vw] max-w-[340px] h-full transition-all duration-500 ease-in-out rounded-2xl bg-white text-black flex flex-col items-center justify-end overflow-hidden ${style}`}
              style={{
                zIndex: z,
                transform: `translate(-50%, 0)`,
              }}
              tabIndex={pos === "center" ? 0 : -1}
              aria-hidden={pos !== "center"}
            >
              <img
                src={item.assets.profile}
                alt={item.alt || `Imagem do projeto ${item.name}`}
                loading="lazy"
                className="w-full h-2/3 object-cover"
                draggable={false}
              />
              <div className="p-4 w-full">
                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-gray-700">{item.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botão direita */}
      <button
        aria-label="Próximo"
        onClick={goRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black rounded-full p-3 shadow focus:outline-none focus:ring-2 focus:ring-cyan-600"
      >
        &#8594;
      </button>
    </div>
  );
}
