import { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"
import { AuthProvider } from "./contexts/FakeAuthContext"
import ProtectedRoute from "./pages/ProtectedRoute"

import { CitiesProvider } from "./contexts/CitiesContext"
import SpinnerFullPage from "./components/SpinnerFullPage"
const Homepage = lazy(() => import("./pages/Homepage"))
const Pricing = lazy(() => import("./pages/Pricing"))
const Product = lazy(() => import("./pages/Product"))
const PageNotFound = lazy(() => import("./pages/PageNotFound"))
const AppLayout = lazy(() => import("./pages/AppLayout"))
const Login = lazy(() => import("./pages/Login"))

// dist/index.html                   0.45 kB │ gzip:   0.29 kB
// dist/assets/index-Dx0eSCUU.css   29.95 kB │ gzip:   5.05 kB
// dist/assets/index-pDKw54fP.js   508.62 kB │ gzip: 148.27 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
