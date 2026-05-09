import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Carrinho() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { cart, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

const handleBuy = async () => {
  if (loading) return;
  if (!user) {
    alert("Usuário não autenticado");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("http://127.0.0.1:8000/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.uid,
        tripId: cart.tripId,
        seats: cart.seats,
        total: cart.total,
        origem: "Manaus",
        destino: "Maués",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.detail || "Erro na compra");
      return;
    }

    alert("Compra realizada com sucesso!");

    clearCart();
    navigate("/perfil");

  } catch (error) {
    console.error(error);
    alert("Erro ao conectar com servidor");
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="w-full min-h-screen bg-gray-100 py-6 md:py-10">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 font-sans">

        <div className="border border-gray-300 rounded-[30px] md:rounded-[40px] p-6 md:p-10 shadow-sm bg-white w-full">

          {cart.seats.length === 0 ? (
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
              {/* DETALHES */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6">
                  Resumo da compra
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                      Viagem
                    </p>
                    <div className="bg-gray-100 rounded-xl px-4 py-3">
                      {cart.tripId}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                      Assentos
                    </p>
                    <div className="bg-gray-100 rounded-xl px-4 py-3">
                      {cart.seats.join(", ")}
                    </div>
                  </div>

                </div>
              </div>

              <hr className="border-gray-300 mb-8" />

              {/*TOTAL */}
              <div className="flex justify-between items-center mb-10">
                <span className="text-lg font-medium text-gray-700">
                  Total
                </span>

                <span className="text-2xl font-bold text-green-700">
                  R$ {cart.total.toFixed(2)}
                </span>
              </div>

              {/*AÇÕES */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">

                <button
                  onClick={clearCart}
                  className="w-full sm:w-60 bg-red-500 text-white font-semibold py-3 rounded-xl shadow-md hover:brightness-95 transition-all">
                  Limpar carrinho
                </button>

                <button
                  onClick={handleBuy}
                  disabled={loading}
                  className="w-full sm:w-60 bg-[#61EE9D] text-black font-semibold py-3 rounded-xl shadow-md hover:brightness-95 transition-all">
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