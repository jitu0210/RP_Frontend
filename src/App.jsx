import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your components/pages
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./pages/Hero"

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
