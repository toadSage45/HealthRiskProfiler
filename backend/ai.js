const { model, safetySettings } = require('./config');

async function extractFactors(answers) {
  try {
    const prompt = `Given the following lifestyle survey answers, identify key health risk factors. Respond with a JSON array of factors. Examples: ["smoking", "poor diet", "low exercise"].
    Answers: ${JSON.stringify(answers)}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      safetySettings,
    });
    const response = await result.response;
    const text = response.text();

    const factors = JSON.parse(text.replace(/```json\n|\n```/g, ''));

    return { factors, confidence: 0.95 };
  } catch (error) {
    console.error('Error extracting factors with Gemini API:', error);
    return { factors: [], confidence: 0.5 };
  }
}

async function generateRecommendations(riskLevel, factors) {
  try {
    const prompt = `Given the following risk level and health factors, generate actionable, non-diagnostic health recommendations. Respond with a JSON array of recommendations. Examples: ["Quit smoking", "Reduce sugar intake"].
    Risk Level: ${riskLevel}
    Factors: ${JSON.stringify(factors)}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      safetySettings,
    });
    const response = await result.response;
    const text = response.text();

    const recommendations = JSON.parse(text.replace(/```json\n|\n```/g, ''));

    return { recommendations, status: 'ok' };
  } catch (error) {
    console.error('Error generating recommendations with Gemini API:', error);
    return { recommendations: ["Consult a healthcare professional for personalized advice."], status: 'error' };
  }
}

module.exports = { extractFactors, generateRecommendations };
