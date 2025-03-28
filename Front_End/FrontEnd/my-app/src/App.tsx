import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import "./App.css";
import LoginAccount from "./pages/LoginAccount";
import CreateAccount from "./pages/CreateAccount";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Class from "./pages/Class";
import Course from "./pages/Course";
import Lesson from "./pages/Lesson";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginaccount" element={<LoginAccount />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/class" element={<Class />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/lesson/:id" element={<Lesson />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
