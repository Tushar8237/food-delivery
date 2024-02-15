import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import SignIn from "./components/o-auth/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
