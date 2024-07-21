import { RouterProvider, createBrowserRouter } from "react-router-dom"

import Menu, { loader as menuLoader } from "./features/menu/Menu"
import Home from "./features/ui/Home"
import Cart from "./features/cart/Cart"
import CreateOrder from "./features/order/CreateOrder"
import Order from "./features/order/Order"
import AppLayout from "./features/ui/AppLayout"
import Error from './features/ui/Error'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:orderid",
        element: <Order />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App