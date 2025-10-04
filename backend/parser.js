const expectedFields = {
  age: 'number',
  smoker: 'boolean',
  exercise: 'string',
  diet: 'string',
};

function parseSurveyData(data) {
  const answers = {};
  const missingFields = [];
  let foundFieldsCount = 0;

  for (const field in expectedFields) {
    let value = data[field];

    if (value !== undefined && value !== null && value !== '') {
      if (expectedFields[field] === 'number') {
        value = parseInt(value, 10);
        if (isNaN(value)) {
          value = undefined;
        }
      } else if (expectedFields[field] === 'boolean') {
        value = String(value).toLowerCase();
        if (value === 'yes' || value === 'true') {
          value = true;
        } else if (value === 'no' || value === 'false') {
          value = false;
        } else {
          value = undefined;
        }
      }
      
      if (value !== undefined) {
        answers[field] = value;
        foundFieldsCount++;
      } else {
        missingFields.push(field);
      }
    } else {
      missingFields.push(field);
    }
  }

  const totalFields = Object.keys(expectedFields).length;
  const confidence = totalFields > 0 ? (foundFieldsCount / totalFields) : 0;

  return { answers, missingFields, confidence };
}

module.exports = { parseSurveyData, expectedFields };
