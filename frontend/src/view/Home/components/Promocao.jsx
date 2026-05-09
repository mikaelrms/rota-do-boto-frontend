import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from "react-router-dom";

// Import dos estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Promocoes = () => {
  const dadosPromo = [
    { id: 1, destino: "Itapiranga para Urucará", img: "/urucara.jpg", desconto: "20% OFF", de: "R$ 350", por: "R$ 280" },
    { id: 2, destino: "Manaus para Parintins", img: "/parintins2.jpg", desconto: "15% OFF", de: "R$ 180", por: "R$ 153" },
    { id: 3, destino: "Tefé para Manaus", img: "/manaus3.jpg", desconto: "10% OFF", de: "R$ 290", por: "R$ 261" },
    { id: 4, destino: "Manaus para Anori", img: "/anori.jpg", desconto: "25% OFF", de: "R$ 400", por: "R$ 300" },
  ];

const navigate = useNavigate();

const handleClick = (promo) => {
  navigate("/resultados");
}

  return (
    <section id="promocoes" className="py-20 text-white overflow-hidden bg-transparent">
  
      <style dangerouslySetInnerHTML={{ __html: `
        #promocoes .swiper-button-next, 
        #promocoes .swiper-button-prev {
          color: #ffffff !important;
        }
        #promocoes .swiper-pagination-bullet-active {
          background: #ffffff !important;
        }
      `}} />

      <div className="container mx-auto px-6">
        
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold italic drop-shadow-lg">
            Promoções <span className="text-sky-600">Imperdíveis!</span>
          </h2>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12">
          {dadosPromo.map((promo) => (
            <SwiperSlide key={promo.id}>
              
              <div className={`relative group overflow-hidden h-72 w-full shadow-lg border border-white/10 bg-transparent cursor-pointer rounded-2xl
              ${promo.id === 2 ? "cursor-pointer" : "cursor-default"}`}
              onClick={(e) => {e.stopPropagation();
                if (promo.id === 2) handleClick(promo);}}>
                
                <img 
                  src={promo.img} 
                  alt={promo.destino} 
                  className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-107" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>
                
                <div className="absolute top-4 right-4 bg-orange-600 text-white font-bold px-3 py-1 rounded-full text-xs animate-pulse">
                  {promo.desconto}
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold italic drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:-translate-y-2">
                    {promo.destino}
                  </h3>
                  
                  <div className="flex justify-between items-baseline mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:-translate-y-1">
                    <span className="text-gray-400 line-through text-sm italic">
                        De: {promo.de}
                    </span>
                    <span className="text-sky-700 font-bold text-2xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        {promo.por}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Promocoes;