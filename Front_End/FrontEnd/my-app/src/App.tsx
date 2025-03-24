import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import "./App.css";
import CreateAccount from "./pages/CreateAccount";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
