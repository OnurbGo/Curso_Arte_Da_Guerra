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
import Profile from "./pages/Profile";
import MyCourses from "./pages/MyCourses";
import MyInscription from "./pages/MyInscription";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/loginaccount" element={<LoginAccount />} />
              <Route path="/createaccount" element={<CreateAccount />} />
              <Route path="*" element={<NotFound />} />
              <Route element={<PrivateRoute />}>
                <Route path="/class" element={<Class />} />
                <Route path="/course/:id" element={<Course />} />
                <Route path="/lesson/:id" element={<Lesson />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/mycourses" element={<MyCourses />} />
                <Route path="/myinscription" element={<MyInscription />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
