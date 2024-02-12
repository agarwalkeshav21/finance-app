import React from 'react';

const PersonalizedOffers = () => {
  // Placeholder for personalized offers, replace with actual data fetching logic
  const offers = [
    { id: 1, title: "Exclusive Loan Offer", description: "Get a personal loan with a special interest rate of just 5.99% p.a." },
    { id: 2, title: "High-Yield Savings Account", description: "Open a high-yield savings account and enjoy an interest rate of up to 4% p.a." },
    { id: 3, title: "Credit Card Cashback", description: "Apply for our Platinum Credit Card and get 5% cashback on all your purchases." },
  ];

  return (
    <div className="personalized-offers">
      <h2>Personalized Offers for You</h2>
      <div className="offers-list">
        {offers.map((offer) => (
          <div key={offer.id} className="offer">
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedOffers;
