import React from "react";

export default function HomeSection() {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-[#ebe8e3] flex items-start justify-center pt-16" style={{backgroundImage: 'url(/bghome.png)', backgroundSize: 'contain', backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat'}}>
            <div className="relative w-full max-w-6xl mx-auto px-4">

                <div className="flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-0">

                    {/* Left Side - "Reinvente" + Initiative + Logo */}
                    <div className="flex-1 flex flex-col items-baseline lg:items-baseline text-center lg:text-right ml-[300px] mr-[-100px] mt-[-200px] space-y-1 justify-start">

                        {/* "Reinvente" text */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight">
                            <span className="font-light text-[#212121] font-['Mukta_Malar-Light',Helvetica]">
                                Reinvente
                            </span>
                        </h1>

                        {/* Initiative + Energisa logo together */}
                        <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4">
                            <div className="text-2xl md:text-3xl lg:text-4xl text-[#149589] font-['Mukta_Malar-Regular',Helvetica]">
                                Iniciativa
                            </div>
                            <img
                                className="w-20 md:w-24 h-auto object-contain"
                                alt="Energisa logo"
                                src="/energisa logo 1.png"
                            />
                        </div>
                    </div>

                    {/* Center - Person Image */}
                    <div className="flex-shrink-0 flex justify-center">
                        <img
                            className="w-7xl max-w-2xl md:max-w-md h-auto object-contain"
                            alt="Davi camisa branca"
                            src="/Davi-camisa-branca 1.png"
                        />
                    </div>

                    {/* Right Side - "seu futuro!" */}
                    <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left mr-[300px] ml-[-100px] mt-[-200px] justify-start">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight whitespace-nowrap">
                            <span className="font-extrabold text-[#5aa127] font-['Mukta_Malar-ExtraBold',Helvetica]">
                                seu futuro!
                            </span>
                        </h1>
                        <div>
                            <span className="text-transparent">.</span>
                        </div>
                        <div>
                            <span className="text-transparent">.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
