import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Carrinho() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const total =
    (cart.price || 0) * (cart.seats?.length || 0);

  const [timeLeft, setTimeLeft] = useState(0);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  useEffect(() => {
    if (!cart.expiresAt) return;

    const diff = Math.max(Number(cart.expiresAt) - Date.now(), 0);
    setTimeLeft(diff);
  }, [cart.expiresAt]);

  useEffect(() => {
    if (!cart.expiresAt) return;

    const interval = setInterval(() => {
      const diff = Math.max(Number(cart.expiresAt) - Date.now(), 0);

      setTimeLeft(diff);

      if (diff <= 0) {
        clearCart();
        navigate("/");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cart.expiresAt, clearCart, navigate]);

  return (
    <section className="w-full min-h-screen bg-gray-100 py-6 md:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 font-sans">

        <div className="border border-gray-300 rounded-[30px] md:rounded-[40px] p-6 md:p-10 shadow-sm bg-white w-full">

          {!cart.seats || cart.seats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-lg text-gray-500 mb-4">
                Seu carrinho está vazio
              </p>
              <p className="text-sm text-gray-400">
                Escolha seus assentos para continuar
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6">
                  Resumo da compra
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                      Rota
                    </p>
                    <div className="bg-gray-100 rounded-xl px-4 py-3">
                      {cart.origem} → {cart.destino}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                      Lancha
                    </p>
                    <div className="bg-gray-100 rounded-xl px-4 py-3">
                      {cart.nome}
                    </div>
                  </div>

                </div>
              </div>

              <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-xl p-4 mb-6 text-center">
                Sua reserva expira em:
                <span className="font-bold ml-2">
                  {String(minutes).padStart(2, "0")}:
                  {String(seconds).padStart(2, "0")}
                </span>
              </div>

              <div className="flex justify-between items-center mb-10">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
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
                  disabled={loading}
                  className="w-full sm:w-60 bg-[#61EE9D] text-black font-semibold py-3 rounded-xl disabled:opacity-50"
                >
                  {loading ? "Processando..." : "Finalizar compra"}
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