import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './view/components/Layout/layout.jsx'
import AuthLayout from './view/components/AuthLayout/authLayout.jsx'
import PrivateRoute from "./routes/PrivateRoute";

import LoginPage from './view/loginPage/loginPage'
import Home from './view/Home/home.jsx'
import CadastroForm from './view/cadastro/cadastro.jsx'
import Perfil from './view/perfilUsuario/Perfil.jsx';
import Resultados from './view/resultados/resultados.jsx'
import Pedido from './view/pedido/pedido.jsx'
import Carrinho from './view/carrinho/carrinho.jsx' 
import Manutencao from './view/manutencao/manutencao.jsx'



const router = createBrowserRouter ([
  {
    element: <AuthLayout />, 
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/cadastro",
        element: <CadastroForm />,
      },
    ],
  },
  {
    element: <Layout />, 
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/perfil",
        element: (
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        ),
      },
      {
        path: "/resultados",
        element: <Resultados />,
      },
      {
        path: "/pedido",
        element: <Pedido />
      },
      {
        path: "/carrinho",
        element: <Carrinho />
      },
    ],
  },
 {
    path: "/manutencao",
    element: <Manutencao />,
  },
]);

function App() {

return (
  <>
  <RouterProvider router = {router} />
  </>
)
}

export default App