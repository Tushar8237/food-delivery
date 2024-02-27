import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import RestaurantDetails from "./pages/restaurant/restaurant-details/RestaurantDetails";
import ApiDemo from "./components/demo/ApiDemo";
import Checkout from "./pages/checkout/Checkout";
import Signin from "./pages/auth/signin/Signin";
import SignUp from "./pages/auth/signup/SignUp";
import Profile from "./pages/profile/Profile";
import MyRestro from "./pages/restaurant/my-restro/MyRestro";
import AddRestaurant from "./pages/restaurant/add-restaurant/AddRestaurant";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Loading from "./components/loader/Loading";
import { useSelector } from 'react-redux'

function App() {
  const { currentUser } = useSelector((state) => state.user)
  

  console.log(currentUser)
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/restaurant-details/:city/:slug"
          element={<RestaurantDetails />}
        />
        <Route path="/demo" element={<ApiDemo />} />
        <Route path="/loading" element={<Loading />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-restaurant" element={<MyRestro id={currentUser?.restaurant[0]} />} />
          <Route path="/add-restaurant" element={<AddRestaurant />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


