import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SpendAnalyzer from "./SpendAnalyzer";
import AccountsSummary from "../Accounts/AccountsSummary";
import QuickLinks from "../HomePage/QuickLinks";
import PersonalizedOffers from "../HomePage/PersonalizedOffers";
import { getCurrentUser } from "../../Services/authService";
import bankingService from "../../Services/bankingService";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        if (currentUser?.accountNumber) {
          const initialTransactions = await bankingService.fetchTransactions(
            currentUser.accountNumber
          );
          setTransactions(initialTransactions);
          console.log(transactions);
        }
      } catch (error) {
        console.error("Error fetching user data or transactions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    return hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const accumulatedData = transactions.reduce((acc, transaction) => {
    if (acc[transaction.category]) {
      acc[transaction.category] += transaction.amount;
    } else {
      acc[transaction.category] = transaction.amount;
    }
    return acc;
  }, {});

  const data = Object.keys(accumulatedData).map((category) => ({
    name: category,
    value: accumulatedData[category],
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  const userGreeting = `${getTimeBasedGreeting()}, ${
    user?.firstName?.trim()
      ? `${user.firstName} ${user.lastName || "User"}`
      : "User"
  }!`;

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="nav-brand">
          <h1>Future Bank</h1>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/accounts-summary">Accounts Summary</Link>
          </li>
          <li>
            <Link to="/fund-transfer">Fund Transfer</Link>
          </li>
          <li>
            <Link to="/payments-bills">Payments & Bills</Link>
          </li>
          <li>
            <Link to="/profile-management">Profile Management</Link>
          </li>
          <li>
            <Link to="/customer-support">Customer Support</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>

      <header className="dashboard-header">
        <div className="user-greeting">{userGreeting}</div>
      </header>

      <div className="main-container">
        <div className="dashboard-content">
          <QuickLinks />
          <PersonalizedOffers />
          <AccountsSummary accountId={user?.accountNumber} />
          <SpendAnalyzer transactions={transactions} />
        </div>
        <div className="expenditure-chart">
          <h2>Expenditure Breakdown</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              cx={200}
              cy={150}
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
