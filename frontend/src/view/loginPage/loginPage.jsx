import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [senha, setSenha] = useState("");

const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, senha);
      navigate("/");
    } catch (error) {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };
return (
<section className="min-h-screen w-full bg-[linear-gradient(#00000080,#0000004D),url('/bg-login.jpg')] 
bg-cover bg-center flex items-center justify-center">
  
  <div className="flex flex-col md:flex-row w-full max-w-6xl items-center justify-between px-6 gap-10">
    
    <div className="max-w-md text-center md:text-left space-y-4">
      <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
        Seu próximo destino começa aqui
      </h1>

      <p className="text-lg md:text-xl text-white leading-relaxed drop-shadow-2lg">
        Gerencie suas viagens e compre passagens em poucos cliques
      </p>
    </div>
    
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full md:w-[400px]">
      
      <input type="email" placeholder="Digite seu email" onChange={(e) => setEmail(e.target.value)}
      className="w-full text-black border border-gray-400 rounded-full px-4 py-2 outline-none mb-6"/>
      
      <input type="password" placeholder="Digite sua senha" onChange={(e) => setSenha(e.target.value)} 
      className="w-full text-black border border-gray-400 rounded-full px-4 py-2 outline-none mb-6"/>

      <button onClick={handleLogin} className="w-full text-white bg-sky-700 hover:bg-sky-800 
      font-medium py-2 rounded-lg shadow-md 
      transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95">
        Entrar
      </button>
      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      <Link to="/cadastro" className="block mt-4 text-center text-sm text-sky-700 hover:text-sky-800 transition-colors duration-200">
        CRIAR UMA CONTA
      </Link>
    </div>

  </div>

</section>
);
}
export default LoginPage;