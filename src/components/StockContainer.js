import React, { useState, useEffect } from "react";
import Stock from "./Stock";
import PortfolioContainer from "./PortfolioContainer";

function StockContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortType, setSortType] = useState("ticker"); // Sorting by ticker or price
  const [filterType, setFilterType] = useState(""); // To filter stocks by type

  // Fetch stocks data from the API
  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((response) => response.json())
      .then((data) => setStocks(data))
      .catch((error) => console.error("Error fetching stocks:", error));
  }, []);

  // Handle adding a stock to the portfolio
  const handleBuyStock = (stock) => {
    setPortfolio([...portfolio, stock]);
  };

  // Handle removing a stock from the portfolio
  const handleSellStock = (stock) => {
    setPortfolio(portfolio.filter((s) => s.id !== stock.id));
  };

  // Sorting function
  const sortStocks = (stocks) => {
    if (sortType === "ticker") {
      return [...stocks].sort((a, b) => a.ticker.localeCompare(b.ticker));
    } else if (sortType === "price") {
      return [...stocks].sort((a, b) => a.price - b.price);
    }
    return stocks;
  };

  // Filtering stocks based on selected type
  const filteredStocks = stocks.filter((stock) =>
    filterType ? stock.type === filterType : true
  );

  // Apply sorting to the filtered stocks
  const sortedStocks = sortStocks(filteredStocks);

  return (
    <div>
      <div>
        {/* Sort by Ticker and Price */}
        <button onClick={() => setSortType("ticker")}>Sort by Ticker</button>
        <button onClick={() => setSortType("price")}>Sort by Price</button>

        {/* Filter by Stock Type */}
        <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
          <option value="">All Types</option>
          <option value="Tech">Tech</option>
          <option value="Finance">Finance</option>
          <option value="Sportswear">Sportswear</option>
        </select>
      </div>

      <h2>Stocks</h2>
      <div>
        {sortedStocks.length === 0 ? (
          <p>No stocks available at the moment.</p>
        ) : (
          sortedStocks.map((stock) => (
            <Stock
              key={stock.id}
              stock={stock}
              onBuy={() => handleBuyStock(stock)}
              isInPortfolio={portfolio.some((s) => s.id === stock.id)}
            />
          ))
        )}
      </div>

      <PortfolioContainer portfolio={portfolio} handleSellStock={handleSellStock} />
    </div>
  );
}

export default StockContainer;
