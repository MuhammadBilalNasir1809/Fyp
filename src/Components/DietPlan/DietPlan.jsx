import React from 'react';

const DietPlan = () => {
  const dietPlanUrl = "https://5453-34-168-37-41.ngrok-free.app";

  const containerStyle = {
    maxWidth: '800px',
    margin: '8rem auto',
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const linkStyle = {
    display: 'inline-block',
    marginTop: '1rem',
    padding: '12px 24px',
    backgroundColor: '#28a745',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease'
  };

  return (
    <div style={containerStyle} >
      <h1 style={{ color: '#2c3e50', marginBottom: '1rem' }}>
        Personalized Meal Plan Generator
      </h1>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#4a5568' }}>
        Get your customized diet plan based on your personal preferences, 
        dietary requirements, and fitness goals. Click the button below to 
        access our AI-powered meal planner that will help you achieve your 
        health objectives.
      </p>
      <a 
        href={dietPlanUrl}
        style={linkStyle}
        target="_blank"
        rel="noopener noreferrer"
        onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
      >
        Generate My Meal Plan
      </a>
      <p style={{ marginTop: '2rem', color: '#718096', fontSize: '0.9rem' }}>
        Note: You will be redirected to our secure meal planning platform
      </p>
    </div>
  );
};

export default DietPlan;