import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css"; // Make sure to create a corresponding CSS file for styling

const ChangePassword = () => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate the new passwords match
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    // Placeholder for password change logic
    try {
      // Here you would call your backend service to change the password
      console.log("Password change requested:", passwords);

      // Simulate password change success
      alert("Password successfully changed.");
      // Redirect user to the profile page or login page after successful password change
      navigate("/profile-management");
    } catch (error) {
      // Handle errors (e.g., current password incorrect, new password doesn't meet criteria)
      setError("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="changePassword">
      <h2>Change Password</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
