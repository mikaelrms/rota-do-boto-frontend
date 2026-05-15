import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/useCart";

const formatarData = (dataIso) => {
  if (!dataIso) return "-";
  const [ano, mes, dia] = dataIso.split('-');
  return `${dia}/${mes}/${ano}`;
};

function Carrinho() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [timeLeft, setTimeLeft] = useState(0);

  const total = cart.total || (cart.price || 0) * (cart.seats?.length || 0);
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  useEffect(() => {
    if (!cart.expiresAt) return;

    const updateTimeLeft = () => {
      const diff = Math.max(Number(cart.expiresAt) - Date.now(), 0);
      setTimeLeft(diff);

      if (diff <= 0) {
        clearCart();
        navigate("/");
      }
    };

    updateTimeLeft();

    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [cart.expiresAt, clearCart, navigate]);

  const resumoItems = [
    { label: "Rota", value: `${cart.origem} -> ${cart.destino}` },
    { label: "Lancha", value: cart.nome },
    { label: "Partida", value: formatarData(cart.date) },
    { label: "Tempo de viagem", value: cart.tempo },
    { label: "Passageiros", value: cart.passageiros },
    { label: "Assentos", value: cart.seats?.join(", ") },
    { label: "Valor Passagem", value: `R$ ${(cart.price || 0).toFixed(2)}` },
    { label: "Codigo da reserva", value: cart.orderId },
  ];

  return (
    <section className="w-full min-h-screen bg-gray-100 py-6 md:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 font-sans">
        <div className="border border-gray-300 rounded-[30px] md:rounded-[40px] p-6 md:p-10 shadow-sm bg-white w-full">
          {!cart.seats || cart.seats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-lg text-gray-500 mb-4">
                Seu carrinho esta vazio
              </p>
              <p className="text-sm text-gray-400">
                Escolha seus assentos para continuar
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6">
                  Resumo geral do pedido
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
                  {cart.imagem && (
                    <div className="w-full h-48 bg-gray-100 rounded-2xl overflow-hidden">
                      <img
                        src={cart.imagem}
                        alt={cart.nome}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resumoItems.map((item) => (
                      <div key={item.label}>
                        <p className="text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                          {item.label}
                        </p>
                        <div className="bg-gray-100 rounded-xl px-4 py-3 min-h-12">
                          {item.value || "-"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {cart.expiresAt && (
                <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-xl p-4 mb-6 text-center">
                  Sua reserva expira em:
                  <span className="font-bold ml-2">
                    {String(minutes).padStart(2, "0")}:
                    {String(seconds).padStart(2, "0")}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center mb-10 border-t border-gray-200 pt-6">
                <span className="text-lg font-medium text-gray-700">Total</span>
                <span className="text-2xl font-bold text-green-700">
                  R$ {total.toFixed(2)}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={clearCart}
                  className="w-full sm:w-60 bg-red-500 text-white font-semibold py-3 rounded-xl"
                >
                  Limpar carrinho
                </button>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full sm:w-60 bg-[#61EE9D] text-black font-semibold py-3 rounded-xl"
                >
                  Finalizar compra
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Carrinho;
