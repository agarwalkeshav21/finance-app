import React, { useState } from "react";
import './FundTransfer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fundTransferService } from "../../Services/fundTransfer";

const transactionCategories = [
  { key: "INCOME", description: "Income" },
  { key: "EXPENSE", description: "Expense" },
  { key: "TRANSFER", description: "Transfer" },
  // Add the rest of your categories here
];

const transferTypes = [
  { key: "withinBank", description: "Within Bank" },
  { key: "otherBank", description: "To Other Bank" },
  { key: "quickTransfer", description: "Quick Transfer" },
  { key: "scheduleTransfer", description: "Schedule Transfer" },
  // Add any additional transfer types here
];

const FundTransfer = () => {
  const [transferDetails, setTransferDetails] = useState({
    fromAccount: "",
    toAccount: "",
    amount: "",
    category: "INCOME",
    transferType: "withinBank",
  });
  
  const [transactionResponse, setTransactionResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferDetails({ ...transferDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log(transferDetails)
    e.preventDefault();
    try {
      let response;
      switch (transferDetails.transferType) {
        case "withinBank":
          alert("inside within bank")
          response = await fundTransferService.transferWithinBank(transferDetails);
          console.log("logging response "+JSON.stringify(response));
          break;
        case "otherBank":
          response = await fundTransferService.transferToOtherBank(transferDetails);
          break;
        case "quickTransfer":
          response = await fundTransferService.quickTransfer(transferDetails);
          break;
        case "scheduleTransfer":
          response = await fundTransferService.scheduleTransfer(transferDetails);
          break;
        default:
          throw new Error("Invalid transfer type");
      }
      alert("Transfer successful");
      setTransactionResponse(response); // Update the state with the response
      console.log(" transactionResponse222: "+ response);
    } catch (error) {
      alert("Transfer failed: " + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Fund Transfer</h2>
      <form onSubmit={handleSubmit}>
        {/* Input for From Account */}
        <div className="mb-3">
          <label htmlFor="fromAccount" className="form-label">From Account:</label>
          <input
            type="text"
            className="form-control"
            id="fromAccount"
            name="fromAccount"
            value={transferDetails.fromAccount}
            onChange={handleChange}
          />
        </div>
        
        {/* Input for To Account */}
        <div className="mb-3">
          <label htmlFor="toAccount" className="form-label">To Account:</label>
          <input
            type="text"
            className="form-control"
            id="toAccount"
            name="toAccount"
            value={transferDetails.toAccount}
            onChange={handleChange}
          />
        </div>
        
        {/* Input for Amount */}
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount:</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            value={transferDetails.amount}
            onChange={handleChange}
          />
        </div>
        
        {/* Radio buttons for Category */}
        <div className="mb-3">
          <label className="form-label">Category:</label>
          <div>
            {transactionCategories.map((category, index) => (
              <div className="form-check form-check-inline" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="category"
                  id={category.key}
                  value={category.key}
                  checked={transferDetails.category === category.key}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={category.key}>
                  {category.description}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Radio buttons for Transfer Type */}
        <div className="mb-3">
          <label className="form-label">Transfer Type:</label>
          <div>
            {transferTypes.map((type, index) => (
              <div className="form-check form-check-inline" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="transferType"
                  id={type.key}
                  value={type.key}
                  checked={transferDetails.transferType === type.key}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={type.key}>
                  {type.description}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Transfer</button>
      </form>

      {/* Transaction Details Section */}
      {transactionResponse && (
        <div className="transaction-details mt-3">
          <h4>Transaction Details</h4>
          <p>Transaction ID: {transactionResponse.transactionId}</p>
          <p>From Account: {transactionResponse.fromAccountId}</p>
          <p>To Account: {transactionResponse.toAccountId}</p>
          <p>Amount: {transactionResponse.amount}</p>
          <p>Catgeory: {transactionResponse.category}</p>
          <p>Date: {transactionResponse.transactionDate ? transactionResponse.transactionDate : 'N/A'}</p>

          {/* Include more details as needed */}
        </div>
      )}
    </div>
  );
};

export default FundTransfer;
