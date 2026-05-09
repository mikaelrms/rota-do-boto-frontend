import { Link, useNavigate } from "react-router-dom";

import TravelSearchCard from './components/TravelSearchCard.jsx'
import CardEmAlta from './components/CardEmAlta.jsx'
import CardViagem from './components/CardViagem.jsx'
import Recepcao from './components/Recepcao.jsx';
import Promocoes from './components/Promocao.jsx';

const listaCidades = [
  { id: 1, nome: "Manaus", imagem: "/manaus3.jpg" },
  { id: 2, nome: "Parintins", imagem: "/parintins2.jpg" },
  { id: 3, nome: "Tefé", imagem: "/tefe.jpg" },
  { id: 4, nome: "Maués", imagem: "/maues.jpeg" }
];

function Home() {

  return (
    <>
    {/* BACKGROUND */}
    <section className="w-full bg-[linear-gradient(#00000080,#0000004D),url('/bg-home3.jpg')] bg-cover relative pb-20bg-cover bg-center bg-scroll">
    <div className="relative inset-0 bg-white/20 backdrop-blur-xs">
    <div className="relative z-50">
    <Recepcao />
     <Promocoes />
    
    {/* DESTINOS EM ALTA */}
    <div className="p-8 h-fit pb-20 bg-transparent rounded-lg">
      <h1 className="text-3xl mb-8 md:text-4xl font-bold italic drop-shadow-lg text-white">Destinos em alta</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {listaCidades.map((cidade) => {
          return (
          <CardEmAlta 
            key={cidade.id} 
            imagem={cidade.imagem} 
            nome={cidade.nome}
          />
          );
          })}
      </div>
    </div>

    
    {/* VIAGENS MAIS PROCURADAS */}
    <section className="p-8 h-fit pb-12 mt-1">
      <h2 className="text-3xl mb-8 md:text-4xl font-bold italic drop-shadow-lg text-white">Viagens mais procuradas</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 h-[400px] pb-12 bg-transparent">
        <div className="hidden lg:block lg:row-span-2">
          <CardViagem 
            titulo="Manaus para Tefé"
            descricao="Viagem com saída prevista para o próxima semana, com duração de 4 horas. Aproveite a oportunidade!"
            preco="R$ 200,00"
            imagem="/tefe.jpg"
          />
        </div>
        <CardViagem titulo="Manaus para Parintins" preco="R$ 80,00" imagem="/parintins2.jpg" />  
        <CardViagem titulo="Tabatinga para Manaus" preco="R$ 90,00" imagem="/manaus3.jpg" />
        <CardViagem titulo="Coari para Codajás"  preco="R$ 75,00" imagem="/codajas.jpeg" />
        <CardViagem titulo="Manaus para Coari" preco="R$ 120,00" imagem="/coari.jpeg" />
      </div>
      </section>
    
    </div>
    </div>
    </section>
   </> 
  )
} export default Home