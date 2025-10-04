import React from 'react';
import './App.css';
import { useHealthRisk } from './useHealthRisk';
import FormComponent from './components/FormComponent';
import ImageUploadComponent from './components/ImageUploadComponent';
import ResultsComponent from './components/ResultsComponent';

function App() {
  const {
    formData,
    imageFile,
    result,
    loading,
    error,
    handleChange,
    handleImageChange,
    handleSubmit
  } = useHealthRisk();

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI-Powered Health Risk Profiler</h1>
        <p>Enter your details or upload a survey image to get a health risk assessment.</p>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="profiler-form">
          <FormComponent formData={formData} handleChange={handleChange} imageFile={imageFile} />
          <ImageUploadComponent handleImageChange={handleImageChange} />
          <button type="submit" disabled={loading}>
            {loading ? 'Analyzing...' : 'Get Health Profile'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <ResultsComponent result={result} />
      </main>
    </div>
  );
}

export default App;
