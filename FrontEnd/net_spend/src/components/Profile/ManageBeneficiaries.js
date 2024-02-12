import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ManageBeneficiaries.css'; // Ensure you have corresponding CSS for styling

const ManageBeneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);

  useEffect(() => {
    // Fetch the list of beneficiaries from the backend
    fetchBeneficiaries();
  }, []);

  const fetchBeneficiaries = async () => {
    try {
      // Replace this with an actual call to your backend
      const response = await fetch('/api/beneficiaries');
      const data = await response.json();
      setBeneficiaries(data);
    } catch (error) {
      console.error('Failed to fetch beneficiaries:', error);
      // Handle the error state properly in a real application
    }
  };

  const handleRemoveBeneficiary = async (beneficiaryId) => {
    try {
      // Replace this with an actual call to your backend to remove a beneficiary
      console.log(`Removing beneficiary with ID: ${beneficiaryId}`);
      // Simulate API call
      setBeneficiaries(beneficiaries.filter(b => b.id !== beneficiaryId));
      alert('Beneficiary removed successfully.');
    } catch (error) {
      console.error('Failed to remove beneficiary:', error);
      // Handle the error state properly in a real application
    }
  };

  return (
    <div className="manageBeneficiaries">
      <h2>Manage Beneficiaries</h2>
      <Link to="/add-beneficiary">Add New Beneficiary</Link>
      <div className="beneficiaryList">
        {beneficiaries.length > 0 ? (
          beneficiaries.map((beneficiary) => (
            <div key={beneficiary.id} className="beneficiaryItem">
              <p>{beneficiary.name} - {beneficiary.accountNumber}</p>
              <button onClick={() => handleRemoveBeneficiary(beneficiary.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No beneficiaries added.</p>
        )}
      </div>
    </div>
  );
};

export default ManageBeneficiaries;
