import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import Layout from './view/components/Layout/layout.jsx'
import AuthLayout from './view/components/AuthLayout/authLayout.jsx'
import PrivateRoute from "./routes/PrivateRoute";
import { ScrollSearchProvider } from './context/ScrollSearchContext.jsx';

// Lazy imports — cada página só carrega quando o usuário navegar até ela
const LoginPage     = lazy(() => import('./view/loginPage/loginPage'))
const Home          = lazy(() => import('./view/Home/home.jsx'))
const CadastroForm  = lazy(() => import('./view/cadastro/cadastro.jsx'))
const PaginaPerfil  = lazy(() => import('./view/perfilUsuario/PaginaPerfil.jsx'))
const Resultados    = lazy(() => import('./view/resultados/resultados.jsx'))
const Pedido        = lazy(() => import('./view/pedido/pedido.jsx'))
const Carrinho      = lazy(() => import('./view/carrinho/carrinho.jsx'))
const Manutencao    = lazy(() => import('./view/manutencao/manutencao.jsx'))
const Checkout      = lazy(() => import('./view/checkout/checkout.jsx'))
const Success       = lazy(() => import('./view/checkout/success.jsx'))
const Admin = lazy(() => import('./view/admin/Admin.jsx'))

const router = createBrowserRouter([
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
        element:
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
      },
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
            <PaginaPerfil />
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
  {
    path: "/success",
    element: (
      <PrivateRoute>
        <Success />
      </PrivateRoute>
    )
  },
  {
  path: "/admin",
  element: <Admin />
  }
]);

function App() {
  return (
    // Suspense é obrigatório com lazy — exibe um fallback enquanto a página carrega
    <Suspense fallback={
      <>Carregando . . .</>
    }>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App