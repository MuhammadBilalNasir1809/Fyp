import React from 'react';
import { useNavigate } from 'react-router-dom';
import ingredient_analysis from '../../assets/ingredient_analysis.jpg';
import diet_plan from '../../assets/DietPlan.jpg';
import nutrition_consult from '../../assets/Nutrion_consult.jpg';
import './Features.css';

const Features = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleDietPlanClick = () => {
    if (isLoggedIn) {
      navigate('/diet-plan');
    } else {
      navigate('/login');
    }
  };

  const handleIngredientAnalysis = () => {
    navigate('/ingredient-analysis');
  };

  return (
    <div className="features">
      <div className="content">
        <h2 className='my-features'>Our Features</h2>
        <div className="features-grid">
          <div className="feature-item">
            <img src={ingredient_analysis} alt="Ingredient Analysis" onClick={handleIngredientAnalysis} />
            <h3>Ingredient Analysis</h3>
            <p>Analyze food ingredients using OCR, datasets, and NLP techniques for accurate nutritional details.</p>
            <button onClick={handleIngredientAnalysis} className="learn-more-button">Learn more</button>
          </div>

          <div className="feature-item" onClick={handleDietPlanClick}>
            <img src={diet_plan} alt="Personalized Diet Plan" />
            <h3>Personalized Diet Plan</h3>
            <p>Get customized meal plans that suit your dietary needs and preferences.</p>
            <button onClick={handleDietPlanClick} className="learn-more-button">Learn more</button>
          </div>

          <div className="feature-item">
            <img src={nutrition_consult} alt="Consult a professional" />
            <h3>Consult a Professional</h3>
            <p>Receive expert recommendations from nutrition professionals.</p>
            <button className="learn-more-button">Learn more</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
