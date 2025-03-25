import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Home";
import "./App.css";
import LoginAccount from "./pages/LoginAccount";
import CreateAccount from "./pages/CreateAccount";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/loginaccount" element={<LoginAccount />} />
        <Route path="/createaccount" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
