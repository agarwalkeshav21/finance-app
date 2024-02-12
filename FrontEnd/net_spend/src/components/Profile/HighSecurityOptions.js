import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HighSecurityOptions.css"; // Ensure you have corresponding CSS for styling

const HighSecurityOptions = () => {
  const navigate = useNavigate();
  const [securitySettings, setSecuritySettings] = useState({
    enableOTP: false,
    transactionLimit: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Placeholder for updating high security options
    try {
      console.log("Security settings update:", securitySettings);
      // Here you would call your backend service to update the high security settings

      alert("High security options updated successfully.");
      navigate("/profile-management"); // Redirect to profile or another relevant page
    } catch (error) {
      // Handle error scenarios
      alert("Failed to update high security options. Please try again.");
    }
  };

  return (
    <div className="highSecurityOptions">
      <h2>High Security Options</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="enableOTP">
            <input
              type="checkbox"
              id="enableOTP"
              name="enableOTP"
              checked={securitySettings.enableOTP}
              onChange={handleChange}
            />
            Enable OTP for transactions
          </label>
        </div>
        <div className="formGroup">
          <label htmlFor="transactionLimit">Set Transaction Limit:</label>
          <input
            type="number"
            id="transactionLimit"
            name="transactionLimit"
            value={securitySettings.transactionLimit}
            onChange={handleChange}
            min="0"
          />
        </div>
        <button type="submit">Update Security Options</button>
      </form>
    </div>
  );
};

export default HighSecurityOptions;
