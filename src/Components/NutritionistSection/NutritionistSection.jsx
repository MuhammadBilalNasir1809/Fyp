import React from "react";
import Nutritionist from "../../assets/Nutritionist.jpeg";
export default function LightNutritionistSection() {
  return (
    <section className="relative bg-white min-h-screen px-8 py-16 overflow-hidden">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Heading */}
            <div>
              <h2 className="text-gray-700 text-3xl font-medium mb-2">
                Get the best
              </h2>
              <div className="flex items-center">
                <span className="text-gray-800 text-5xl font-bold">
                  NUTRITI
                </span>
                <span className="text-red-600 text-5xl font-bold">ONIST</span>
              </div>
            </div>

            {/* Dot Navigation with Points */}
            <div className="space-y-4">
              {[
                "Registered Dietitian with the Academy of Nutrition and Dietetics",
                "5+ years of experience in the field",
                "Specialist in weight management, chronic disease prevention, and sports nutrition",
                "Skilled in developing recipes and meal plans",
                "Passionate about helping people live healthy, fulfilling lives",
                "Committed to staying up-to-date with the latest research and trends in nutrition",
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-b from-red-400 to-red-600 flex-shrink-0" />
                  <p className="text-gray-600 text-sm">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            {/* Decorative Lines */}
            <svg
              className="absolute -top-20 -right-20 w-48 h-48 text-red-600/20"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M10,50 Q50,10 90,50"
                strokeWidth="2"
                className="text-red-600"
              />
              <path
                d="M10,60 Q50,20 90,60"
                strokeWidth="2"
                className="text-green-600"
              />
            </svg>
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={Nutritionist}
                alt="Professional nutritionist"
                width={500}
                height={600}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((dot) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full ${
                dot === 0 ? "bg-red-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
