import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './view/components/Layout/layout.jsx'
import AuthLayout from './view/components/AuthLayout/authLayout.jsx'
import PrivateRoute from "./routes/PrivateRoute";
import { ScrollSearchProvider } from './context/ScrollSearchContext.jsx';

import LoginPage from './view/loginPage/loginPage'
import Home from './view/Home/home.jsx'
import CadastroForm from './view/cadastro/cadastro.jsx'
import Perfil from './view/perfilUsuario/Perfil.jsx';
import Resultados from './view/resultados/resultados.jsx'
import Pedido from './view/pedido/pedido.jsx'
import Carrinho from './view/carrinho/carrinho.jsx' 
import Manutencao from './view/manutencao/manutencao.jsx'
import Checkout from './view/checkout/checkout.jsx'
import Success from './view/checkout/success.jsx'



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
      {
        path: "/checkout",
        element: <Checkout />
      },
      {
        path: "/success",
        element: <Success />
      }
    ],
  },
  {
    element: <Layout />, 
    children: [
      {
        path: "/",
        element: 
        <ScrollSearchProvider>
          <Home />
        </ScrollSearchProvider>
      },
      {
        path: "/perfil",
        element: (
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        )
      },
      {
        path: "/resultados",
        element: <Resultados />,
      },
      {
        path: "/pedido",
        element: (
          <PrivateRoute>
            <Pedido />
          </PrivateRoute>
        )
      },
      {
        path: "/carrinho",
        element: (
          <PrivateRoute>
            <Carrinho />
          </PrivateRoute>
        )
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
