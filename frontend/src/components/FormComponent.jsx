import React from 'react';

const FormComponent = ({ formData, handleChange, imageFile }) => {
  return (
    <fieldset>
      <legend>Manual Input</legend>
      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required={!imageFile}
          min="1"
        />
      </div>
      <div className="form-group checkbox-group">
        <label htmlFor="smoker">Are you a smoker?</label>
        <input
          type="checkbox"
          id="smoker"
          name="smoker"
          checked={formData.smoker}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exercise">Exercise Frequency</label>
        <select
          id="exercise"
          name="exercise"
          value={formData.exercise}
          onChange={handleChange}
        >
          <option value="frequently">Frequently</option>
          <option value="sometimes">Sometimes</option>
          <option value="rarely">Rarely</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="diet">Diet Type</label>
        <select id="diet" name="diet" value={formData.diet} onChange={handleChange}>
          <option value="healthy">Healthy</option>
          <option value="balanced">Balanced</option>
          <option value="high sugar">High Sugar</option>
        </select>
      </div>
    </fieldset>
  );
};

export default FormComponent;
