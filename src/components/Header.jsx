import React, { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center sticky top-0">
      <h1 className="text-xl font-bold">Aartech <span className="text-blue-500">Solonics</span></h1>

      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-6">
        <a href="/" className="hover:text-blue-400">Home</a>
        <a href="/about" className="hover:text-blue-400">About</a>
        <a href="/products" className="hover:text-blue-400">Products</a>
        <a href="/contact" className="hover:text-blue-400">Contact</a>
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 right-6 bg-gray-800 w-40 rounded-lg shadow-lg p-4 flex flex-col space-y-3 md:hidden">
          <a href="/" className="hover:text-blue-400">Home</a>
          <a href="/about" className="hover:text-blue-400">About</a>
          <a href="/products" className="hover:text-blue-400">Products</a>
          <a href="/contact" className="hover:text-blue-400">Contact</a>
        </div>
      )}
    </header>
  );
}
