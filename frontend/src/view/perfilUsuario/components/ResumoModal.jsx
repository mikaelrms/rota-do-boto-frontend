import { createPortal } from "react-dom";
import { useEffect } from "react";
import { X } from "lucide-react";

const formatarData = (dataIso) => {
  if (!dataIso) return "--";
  const [ano, mes, dia] = dataIso.split('-');
  return `${dia}/${mes}/${ano}`;
};

function ResumoModal({ order, onClose }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  if (!order) return null;

  const itens = [
    { label: "Código da reserva", value: order.id, mono: true },
    { label: "Embarcação", value: order.nome },
    { label: "Data de partida", value: formatarData(order.date) },
    { label: "Duração da viagem", value: order.tempo || "--" },
    { label: "Assentos", value: order.seats?.join(", ") || "--" },
    { label: "Passageiros", value: order.passageiros || order.seats?.length || "--" },
    { label: "Valor por passagem", value: `R$ ${Number(order.price || 0).toFixed(2)}` },
    { label: "Status", value: order.status === "paid" ? "Confirmado" : order.status },
  ];

  return createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-[9998]"
      />

      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">

          {/* Header */}
          <div className="bg-[#009EE3] px-6 py-5 flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs font-medium uppercase tracking-wide">
                Resumo do pedido
              </p>
              <h2 className="text-white font-bold text-lg">
                {order.origem} → {order.destino}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center"
            >
              <X size={16} className="text-white" />
            </button>
          </div>

          {/* Conteúdo */}
          <div className="p-6 flex flex-col gap-3">
            {itens.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0"
              >
                <span className="text-xs text-gray-400 uppercase font-semibold tracking-wide">
                  {item.label}
                </span>
                <span className={`text-sm font-semibold text-gray-700 ${item.mono ? "font-mono text-xs" : ""}`}>
                  {item.value}
                </span>
              </div>
            ))}

            {/* Total */}
            <div className="mt-2 bg-sky-50 rounded-2xl p-4 flex items-center justify-between">
              <span className="text-sky-700 font-semibold text-sm">Total pago</span>
              <span className="text-[#009EE3] font-bold text-2xl">
                R$ {Number(order.total || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

export default ResumoModal;