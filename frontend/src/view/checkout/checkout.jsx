import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Checkout() {

  const { cart, clearCart } = useCart();

  const { user } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const total =
    (cart.price || 0) *
    (cart.seats?.length || 0);

  const handleFakePayment = async () => {

    if (!user) {
      alert("Faça login");
      return;
    }

    setLoading(true);

    try {

      // simula delay do pagamento
      await new Promise((resolve) =>
        setTimeout(resolve, 2500)
      );

      const response = await fetch(
        "https://rota-do-boto-backend.onrender.com/confirm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            order_id: cart.orderId,
            trip_id: cart.tripId,
            date: cart.date,
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      alert("Pagamento aprovado!");

      clearCart();

      navigate("/perfil");

    } catch (error) {

      console.error(error);

      alert("Erro ao processar pagamento");

    } finally {

      setLoading(false);

    }
  };

  return (
    <section className="min-h-screen bg-[#f5f5f5] flex justify-center items-center p-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-[#009EE3] p-6 text-white">

          <h1 className="text-2xl font-bold">
            Mercado Pago
          </h1>

          <p className="text-sm opacity-90">
            Ambiente de teste
          </p>

        </div>

        {/* BODY */}
        <div className="p-6">

          <div className="mb-6">

            <p className="text-gray-500 text-sm">
              Valor total
            </p>

            <h2 className="text-4xl font-bold text-gray-800">
              R$ {total.toFixed(2)}
            </h2>

          </div>

          <div className="bg-gray-100 rounded-2xl p-4 mb-6">

            <p className="font-semibold mb-2">
              Assentos
            </p>

            <p>
              {cart.seats.join(", ")}
            </p>

          </div>

          {/* PIX fake */}
          <div className="border rounded-2xl p-4 mb-6">

            <div className="flex items-center gap-3 mb-4">

              <img
                src="https://logodownload.org/wp-content/uploads/2020/02/pix-bc-logo.png"
                alt="PIX"
                className="w-10"
              />

              <div>
                <p className="font-semibold">
                  PIX
                </p>

                <p className="text-sm text-gray-500">
                  Aprovação imediata
                </p>
              </div>

            </div>

            <div className="bg-white border rounded-xl p-3 text-center text-sm break-all">
              00020126360014BR.GOV.BCB.PIX0114+5592999999995204000053039865405
            </div>

          </div>

          <button
            onClick={handleFakePayment}
            disabled={loading}
            className="w-full bg-[#009EE3] text-white py-4 rounded-2xl font-semibold hover:brightness-95 transition disabled:opacity-50"
          >
            {loading
              ? "Processando pagamento..."
              : "Simular pagamento"}
          </button>

        </div>
      </div>
    </section>
  );
}

export default Checkout;