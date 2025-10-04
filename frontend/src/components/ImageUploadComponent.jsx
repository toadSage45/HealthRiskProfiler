import React from 'react';

const ImageUploadComponent = ({ handleImageChange }) => {
  return (
    <fieldset>
      <legend>Or Upload Image</legend>
      <div className="form-group">
        <label htmlFor="surveyImage">Upload Survey Image</label>
        <input
          type="file"
          id="surveyImage"
          name="surveyImage"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
    </fieldset>
  );
};

export default ImageUploadComponent;
