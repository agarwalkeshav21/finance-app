import React from 'react';
import { Link } from 'react-router-dom';

const ProfileManagement = () => {
    return (
        <div className="profileManagement">
            <h1>Profile Management</h1>
            <ul>
                <li>
                    <Link to="/profile/personal-details-update">Update Personal Details</Link>
                </li>
                <li>
                    <Link to="/profile/change-password">Change Password</Link>
                </li>
                <li>
                    <Link to="/profile/manage-beneficiaries">Manage Beneficiaries</Link>
                </li>
                <li>
                    <Link to="/profile/high-security-options">High Security Options</Link>
                </li>
            </ul>
        </div>
    );
};

export default ProfileManagement;
