import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  const show = true;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/perfil", { state: { aba: "pedidos" } }); 
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#e8f7ef] to-[#f7f7f7]">

      <div
        className={`bg-white shadow-2xl rounded-3xl p-8 w-full max-w-sm text-center transition-all duration-700 ${
          show ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >

        {/* CÍRCULO ANIMADO */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-green-100 animate-ping absolute"></div>
            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center relative">
              <span className="text-white text-4xl font-bold">✓</span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Pagamento aprovado
        </h1>

        <p className="text-gray-500 text-sm">
          Sua reserva foi confirmada com sucesso
        </p>

        {/* LOADING BAR */}
        <div className="mt-6 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 animate-[loading_2.5s_linear]"></div>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Redirecionando...
        </p>
      </div>

      {/* ANIMAÇÃO CSS INLINE */}
      <style>
        {`
          @keyframes loading {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}
      </style>

    </section>
  );
}

export default Success;
