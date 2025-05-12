// Home.js
import React from 'react';
import Banner from '../../Components/Banner/Banner'
import Footer from '../../Components/Footer/Footer'
import Nutriscan from '../../Components/NutriScan/Nutriscan'
import Nutritionist from '../../Components/NutritionistSection/NutritionistSection'
import NutriScanDetails from '../../Components/NutriScanDetails/NutriScanDetails'
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="content">
        <Banner />
        <Nutriscan />
        <NutriScanDetails />
        <Nutritionist />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
