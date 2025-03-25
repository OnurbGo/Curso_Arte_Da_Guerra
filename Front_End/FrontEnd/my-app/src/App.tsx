import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import "./App.css";
import LoginAccount from "./pages/LoginAccount";
import CreateAccount from "./pages/CreateAccount";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginaccount" element={<LoginAccount />} />
        <Route path="/createaccount" element={<CreateAccount />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
