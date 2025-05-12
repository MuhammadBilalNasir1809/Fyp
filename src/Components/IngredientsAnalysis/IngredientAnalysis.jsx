import React, { useState } from "react";
import "./IngredientAnalysis.css";

function removeBracketInfo(ingredient) {
  const cleanedIngredient = ingredient.replace(/(\[.*?\]|\(.*?\)|\{.*?\})/g, '').trim();
  return cleanedIngredient;
}

function removeKeywords(ingredient) {
  const cleanedIngredient = ingredient.replace(/\b(?:Preservat[il]ve|Stabil[il]zer|and|or|1|Stabilizers|Preservatives|ingredient):?\s*/gi, '');
  return cleanedIngredient;
}

function cleanText(text) {
  const cleanedText = text.replace(/[^\w\s,.\(\)\[\]\-&:{}]/g, '').replace(/\s+/g, ' ').trim();
  return cleanedText;
}

const IngredientAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [ingredients, setIngredients] = useState({
    other_ingredients: [],
    stabilizers: [],
    preservatives: [],
  });
  const [dbIngredientInfo, setDbIngredientInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = "https://2627-103-179-240-151.ngrok-free.app";

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewSrc(null);
    }
  };

  const SafetyLevelIndicator = ({ safetyLevel }) => {
    if (!safetyLevel) return null;

    const unsafeLevels = ['Avoid', 'Certain People Should Avoid'];
    const cautionLevels = ['Cut Back', 'Caution'];
    const safeLevels = ['Safe'];

    let indicatorClass = '';
    let symbol = '';

    if (unsafeLevels.includes(safetyLevel)) {
      indicatorClass = 'safety-unsafe';
      symbol = '✖';
    } else if (cautionLevels.includes(safetyLevel)) {
      indicatorClass = 'safety-caution';
      symbol = '!';
    } else if (safeLevels.includes(safetyLevel)) {
      indicatorClass = 'safety-safe';
      symbol = '✔';
    }

    return (
      <div className={`safety-indicator ${indicatorClass}`}>
        <span className="safety-symbol">{symbol}</span>
        <span className="safety-level">{safetyLevel}</span>
      </div>
    );
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      setIsLoading(true); // Show loader
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await fetch(`${baseUrl}/upload-image`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log("Full Upload response:", data);

        if (data.success) {
          setResponseMessage("Image uploaded and ingredients extracted successfully!");
          setIngredients(data.ingredients || { other_ingredients: [], stabilizers: [], preservatives: [] });
          setDbIngredientInfo(data.db_ingredient_info || {});
          console.log("Detailed DB Ingredient Info:", JSON.stringify(data.db_ingredient_info, null, 2));
        } else {
          setResponseMessage(data.message || "Failed to process the image.");
        }
      } catch (error) {
        console.error("Error during upload:", error);
        setResponseMessage(`Error uploading image: ${error.message}`);
      } finally {
        setIsLoading(false); // Hide loader
      }
    } else {
      alert("Please select a file first!");
    }
  };

  const handleDelete = () => {
    setSelectedFile(null);
    setPreviewSrc(null);
    setResponseMessage("");
    setIngredients({
      other_ingredients: [],
      stabilizers: [],
      preservatives: [],
    });
    setDbIngredientInfo({});
    document.getElementById("file-upload").value = "";
  };

  const renderNutritionalInfo = (ingredientInfo) => {
    if (!ingredientInfo || (!ingredientInfo.basic_info && !ingredientInfo.detailed_info)) return null;

    const basicInfo = ingredientInfo.basic_info || {};
    const detailedInfo = ingredientInfo.detailed_info || {};

    const infoSections = [
      ...(basicInfo.caloric_value ? [{ label: 'Calories', value: basicInfo.caloric_value }] : []),
      ...(basicInfo.carbohydrates ? [{ label: 'Carbohydrates', value: basicInfo.carbohydrates }] : []),
      ...(basicInfo.cholesterol ? [{ label: 'Cholesterol', value: basicInfo.cholesterol }] : []),
      ...(basicInfo.protein ? [{ label: 'Protein', value: basicInfo.protein }] : []),
      ...(detailedInfo.Health_Concern ? [{ label: 'Health Concern', value: detailedInfo.Health_Concern }] : []),
      ...(detailedInfo.Purpose ? [{ label: 'Purpose', value: detailedInfo.Purpose }] : []),
      ...(detailedInfo.Safety_Level ? [{ label: 'Safety Level', value: detailedInfo.Safety_Level, component: SafetyLevelIndicator }] : []),
      ...(detailedInfo.health_benefits ? [{ label: 'Health Benefits', value: detailedInfo.health_benefits }] : []),
      ...(detailedInfo.potential_allergens ? [{ label: 'Potential Allergens', value: detailedInfo.potential_allergens }] : [])
    ];

    if (infoSections.length === 0) return null;

    return (
      <ul>
        {infoSections.map((info, index) => (
          <li key={index}>
            <span>{info.label}:</span>
            {info.component ? (
              <info.component safetyLevel={info.value} />
            ) : (
              info.value
            )}
          </li>
        ))}
      </ul>
    );
  };

  const renderIngredientSection = (title, ingredientList) => {
    if (ingredientList.length === 0) return null;

    return (
      <div className="extracted-ingredients">
        <h3>{title}</h3>
        <ul>
          {ingredientList.map((ingredient, index) => {
            const cleanedIngredient = removeKeywords(removeBracketInfo(cleanText(ingredient)));
            const ingredientInfo = dbIngredientInfo[cleanedIngredient];

            return (
              <li key={index}>
                {cleanedIngredient}
                {renderNutritionalInfo(ingredientInfo)}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="ingredient-analysis">
      <h2>Upload Food Image for Ingredient Analysis</h2>

      {isLoading && (
        <div className="loader">
          <div className="spinner"></div>
          <p>Processing your image, please wait...</p>
        </div>
      )}

      {!isLoading && (
        <form className="ingredient-analysis-form" onSubmit={handleUpload}>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">Choose a file</label>

          {previewSrc && (
            <div className="uploaded-image">
              <img src={previewSrc} alt="Uploaded Preview" />
              <button
                type="button"
                className="delete-button"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}

          <button type="submit">Upload</button>
        </form>
      )}

      {!isLoading && (
        <>
          {renderIngredientSection("Main Ingredients", ingredients.other_ingredients)}
          {renderIngredientSection("Stabilizers", ingredients.stabilizers)}
          {renderIngredientSection("Preservatives", ingredients.preservatives)}
        </>
      )}
    </div>
  );
};

export default IngredientAnalysis;
