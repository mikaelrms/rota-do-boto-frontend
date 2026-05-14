import { Ticket } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

function Historico({ orders, loading }) {
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-8 h-8 border-[3px] border-[#009EE3] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-400">Carregando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-8 animate-in slide-in-from-bottom-4 duration-500">
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center">
            <Ticket size={32} className="text-gray-300" />
          </div>
          <p className="text-gray-400 text-sm">Você ainda não possui pedidos realizados.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="h-1 w-full bg-[#009EE3]" />

              <div className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">
                      Código da reserva
                    </p>
                    <p className="font-mono text-sm text-gray-700 font-semibold">
                      {order.id}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="text-xs text-gray-400 hidden sm:block">{user?.email}</p>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-[#009EE3] border border-sky-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#009EE3] inline-block" />
                      {order.status === "paid" ? "Confirmado" : order.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-5 p-4 bg-sky-50 rounded-xl">
                  <div className="text-center">
                    <p className="text-[10px] text-sky-400 uppercase font-bold mb-0.5">Origem</p>
                    <p className="text-base font-bold text-sky-700">{order.origem}</p>
                  </div>

                  <div className="flex-1 flex items-center gap-1">
                    <div className="flex-1 h-px bg-sky-200" />
                    <div className="w-2 h-2 rounded-full bg-[#009EE3]" />
                    <div className="flex-1 h-px bg-sky-200" />
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] text-sky-400 uppercase font-bold mb-0.5">Destino</p>
                    <p className="text-base font-bold text-sky-700">{order.destino}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {[
                    { label: "Partida", value: order.dataPartida || "--" },
                    { label: "Duração", value: order.tempo || "--" },
                    { label: "Embarcação", value: order.nome },
                    { label: "Assentos", value: order.seats?.join(", ") },
                  ].map((item) => (
                    <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-700 truncate">
                        {item.value || "--"}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-0.5">
                      Total pago
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      R$ {Number(order.total || 0).toFixed(2)}
                    </p>
                  </div>

                  <button className="bg-[#009EE3] hover:brightness-95 active:scale-95 transition text-white text-xs font-semibold px-5 py-2.5 rounded-xl">
                    Ver resumo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Historico;