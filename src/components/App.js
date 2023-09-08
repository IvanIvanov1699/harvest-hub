import { Navigate, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";

//Components
import NavBar from "./common/NavBar/Navbar";
import NavBarVisibility from "./common/NavBar/NavbarVisiblity";
import CartProvider from "./common/CartContext";
import PrivateRoute from "./common/PrivateRoute";

//Pages
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/NotFoundPage";
import ShoppingPage from "./pages/ShoppingPage";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const isLoggedIn = !!cookies["token"];

  const handleLogout = () => {
    removeCookie("token");
  };

  console.log("Token cookie value:", cookies["token"]);
  return (
    <CartProvider>
      <div>
        <NavBarVisibility>
          <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        </NavBarVisibility>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!isLoggedIn ? <RegisterPage /> : <Navigate to="/" />}
          />
          <Route
            path="/cart"
            element={isLoggedIn ? <CartPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/market"
            element={isLoggedIn ? <ShoppingPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/checkout"
            element={isLoggedIn ? <CheckoutPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route path="/market/*" element={<Navigate to="/market" replace />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
