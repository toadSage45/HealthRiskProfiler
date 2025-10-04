const express = require('express');
const { createWorker } = require('tesseract.js');
const { parseSurveyData, expectedFields } = require('./parser');
const { extractFactors, generateRecommendations } = require('./ai');
const { classifyRisk } = require('./risk');

const router = express.Router();

router.post('/profile/parse', async (req, res) => {
  let inputData = req.body;
  let ocrConfidence = 1.0;

  if (inputData.image) {
    try {
      const worker = await createWorker('eng');
      const { data: { text, confidence } } = await worker.recognize(Buffer.from(inputData.image, 'base64'));
      await worker.terminate();

      ocrConfidence = confidence / 100;

      const ocrParsed = {};
      const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      lines.forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          const key = parts[0].trim().toLowerCase();
          const value = parts.slice(1).join(':').trim();
          if (expectedFields[key]) {
            ocrParsed[key] = value;
          }
        }
      });
      inputData = ocrParsed;
    } catch (error) {
      console.error('OCR Error:', error);
      return res.status(500).json({ status: 'error', message: 'OCR processing failed.' });
    }
  }

  const { answers, missingFields, confidence } = parseSurveyData(inputData);

  const totalFields = Object.keys(expectedFields).length;
  if (missingFields.length / totalFields > 0.5) {
    return res.status(200).json({ status: 'incomplete_profile', reason: '>50% fields missing' });
  }

  const jsonOutput = {
    answers,
    missing_fields: missingFields,
    confidence: parseFloat((confidence * ocrConfidence).toFixed(2)),
  };

  console.log(JSON.stringify(jsonOutput, null, 2));

  res.status(200).json(jsonOutput);
});

router.post('/profile/analyze', async (req, res) => {
  const { answers } = req.body;

  if (!answers) {
    return res.status(400).json({ status: 'error', message: 'Missing answers in request body.' });
  }

  const { factors, confidence: factorsConfidence } = await extractFactors(answers);
  const { risk_level, score, rationale } = classifyRisk(factors);
  const { recommendations, status } = await generateRecommendations(risk_level, factors);

  const jsonOutput = {
    risk_level,
    factors,
    recommendations,
    status,
    score,
    rationale,
    confidence: factorsConfidence
  };

  console.log(JSON.stringify(jsonOutput, null, 2));

  res.status(200).json(jsonOutput);
});

module.exports = router;
