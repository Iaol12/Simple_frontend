import React from 'react';

const DataScreen = ({ formData }) => {
  return (
    <div className="container">
      <h1>Submitted Data</h1>
      <p><strong>Name:</strong> {formData.name}</p>
      <p><strong>Email:</strong> {formData.email}</p>
      <p><strong>Date of Birth:</strong> {formData.dob}</p>
      <p><strong>Country:</strong> {formData.country}</p>
      <p><strong>Currency:</strong> {formData.currency}</p>
    </div>
  );
};

export default DataScreen;
