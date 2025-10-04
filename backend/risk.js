function classifyRisk(factors) {
  let score = 0;
  const rationale = [];

  if (factors.includes('smoking')) {
    score += 40;
    rationale.push('smoking');
  }
  if (factors.includes('poor diet')) {
    score += 25;
    rationale.push('high sugar diet');
  }
  if (factors.includes('low exercise')) {
    score += 15;
    rationale.push('low activity');
  }

  let risk_level = 'low';
  if (score >= 70) {
    risk_level = 'high';
  } else if (score >= 40) {
    risk_level = 'medium';
  }

  return { risk_level, score, rationale };
}

module.exports = { classifyRisk };
