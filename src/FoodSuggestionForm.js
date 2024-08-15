// src/FoodSuggestionForm.js
import React, { useState } from "react";
import { products } from "./products";

const FoodSuggestionForm = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [activity, setActivity] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);

    let foodRecommendation = "";
    let productCategories = [];

    if (bmi < 18.5) {
      foodRecommendation = "You are underweight. Consider eating calorie-dense foods like nuts, whole grains, and dairy.";
      productCategories = ["calorie-dense", "balanced-diet"];
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      foodRecommendation = "You have a healthy weight. Keep up with a balanced diet including fruits, vegetables, and lean proteins.";
      productCategories = ["balanced-diet", "lean-protein"];
    } else {
      foodRecommendation = "You are overweight. Focus on eating more vegetables, lean proteins, and whole grains.";
      productCategories = ["low-carb", "lean-protein", "vegetables"];
    }

    if (activity === "high") {
      foodRecommendation += " Since you have a high activity level, include more complex carbs like sweet potatoes and brown rice.";
      productCategories.push("complex-carbs");
    } else if (activity === "low") {
      foodRecommendation += " Since you have a low activity level, reduce your carb intake and focus on more vegetables.";
      productCategories.push("low-carb", "vegetables");
    }

    const recommended = products.filter(product => productCategories.includes(product.category));
    setSuggestion(foodRecommendation);
    setRecommendedProducts(recommended);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium">Weight (kg): </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            className="p-2 border rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Height (cm): </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
            className="p-2 border rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Gender: </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="p-2 border rounded-lg"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Activity Level: </label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            required
            className="p-2 border rounded-lg"
          >
            <option value="">Select Activity Level</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Get Suggestion
        </button>
      </form>
      {suggestion && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Suggested Food:</h3>
          <p className="mt-2">{suggestion}</p>
          <h4 className="mt-4 text-lg font-medium">Recommended Products:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {recommendedProducts.map((product) => (
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
  <div className="relative group">
    <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />
    <div className="absolute inset-0 bg-gray-800 bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4 z-10">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p>Calories: {product.nutrition.calories}</p>
      <p>Protein: {product.nutrition.protein}</p>
      <p>Carbs: {product.nutrition.carbs}</p>
      <p>Fat: {product.nutrition.fat}</p>
    </div>
  </div>
  <div className="p-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <span className="text-gray-600">${product.price}</span>
    </div>
    <button 
      onClick={() => addToCart(product)}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 z-20 relative"
    >
      Add to Cart
    </button>
  </div>
</div>

            ))}
          </div>
        </div>
      )}
      {cart.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Shopping Cart:</h3>
          <ul className="mt-2 space-y-2">
            {cart.map((product, index) => (
              <li key={index} className="border p-2 rounded-lg bg-gray-50">
                {product.name} - ${product.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <div className="p-4">
      <button
        className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
      >
        Proceed to Checkout
      </button>
    </div>
        </div>
      )
      }
    </div>
  );
};

export default FoodSuggestionForm;
