import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home/Home';
import FeaturePage from './Components/Features/Features';
import IngredientAnalysis from './Components/IngredientsAnalysis/IngredientAnalysis';
import Signup from './Components/LoginSignup/Signup';
import LoginIn from './Components/LoginIn/LoginIn';
import Navbar from './Components/Navbar/Navbar';
import ForgotPassword from './Components/LoginIn/ForgotPassword';
import ResetPassword from './Components/LoginIn/ResetPassword';
import DietPlan from './Components/DietPlan/DietPlan';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Navbar setIsLoggedIn={setIsLoggedIn}  isLoggedIn={isLoggedIn} /> {/* Keep Navbar outside of Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturePage isLoggedIn={isLoggedIn} />} />
        <Route path="/ingredient-analysis" element={<IngredientAnalysis />} />
        <Route path="/diet-plan" element={<DietPlan />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<LoginIn setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
