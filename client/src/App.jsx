import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import RestaurantDetails from "./pages/restaurant/RestaurantDetails";
import ApiDemo from "./components/demo/ApiDemo";
import Checkout from "./pages/checkout/Checkout";
import Signin from "./pages/auth/signin/Signin";
import SignUp from './pages/auth/signup/SignUp';
import Profile from './pages/profile/Profile';
import MyRestro from './pages/my-restro/MyRestro';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/restaurant-details/:id" element={<RestaurantDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/demo" element={<ApiDemo />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-restaurant" element={<MyRestro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
