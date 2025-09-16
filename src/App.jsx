import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./pages/Hero"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Register from "./pages/Register";
import RequestDemo from "./pages/RequestDemo";
import TechnicalSpec from "./pages/TechnicalSpec";
import AnalogMeasurement from "./pages/AnalogMeasurement";
import DR from "./pages/DR";
import Events from "./pages/Events";
import Services from "./pages/Services";
import ModbusControlPanel from "./pages/ModbusControlPanel";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/request-demo" element={<RequestDemo />} />
            <Route path="/technical-specifications" element={<TechnicalSpec />} />
            <Route path="/analog-data" element={<AnalogMeasurement />} />
            <Route path="/disturbance" element={<DR />} />
            <Route path="/events" element={<Events />} />
            <Route path="/services" element={<Services />} />
            <Route path="/relay" element={<ModbusControlPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
