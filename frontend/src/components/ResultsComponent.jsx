import React from 'react';

const ResultsComponent = ({ result }) => {
  if (!result) return null;

  return (
    <div className="results">
      <h2>Your Health Profile</h2>
      {result.status === 'incomplete_profile' ? (
        <p className="error-message">{result.reason}</p>
      ) : (
        <>
          <div className={`result-item risk-level--${result.risk_level}`}>
            <strong>Risk Level:</strong> <span>{result.risk_level}</span>
          </div>
          <div className="result-item">
            <strong>Score:</strong> <span>{result.score}</span>
          </div>
          <div className="result-item">
            <strong>Contributing Factors:</strong>
            <ul>
              {result.factors.length > 0 ? (
                result.factors.map((factor, index) => <li key={index}>{factor}</li>)
              ) : (
                <li>None</li>
              )}
            </ul>
          </div>
          <div className="result-item">
            <strong>Recommendations:</strong>
            <ul>
              {result.recommendations.map((rec, index) => <li key={index}>{rec}</li>)}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultsComponent;
