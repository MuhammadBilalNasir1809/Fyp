// Banner.js
import React from 'react';
import './Banner.css'; // Add a separate CSS file for banner styles
import home_page_image from '../../assets/home_page_img.jpg';

const Banner = () => {
  return (
    <div className="banner">
      <div className="image-container-home">
        <img src={home_page_image} alt="Healthcare" />
        <div className="features-container">
          <h2>Why Choose NutriScan?</h2>
          <ul>
            <li>Accurate Nutritional Analysis</li>
            <li>Personalized Diet Plans</li>
            <li>Consult a Nutritionist</li>
            <li>User-Friendly Interface</li>
            <li>Culturally Relevant To Pakistani Cuisines</li>
            <li>User can give Generated Diet Plan Feedback</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Banner;
