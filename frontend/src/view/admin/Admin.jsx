import { useState } from "react";
import { Trash2, ShieldAlert } from "lucide-react";

function Admin() {
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  const resetOrders = async () => {
    setLoading(true);
    setMensagem(null);
    try {
      await fetch("http://localhost:8000/admin/reset-orders", {
        method: "DELETE",
      });
      setMensagem({ tipo: "sucesso", texto: "Todos os pedidos foram apagados!" });
    } catch{
      setMensagem({ tipo: "erro", texto: "Erro ao resetar pedidos." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm w-full max-w-sm">
        <div className="h-1 w-full bg-[#009EE3]" />

        <div className="p-8 flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center">
            <ShieldAlert size={32} className="text-[#009EE3]" />
          </div>

          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-800">Painel Admin</h1>
            <p className="text-sm text-gray-400 mt-1">Apenas para uso durante a demonstração</p>
          </div>

          <button
            onClick={resetOrders}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#009EE3] hover:brightness-95 active:scale-95 transition text-white text-sm font-semibold px-5 py-3 rounded-xl disabled:opacity-60"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
            {loading ? "Apagando..." : "Resetar todos os pedidos"}
          </button>

          {mensagem && (
            <div className={`w-full text-center text-sm font-medium px-4 py-3 rounded-xl ${
              mensagem.tipo === "sucesso"
                ? "bg-sky-50 text-[#009EE3]"
                : "bg-red-50 text-red-500"
            }`}>
              {mensagem.texto}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;