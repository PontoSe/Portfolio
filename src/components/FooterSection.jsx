import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export const FooterSection = () => {
  return (
    <footer className="w-full py-16 px-4 bg-[#2d2d2d] rounded-3xl text-white">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl mb-8 text-center">
          Rio Pomba Valley
        </h2>

        {/* Subscription text */}
        <p className="text-base md:text-lg lg:text-xl text-center mb-12 max-w-4xl">
          Fique por dentro das novidades! Inscreva-se e receba conteúdos
          exclusivos e as últimas atualizações diretamente no seu e-mail. Não perca nada, junte-se a nós
          agora!
        </p>

        {/* Email subscription form */}
        <Card className="w-full max-w-4xl mb-16 border-0">
          <CardContent className="p-0 flex flex-col md:flex-row">
            <div className="flex-grow bg-[#d9d9d9] p-4 md:p-6">
              <p className="text-lg md:text-xl lg:text-2xl text-black">
                Insira seu melhor email
              </p>
            </div>
            <Button className="h-auto py-4 md:py-6 px-8 md:px-12 bg-[#4a4a4a] hover:bg-[#5a5a5a] rounded-none text-lg md:text-xl lg:text-2xl">
              Inscrever-se
            </Button>
          </CardContent>
        </Card>

        {/* Footer links and copyright */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="order-2 md:order-1">
            <p className="text-base md:text-lg lg:text-xl text-center md:text-left">
              © 2025 .Se. Todos os direitos reservados.
            </p>
          </div>

          <div className="order-1 md:order-2 flex flex-col md:flex-row md:gap-8 items-center">
            <a
              href="#"
              className="text-base md:text-lg mb-2 md:mb-0 hover:text-[#5aa127] transition-colors"
            >
              FAQ
            </a>
            <a
              href="#"
              className="text-base md:text-lg mb-2 md:mb-0 hover:text-[#5aa127] transition-colors"
            >
              Termos de Uso
            </a>
            <a
              href="#"
              className="text-base md:text-lg hover:text-[#5aa127] transition-colors"
            >
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
