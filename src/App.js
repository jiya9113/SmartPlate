// src/App.js
import React from "react";
import FoodSuggestionForm from "./FoodSuggestionForm";
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Smart Plate</h1>
        <FoodSuggestionForm />
      </div>
    </div>
  );
}

export default App;
