import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { QRCodeCanvas } from "qrcode.react";

function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total = (cart.price || 0) * (cart.seats?.length || 0);

  const handleFakePayment = async () => {
    if (!user) {
      alert("Faça login");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2500));

      const response = await fetch(
        "https://rota-do-boto-backend.onrender.com/confirm",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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

      clearCart();
      navigate("/success");
    } catch (error) {
      console.error(error);
      alert("Erro ao processar pagamento");
    } finally {
      setLoading(false);
    }
  };

  // PIX fake só pra UI (não interfere no backend)
  const fakePix = `00020126${cart.orderId || "0000"}BR.PIX.ROTA.DO.BOTO`;

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#eef6fb] to-[#f7f7f7] flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-[#009EE3] p-6 text-white">
          <p className="text-sm opacity-80">Checkout seguro</p>
          <h1 className="text-2xl font-bold">Rota do Boto</h1>
        </div>

        <div className="p-6 space-y-6">

          {/* TOTAL */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">Total a pagar</p>
            <h2 className="text-4xl font-extrabold text-gray-900">
              R$ {total.toFixed(2)}
            </h2>
          </div>

          {/* RESUMO */}
          <div className="bg-gray-50 rounded-2xl p-4 border">
            <p className="font-semibold text-gray-700 mb-2">
              Resumo da viagem
            </p>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">Assentos:</span>{" "}
                {cart.seats?.join(", ")}
              </p>
              <p>
                <span className="font-medium">Data:</span> {cart.date}
              </p>
            </div>
          </div>

          {/* PIX CARD MELHORADO */}
          <div className="bg-white border rounded-2xl p-4 shadow-sm space-y-4">

            <div className="flex items-center gap-3">
              <img
                src="https://logodownload.org/wp-content/uploads/2020/02/pix-bc-logo.png"
                className="w-10"
                alt="PIX"
              />

              <div>
                <p className="font-semibold">PIX</p>
                <p className="text-xs text-gray-500">
                  Pagamento instantâneo
                </p>
              </div>
            </div>

            {/* QR CODE (VISUAL SOMENTE) */}
            <div className="flex justify-center bg-gray-50 p-4 rounded-xl border">
              <QRCodeCanvas value={fakePix} size={140} />
            </div>

            {/* COPY CODE */}
            <div className="bg-gray-100 rounded-xl p-3 text-[11px] break-all text-gray-600">
              {fakePix}
            </div>

            <p className="text-[11px] text-center text-gray-400">
              Escaneie ou copie o código PIX para simular o pagamento
            </p>
          </div>

          {/* BOTÃO (NÃO ALTERADO) */}
          <button
            onClick={handleFakePayment}
            disabled={loading}
            className="w-full bg-[#009EE3] text-white py-4 rounded-2xl font-semibold shadow-md hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-50"
          >
            {loading ? "Processando pagamento..." : "Confirmar pagamento"}
          </button>

          <p className="text-xs text-center text-gray-400">
            Ambiente de testes • Nenhuma cobrança real
          </p>

        </div>
      </div>
    </section>
  );
}

export default Checkout;