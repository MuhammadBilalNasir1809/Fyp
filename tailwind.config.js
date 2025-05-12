/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/Components/NutriScan/Nutriscan.jsx", // Correct path for Nutriscan.jsx
    "./src/Components/NutritionistSection/NutritionistSection.jsx", // Correct path for NutritionistSection.jsx
    // Optionally, include other folders or files here
    "./src/**/*.{js,jsx,ts,tsx}", // This will cover all js/ts/tsx files in the src folder, a more general approach
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
