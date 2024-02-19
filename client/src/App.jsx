import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import SignIn from "./components/o-auth/SignIn";
import RestaurantDetails from "./pages/restaurant/RestaurantDetails";
import ApiDemo from "./components/demo/ApiDemo";
import Checkout from "./pages/checkout/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/restaurant-details/:id" element={<RestaurantDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/demo" element={<ApiDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
