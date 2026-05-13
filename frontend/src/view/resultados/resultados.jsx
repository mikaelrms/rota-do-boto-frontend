import { Navigate, useLocation, useNavigate } from "react-router-dom";

function Resultados() {
  const location = useLocation();
  const dadosBusca = location.state;

  const navigate = useNavigate();

  if (!dadosBusca) {
    return <Navigate to="/" replace />;
  }

  // informações das lanchas
  const lanchas = [
    { 
      tripId: "lancha1", 
      nome: "Vovô Nair", 
      preco: 120, 
      tempo: "02H", 
      data: "15/05/2026 - 09H",
      imagem: "/lancha1.jpg" 
    },
    { 
      tripId: "lancha2", 
      nome: "Mamãe Chamou", 
      preco: 130, 
      tempo: "01H 30min", 
      data: "15/05/2026 - 10H",
      imagem: "/lancha2.jpg"
    },
    { 
      tripId: "lancha3", 
      nome: "Erica Juliana", 
      preco: 110, 
      tempo: "03H", 
      data: "16/05/2026 - 08H",
      imagem: "/lancha3.jpg"
    },
    { 
      tripId: "lancha4", 
      nome: "Exp.Ana Carolina", 
      preco: 125, 
      tempo: "02H 15min", 
      data: "16/05/2026 - 14H",
      imagem: "/lancha4.jpg"
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 sm:p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center text-sky-700 mb-6">
          Lanchas disponíveis:
        </h1>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xl flex flex-col gap-6">
          
          {lanchas.map((lancha) => (
            <div 
              key={lancha.tripId} 
              className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm flex flex-col md:flex-row gap-8 items-center hover:shadow-md transition-shadow"
            >
              {/* Imagem dinâmica vinda do array */}
              <div className="w-full md:w-64 h-44 bg-gray-200 rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
                <img
                  src={lancha.imagem}
                  alt={lancha.nome}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  
                  <div className="flex flex-col justify-center">
                    <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">
                      Embarcação
                    </p>
                    <p className="font-extrabold text-sky-600 text-xl leading-tight">
                      {lancha.nome} - Lancha
                    </p>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                      <span>★ 4.8 (Avaliações)</span>
                    </div>

                    <p className="text-gray-400 mt-3 font-bold text-sm uppercase">
                      Preço:{" "}
                      <span className="text-sky-600 text-xl">
                        R${lancha.preco},00
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col justify-center sm:text-center border-x-0 sm:border-x border-gray-100">
                    <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">
                      Tempo de Viagem
                    </p>
                    <p className="font-extrabold text-sky-600 text-3xl">
                      {lancha.tempo}
                    </p>
                  </div>

                  <div className="flex flex-col justify-center sm:text-center">
                    <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">
                      Data de Partida
                    </p>
                    <p className="font-extrabold text-sky-600 text-lg">
                      {lancha.data}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() =>
                    navigate("/pedido", {
                      state: {
                        ...lancha,
                        date: dadosBusca.date,
                        origem: dadosBusca.origem,
                        destino: dadosBusca.destino,
                        passageiros: dadosBusca.passageiros,
                      },
                    })
                  }
                    className="w-full sm:w-auto bg-sky-700 hover:bg-sky-800 text-white font-bold py-3 px-10 rounded-2xl shadow-md transition-all hover:scale-105 text-base uppercase">
                    Comprar passagem
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Resultados;
