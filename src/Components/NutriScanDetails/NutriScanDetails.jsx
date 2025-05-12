// NutriScan.js
import React from "react";
import "./NutriScanDetails.css";
import healthyLifeImage from "../../assets/healthy-life.jpeg";
import fruitImage from "../../assets/fruit.jpeg";
import cardImage2 from "../../assets/card-icon2.jpeg";
import cardImage3 from "../../assets/card-icon3.jpeg";
import questionImage from "../../assets/question.jpeg";

const NutriScanDetails = () => {
  const benefits = [
    "Improved physical health",
    "Better mental health",
    "Increased longevity",
    "Weight management",
    "Improved self-confidence",
    "Reduced stress",
  ];

  const services = [
    {
      icon: "🍎",
      title: "Ingredient Analysis",
    },
    {
      icon: "📋",
      title: "Personalized Diet Plan",
    },
    {
      icon: "👥",
      title: "Consultancy",
    },
  ];

  return (
    <section className="relative bg-white px-4 py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading with background text */}
        <div className="relative mb-15 py-5">
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            style={{
              WebkitTextStroke: "9px rgba(240, 240, 240, 0.8)",
              WebkitTextFillColor: "transparent",
          
            }}
          >
            <span className="text-[5rem] sm:text-[5rem] md:text-[10rem] font-bold select-none whitespace-nowrap tracking-tighter">
              LIFESTYLE
            </span>
          </div>
          <h2 className="relative z-10 text-6xl font-light text-center">
            Why <span className="font-bold">NutriScan</span>
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Column - Benefits List */}
          <div>
            <div className="space-y-7" style={{marginTop:'100px'}}>
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="rounded-full p-1 bg-red-100">
                    <span className="w-4 h-4 text-red-500">✔️</span>
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image Grid */}
          <div className="grid grid-cols-2 gap-4" style={{marginTop:'50px'}}>
            <img
              src={healthyLifeImage}
              alt="Meditation"
              className="rounded-lg object-cover"
            />
            <img
              src={fruitImage}
              alt="Healthy eating"
              className="rounded-lg object-cover"
            />
            <img
              src={cardImage2}
              alt="Fresh ingredients"
              className="rounded-lg object-cover"
            />
            <img
              src={cardImage3}
              alt="Fitness equipment"
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-12 bg-red-100/50 rounded-lg p-8 relative">
          <h3 className="text-center text-gray-700 mb-4">We can help with</h3>
          <div className="grid grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-2 bg-white rounded-full py-2 px-4 shadow-sm"
              >
                <span className="text-xl">{service.icon}</span>
                <span className="text-sm text-gray-700">{service.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="NutriScan-hr" />

      <section className="nutriscan-details">
        <h2>
          Have a <span>NutriScan</span> for
        </h2>

        <div className="my-cards">
          <div className="details-container">
            <div className="detail">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={cardImage2}
                      className="img-fluid rounded-start"
                      alt="unavailable"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Ingredient Analysis</h5>
                      <p className="card-text">
                        NutriScan analyzes ingredients and provides insights
                        into their nutrient content to help you make healthier
                        choices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={cardImage2}
                      className="img-fluid rounded-start"
                      alt="unavailable"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Personalized Diet Plan</h5>
                      <p className="card-text">
                        Follow a 2-day trial diet plan and fuel your body based
                        on your specific needs and lifestyle.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail" id="card3-container">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={cardImage3}
                      className="img-fluid rounded-start"
                      alt="unavailable"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Consult a Nutritionist</h5>
                      <p className="card-text">
                        Book a session with an expert nutritionist to discuss
                        and plan your diet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-left-container">
          <h3>Don't know what's the right meal plan or diet for you?</h3>
          <button className="cta-button">Sign in today</button>
        </div>
        <div className="cta-right-container">
          <img src={questionImage} alt="question mark" />
        </div>
      </section>
    </section>
  );
};

export default NutriScanDetails;
