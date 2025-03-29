import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LoginAccount from "./pages/LoginAccount";
import CreateAccount from "./pages/CreateAccount";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Class from "./pages/Class";
import Course from "./pages/Course";
import Lesson from "./pages/Lesson";
import { AuthProvider } from "./utils/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      {/* Envolva toda a aplicação com o AuthProvider */}
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginaccount" element={<LoginAccount />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          {/* Outras rotas aqui */}
          <Route path="*" element={<NotFound />} /> {/* Rotas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/class" element={<Class />} />
            <Route path="/course/:id" element={<Course />} />
            <Route path="/lesson/:id" element={<Lesson />} />
          </Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
