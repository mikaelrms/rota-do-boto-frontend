import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { auth } from "../../../firebaseConfig";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

import { User, FileText, CreditCard, Calendar, Phone, MapPin, LogOut, Ticket } from 'lucide-react';
import LabelField from './LabelField';
import ItemMenu from './ItemMenu';


const PaginaPerfil = () => {
  const { user } = useAuth();
  const [dados, setDados] = useState(null);

  const [abaAtiva, setAbaAtiva] = useState('perfil');
    const handleSignOut = () => {
    signOut(auth)
  } 

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDados(docSnap.data());
      }
    };

    fetchData();
  }, [user]);

  if (!dados) return <p>Carregando...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-12 flex items-start justify-start w-full">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 ml-0">
        
        {/* Menu lateral */}
        <div className="w-full md:w-64 flex flex-col gap-3">
          <aside className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
            <ItemMenu 
              icone={User} 
              texto="Meu Perfil" 
              ativo={abaAtiva === 'perfil'} 
              aoClicar={() => setAbaAtiva('perfil')} 
            />
            <ItemMenu 
              icone={FileText} 
              texto="Meus Pedidos" 
              ativo={abaAtiva === '/pedidos'} 
              aoClicar={() => setAbaAtiva('pedidos')} 
            />
          </aside>
          <button 
            onClick={handleSignOut}
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium shadow-sm
            border border-gray-200 hover:bg-gray-100 transition">
            Sair
          </button>
        </div>

       <main className="flex-1 bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden text-left">

        <div className="p-8 pt-4">
            {abaAtiva === 'perfil' && (
        <div className="flex flex-col gap-10">
        
        {/* Dados pessoais */}
        <section>
         <div className="px-8 pt-8 pb-4 text-left">
            <h1 className="text-sky-700 text-2xl font-bold mb-4 text-left">Dados pessoais</h1>
            <hr className="border-gray-200" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <LabelField rotulo="Nome" campo= {dados?.nome} />
            <LabelField rotulo="CPF" campo= {dados?.cpf} />
            <LabelField rotulo="Data de Nascimento" campo= {dados?.nascimento} />
            <LabelField rotulo="Telefone" campo= {dados?.telefone} />
          </div>
        </section>

        {/* Endereço */}
        <section>
          <div className="px-8 pt-8 pb-4 text-left">
            <h1 className="text-sky-700 text-2xl font-bold mb-4 text-left">Endereço</h1>
            <hr className="border-gray-200" />
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <LabelField rotulo="CEP" campo= {dados?.cep} />
            <LabelField rotulo="Município" campo= {dados?.municipio} />
            <LabelField rotulo="Bairro" campo= {dados?.bairro} />
            <LabelField rotulo="Logradouro" campo= {dados?.logradouro} />
            <LabelField rotulo="Número" campo= {dados?.numero} />
          </div>
        </section>

      </div>
    )}
  </div>
          {/* Aba - Pedidos */}
          {abaAtiva === 'pedidos' && (
            <div className="text-center py-20 animate-in slide-in-from-bottom-4 duration-500">
              <Ticket size={48} className="mx-auto text-gray-200 mb-4" />
              <h2 className="text-gray-400 italic">Você ainda não possui pedidos realizados.</h2>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default PaginaPerfil;