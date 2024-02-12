import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Auth/LoginPage";
import Register from "./components/Auth/Register";
import OtpPage from "./components/Auth/OtpPage";
import Dashboard from "./components/Dashboard/Dashboard";
import AccountsSummary from "./components/Accounts/AccountsSummary";
import FundTransfer from "./components/FundTransfer/FundTransfer";
import PaymentsBills from "./components/Payments/PaymentsBills";
import ProfileManagement from "./components/Profile/ProfileManagement";
import CustomerSupport from "./components/Support/CustomerSupport";
import Logout from "./components/Logout/Logout";
import PersonalDetailsUpdate from "./components/Profile/PersonalDetailsUpdate";
import ChangePassword from "./components/Profile/ChangePassword";
import ManageBeneficiaries from "./components/Profile/ManageBeneficiaries";
import HighSecurityOptions from "./components/Profile/HighSecurityOptions";
import FAQs from "./components/Support/FAQs";
import ContactInformation from "./components/Support/ContactInformation";
import TroubleshootingGuides from "./components/Support/TroubleshootingGuides";
import FeedbackSuggestions from "./components/Support/FeedbackSuggestions";
import ServiceRequests from "./components/Support/ServiceRequests";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounts-summary" element={<AccountsSummary />} />
        <Route path="/fund-transfer" element={<FundTransfer />} />
        <Route path="/payments-bills" element={<PaymentsBills />} />
        <Route path="/profile-management" element={<ProfileManagement />} />
        <Route path="/customer-support" element={<CustomerSupport />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/profile/personal-details-update"
          element={<PersonalDetailsUpdate />}
        />
        <Route path="/profile/change-password" element={<ChangePassword />} />
        <Route
          path="/profile/manage-beneficiaries"
          element={<ManageBeneficiaries />}
        />
        <Route
          path="/profile/high-security-options"
          element={<HighSecurityOptions />}
        />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contact-information" element={<ContactInformation />} />
        <Route path="/troubleshooting" element={<TroubleshootingGuides />} />
        <Route path="/feedback-suggestions" element={<FeedbackSuggestions />} />
        <Route path="/service-requests" element={<ServiceRequests />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
