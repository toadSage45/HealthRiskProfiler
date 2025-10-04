import { useState } from 'react';
import { parseProfile, analyzeProfile } from './api';

export const useHealthRisk = () => {
  const [formData, setFormData] = useState({
    age: '',
    smoker: false,
    exercise: 'rarely',
    diet: 'balanced'
  });
  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      let parsedData = null;

      if (imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        await new Promise((resolve) => {
          reader.onloadend = () => {
            resolve();
          };
        });
        const base64Image = reader.result.split(',')[1];

        parsedData = await parseProfile({ image: base64Image });
      } else {
        parsedData = await parseProfile({
          ...formData,
          age: parseInt(formData.age, 10)
        });
      }

      if (parsedData.status === 'incomplete_profile') {
        setResult(parsedData);
        setLoading(false);
        return;
      }

      const analyzeResult = await analyzeProfile(parsedData.answers);
      setResult(analyzeResult);

    } catch (err) {
      setError('An error occurred. Please make sure the backend server is running and check the console for details.');
      console.error(err);
    }
    setLoading(false);
  };

  return {
    formData,
    imageFile,
    result,
    loading,
    error,
    handleChange,
    handleImageChange,
    handleSubmit
  };
};
