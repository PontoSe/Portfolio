"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import NavigationBarSection from "@/components/NavigationBarSection";
import data from "@/data/portfolio.json";

export default function ProjectDetail({ params }) {
  const _params = typeof React.use === "function" ? React.use(params) : params;
  const { slug } = _params || {};
  const project = useMemo(() => {
    const p = (data || []).find((p) => p.slug === slug);
    return p ? { ...p, link: p.link || "https://www.google.com" } : undefined;
  }, [slug]);
  const [index, setIndex] = useState(0);

  const images = project?.assets?.gallery || [];

  useEffect(() => {
    setIndex(0);
  }, [slug]);

  const next = useCallback(() => {
    setIndex((i) => (images.length ? (i + 1) % images.length : 0));
  }, [images.length]);

  const prev = useCallback(() => {
    setIndex((i) => (images.length ? (i - 1 + images.length) % images.length : 0));
  }, [images.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  if (!project) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
        <p>Projeto não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0b0b] text-white w-screen min-h-screen overflow-hidden">
      <NavigationBarSection currentPage="Portfólio" />

      <main className="pt-20 w-full flex flex-col xl:grid xl:grid-cols-3 xl:h-[calc(100vh-80px)] gap-0">
        {/* Gallery */}
        <section className="xl:col-span-2 relative w-full h-[45vh] sm:h-[55vh] xl:h-full">
          <div className="absolute inset-0">
            {images.length > 0 ? (
              <img
                key={images[index]}
                src={images[index]}
                alt={`${project.name} - ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/60">
                Sem imagens
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Controls */}
          <div className="absolute inset-0 flex items-center justify-between p-4 z-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur border border-white/10 flex items-center justify-center"
              aria-label="Anterior"
            >
              <span className="text-xl">‹</span>
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur border border-white/10 flex items-center justify-center"
              aria-label="Próximo"
            >
              <span className="text-xl">›</span>
            </button>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-2 bg-black/40 backdrop-blur rounded-full border border-white/10 overflow-x-auto whitespace-nowrap z-10">
              {images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setIndex(i)}
                  className={`w-3 h-3 rounded-full ${i === index ? "bg-[#14b8a6]" : "bg-white/40"}`}
                />
              ))}
            </div>
          )}
        </section>

        {/* Info */}
        <aside className="xl:col-span-1 w-full xl:w-auto h-auto xl:h-full border-t xl:border-t-0 xl:border-l border-white/10 bg-gradient-to-b from-[#121212] to-[#0b0b0b] flex flex-col">
          <div className="p-6 flex-1 flex flex-col overflow-hidden">
            <a href="/portfolio" className="text-sm text-white/70 hover:text-white mb-4">← Voltar</a>
            <h1 className="text-3xl font-semibold">{project.name}</h1>
            <p className="text-white/80 mt-1">{project.subtitle}</p>

            <div className="mt-4 sm:mt-6 space-y-4 text-white/85 pr-2">
              <p className="leading-relaxed">{project.description}</p>

              <div>
                <h3 className="text-sm uppercase tracking-wider text-white/60">Equipe</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.team.map((m) => (
                    <span key={m} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm">
                      {m}
                    </span>
                  ))}
                </div>

                {/* QRCode */}
                <div className="mt-4 sm:mt-6 xl:mt-10 flex flex-col items-center">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir link do projeto: ${project.link}`}
                    title={`Abrir ${project.link}`}
                    className="inline-flex flex-col items-center group transform transition-transform duration-150 hover:scale-[1.03]"
                  >
                    <div className="p-3 bg-white rounded-xl shadow-xl ring-1 ring-white/10">
                      <QRCodeSVG value={project.link} size={150} bgColor="#ffffff" fgColor="#0b0b0b" />
                    </div>
                    <span className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-[#14b8a6] text-black font-semibold rounded-lg hover:bg-[#0fb499] transition-colors duration-150">
                      Abrir link
                    </span>
                  </a>
                  <p className="mt-3 text-sm text-white/50 text-center">Escaneie o QRCode ou toque para abrir o link</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-white/10 flex items-center gap-3">
            <img src={project.assets.profile} alt="profile" className="w-12 h-12 rounded-lg object-cover" />
            <div>
              <div className="text-sm text-white/60">Galeria</div>
              <div className="text-white font-medium">{images.length} imagens</div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
