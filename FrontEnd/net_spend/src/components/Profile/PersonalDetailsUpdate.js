import React, { useState } from 'react';

const PersonalDetailsUpdate = () => {
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        phoneNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Here, implement your logic to submit these details to the backend
            console.log('Updating user details:', userDetails);
            // Assume a successful API call to update user details
            alert('Details updated successfully!');
        } catch (error) {
            console.error('Error updating details:', error);
            alert('Failed to update details. Please try again.');
        }
    };

    return (
        <div className="personalDetailsUpdate">
            <h2>Update Personal Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userDetails.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={userDetails.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Details</button>
            </form>
        </div>
    );
};

export default PersonalDetailsUpdate;
