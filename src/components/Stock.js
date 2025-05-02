import React from "react";

function Stock({ stock, onBuy, onSell, isInPortfolio }) {
  return (
    <div className="stock">
      <h3>{stock.name} ({stock.ticker})</h3>
      <p>Price: ${stock.price}</p>
      <p>Type: {stock.type}</p>
      {!isInPortfolio ? (
        <button onClick={onBuy}>Buy</button>
      ) : (
        <button onClick={onSell}>Sell</button>
      )}
    </div>
  );
}

export default Stock;
