import { useScrollSearch } from '../../../context/ScrollSearchContext.jsx';

function CardEmAlta({ imagem, nome }) {
  const { scrollToSearch } = useScrollSearch();
  return (
    <div onClick={scrollToSearch} className="relative overflow-hidden h-44 sm:h-52 md:h-56 lg:h-48 xl:h-50 w-full group shadow-lg border border-white/10 bg-transparent">
      
      <img src={imagem} alt={nome} className="object-cover w-full h-full transition-transform duration-700 ease-out 
      group-hover:scale-105"/>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 
      transition-opacity duration-500 group-hover:opacity-100"></div>
      
      <div className="absolute inset-0 flex items-end p-3 sm:p-4 md:p-5 lg:p-6">
        
        <h3 className="text-white text-sm sm:text-lg md:text-xl lg:text-2xl font-bold italic drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] 
        transition-transform duration-500 group-hover:-translate-y-2">
          {nome}
        </h3>
      
      </div>
    </div>
  );
}

export default CardEmAlta;
