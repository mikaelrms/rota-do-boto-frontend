import { Link } from "react-router-dom";

function ViagemPrincipal( { titulo, descricao, preco, imagem, rota } ) {
    return (
        <div className="relative overflow-hidden w-full h-full group shadow-md">
        <Link to={rota}>
            
      <img 
        src={imagem} 
        className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
        alt={titulo}
      />

      <div className="absolute bottom-0 left-0 w-3/4 bg-white/90 p-4">
            <h4 className="font-bold text-gray-800 text-lg">{titulo}</h4>
            <p className="text-gray-600 text-xs leading-tight mb-2">{descricao}</p>
            {preco && <span className="text-gray-500 font-semibold text-sm">{preco}</span>}
      </div>

      {/* seta */}
      <div className="absolute bottom-4 right-4 text-white opacity-50 group-hover:opacity-100 transition-opacity">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7" />
        </svg>
      </div>
        </Link>
        
        
        
    </div>
    )
} 
export default ViagemPrincipal;