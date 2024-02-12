import React, { useEffect, useState } from "react";
import BankingService from "../../Services/bankingService"; // Ensure this path is correct
import "./AccountsSummary.css";
import { useUser } from "../../context/UserContext";

function AccountsSummary() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser(); // Assuming useUser() hook provides user and loading state

  useEffect(() => {
    if (!user || !user.accountNumber) {
      console.error("No user or account ID available");
      setIsLoading(false); // Ensure loading is set to false to stop the loading state if there's no user
      return;
    }

    const fetchAccountTransactions = async () => {
      setIsLoading(true);
      try {
        const fetchedTransactions = await BankingService.fetchTransactions(
          user.accountNumber
        );
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccountTransactions();
  }, [user]); // Reacts to changes in user object, specifically if user.accountId changes

  if (isLoading) {
    return <div>Loading account transactions...</div>;
  }

  if (error) {
    return (
      <div>Error fetching account transactions. Please try again later.</div>
    );
  }

  // Rendering component content
  return (
    <div>
      <h2>Account Transactions</h2>
      {transactions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>From Account</th>
              <th>To Account</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transactionId}>
                <td>{transaction.transactionId}</td>
                <td>{transaction.fromAccountId}</td>
                <td>{transaction.toAccountId}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.transactionDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
}

export default AccountsSummary;
