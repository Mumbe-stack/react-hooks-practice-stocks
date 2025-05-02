import React, { useState } from "react";
import Stock from "./Stock";

function PortfolioContainer() {
  const [portfolio, setPortfolio] = useState([
    { ticker: "AAPL", price: 150, type: "Tech" },
    { ticker: "TSLA", price: 700, type: "Tech" },
    { ticker: "AMZN", price: 3300, type: "Tech" },
  ]);

  const handleSellStock = (stock) => {
    setPortfolio(portfolio.filter((s) => s.ticker !== stock.ticker));
  };

  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolio.length === 0 ? (
        <p>Your portfolio is empty. Start adding stocks!</p>
      ) : (
        <div>
          {portfolio.map((stock) => (
            <Stock
              key={stock.ticker}
              stock={stock}
              onSell={() => handleSellStock(stock)}
              isInPortfolio={true} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PortfolioContainer;
