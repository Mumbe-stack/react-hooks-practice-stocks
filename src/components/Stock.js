import React from "react";

function Stock({ stock, onBuy, onSell, isInPortfolio }) {
  return (
    <div className="stock">
      <h3>{stock.name} ({stock.ticker})</h3>
      <p>Price: ${stock.price}</p>
      <p>Type: {stock.type}</p>
      {/* Show Buy button if the stock is not in the portfolio */}
      {!isInPortfolio ? (
        <button onClick={onBuy}>Buy</button>
      ) : (
        // If the stock is in the portfolio, show the Sell button
        <button onClick={onSell}>Sell</button>
      )}
    </div>
  );
}

export default Stock;
